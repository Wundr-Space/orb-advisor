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
          {/* Shadow - angular */}
          <polygon
            points="55,168 165,168 155,175 65,175"
            className="fill-foreground/10"
          />

          {/* Body - angular polygonal shape */}
          <polygon
            points="110,20 170,35 195,70 190,120 165,155 110,165 55,155 30,120 25,70 50,35"
            fill="#E8A838"
          />
          
          {/* Inner facet highlights */}
          <polygon
            points="110,25 160,38 180,68 110,75 40,68 60,38"
            fill="#F0B848"
            opacity="0.6"
          />

          {/* Glasses - angular frame style */}
          {/* Main top bar */}
          <path
            d="M15 72 L205 72"
            strokeWidth="5"
            strokeLinecap="square"
            className="stroke-foreground"
          />
          
          {/* Left lens - hexagonal half-frame */}
          <path
            d="M45 72 L45 90 L55 105 L95 105 L105 90 L105 72"
            strokeWidth="4"
            fill="none"
            strokeLinejoin="miter"
            className="stroke-foreground"
          />
          
          {/* Right lens - hexagonal half-frame */}
          <path
            d="M115 72 L115 90 L125 105 L165 105 L175 90 L175 72"
            strokeWidth="4"
            fill="none"
            strokeLinejoin="miter"
            className="stroke-foreground"
          />

          {/* Eyes (inside glasses) - diamond shaped */}
          <motion.g variants={eyeVariants} animate={getAnimationVariant()}>
            {/* Left eye - diamond */}
            <polygon points="75,82 80,88 75,94 70,88" className="fill-foreground" />
            {/* Right eye - diamond */}
            <polygon points="145,82 150,88 145,94 140,88" className="fill-foreground" />
          </motion.g>

          {/* Angular mouth - only visible when speaking */}
          <motion.g
            variants={mouthVariants}
            animate={getAnimationVariant()}
            style={{ originY: 0, transformOrigin: "110px 130px" }}
          >
            {/* Mouth opening - hexagonal shape */}
            <polygon
              points="92,128 128,128 135,138 128,148 92,148 85,138"
              className="fill-foreground"
            />
            {/* Inside of mouth - smaller hexagon */}
            <polygon
              points="97,132 123,132 128,140 123,146 97,146 92,140"
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
