import { motion, Easing } from "framer-motion";

interface BlobAdvisorProps {
  isSpeaking: boolean;
  isListening: boolean;
  isConnected: boolean;
}

export const BlobAdvisor = ({ isSpeaking, isListening, isConnected }: BlobAdvisorProps) => {
  const getAnimationVariant = () => {
    if (isSpeaking) return "speaking";
    if (isListening) return "listening";
    return "idle";
  };

  const easeInOut: Easing = "easeInOut";

  const blobVariants = {
    idle: {
      y: [0, -8, 0],
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      transition: {
        y: { duration: 3, repeat: Infinity, ease: easeInOut },
      },
    },
    speaking: {
      y: 0,
      scaleX: [1, 1.05, 0.95, 1.03, 1],
      scaleY: [1, 0.95, 1.05, 0.97, 1],
      rotate: 0,
      transition: {
        scaleX: { duration: 0.4, repeat: Infinity, ease: easeInOut },
        scaleY: { duration: 0.4, repeat: Infinity, ease: easeInOut },
      },
    },
    listening: {
      y: [0, -4, 0],
      scaleX: 1,
      scaleY: 1,
      rotate: [0, 2, -2, 0],
      transition: {
        y: { duration: 2, repeat: Infinity, ease: easeInOut },
        rotate: { duration: 1.5, repeat: Infinity, ease: easeInOut },
      },
    },
  };

  const eyeVariants = {
    idle: {
      scaleY: [1, 1, 0.1, 1, 1],
      transition: {
        scaleY: { duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] },
      },
    },
    speaking: {
      scaleY: 1,
    },
    listening: {
      scaleY: 1,
      y: [0, -1, 0],
      transition: {
        y: { duration: 1.5, repeat: Infinity, ease: easeInOut },
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Main blob container */}
      <motion.div
        className="relative"
        variants={blobVariants}
        animate={getAnimationVariant()}
        initial="idle"
      >
        <svg
          width="180"
          height="160"
          viewBox="0 0 180 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow */}
          <ellipse
            cx="90"
            cy="150"
            rx="50"
            ry="8"
            className="fill-foreground/10"
          />

          {/* Blob body - organic rounded shape */}
          <path
            d="M30 90 
               C30 50, 50 25, 90 25 
               C130 25, 150 50, 150 90 
               C150 120, 135 140, 90 140 
               C45 140, 30 120, 30 90Z"
            className="fill-primary"
          />

          {/* Blob highlight */}
          <path
            d="M45 70 
               C45 50, 60 35, 85 35 
               C100 35, 110 45, 110 55 
               C110 65, 95 70, 75 70 
               C55 70, 45 80, 45 70Z"
            className="fill-primary-foreground/20"
          />

          {/* Spectacles */}
          {/* Left lens frame */}
          <circle
            cx="65"
            cy="75"
            r="22"
            strokeWidth="4"
            className="fill-none stroke-foreground"
          />
          {/* Right lens frame */}
          <circle
            cx="115"
            cy="75"
            r="22"
            strokeWidth="4"
            className="fill-none stroke-foreground"
          />
          {/* Bridge */}
          <path
            d="M87 75 L93 75"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-foreground"
          />
          {/* Left arm */}
          <path
            d="M43 75 L30 70"
            strokeWidth="3"
            strokeLinecap="round"
            className="stroke-foreground"
          />
          {/* Right arm */}
          <path
            d="M137 75 L150 70"
            strokeWidth="3"
            strokeLinecap="round"
            className="stroke-foreground"
          />

          {/* Eyes (inside glasses) */}
          <motion.g variants={eyeVariants} animate={getAnimationVariant()}>
            {/* Left eye */}
            <circle cx="65" cy="75" r="6" className="fill-foreground" />
            {/* Right eye */}
            <circle cx="115" cy="75" r="6" className="fill-foreground" />
            {/* Eye highlights */}
            <circle cx="67" cy="73" r="2" className="fill-primary-foreground" />
            <circle cx="117" cy="73" r="2" className="fill-primary-foreground" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Status indicator */}
      <div className="absolute -bottom-12 flex flex-col items-center gap-2">
        <motion.div
          className={`w-3 h-3 rounded-full ${
            isConnected
              ? isSpeaking
                ? "bg-primary"
                : isListening
                  ? "bg-secondary"
                  : "bg-accent"
              : "bg-muted-foreground/40"
          }`}
          animate={isConnected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-sm font-medium text-muted-foreground">
          {isSpeaking ? "Speaking..." : isListening ? "Listening..." : isConnected ? "Ready!" : "Say hello!"}
        </span>
      </div>
    </div>
  );
};
