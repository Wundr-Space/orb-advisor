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

  // South Park style mouth flapping animation
  const linear: Easing = "linear";
  
  const mouthVariants = {
    idle: {
      scaleY: 0,
      opacity: 0,
    },
    listening: {
      scaleY: 0,
      opacity: 0,
    },
    speaking: {
      scaleY: [0.2, 1, 0.4, 1, 0.2],
      opacity: 1,
      transition: {
        scaleY: { duration: 0.35, repeat: Infinity, ease: linear },
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
          width="220"
          height="180"
          viewBox="0 0 220 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow */}
          <ellipse
            cx="110"
            cy="170"
            rx="55"
            ry="8"
            className="fill-foreground/10"
          />

          {/* Blob body - organic mustard yellow shape */}
          <path
            d="M25 100 
               C20 55, 50 20, 110 25 
               C170 30, 195 60, 190 105 
               C185 145, 155 165, 110 160 
               C60 155, 30 140, 25 100Z"
            fill="#E8A838"
          />

          {/* Glasses - half-frame style with straight top bar */}
          {/* Main top bar extending beyond blob */}
          <path
            d="M15 72 L205 72"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-foreground"
          />
          
          {/* Left lens - trapezoid half-frame */}
          <path
            d="M45 72 L45 95 C45 105, 55 110, 75 110 C95 110, 105 105, 105 95 L105 72"
            strokeWidth="4"
            fill="none"
            className="stroke-foreground"
          />
          
          {/* Right lens - trapezoid half-frame */}
          <path
            d="M115 72 L115 95 C115 105, 125 110, 145 110 C165 110, 175 105, 175 95 L175 72"
            strokeWidth="4"
            fill="none"
            className="stroke-foreground"
          />

          {/* Eyes (inside glasses) */}
          <motion.g variants={eyeVariants} animate={getAnimationVariant()}>
            {/* Left eye - small square-ish */}
            <rect x="70" y="82" width="10" height="12" rx="2" className="fill-foreground" />
            {/* Right eye - small square-ish */}
            <rect x="140" y="82" width="10" height="12" rx="2" className="fill-foreground" />
          </motion.g>

          {/* South Park style mouth - only visible when speaking */}
          <motion.g
            variants={mouthVariants}
            animate={getAnimationVariant()}
            style={{ originY: 0, transformOrigin: "110px 130px" }}
          >
            {/* Mouth opening - simple oval that flaps */}
            <ellipse
              cx="110"
              cy="135"
              rx="18"
              ry="12"
              className="fill-foreground"
            />
            {/* Inside of mouth */}
            <ellipse
              cx="110"
              cy="137"
              rx="12"
              ry="7"
              className="fill-destructive"
            />
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
