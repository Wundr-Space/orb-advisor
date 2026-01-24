import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingOrb } from "@/components/GlowingOrb";
import { StartButton } from "@/components/StartButton";
import { ConversationPanel } from "@/components/ConversationPanel";
import { ChatModeSelector } from "@/components/ChatModeSelector";
import { TextChatPanel } from "@/components/TextChatPanel";
import { useRealtimeVoice } from "@/hooks/useRealtimeVoice";
import { useTextChat } from "@/hooks/useTextChat";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatMode = "voice" | "text" | null;

const Index = () => {
  const [chatMode, setChatMode] = useState<ChatMode>(null);

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
  } = useTextChat();

  const handleBack = () => {
    if (isConnected) {
      stopConversation();
    }
    clearMessages();
    setChatMode(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Career Advisor
            </h1>
          </div>
          <p className="text-muted-foreground text-center max-w-md">
            Your AI-powered guide for career decisions, interview prep, and professional growth
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
              {/* Orb container */}
              <div className="flex-shrink-0 mb-20">
                <GlowingOrb
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
                <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                  <span className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                    Resume Tips
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                    Interview Prep
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                    Career Transitions
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                    Salary Negotiation
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
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {/* Orb container */}
              <div className="flex-shrink-0 mb-20">
                <GlowingOrb
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                  isConnected={isConnected}
                />
              </div>

              {/* Start button */}
              <div className="mb-12">
                <StartButton
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  onStart={startConversation}
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
