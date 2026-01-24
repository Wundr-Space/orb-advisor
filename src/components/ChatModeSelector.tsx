import { motion } from "framer-motion";
import { Mic, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatMode = "voice" | "text" | null;

interface ChatModeSelectorProps {
  onSelectMode: (mode: ChatMode) => void;
}

export const ChatModeSelector = ({ onSelectMode }: ChatModeSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="lg"
          onClick={() => onSelectMode("voice")}
          className="
            px-8 py-6 text-lg font-bold tracking-wide
            bg-primary hover:bg-primary/90 text-primary-foreground
            rounded-full shadow-lg
            transition-colors duration-200
          "
        >
          <span className="flex items-center gap-3">
            <Mic className="w-5 h-5" />
            Speak to Advisor
          </span>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="lg"
          onClick={() => onSelectMode("text")}
          className="
            px-8 py-6 text-lg font-bold tracking-wide
            bg-secondary hover:bg-secondary/90 text-secondary-foreground
            rounded-full shadow-lg
            transition-colors duration-200
          "
        >
          <span className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5" />
            Chat to Advisor
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
