import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseRealtimeVoiceReturn {
  isConnected: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  messages: Message[];
  startConversation: () => Promise<void>;
  stopConversation: () => void;
}

export const useRealtimeVoice = (): UseRealtimeVoiceReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  // Audio queue for proper sequential playback
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);
  const nextPlayTimeRef = useRef(0);

  const playNextInQueue = useCallback(() => {
    if (!audioContextRef.current || audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      setIsSpeaking(false);
      return;
    }

    isPlayingRef.current = true;
    setIsSpeaking(true);

    const float32Array = audioQueueRef.current.shift()!;
    const audioBuffer = audioContextRef.current.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);

    // Schedule this chunk to play after the previous one
    const currentTime = audioContextRef.current.currentTime;
    const startTime = Math.max(currentTime, nextPlayTimeRef.current);
    nextPlayTimeRef.current = startTime + audioBuffer.duration;

    source.onended = () => {
      if (audioQueueRef.current.length > 0) {
        playNextInQueue();
      } else {
        isPlayingRef.current = false;
        setIsSpeaking(false);
      }
    };

    source.start(startTime);
  }, []);

  const playAudio = useCallback(
    (base64Audio: string) => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
        nextPlayTimeRef.current = 0;
      }

      try {
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Convert Int16 PCM to Float32
        const int16Array = new Int16Array(bytes.buffer);
        const float32Array = new Float32Array(int16Array.length);
        for (let i = 0; i < int16Array.length; i++) {
          float32Array[i] = int16Array[i] / 32768;
        }

        // Add to queue
        audioQueueRef.current.push(float32Array);

        // Start playing if not already
        if (!isPlayingRef.current) {
          playNextInQueue();
        }
      } catch (error) {
        console.error("Error queuing audio:", error);
      }
    },
    [playNextInQueue],
  );

  const startConversation = useCallback(async () => {
    setIsConnecting(true);

    try {
      // Get ephemeral token from edge function
      const { data, error } = await supabase.functions.invoke("realtime-session");

      if (error || !data?.client_secret?.value) {
        throw new Error(error?.message || "Failed to get session token");
      }

      const ephemeralKey = data.client_secret.value;

      // Connect to OpenAI Realtime API
      const ws = new WebSocket("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17", [
        "realtime",
        `openai-insecure-api-key.${ephemeralKey}`,
        "openai-beta.realtime-v1",
      ]);

      wsRef.current = ws;

      ws.onopen = async () => {
        console.log("WebSocket connected");

        // Send session configuration
        ws.send(
          JSON.stringify({
            type: "session.update",
            session: {
              modalities: ["text", "audio"],
              instructions: `You are a professional and empathetic Career Advisor AI. Your role is to help users with career-related guidance including:
- Resume and CV advice
- Job search strategies
- Interview preparation
- Career transitions and pivots
- Skill development recommendations
- Workplace challenges
- Salary negotiation tips
- Professional networking guidance

Be warm, encouraging, and practical in your advice. Ask clarifying questions when needed to provide more personalized guidance. Keep responses conversational and focused.`,
              voice: "shimmer",
              input_audio_format: "pcm16",
              output_audio_format: "pcm16",
              input_audio_transcription: {
                model: "whisper-1",
              },
              turn_detection: {
                type: "server_vad",
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 500,
              },
            },
          }),
        );

        // Request microphone access and start streaming
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          audioContextRef.current = new AudioContext({ sampleRate: 24000 });
          sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
          processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

          processorRef.current.onaudioprocess = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
              const inputData = e.inputBuffer.getChannelData(0);

              // Downsample from browser sample rate to 24kHz
              const sampleRate = audioContextRef.current!.sampleRate;
              const downsampleRatio = sampleRate / 24000;
              const downsampledLength = Math.floor(inputData.length / downsampleRatio);
              const downsampledData = new Float32Array(downsampledLength);

              for (let i = 0; i < downsampledLength; i++) {
                downsampledData[i] = inputData[Math.floor(i * downsampleRatio)];
              }

              // Convert to Int16
              const int16Data = new Int16Array(downsampledData.length);
              for (let i = 0; i < downsampledData.length; i++) {
                const s = Math.max(-1, Math.min(1, downsampledData[i]));
                int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
              }

              // Convert to base64
              const uint8Array = new Uint8Array(int16Data.buffer);
              let binary = "";
              for (let i = 0; i < uint8Array.length; i++) {
                binary += String.fromCharCode(uint8Array[i]);
              }
              const base64 = btoa(binary);

              ws.send(
                JSON.stringify({
                  type: "input_audio_buffer.append",
                  audio: base64,
                }),
              );
            }
          };

          sourceRef.current.connect(processorRef.current);
          processorRef.current.connect(audioContextRef.current.destination);

          setIsConnected(true);
          setIsListening(true);
          toast.success("Connected to Career Advisor");
        } catch (micError) {
          console.error("Microphone error:", micError);
          toast.error("Please allow microphone access to use voice features");
          ws.close();
        }
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "response.audio.delta":
            if (data.delta) {
              playAudio(data.delta);
            }
            break;

          case "conversation.item.input_audio_transcription.completed":
            if (data.transcript) {
              setMessages((prev) => [...prev, { role: "user", content: data.transcript }]);
            }
            break;

          case "response.audio_transcript.done":
            if (data.transcript) {
              setMessages((prev) => [...prev, { role: "assistant", content: data.transcript }]);
            }
            break;

          case "input_audio_buffer.speech_started":
            setIsListening(true);
            break;

          case "input_audio_buffer.speech_stopped":
            setIsListening(false);
            break;

          case "error":
            console.error("Realtime API error:", data.error);
            toast.error(data.error?.message || "An error occurred");
            break;
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.error("Connection error occurred");
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
      };
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error(error instanceof Error ? error.message : "Failed to start conversation");
    } finally {
      setIsConnecting(false);
    }
  }, [playAudio]);

  const stopConversation = useCallback(() => {
    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Stop audio processing
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Clear audio queue
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    nextPlayTimeRef.current = 0;

    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);

    toast.info("Conversation ended");
  }, []);

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    isListening,
    messages,
    startConversation,
    stopConversation,
  };
};
