import { useMemo } from 'react';
import { MapPin, Calendar, User } from 'lucide-react';
import { ProfileBlobChart, type SkillMatch } from './ProfileBlobChart';
import type { ApplicantRecommendation } from '@/hooks/useApplicantRecommendations';

interface ApplicantMatchCardProps {
  applicant: ApplicantRecommendation;
}

const categoryColors: Record<string, string[]> = {
  cognitive: ['#FF6B6B', '#FF8E72', '#FFA07A', '#FFB347'],
  interpersonal: ['#4ECDC4', '#45B7AA', '#3DA599', '#359388'],
  technical: ['#9B59B6', '#8E44AD', '#7D3C98', '#6C3483'],
  operational: ['#3498DB', '#2E86C1', '#2874A6', '#21618C'],
  creative: ['#F39C12', '#E67E22', '#D68910', '#B9770E'],
  default: ['#95A5A6', '#7F8C8D', '#6B7B7C', '#5D6D6D'],
};

const getCategoryForSkill = (skillName: string): string => {
  const cognitive = ['Analytical thinking', 'Systems thinking', 'Creative thinking', 'Curiosity and lifelong learning'];
  const interpersonal = ['Leadership and social influence', 'Empathy and active listening', 'Service orientation and customer service', 'Teaching and mentoring', 'Talent management'];
  const technical = ['Technological literacy', 'AI and big data', 'Networks and cybersecurity', 'Programming', 'Design and user experience'];
  const operational = ['Resource management and operations', 'Quality control', 'Dependability and attention to detail'];
  const creative = ['Creative thinking', 'Marketing and media'];
  
  if (cognitive.includes(skillName)) return 'cognitive';
  if (interpersonal.includes(skillName)) return 'interpersonal';
  if (technical.includes(skillName)) return 'technical';
  if (operational.includes(skillName)) return 'operational';
  if (creative.includes(skillName)) return 'creative';
  return 'default';
};

const getSkillColor = (skillName: string, index: number): string => {
  const category = getCategoryForSkill(skillName);
  const colors = categoryColors[category] || categoryColors.default;
  return colors[index % colors.length];
};

const formatAvailability = (availability: string): string => {
  const map: Record<string, string> = {
    immediate: "Available now",
    "2_weeks": "2 weeks notice",
    "1_month": "1 month notice",
    negotiable: "Negotiable",
  };
  return map[availability] || availability;
};

export function ApplicantMatchCard({ applicant }: ApplicantMatchCardProps) {
  const skillMatches: SkillMatch[] = useMemo(() => {
    return Object.entries(applicant.skills)
      .map(([skillName, score], index) => {
        const category = getCategoryForSkill(skillName);
        const isMatched = applicant.matchedSkills.includes(skillName);
        return {
          skillId: skillName,
          skillName,
          userLevel: score * 20, // Convert 1-5 to 0-100
          matchScore: isMatched ? score * 20 : 0,
          color: getSkillColor(skillName, index),
          category,
          isMatched,
        };
      })
      .sort((a, b) => {
        if (a.isMatched !== b.isMatched) return a.isMatched ? -1 : 1;
        return b.userLevel - a.userLevel;
      })
      .slice(0, 8);
  }, [applicant]);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:border-primary/30 flex flex-col group h-full">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-1">
            {applicant.name}
          </h3>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
            {applicant.matchScore}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-medium truncate">{applicant.currentRole}</p>
      </div>

      {/* Blob Chart */}
      <div 
        className="rounded-xl overflow-hidden bg-muted/30 relative"
        style={{ aspectRatio: '4/3', minHeight: 120 }}
      >
        <ProfileBlobChart skillMatches={skillMatches} matchPercentage={applicant.matchScore} />
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{applicant.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <User className="w-3 h-3 shrink-0" />
          <span>{applicant.yearsExperience} years experience</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 shrink-0" />
          <span>{formatAvailability(applicant.availability)}</span>
        </div>
      </div>
    </div>
  );
}
