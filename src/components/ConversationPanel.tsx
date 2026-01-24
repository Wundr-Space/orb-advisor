import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationPanelProps {
  messages: Message[];
  isConnected: boolean;
}

export const ConversationPanel = ({ messages, isConnected }: ConversationPanelProps) => {
  if (!isConnected && messages.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
          Conversation
        </h3>
        <ScrollArea className="h-64">
          <div className="space-y-4 pr-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary/20 border border-primary/30 text-foreground"
                        : "bg-secondary border border-border text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {messages.length === 0 && isConnected && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground text-sm"
              >
                Start speaking to begin the conversation...
              </motion.p>
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
};
