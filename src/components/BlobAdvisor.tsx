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
        animate={{
          y: isSpeaking ? 0 : [0, -8, 0],
          scaleX: isSpeaking ? [1, 1.05, 0.95, 1.03, 1] : 1,
          scaleY: isSpeaking ? [1, 0.95, 1.05, 0.97, 1] : 1,
          rotate: isListening ? [0, 2, -2, 0] : 0,
        }}
        transition={{
          y: { duration: isSpeaking ? 0 : isListening ? 2 : 3, repeat: Infinity, ease: "easeInOut" },
          scaleX: isSpeaking ? { duration: 0.4, repeat: Infinity, ease: "easeInOut" } : undefined,
          scaleY: isSpeaking ? { duration: 0.4, repeat: Infinity, ease: "easeInOut" } : undefined,
          rotate: isListening ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : undefined,
        }}
      >
        <svg
          width="240"
          height="200"
          viewBox="0 0 240 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow - angular */}
          <polygon
            points="45,188 195,188 180,196 60,196"
            className="fill-foreground/10"
          />

          {/* Body - asymmetrical angular polygonal shape (scaled up) */}
          <polygon
            points="95,8 190,22 220,65 210,125 185,168 125,182 45,176 12,140 4,80 28,32"
            fill="#E8A838"
          />
          
          {/* Inner facet highlights - asymmetrical */}
          <polygon
            points="100,16 180,28 205,62 120,75 40,70 50,38"
            fill="#F0B848"
            opacity="0.6"
          />

          {/* Glasses group - centered and tilted */}
          <g transform="translate(120, 98) rotate(-3) translate(-120, -98)">
            {/* Main top bar */}
            <path
              d="M25 82 L215 82"
              strokeWidth="5"
              strokeLinecap="square"
              className="stroke-foreground"
            />
            
            {/* Left lens - hexagonal half-frame */}
            <path
              d="M55 82 L55 100 L65 115 L105 115 L115 100 L115 82"
              strokeWidth="4"
              fill="none"
              strokeLinejoin="miter"
              className="stroke-foreground"
            />
            
            {/* Right lens - hexagonal half-frame */}
            <path
              d="M125 82 L125 100 L135 115 L175 115 L185 100 L185 82"
              strokeWidth="4"
              fill="none"
              strokeLinejoin="miter"
              className="stroke-foreground"
            />

            {/* Eyes (inside glasses) - diamond shaped */}
            <motion.g variants={eyeVariants} animate={getAnimationVariant()}>
              {/* Left eye - diamond */}
              <polygon points="85,92 90,98 85,104 80,98" className="fill-foreground" />
              {/* Right eye - diamond */}
              <polygon points="155,92 160,98 155,104 150,98" className="fill-foreground" />
            </motion.g>
          </g>

          {/* Angular mouth - only visible when speaking */}
          <motion.g
            variants={mouthVariants}
            animate={getAnimationVariant()}
            style={{ originY: 0, transformOrigin: "120px 145px" }}
          >
            {/* Mouth opening - hexagonal shape */}
            <polygon
              points="102,143 138,143 145,153 138,163 102,163 95,153"
              className="fill-foreground"
            />
            {/* Inside of mouth - smaller hexagon */}
            <polygon
              points="107,147 133,147 138,155 133,161 107,161 102,155"
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
