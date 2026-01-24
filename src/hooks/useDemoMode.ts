import { useState, useCallback, useRef } from "react";
import { DemoPersona, getRandomPersona } from "@/data/demoPersonas";
import { RecruiterDemoPersona, getRandomRecruiterPersona } from "@/data/recruiterDemoPersonas";
import { toast } from "sonner";
import type { UserType } from "@/components/UserTypeSelector";

// Job seeker question types
type JobSeekerQuestionType = 
  | "askingName"
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

// Recruiter question types
type RecruiterQuestionType =
  | "askingName"
  | "roleDescription"
  | "skills"
  | "experience"
  | "salary"
  | "teamCulture"
  | "timeline"
  | "challenges"
  | "general";

interface UseDemoModeReturn {
  isDemoMode: boolean;
  currentPersona: DemoPersona | null;
  currentRecruiterPersona: RecruiterDemoPersona | null;
  startDemo: (userType: UserType) => void;
  stopDemo: () => void;
  generateResponse: (aiMessage: string) => string | null;
}

const detectJobSeekerQuestionType = (message: string): JobSeekerQuestionType => {
  const lower = message.toLowerCase();
  
  // Asking for name detection
  if (
    lower.includes("what's your name") ||
    lower.includes("what is your name") ||
    lower.includes("your name") ||
    lower.includes("who am i speaking") ||
    lower.includes("may i ask your name") ||
    lower.includes("call you")
  ) {
    return "askingName";
  }
  
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

const detectRecruiterQuestionType = (message: string): RecruiterQuestionType => {
  const lower = message.toLowerCase();
  
  // Asking for name
  if (
    lower.includes("what's your name") ||
    lower.includes("what is your name") ||
    lower.includes("your name") ||
    lower.includes("who am i speaking") ||
    lower.includes("may i ask your name") ||
    lower.includes("call you") ||
    lower.includes("introduce yourself")
  ) {
    return "askingName";
  }
  
  // Role description
  if (
    lower.includes("position") ||
    lower.includes("role") ||
    lower.includes("job") ||
    lower.includes("hiring for") ||
    lower.includes("looking to fill") ||
    lower.includes("what are you looking for") ||
    lower.includes("tell me about the")
  ) {
    return "roleDescription";
  }

  // Skills requirements
  if (
    lower.includes("skill") ||
    lower.includes("qualification") ||
    lower.includes("requirement") ||
    lower.includes("must have") ||
    lower.includes("need to know") ||
    lower.includes("looking for in a candidate") ||
    lower.includes("technical")
  ) {
    return "skills";
  }

  // Experience level
  if (
    lower.includes("experience") ||
    lower.includes("years") ||
    lower.includes("senior") ||
    lower.includes("junior") ||
    lower.includes("level") ||
    lower.includes("background")
  ) {
    return "experience";
  }

  // Salary/compensation
  if (
    lower.includes("salary") ||
    lower.includes("compensation") ||
    lower.includes("pay") ||
    lower.includes("benefit") ||
    lower.includes("package") ||
    lower.includes("offer")
  ) {
    return "salary";
  }

  // Team culture
  if (
    lower.includes("team") ||
    lower.includes("culture") ||
    lower.includes("environment") ||
    lower.includes("work with") ||
    lower.includes("colleague") ||
    lower.includes("company")
  ) {
    return "teamCulture";
  }

  // Timeline
  if (
    lower.includes("when") ||
    lower.includes("urgent") ||
    lower.includes("start date") ||
    lower.includes("timeline") ||
    lower.includes("fill this") ||
    lower.includes("soon") ||
    lower.includes("quickly")
  ) {
    return "timeline";
  }

  // Challenges
  if (
    lower.includes("challenge") ||
    lower.includes("problem") ||
    lower.includes("difficult") ||
    lower.includes("issue") ||
    lower.includes("why this role") ||
    lower.includes("reason")
  ) {
    return "challenges";
  }

  return "general";
};

export const useDemoMode = (): UseDemoModeReturn => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<DemoPersona | null>(null);
  const [currentRecruiterPersona, setCurrentRecruiterPersona] = useState<RecruiterDemoPersona | null>(null);
  const usedResponses = useRef<Set<string>>(new Set());
  const currentUserType = useRef<UserType>("jobseeker");

  const startDemo = useCallback((userType: UserType) => {
    currentUserType.current = userType;
    usedResponses.current.clear();
    
    if (userType === "recruiter") {
      const persona = getRandomRecruiterPersona();
      setCurrentRecruiterPersona(persona);
      setCurrentPersona(null);
      setIsDemoMode(true);
      toast.success(`Demo started: Hiring ${persona.job.title}`, {
        description: `Company: ${persona.company} (${persona.job.location})`,
        duration: 4000,
      });
    } else {
      const persona = getRandomPersona();
      setCurrentPersona(persona);
      setCurrentRecruiterPersona(null);
      setIsDemoMode(true);
      toast.success(`Demo started: ${persona.currentRole} (${persona.yearsExperience} years)`, {
        description: `Goal: ${persona.careerGoal}`,
        duration: 4000,
      });
    }
  }, []);

  const stopDemo = useCallback(() => {
    setIsDemoMode(false);
    toast.info("Demo mode stopped");
  }, []);

  const generateJobSeekerResponse = useCallback((aiMessage: string): string | null => {
    if (!currentPersona) return null;

    // Check if this looks like a skills summary or conclusion
    const lower = aiMessage.toLowerCase();
    if (
      lower.includes("skills snapshot") ||
      lower.includes("summary of") ||
      lower.includes("based on our conversation") ||
      lower.includes("your top skills") ||
      lower.includes("here's what i've learned")
    ) {
      setTimeout(() => {
        setIsDemoMode(false);
        toast.success("Demo complete! Skills assessment finished.", {
          duration: 3000,
        });
      }, 500);
      return null;
    }

    const questionType = detectJobSeekerQuestionType(aiMessage);
    
    // Build a pool of all available responses
    const allResponses: { type: string; response: string }[] = [];
    
    // Add the specific response for the detected question type first (priority)
    if (questionType !== "general") {
      const specificResponse = currentPersona.commonResponses[questionType];
      if (specificResponse && !usedResponses.current.has(specificResponse)) {
        allResponses.push({ type: questionType, response: specificResponse });
      }
    }
    
    // Add all general responses
    currentPersona.commonResponses.general.forEach((response, i) => {
      if (!usedResponses.current.has(response)) {
        allResponses.push({ type: `general-${i}`, response });
      }
    });
    
    // Add other unused specific responses as fallback
    const specificTypes = [
      "askingName", "greeting", "analyticalThinking", "resilience", "leadership",
      "creativeThinking", "customerService", "technology", "learning",
      "teamwork", "problemSolving", "communication"
    ] as const;
    
    specificTypes.forEach(type => {
      if (type !== questionType) {
        const response = currentPersona.commonResponses[type];
        if (response && typeof response === "string" && !usedResponses.current.has(response)) {
          allResponses.push({ type, response });
        }
      }
    });

    // If all responses used, reset and start over
    if (allResponses.length === 0) {
      usedResponses.current.clear();
      const greetingResponse = currentPersona.commonResponses.greeting;
      usedResponses.current.add(greetingResponse);
      return greetingResponse;
    }

    // Prefer the matched question type, otherwise pick randomly
    const selectedResponse = allResponses[0];
    usedResponses.current.add(selectedResponse.response);
    return selectedResponse.response;
  }, [currentPersona]);

  const generateRecruiterResponse = useCallback((aiMessage: string): string | null => {
    if (!currentRecruiterPersona) return null;

    // Check if this looks like a candidate profile or conclusion
    const lower = aiMessage.toLowerCase();
    if (
      lower.includes("ideal candidate profile") ||
      lower.includes("matching candidates") ||
      lower.includes("candidate profile") ||
      lower.includes("based on your requirements") ||
      lower.includes("here are some candidates") ||
      lower.includes("top candidates")
    ) {
      setTimeout(() => {
        setIsDemoMode(false);
        toast.success("Demo complete! Candidate matching finished.", {
          duration: 3000,
        });
      }, 500);
      return null;
    }

    const questionType = detectRecruiterQuestionType(aiMessage);
    
    // Build a pool of all available responses
    const allResponses: { type: string; response: string }[] = [];
    
    // Add the specific response for the detected question type first (priority)
    if (questionType !== "general") {
      const specificResponse = currentRecruiterPersona.commonResponses[questionType];
      if (specificResponse && !usedResponses.current.has(specificResponse)) {
        allResponses.push({ type: questionType, response: specificResponse });
      }
    }
    
    // Add all general responses
    currentRecruiterPersona.commonResponses.general.forEach((response, i) => {
      if (!usedResponses.current.has(response)) {
        allResponses.push({ type: `general-${i}`, response });
      }
    });
    
    // Add other unused specific responses as fallback
    const specificTypes = [
      "askingName", "roleDescription", "skills", "experience", 
      "salary", "teamCulture", "timeline", "challenges"
    ] as const;
    
    specificTypes.forEach(type => {
      if (type !== questionType) {
        const response = currentRecruiterPersona.commonResponses[type];
        if (response && !usedResponses.current.has(response)) {
          allResponses.push({ type, response });
        }
      }
    });

    // If all responses used, reset and start over
    if (allResponses.length === 0) {
      usedResponses.current.clear();
      const askingNameResponse = currentRecruiterPersona.commonResponses.askingName;
      usedResponses.current.add(askingNameResponse);
      return askingNameResponse;
    }

    // Prefer the matched question type, otherwise pick randomly
    const selectedResponse = allResponses[0];
    usedResponses.current.add(selectedResponse.response);
    return selectedResponse.response;
  }, [currentRecruiterPersona]);

  const generateResponse = useCallback((aiMessage: string): string | null => {
    if (!isDemoMode) return null;

    if (currentUserType.current === "recruiter") {
      return generateRecruiterResponse(aiMessage);
    } else {
      return generateJobSeekerResponse(aiMessage);
    }
  }, [isDemoMode, generateJobSeekerResponse, generateRecruiterResponse]);

  return {
    isDemoMode,
    currentPersona,
    currentRecruiterPersona,
    startDemo,
    stopDemo,
    generateResponse,
  };
};
