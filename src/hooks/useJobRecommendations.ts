import { useMemo } from "react";
import { JOBS_DATA, type Job } from "@/data/jobsData";
import { Skill } from "@/hooks/useSkillScores";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface JobRecommendation extends Job {
  matchReason?: string;
  matchedSkills: string[];
  matchScore: number;
}

/**
 * Detects when the AI has provided job recommendations and returns matching jobs
 * based on the user's assessed skills (score >= 3).
 */
export const useJobRecommendations = (
  messages: Message[],
  skills: Skill[]
): JobRecommendation[] => {
  return useMemo(() => {
    // Check if the last assistant message contains job recommendation indicators
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");

    if (!lastAssistantMessage) return [];

    const content = lastAssistantMessage.content.toLowerCase();

    // Check for job recommendation signals in the message
    const hasJobRecommendationSignal =
      content.includes("recommended jobs") ||
      content.includes("job recommendations") ||
      content.includes("jobs that align") ||
      content.includes("roles that match") ||
      content.includes("positions that suit") ||
      content.includes("career opportunities") ||
      content.includes("jobs in south wales");

    if (!hasJobRecommendationSignal) return [];

    // Filter to strong skills (score >= 3)
    const strongSkills = skills.filter(
      (skill) => skill.score !== null && skill.score >= 3
    );

    if (strongSkills.length === 0) return [];

    // Create a map for quick skill score lookup
    const skillScoreMap = new Map<string, number>();
    strongSkills.forEach((skill) => {
      if (skill.score !== null) {
        skillScoreMap.set(skill.name.toLowerCase(), skill.score);
      }
    });

    // Score each job based on skill matches
    const scoredJobs: JobRecommendation[] = JOBS_DATA.map((job) => {
      const matchedSkills: string[] = [];
      let totalProficiency = 0;

      job.skills.forEach((jobSkill) => {
        const userScore = skillScoreMap.get(jobSkill.toLowerCase());
        if (userScore !== undefined) {
          matchedSkills.push(jobSkill);
          totalProficiency += userScore;
        }
      });

      // Calculate true percentage: (coverage × avg proficiency) as a percentage
      // coverage = matchedSkills / totalJobSkills (0-1)
      // avgProficiency = totalProficiency / matchedSkills / 5 (0-1, normalized to max score of 5)
      const coverage = job.skills.length > 0 ? matchedSkills.length / job.skills.length : 0;
      const avgProficiency = matchedSkills.length > 0 ? totalProficiency / matchedSkills.length / 5 : 0;
      const matchScore = Math.round(coverage * avgProficiency * 100);

      return {
        ...job,
        matchedSkills,
        matchScore,
        matchReason:
          matchedSkills.length > 0
            ? `Matches your ${matchedSkills.join(", ")} skills`
            : undefined,
      };
    });

    // Filter to jobs with at least one match, sort by score, return top 5
    return scoredJobs
      .filter((job) => job.matchedSkills.length > 0)
      .sort((a, b) => {
        // First by number of matched skills
        if (b.matchedSkills.length !== a.matchedSkills.length) {
          return b.matchedSkills.length - a.matchedSkills.length;
        }
        // Then by total match score
        return b.matchScore - a.matchScore;
      })
      .slice(0, 5);
  }, [messages, skills]);
};
