import { motion } from "framer-motion";
import { Briefcase, ArrowLeft, MessageSquare, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobMatchCard } from "@/components/JobMatchCard";
import type { JobRecommendation } from "@/hooks/useJobRecommendations";
import type { Skill } from "@/hooks/useSkillScores";
import { toast } from "sonner";

interface JobCardsPanelProps {
  jobs: JobRecommendation[];
  skills: Skill[];
  onBack: () => void;
  onShowChat: () => void;
}

export const JobCardsPanel = ({ jobs, skills, onBack, onShowChat }: JobCardsPanelProps) => {
  const handleBuildCV = () => {
    toast.success("CV Builder coming soon!", {
      description: "We're working on this feature to help you create a standout CV.",
    });
  };

  const handleApplyDirect = () => {
    toast.success("Direct applications coming soon!", {
      description: "Soon you'll be able to apply to jobs directly from here.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-5xl mx-auto flex flex-col h-[700px] bg-card rounded-3xl border border-border shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-foreground">Top Job Matches</h2>
            <p className="text-sm text-muted-foreground">
              Based on your skills assessment • {jobs.length} matches
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onShowChat}
          className="rounded-full gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Back to Chat
        </Button>
      </div>

      {/* Job Cards Grid */}
      <ScrollArea className="flex-1 p-4">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobs.map((job, index) => (
              <motion.div
                key={`${job.title}-${job.company}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <JobMatchCard
                  job={job}
                  userSkills={skills}
                  matchScore={job.matchScore}
                  matchedSkills={job.matchedSkills}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Briefcase className="w-12 h-12 mb-4 opacity-40" />
            <p className="text-sm">Complete your skills assessment to see job recommendations</p>
          </div>
        )}
      </ScrollArea>

      {/* Next Steps Footer */}
      {jobs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t border-border bg-muted/30"
        >
          <div className="text-center mb-3">
            <h3 className="font-semibold text-foreground">What would you like to do next?</h3>
            <p className="text-sm text-muted-foreground">Choose how you'd like to proceed with your job search</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleBuildCV}
              className="gap-2 rounded-full px-6"
              size="lg"
            >
              <FileText className="w-5 h-5" />
              Help me build my CV
            </Button>
            <Button
              onClick={handleApplyDirect}
              variant="outline"
              className="gap-2 rounded-full px-6"
              size="lg"
            >
              <ExternalLink className="w-5 h-5" />
              I'll apply direct
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
