import { motion } from "framer-motion";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StartButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const StartButton = ({ isConnected, isConnecting, onStart, onStop }: StartButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="lg"
          onClick={isConnected ? onStop : onStart}
          disabled={isConnecting}
          className={`
            px-8 py-6 text-lg font-bold tracking-wide
            rounded-full shadow-lg
            transition-colors duration-200
            ${isConnected 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }
          `}
        >
          <span className="flex items-center gap-3">
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Connecting...
              </>
            ) : isConnected ? (
              <>
                <MicOff className="w-5 h-5" />
                End Chat
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                Start Chat
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
