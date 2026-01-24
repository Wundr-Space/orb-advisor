import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlobAdvisor } from "@/components/BlobAdvisor";
import { StartButton } from "@/components/StartButton";
import { ConversationPanel } from "@/components/ConversationPanel";
import { ChatModeSelector } from "@/components/ChatModeSelector";
import { TextChatPanel } from "@/components/TextChatPanel";
import { SkillsDebugPanel } from "@/components/SkillsDebugPanel";
import { VoicePersonaSelector, type VoicePersona } from "@/components/VoicePersonaSelector";
import { useRealtimeVoice } from "@/hooks/useRealtimeVoice";
import { useTextChat } from "@/hooks/useTextChat";
import { useSkillScores } from "@/hooks/useSkillScores";
import { Sparkles, ArrowLeft, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ChatMode = "voice" | "text" | null;

const Index = () => {
  const [chatMode, setChatMode] = useState<ChatMode>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
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

      {/* Debug Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md border border-border">
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

      {/* Subtle decorative shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-secondary/30" />
      <div className="absolute top-40 right-20 w-12 h-12 rounded-full bg-accent/30" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full bg-primary/20" />
      <div className="absolute bottom-20 right-1/3 w-10 h-10 rounded-full bg-secondary/40" />

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

              {/* Voice Persona Selector - only show when not connected */}
              {!isConnected && (
                <div className="mb-6">
                  <VoicePersonaSelector
                    selectedPersona={selectedPersona}
                    onSelectPersona={setSelectedPersona}
                    disabled={isConnecting}
                  />
                </div>
              )}

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
