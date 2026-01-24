import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlobAdvisor } from "@/components/BlobAdvisor";
import { StartButton } from "@/components/StartButton";
import { ConversationPanel } from "@/components/ConversationPanel";
import { ChatModeSelector } from "@/components/ChatModeSelector";
import { TextChatPanel } from "@/components/TextChatPanel";
import { SkillsDebugPanel } from "@/components/SkillsDebugPanel";
import { VoiceSettingsPanel } from "@/components/VoiceSettingsPanel";
import { type VoicePersona } from "@/components/VoicePersonaSelector";
import { useRealtimeVoice } from "@/hooks/useRealtimeVoice";
import { useTextChat } from "@/hooks/useTextChat";
import { useSkillScores } from "@/hooks/useSkillScores";
import { Sparkles, ArrowLeft, Bug, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ChatMode = "voice" | "text" | null;

const Index = () => {
  const [chatMode, setChatMode] = useState<ChatMode>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>("coral");

  const {
    isConnected,
    isConnecting,
    isSpeaking,
    isListening,
    messages: voiceMessages,
    startConversation,
    stopConversation,
  } = useRealtimeVoice();

  const {
    messages: textMessages,
    isLoading: isTextLoading,
    sendMessage,
    clearMessages,
    initiateConversation,
  } = useTextChat();

  // Get current messages based on mode
  const currentMessages = chatMode === "voice" ? voiceMessages : textMessages;
  
  // Parse skill scores from messages
  const skills = useSkillScores(currentMessages);

  // Auto-initiate text chat when mode is selected
  useEffect(() => {
    if (chatMode === "text" && textMessages.length === 0) {
      initiateConversation();
    }
  }, [chatMode, textMessages.length, initiateConversation]);

  const handleBack = () => {
    if (isConnected) {
      stopConversation();
    }
    clearMessages();
    setChatMode(null);
  };

  const handleStartConversation = useCallback(() => {
    startConversation(selectedPersona);
  }, [startConversation, selectedPersona]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Skills Debug Panel */}
      <SkillsDebugPanel skills={skills} isVisible={showDebugPanel} />

      {/* Voice Settings Panel */}
      <VoiceSettingsPanel
        isVisible={showVoiceSettings}
        selectedPersona={selectedPersona}
        onSelectPersona={setSelectedPersona}
        disabled={isConnected || isConnecting}
      />

      {/* Toggle buttons - Fixed position */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md border border-border">
          <Bug className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="debug-mode" className="text-sm text-muted-foreground cursor-pointer">
            Debug
          </Label>
          <Switch
            id="debug-mode"
            checked={showDebugPanel}
            onCheckedChange={setShowDebugPanel}
          />
        </div>
        <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md border border-border">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="voice-settings" className="text-sm text-muted-foreground cursor-pointer">
            Voice
          </Label>
          <Switch
            id="voice-settings"
            checked={showVoiceSettings}
            onCheckedChange={setShowVoiceSettings}
          />
        </div>
      </div>

      {/* Subtle decorative shapes - angular and asymmetric */}
      <svg className="absolute top-20 left-10 w-24 h-20" viewBox="0 0 96 80">
        <polygon points="10,35 45,5 85,20 75,65 35,75 5,55" className="fill-secondary/30" />
      </svg>
      <svg className="absolute top-40 right-20 w-16 h-14" viewBox="0 0 64 56">
        <polygon points="8,25 30,4 58,18 52,48 22,52 4,38" className="fill-accent/30" />
      </svg>
      <svg className="absolute bottom-32 left-1/4 w-20 h-18" viewBox="0 0 80 72">
        <polygon points="12,30 42,6 72,22 65,58 28,68 6,48" className="fill-primary/20" />
      </svg>
      <svg className="absolute bottom-20 right-1/3 w-14 h-12" viewBox="0 0 56 48">
        <polygon points="6,22 28,4 50,16 45,40 18,46 4,32" className="fill-secondary/40" />
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-accent/30">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Career Advisor
            </h1>
          </div>
          <p className="text-muted-foreground text-center max-w-md text-lg">
            Let's discover your skills and find your perfect job!
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {chatMode === null && (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Blob container */}
              <div className="flex-shrink-0 mb-16">
                <BlobAdvisor
                  isSpeaking={false}
                  isListening={false}
                  isConnected={false}
                />
              </div>

              {/* Mode selector */}
              <div className="mb-12">
                <ChatModeSelector onSelectMode={setChatMode} />
              </div>

              {/* Feature hints */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="px-4 py-2 rounded-full bg-primary/20 text-foreground font-medium">
                    Skills Assessment
                  </span>
                  <span className="px-4 py-2 rounded-full bg-secondary/40 text-foreground font-medium">
                    Local Jobs
                  </span>
                  <span className="px-4 py-2 rounded-full bg-accent/30 text-foreground font-medium">
                    Career Tips
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {chatMode === "voice" && (
            <motion.div
              key="voice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center w-full"
            >
              {/* Back button */}
              {!isConnected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-6 left-6"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {/* Blob container */}
              <div className="flex-shrink-0 mb-8">
                <BlobAdvisor
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                  isConnected={isConnected}
                />
              </div>


              {/* Start button */}
              <div className="mb-8">
                <StartButton
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  onStart={handleStartConversation}
                  onStop={stopConversation}
                />
              </div>

              {/* Conversation panel */}
              <div className="w-full max-w-2xl">
                <ConversationPanel messages={voiceMessages} isConnected={isConnected} />
              </div>
            </motion.div>
          )}

          {chatMode === "text" && (
            <motion.div
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <TextChatPanel
                messages={textMessages}
                isLoading={isTextLoading}
                onSendMessage={sendMessage}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
