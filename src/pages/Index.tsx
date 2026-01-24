import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlobAdvisor } from "@/components/BlobAdvisor";
import { StartButton } from "@/components/StartButton";
import { ConversationPanel } from "@/components/ConversationPanel";
import { ChatModeSelector } from "@/components/ChatModeSelector";
import { UserTypeSelector, type UserType } from "@/components/UserTypeSelector";
import { TextChatPanel } from "@/components/TextChatPanel";
import { SkillsDebugPanel } from "@/components/SkillsDebugPanel";
import { VoiceSettingsPanel } from "@/components/VoiceSettingsPanel";
import { type VoicePersona } from "@/components/VoicePersonaSelector";
import { useRealtimeVoice } from "@/hooks/useRealtimeVoice";
import { useTextChat } from "@/hooks/useTextChat";
import { useSkillScores } from "@/hooks/useSkillScores";
import { ArrowLeft, Bug, Settings } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ChatMode = "voice" | "text" | null;

const Index = () => {
  const [userType, setUserType] = useState<UserType | null>(null);
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
    if (chatMode === "text" && textMessages.length === 0 && userType) {
      initiateConversation(userType);
    }
  }, [chatMode, textMessages.length, initiateConversation, userType]);

  const handleBack = () => {
    if (isConnected) {
      stopConversation();
    }
    clearMessages();
    
    // If in chat mode, go back to chat mode selection
    if (chatMode !== null) {
      setChatMode(null);
    } else {
      // If in chat mode selection, go back to user type selection
      setUserType(null);
    }
  };

  const handleStartConversation = useCallback(() => {
    if (userType) {
      startConversation(selectedPersona, userType);
    }
  }, [startConversation, selectedPersona, userType]);

  // Dynamic content based on user type
  const getHeaderContent = () => {
    if (userType === "recruiter") {
      return {
        title: "Recruitment Advisor",
        subtitle: "Let's find the perfect candidates for your role!",
        hints: ["Role Definition", "Candidate Matching", "Hiring Tips"],
      };
    }
    return {
      title: "Career Advisor",
      subtitle: "Let's discover your skills and find your perfect job!",
      hints: ["Skills Assessment", "Local Jobs", "Career Tips"],
    };
  };

  const headerContent = getHeaderContent();

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
            <img 
              src={logo} 
              alt="Get In - AI Career Advice" 
              className="h-24 md:h-32 w-auto"
            />
          </div>
          <p className="text-muted-foreground text-center max-w-md text-lg">
            {userType ? headerContent.subtitle : "Find your next opportunity or the perfect candidate"}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: User Type Selection */}
          {userType === null && (
            <motion.div
              key="user-type-selector"
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

              {/* User type selector */}
              <div className="mb-12">
                <UserTypeSelector onSelectType={setUserType} />
              </div>
            </motion.div>
          )}

          {/* Step 2: Chat Mode Selection */}
          {userType !== null && chatMode === null && (
            <motion.div
              key="chat-mode-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Back button */}
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
                  {headerContent.hints.map((hint, index) => (
                    <span 
                      key={hint}
                      className={`px-4 py-2 rounded-full text-foreground font-medium ${
                        index === 0 ? "bg-primary/20" : 
                        index === 1 ? "bg-secondary/40" : "bg-accent/30"
                      }`}
                    >
                      {hint}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Voice Chat */}
          {chatMode === "voice" && userType && (
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

          {/* Text Chat */}
          {chatMode === "text" && userType && (
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
                skills={skills}
                userType={userType}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
