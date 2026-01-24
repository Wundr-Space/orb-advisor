import { useMemo } from "react";

export interface Skill {
  rank: number;
  name: string;
  employerDemand: number;
  score: number | null;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Skills data from skills.csv
const SKILLS_DATA: Omit<Skill, "score">[] = [
  { rank: 1, name: "Analytical thinking", employerDemand: 69 },
  { rank: 2, name: "Resilience, flexibility and agility", employerDemand: 67 },
  { rank: 3, name: "Leadership and social influence", employerDemand: 61 },
  { rank: 4, name: "Creative thinking", employerDemand: 57 },
  { rank: 5, name: "Motivation and self-awareness", employerDemand: 52 },
  { rank: 6, name: "Technological literacy", employerDemand: 51 },
  { rank: 7, name: "Empathy and active listening", employerDemand: 50 },
  { rank: 8, name: "Curiosity and lifelong learning", employerDemand: 50 },
  { rank: 9, name: "Talent management", employerDemand: 47 },
  { rank: 10, name: "Service orientation and customer service", employerDemand: 47 },
  { rank: 11, name: "AI and big data", employerDemand: 45 },
  { rank: 12, name: "Systems thinking", employerDemand: 42 },
  { rank: 13, name: "Resource management and operations", employerDemand: 41 },
  { rank: 14, name: "Dependability and attention to detail", employerDemand: 37 },
  { rank: 15, name: "Quality control", employerDemand: 35 },
  { rank: 16, name: "Teaching and mentoring", employerDemand: 26 },
  { rank: 17, name: "Networks and cybersecurity", employerDemand: 25 },
  { rank: 18, name: "Design and user experience", employerDemand: 25 },
  { rank: 19, name: "Multi-lingualism", employerDemand: 23 },
  { rank: 20, name: "Marketing and media", employerDemand: 21 },
  { rank: 21, name: "Reading, writing and mathematics", employerDemand: 21 },
  { rank: 22, name: "Environmental stewardship", employerDemand: 20 },
  { rank: 23, name: "Programming", employerDemand: 17 },
  { rank: 24, name: "Manual dexterity, endurance and precision", employerDemand: 14 },
  { rank: 25, name: "Global citizenship", employerDemand: 13 },
  { rank: 26, name: "Sensory-processing abilities", employerDemand: 6 },
];

// Create regex-safe version of skill name
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Parse messages to extract skill scores
function parseSkillScores(messages: Message[]): Map<string, number> {
  const scores = new Map<string, number>();

  // Only parse assistant messages
  const assistantMessages = messages
    .filter((m) => m.role === "assistant")
    .map((m) => m.content)
    .join("\n");

  for (const skill of SKILLS_DATA) {
    const escapedName = escapeRegex(skill.name);

    // Pattern variations to match:
    // "Analytical thinking: 4/5"
    // "Analytical thinking - 4/5"
    // "**Analytical thinking**: 4/5"
    // "Analytical thinking (4/5)"
    // "Analytical thinking: 4 out of 5"
    const patterns = [
      new RegExp(`\\*{0,2}${escapedName}\\*{0,2}[:\\s-]+([1-5])\\s*\\/\\s*5`, "gi"),
      new RegExp(`\\*{0,2}${escapedName}\\*{0,2}\\s*\\(([1-5])\\s*\\/\\s*5\\)`, "gi"),
      new RegExp(`\\*{0,2}${escapedName}\\*{0,2}[:\\s-]+([1-5])\\s+out\\s+of\\s+5`, "gi"),
      new RegExp(`${escapedName}[^\\d]*rated\\s*([1-5])\\s*\\/\\s*5`, "gi"),
    ];

    for (const pattern of patterns) {
      const matches = [...assistantMessages.matchAll(pattern)];
      if (matches.length > 0) {
        // Take the last match (most recent score)
        const lastMatch = matches[matches.length - 1];
        const score = parseInt(lastMatch[1], 10);
        if (score >= 1 && score <= 5) {
          scores.set(skill.name, score);
          break;
        }
      }
    }
  }

  return scores;
}

export function useSkillScores(messages: Message[]): Skill[] {
  return useMemo(() => {
    const scoreMap = parseSkillScores(messages);

    return SKILLS_DATA.map((skill) => ({
      ...skill,
      score: scoreMap.get(skill.name) ?? null,
    }));
  }, [messages]);
}
