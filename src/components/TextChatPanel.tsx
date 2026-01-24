import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Loader2, Briefcase, Users, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobCardsPanel } from "@/components/JobCardsPanel";
import { ApplicantCardsPanel } from "@/components/ApplicantCardsPanel";
import { useJobRecommendations } from "@/hooks/useJobRecommendations";
import { useApplicantRecommendations } from "@/hooks/useApplicantRecommendations";
import { useDemoMode } from "@/hooks/useDemoMode";
import type { Skill } from "@/hooks/useSkillScores";
import type { UserType } from "@/components/UserTypeSelector";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TextChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onBack: () => void;
  skills: Skill[];
  userType: UserType;
}

export const TextChatPanel = ({
  messages,
  isLoading,
  onSendMessage,
  onBack,
  skills,
  userType,
}: TextChatPanelProps) => {
  const [input, setInput] = useState("");
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { isDemoMode, startDemo, stopDemo, generateResponse } = useDemoMode();
  
  const handleStartDemo = () => startDemo(userType);
  const recommendedJobs = useJobRecommendations(messages, skills);
  const recommendedApplicants = useApplicantRecommendations(messages);
  
  const hasResults = userType === "recruiter" 
    ? recommendedApplicants.length > 0 
    : recommendedJobs.length > 0;
  const resultsCount = userType === "recruiter" 
    ? recommendedApplicants.length 
    : recommendedJobs.length;

  useEffect(() => {
    // ScrollArea uses a viewport element inside, so we need to find it
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  // Auto-show results panel when recommendations are detected
  useEffect(() => {
    if (hasResults && !showResultsPanel) {
      setShowResultsPanel(true);
    }
  }, [hasResults]);

  // Auto-respond in demo mode
  useEffect(() => {
    if (isDemoMode && !isLoading && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        const response = generateResponse(lastMessage.content);
        if (response) {
          // Delay to simulate human typing (1-3 seconds)
          const delay = 1000 + Math.random() * 2000;
          const timer = setTimeout(() => {
            onSendMessage(response);
          }, delay);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [isDemoMode, isLoading, messages, generateResponse, onSendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
      // Switch back to chat when user sends a new message
      setShowResultsPanel(false);
    }
  };

  // Show appropriate results panel
  if (showResultsPanel && hasResults) {
    if (userType === "recruiter") {
      return (
        <ApplicantCardsPanel
          applicants={recommendedApplicants}
          onBack={onBack}
          onShowChat={() => setShowResultsPanel(false)}
        />
      );
    }
    return (
      <JobCardsPanel
        jobs={recommendedJobs}
        skills={skills}
        onBack={onBack}
        onShowChat={() => setShowResultsPanel(false)}
      />
    );
  }

  const headerTitle = userType === "recruiter" 
    ? "Chat with Recruitment Advisor" 
    : "Chat with Career Advisor";

  const ResultsIcon = userType === "recruiter" ? Users : Briefcase;
  const resultsLabel = userType === "recruiter" ? "Candidates" : "Jobs";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto flex flex-col h-[500px] bg-card rounded-3xl border border-border shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-bold text-foreground">{headerTitle}</h2>
        </div>
        <div className="flex items-center gap-2">
          {hasResults && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResultsPanel(true)}
              className="rounded-full gap-2"
            >
              <ResultsIcon className="w-4 h-4" />
              View {resultsLabel} ({resultsCount})
            </Button>
          )}
          {/* Demo button */}
          <Button
            variant={isDemoMode ? "destructive" : "outline"}
            size="sm"
            onClick={isDemoMode ? stopDemo : handleStartDemo}
            className="rounded-full text-xs gap-1.5"
            disabled={isLoading}
          >
            {isDemoMode ? (
              <>
                <Square className="w-3 h-3" />
                Stop Demo
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                Demo
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">
              {userType === "recruiter" 
                ? "Start a conversation with your recruitment advisor..."
                : "Start a conversation with your career advisor..."}
            </p>
          )}
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-secondary/50 px-4 py-3 rounded-2xl">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-muted border-border rounded-full px-4 focus:border-primary"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};
