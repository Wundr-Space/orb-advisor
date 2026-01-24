import { JOBS_DATA, Job } from "@/data/jobsData";

interface SkillScore {
  name: string;
  score: number | null;
}

interface JobMatch extends Job {
  matchScore: number;
  matchedSkills: string[];
}

/**
 * Find jobs that match the user's strong skills (score >= 3)
 * Jobs are ranked by:
 * 1. Number of matching skills
 * 2. Sum of skill scores for matched skills (higher = better)
 */
export function findMatchingJobs(
  userSkills: SkillScore[],
  maxResults: number = 5
): JobMatch[] {
  // Filter to strong skills (score >= 3)
  const strongSkills = userSkills.filter(
    (skill) => skill.score !== null && skill.score >= 3
  );

  if (strongSkills.length === 0) {
    return [];
  }

  // Create a map for quick skill score lookup
  const skillScoreMap = new Map<string, number>();
  strongSkills.forEach((skill) => {
    if (skill.score !== null) {
      skillScoreMap.set(skill.name.toLowerCase(), skill.score);
    }
  });

  // Score each job
  const scoredJobs: JobMatch[] = JOBS_DATA.map((job) => {
    const matchedSkills: string[] = [];
    let matchScore = 0;

    job.skills.forEach((jobSkill) => {
      const userScore = skillScoreMap.get(jobSkill.toLowerCase());
      if (userScore !== undefined) {
        matchedSkills.push(jobSkill);
        // Weight by skill score (higher scores = better match)
        matchScore += userScore;
      }
    });

    return {
      ...job,
      matchScore,
      matchedSkills,
    };
  });

  // Filter to jobs with at least one match, sort by score, return top results
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
    .slice(0, maxResults);
}

/**
 * Format job recommendations for display in chat
 */
export function formatJobRecommendations(jobs: JobMatch[]): string {
  if (jobs.length === 0) {
    return "";
  }

  let output = "\n\n**Recommended Jobs in South Wales:**\n\n";

  jobs.forEach((job, index) => {
    const salaryInfo = job.salary
      ? ` (£${job.salary.toLocaleString()}${job.salary < 1000 ? "/day" : "/year"})`
      : "";
    
    output += `${index + 1}. **${job.title}** at ${job.company}${salaryInfo}\n`;
    output += `   📍 ${job.location}\n`;
    output += `   ✅ Matches your: ${job.matchedSkills.join(", ")}\n\n`;
  });

  return output;
}

/**
 * Get a summary of job data for the AI prompt
 * This provides context about available jobs without including all details
 */
export function getJobDataSummary(): string {
  const uniqueCompanies = [...new Set(JOBS_DATA.map((j) => j.company))].length;
  const uniqueLocations = [...new Set(JOBS_DATA.map((j) => j.location))].length;
  const salaryJobs = JOBS_DATA.filter((j) => j.salary !== null);
  const avgSalary =
    salaryJobs.length > 0
      ? Math.round(
          salaryJobs.reduce((sum, j) => sum + (j.salary || 0), 0) /
            salaryJobs.length
        )
      : 0;

  return `
LOCAL JOB DATABASE (South Wales Region):
- ${JOBS_DATA.length} job listings from ${uniqueCompanies} companies
- Locations include: Cardiff, Swansea, Newport, Bridgend, and surrounding areas
- Average salary: £${avgSalary.toLocaleString()} (where disclosed)
- Industries: Tech, Healthcare, Finance, Manufacturing, Services, and more
`;
}
