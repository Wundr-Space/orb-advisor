import { motion } from "framer-motion";
import { MapPin, Briefcase, ExternalLink, ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { JobRecommendation } from "@/hooks/useJobRecommendations";

interface JobCardsPanelProps {
  jobs: JobRecommendation[];
  onBack: () => void;
  onShowChat: () => void;
}

export const JobCardsPanel = ({ jobs, onBack, onShowChat }: JobCardsPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-4xl mx-auto flex flex-col h-[600px] bg-card rounded-3xl border border-border shadow-lg"
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
            <h2 className="text-lg font-bold text-foreground">Recommended Jobs</h2>
            <p className="text-sm text-muted-foreground">
              Based on your skills assessment
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

      {/* Job Cards */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job, index) => (
            <motion.div
              key={`${job.title}-${job.company}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden"
            >
              {/* Angular card shape using clip-path */}
              <div
                className="bg-secondary/30 border border-border p-5 hover:bg-secondary/50 transition-colors"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
                }}
              >
                {/* Job Title */}
                <h3 className="text-lg font-bold text-foreground mb-1 pr-6">
                  {job.title}
                </h3>

                {/* Company */}
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{job.company}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>

                {/* Salary if available */}
                {job.salary && (
                  <div className="mb-3">
                    <span className="text-lg font-bold text-primary">
                      £{job.salary.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground"> / year</span>
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs bg-accent/30 text-accent-foreground border-0"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-muted text-muted-foreground border-0"
                    >
                      +{job.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Match Reason */}
                {job.matchReason && (
                  <p className="text-sm text-muted-foreground italic mb-4 line-clamp-2">
                    "{job.matchReason}"
                  </p>
                )}

                {/* Apply Button */}
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View Job
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">
              Complete your skills assessment to see job recommendations
            </p>
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
};
