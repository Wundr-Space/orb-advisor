import { useState, useCallback, useRef } from "react";
import { DemoPersona, getRandomPersona } from "@/data/demoPersonas";
import { toast } from "sonner";

type QuestionType = 
  | "greeting"
  | "analyticalThinking"
  | "resilience"
  | "leadership"
  | "creativeThinking"
  | "customerService"
  | "technology"
  | "learning"
  | "teamwork"
  | "problemSolving"
  | "communication"
  | "general";

interface UseDemoModeReturn {
  isDemoMode: boolean;
  currentPersona: DemoPersona | null;
  startDemo: () => void;
  stopDemo: () => void;
  generateResponse: (aiMessage: string) => string | null;
}

const detectQuestionType = (message: string): QuestionType => {
  const lower = message.toLowerCase();
  
  // Greeting/introduction detection
  if (
    (lower.includes("tell me about") && lower.includes("yourself")) ||
    (lower.includes("what") && (lower.includes("do you do") || lower.includes("your role") || lower.includes("current"))) ||
    lower.includes("introduce yourself") ||
    lower.includes("background") ||
    (lower.includes("what") && lower.includes("focus")) ||
    (lower.includes("how can i") && lower.includes("help"))
  ) {
    return "greeting";
  }

  // Analytical thinking
  if (
    lower.includes("analyze") || 
    lower.includes("analysis") ||
    lower.includes("complex information") || 
    lower.includes("data") ||
    lower.includes("decision") ||
    lower.includes("evaluate") ||
    lower.includes("assess")
  ) {
    return "analyticalThinking";
  }

  // Resilience / adaptability
  if (
    lower.includes("adapt") || 
    lower.includes("unexpected") || 
    lower.includes("change") ||
    lower.includes("challenge") ||
    lower.includes("difficult situation") ||
    lower.includes("obstacle") ||
    lower.includes("setback") ||
    lower.includes("pressure") ||
    lower.includes("stress")
  ) {
    return "resilience";
  }

  // Leadership
  if (
    lower.includes("lead") || 
    lower.includes("leadership") ||
    lower.includes("influence") || 
    lower.includes("manage") ||
    lower.includes("supervise") ||
    lower.includes("mentor") ||
    lower.includes("guide others")
  ) {
    return "leadership";
  }

  // Creative thinking
  if (
    lower.includes("creative") || 
    lower.includes("creativity") ||
    lower.includes("new idea") || 
    lower.includes("innovative") ||
    lower.includes("innovation") ||
    lower.includes("think outside") ||
    lower.includes("original") ||
    lower.includes("design")
  ) {
    return "creativeThinking";
  }

  // Customer service
  if (
    lower.includes("customer") || 
    lower.includes("client") || 
    lower.includes("service") ||
    lower.includes("stakeholder") ||
    lower.includes("user") ||
    lower.includes("support")
  ) {
    return "customerService";
  }

  // Technology
  if (
    lower.includes("technology") || 
    lower.includes("software") || 
    lower.includes("digital") ||
    lower.includes("computer") ||
    lower.includes("technical") ||
    lower.includes("tools") ||
    lower.includes("systems")
  ) {
    return "technology";
  }

  // Learning
  if (
    lower.includes("learn") || 
    lower.includes("new skill") || 
    lower.includes("training") ||
    lower.includes("develop") ||
    lower.includes("grow") ||
    lower.includes("improve")
  ) {
    return "learning";
  }

  // Teamwork
  if (
    lower.includes("team") || 
    lower.includes("collaborate") || 
    lower.includes("cooperation") ||
    lower.includes("work with others") ||
    lower.includes("group") ||
    lower.includes("colleague")
  ) {
    return "teamwork";
  }

  // Problem solving
  if (
    lower.includes("problem") || 
    lower.includes("solve") || 
    lower.includes("solution") ||
    lower.includes("fix") ||
    lower.includes("resolve") ||
    lower.includes("issue")
  ) {
    return "problemSolving";
  }

  // Communication
  if (
    lower.includes("communicat") || 
    lower.includes("explain") || 
    lower.includes("present") ||
    lower.includes("write") ||
    lower.includes("speak") ||
    lower.includes("convey")
  ) {
    return "communication";
  }

  return "general";
};

export const useDemoMode = (): UseDemoModeReturn => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<DemoPersona | null>(null);
  const usedGeneralResponses = useRef<Set<number>>(new Set());
  const questionCount = useRef(0);

  const startDemo = useCallback(() => {
    const persona = getRandomPersona();
    setCurrentPersona(persona);
    setIsDemoMode(true);
    usedGeneralResponses.current.clear();
    questionCount.current = 0;
    toast.success(`Demo started: ${persona.currentRole} (${persona.yearsExperience} years)`, {
      description: `Goal: ${persona.careerGoal}`,
      duration: 4000,
    });
  }, []);

  const stopDemo = useCallback(() => {
    setIsDemoMode(false);
    toast.info("Demo mode stopped");
  }, []);

  const generateResponse = useCallback((aiMessage: string): string | null => {
    if (!currentPersona || !isDemoMode) return null;

    // Check if this looks like a skills summary or conclusion
    const lower = aiMessage.toLowerCase();
    if (
      lower.includes("skills snapshot") ||
      lower.includes("summary of") ||
      lower.includes("based on our conversation") ||
      lower.includes("your top skills") ||
      lower.includes("here's what i've learned")
    ) {
      // Stop demo after skills summary
      setTimeout(() => {
        setIsDemoMode(false);
        toast.success("Demo complete! Skills assessment finished.", {
          duration: 3000,
        });
      }, 500);
      return null;
    }

    // Detect question type
    const questionType = detectQuestionType(aiMessage);
    questionCount.current++;

    // Get appropriate response
    if (questionType === "general") {
      const generalResponses = currentPersona.commonResponses.general;
      // Find an unused general response
      let availableIndices = generalResponses
        .map((_, i) => i)
        .filter(i => !usedGeneralResponses.current.has(i));
      
      if (availableIndices.length === 0) {
        // Reset if all used
        usedGeneralResponses.current.clear();
        availableIndices = generalResponses.map((_, i) => i);
      }

      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      usedGeneralResponses.current.add(randomIndex);
      return generalResponses[randomIndex];
    }

    return currentPersona.commonResponses[questionType] || currentPersona.commonResponses.general[0];
  }, [currentPersona, isDemoMode]);

  return {
    isDemoMode,
    currentPersona,
    startDemo,
    stopDemo,
    generateResponse,
  };
};
