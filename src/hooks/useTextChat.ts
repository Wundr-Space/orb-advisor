import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ADVISOR_SYSTEM_PROMPT, 
  INITIAL_GREETING_PROMPT,
  RECRUITER_SYSTEM_PROMPT,
  RECRUITER_GREETING_PROMPT 
} from "@/constants/advisorPrompt";
import type { UserType } from "@/components/UserTypeSelector";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseTextChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  initiateConversation: (userType: UserType) => Promise<void>;
}

export const useTextChat = (): UseTextChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitiated, setHasInitiated] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<UserType>("jobseeker");

  const getSystemPrompt = (userType: UserType) => {
    return userType === "recruiter" ? RECRUITER_SYSTEM_PROMPT : ADVISOR_SYSTEM_PROMPT;
  };

  const getGreetingPrompt = (userType: UserType) => {
    return userType === "recruiter" ? RECRUITER_GREETING_PROMPT : INITIAL_GREETING_PROMPT;
  };

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
          systemPrompt: getSystemPrompt(currentUserType),
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
  }, [messages, currentUserType]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setHasInitiated(false);
  }, []);

  const initiateConversation = useCallback(async (userType: UserType) => {
    if (hasInitiated || isLoading) return;
    
    setHasInitiated(true);
    setCurrentUserType(userType);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("text-chat", {
        body: {
          messages: [{ role: "user", content: getGreetingPrompt(userType) }],
          systemPrompt: getSystemPrompt(userType),
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
