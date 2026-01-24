import { motion } from "framer-motion";
import { GlowingOrb } from "@/components/GlowingOrb";
import { StartButton } from "@/components/StartButton";
import { ConversationPanel } from "@/components/ConversationPanel";
import { useRealtimeVoice } from "@/hooks/useRealtimeVoice";
import { Briefcase } from "lucide-react";

const Index = () => {
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    isListening,
    messages,
    startConversation,
    stopConversation,
  } = useRealtimeVoice();

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
          <ConversationPanel messages={messages} isConnected={isConnected} />
        </div>

        {/* Feature hints */}
        {!isConnected && (
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
        )}
      </div>
    </div>
  );
};

export default Index;
