import { useMemo } from "react";
import { applicantPersonas, type ApplicantPersona } from "@/data/applicantPersonas";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ApplicantRecommendation extends ApplicantPersona {
  matchScore: number;
  matchedSkills: string[];
}

// Skills keywords to detect in conversation
const SKILL_KEYWORDS: Record<string, string[]> = {
  "Analytical thinking": ["analytical", "analysis", "problem-solving", "critical thinking"],
  "Resilience, flexibility and agility": ["resilient", "flexible", "agile", "adaptable", "adapt"],
  "Leadership and social influence": ["leadership", "leader", "manage team", "influence"],
  "Creative thinking": ["creative", "creativity", "innovative", "innovation"],
  "Motivation and self-awareness": ["motivated", "self-starter", "driven"],
  "Technological literacy": ["tech-savvy", "technology", "digital", "computer literate"],
  "Empathy and active listening": ["empathy", "empathetic", "listening", "communication"],
  "Curiosity and lifelong learning": ["curious", "learning", "eager to learn", "continuous learning"],
  "Talent management": ["talent management", "team building", "people management"],
  "Service orientation and customer service": ["customer service", "client-facing", "service-oriented"],
  "AI and big data": ["AI", "machine learning", "data science", "big data", "ML"],
  "Systems thinking": ["systems thinking", "holistic", "process improvement"],
  "Resource management and operations": ["operations", "resource management", "logistics"],
  "Dependability and attention to detail": ["detail-oriented", "reliable", "dependable", "accurate"],
  "Quality control": ["quality control", "QA", "quality assurance", "testing"],
  "Teaching and mentoring": ["teaching", "mentoring", "coaching", "training"],
  "Networks and cybersecurity": ["networking", "cybersecurity", "security", "infrastructure"],
  "Design and user experience": ["UX", "UI", "design", "user experience"],
  "Multi-lingualism": ["bilingual", "multilingual", "languages", "Welsh"],
  "Marketing and media": ["marketing", "social media", "content", "digital marketing"],
  "Reading, writing and mathematics": ["writing", "documentation", "numeracy"],
  "Environmental stewardship": ["sustainability", "environmental", "green"],
  "Programming": ["programming", "coding", "development", "software"],
  "Manual dexterity, endurance and precision": ["hands-on", "manual", "precision"],
  "Global citizenship": ["global", "international", "cross-cultural"],
  "Sensory-processing abilities": ["sensory", "perception"],
};

// Check if conversation contains candidate recommendation signals
const hasRecommendationSignal = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  const signals = [
    "candidate profile",
    "ideal candidate",
    "recommend candidate",
    "candidate recommendations",
    "matching candidates",
    "candidates who match",
    "here are some candidates",
    "based on your requirements",
    "profile summary",
    "skills profile",
  ];
  return signals.some((signal) => lowerContent.includes(signal));
};

// Extract required skills from conversation
const extractRequiredSkills = (messages: Message[]): string[] => {
  const skills = new Set<string>();
  
  // Look through all messages for skill mentions
  messages.forEach((message) => {
    const content = message.content.toLowerCase();
    
    Object.entries(SKILL_KEYWORDS).forEach(([skill, keywords]) => {
      if (keywords.some((keyword) => content.includes(keyword.toLowerCase()))) {
        skills.add(skill);
      }
    });
  });

  return Array.from(skills);
};

export const useApplicantRecommendations = (messages: Message[]): ApplicantRecommendation[] => {
  return useMemo(() => {
    // Only show recommendations when the AI has signaled it
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");
    
    if (!lastAssistantMessage || !hasRecommendationSignal(lastAssistantMessage.content)) {
      return [];
    }

    // Extract required skills from conversation
    const requiredSkills = extractRequiredSkills(messages);

    if (requiredSkills.length === 0) {
      return [];
    }

    // Calculate match scores for each applicant
    const scoredApplicants: ApplicantRecommendation[] = applicantPersonas.map((applicant) => {
      const matchedSkills: string[] = [];
      let totalScore = 0;

      requiredSkills.forEach((skill) => {
        if (applicant.skills[skill]) {
          matchedSkills.push(skill);
          totalScore += applicant.skills[skill];
        }
      });

      // Calculate match percentage
      const coverage = matchedSkills.length / requiredSkills.length;
      const avgProficiency = matchedSkills.length > 0 
        ? (totalScore / matchedSkills.length) / 5 
        : 0;
      const matchScore = Math.round(coverage * 60 + avgProficiency * 40);

      return {
        ...applicant,
        matchScore,
        matchedSkills,
      };
    });

    // Filter and sort
    return scoredApplicants
      .filter((a) => a.matchedSkills.length > 0)
      .sort((a, b) => {
        // First by number of matched skills, then by match score
        if (b.matchedSkills.length !== a.matchedSkills.length) {
          return b.matchedSkills.length - a.matchedSkills.length;
        }
        return b.matchScore - a.matchScore;
      })
      .slice(0, 8);
  }, [messages]);
};
