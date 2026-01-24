import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ADVISOR_SYSTEM_PROMPT, INITIAL_GREETING_PROMPT } from "@/constants/advisorPrompt";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseTextChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  initiateConversation: () => Promise<void>;
}

export const useTextChat = (): UseTextChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitiated, setHasInitiated] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("text-chat", {
        body: {
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt: ADVISOR_SYSTEM_PROMPT,
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setHasInitiated(false);
  }, []);

  const initiateConversation = useCallback(async () => {
    if (hasInitiated || isLoading) return;
    
    setHasInitiated(true);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("text-chat", {
        body: {
          messages: [{ role: "user", content: INITIAL_GREETING_PROMPT }],
          systemPrompt: ADVISOR_SYSTEM_PROMPT,
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages([assistantMessage]);
    } catch (error) {
      console.error("Error initiating conversation:", error);
      toast.error("Failed to connect. Please try again.");
      setHasInitiated(false);
    } finally {
      setIsLoading(false);
    }
  }, [hasInitiated, isLoading]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    initiateConversation,
  };
};
