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
      <Button
        size="lg"
        onClick={() => onSelectMode("voice")}
        className="
          relative px-8 py-6 text-lg font-medium tracking-wide
          transition-all duration-300 ease-out
          bg-primary/20 hover:bg-primary/30 text-primary border-primary/30
          border backdrop-blur-sm
          shadow-[0_0_20px_hsl(185_100%_50%/0.2)]
          hover:shadow-[0_0_30px_hsl(185_100%_50%/0.3)]
        "
      >
        <span className="flex items-center gap-3">
          <Mic className="w-5 h-5" />
          Speak to an Advisor
        </span>
        <motion.div
          className="absolute inset-0 rounded-md bg-primary/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </Button>

      <Button
        size="lg"
        onClick={() => onSelectMode("text")}
        className="
          relative px-8 py-6 text-lg font-medium tracking-wide
          transition-all duration-300 ease-out
          bg-accent/20 hover:bg-accent/30 text-accent border-accent/30
          border backdrop-blur-sm
          shadow-[0_0_20px_hsl(200_100%_60%/0.2)]
          hover:shadow-[0_0_30px_hsl(200_100%_60%/0.3)]
        "
      >
        <span className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5" />
          Chat to an Advisor
        </span>
        <motion.div
          className="absolute inset-0 rounded-md bg-accent/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </Button>
    </motion.div>
  );
};
