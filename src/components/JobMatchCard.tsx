import { useMemo } from 'react';
import { MapPin, PoundSterling, ExternalLink } from 'lucide-react';
import { ProfileBlobChart, calculateSkillMatchesForJob } from './ProfileBlobChart';
import type { Skill } from '@/hooks/useSkillScores';
import type { Job } from '@/data/jobsData';

interface JobMatchCardProps {
  job: Job;
  userSkills: Skill[];
  matchScore: number;
  matchedSkills: string[];
}

export function JobMatchCard({ job, userSkills, matchScore, matchedSkills }: JobMatchCardProps) {
  const skillMatches = useMemo(() => {
    if (!job?.skills) return [];
    return calculateSkillMatchesForJob(userSkills, job.skills, matchedSkills);
  }, [userSkills, job?.skills, matchedSkills]);

  const formatSalary = (salary: number | null) => {
    if (!salary) return null;
    if (salary < 1000) return `£${salary}/day`;
    return `£${Math.round(salary / 1000)}k`;
  };

  if (!job) return null;

  const salaryDisplay = formatSalary(job.salary);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:border-primary/30 flex flex-col group h-full">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">
            {job.title}
          </h3>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
            {matchScore}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-medium truncate">{job.company}</p>
      </div>

      {/* Blob Chart */}
      <div 
        className="rounded-xl overflow-hidden bg-muted/30 relative"
        style={{ aspectRatio: '4/3', minHeight: 120 }}
      >
        <ProfileBlobChart skillMatches={skillMatches} matchPercentage={matchScore} />
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        {salaryDisplay && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <PoundSterling className="w-3 h-3 shrink-0" />
            <span>{salaryDisplay}</span>
          </div>
        )}
        <a 
          href={job.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View job <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
