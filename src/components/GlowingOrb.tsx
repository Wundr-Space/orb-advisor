import { motion } from "framer-motion";

interface GlowingOrbProps {
  isSpeaking: boolean;
  isListening: boolean;
  isConnected: boolean;
}

export const GlowingOrb = ({ isSpeaking, isListening, isConnected }: GlowingOrbProps) => {
  const getAnimationClass = () => {
    if (isSpeaking) return "animate-speaking-pulse";
    if (isListening) return "animate-orb-pulse";
    return "animate-float";
  };

  const getGlowIntensity = () => {
    if (isSpeaking) return "shadow-[0_0_60px_hsl(185_100%_50%/0.8),0_0_120px_hsl(185_100%_50%/0.4),0_0_180px_hsl(200_100%_45%/0.3)]";
    if (isListening) return "shadow-[0_0_40px_hsl(185_100%_50%/0.6),0_0_80px_hsl(185_100%_50%/0.3),0_0_120px_hsl(200_100%_45%/0.2)]";
    if (isConnected) return "shadow-[0_0_30px_hsl(185_100%_50%/0.4),0_0_60px_hsl(185_100%_50%/0.2),0_0_100px_hsl(200_100%_45%/0.1)]";
    return "shadow-[0_0_20px_hsl(185_100%_50%/0.2),0_0_40px_hsl(185_100%_50%/0.1)]";
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/40" />
      </motion.div>

      {/* Second rotating ring */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-accent/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/40" />
      </motion.div>

      {/* Pulsing outer glow */}
      <motion.div
        className={`absolute w-56 h-56 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent ${getAnimationClass()}`}
        animate={isConnected ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main orb container */}
      <motion.div
        className={`relative w-44 h-44 rounded-full ${getAnimationClass()}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gradient background sphere */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20 ${getGlowIntensity()} transition-all duration-500`}
        />

        {/* Inner glow core */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/60 via-orb-core/50 to-accent/40"
          animate={isListening || isSpeaking ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.7 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bright center */}
        <motion.div
          className="absolute inset-12 rounded-full bg-gradient-to-br from-white/40 via-primary/50 to-transparent"
          animate={isSpeaking ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : { opacity: 0.6 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Highlight reflection */}
        <div className="absolute top-4 left-6 w-8 h-8 rounded-full bg-white/20 blur-sm" />
        <div className="absolute top-6 left-8 w-3 h-3 rounded-full bg-white/40" />
      </motion.div>

      {/* Status indicator */}
      <div className="absolute -bottom-16 flex flex-col items-center gap-2">
        <motion.div
          className={`w-2 h-2 rounded-full ${
            isConnected 
              ? isSpeaking 
                ? "bg-primary" 
                : isListening 
                  ? "bg-accent" 
                  : "bg-primary/60"
              : "bg-muted-foreground/40"
          }`}
          animate={isConnected ? { opacity: [1, 0.5, 1] } : { opacity: 0.4 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          {isSpeaking ? "Speaking" : isListening ? "Listening" : isConnected ? "Ready" : "Offline"}
        </span>
      </div>
    </div>
  );
};
