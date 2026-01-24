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
      <Button
        size="lg"
        onClick={isConnected ? onStop : onStart}
        disabled={isConnecting}
        className={`
          relative px-8 py-6 text-lg font-medium tracking-wide
          transition-all duration-300 ease-out
          ${isConnected 
            ? "bg-destructive/20 hover:bg-destructive/30 text-destructive border-destructive/30" 
            : "bg-primary/20 hover:bg-primary/30 text-primary border-primary/30"
          }
          border backdrop-blur-sm
          shadow-[0_0_20px_hsl(185_100%_50%/0.2)]
          hover:shadow-[0_0_30px_hsl(185_100%_50%/0.3)]
          ${isConnected ? "hover:shadow-[0_0_30px_hsl(0_70%_50%/0.3)]" : ""}
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
              End Conversation
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Conversation
            </>
          )}
        </span>

        {/* Glow effect on button */}
        {!isConnected && !isConnecting && (
          <motion.div
            className="absolute inset-0 rounded-md bg-primary/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </Button>
    </motion.div>
  );
};
