import { useMemo } from "react";
import { JOBS_DATA, type Job } from "@/data/jobsData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface JobRecommendation extends Job {
  matchReason?: string;
}

export const useJobRecommendations = (messages: Message[]): JobRecommendation[] => {
  return useMemo(() => {
    // Look for job recommendations in the last assistant message
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");

    if (!lastAssistantMessage) return [];

    const content = lastAssistantMessage.content;

    // Check if the message contains job recommendations
    // Look for patterns like job titles from our data
    const recommendedJobs: JobRecommendation[] = [];

    for (const job of JOBS_DATA) {
      // Match job title in the message (case-insensitive)
      const titleRegex = new RegExp(`\\b${escapeRegex(job.title)}\\b`, "i");
      if (titleRegex.test(content)) {
        // Try to extract match reason - look for text after the job title
        const matchReasonRegex = new RegExp(
          `${escapeRegex(job.title)}[^.]*\\.?\\s*([^.]+\\.)?`,
          "i"
        );
        const match = content.match(matchReasonRegex);
        
        recommendedJobs.push({
          ...job,
          matchReason: match?.[1]?.trim() || undefined,
        });
      }
    }

    // Limit to 5 recommendations
    return recommendedJobs.slice(0, 5);
  }, [messages]);
};

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
