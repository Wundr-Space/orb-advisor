import { motion } from "framer-motion";
import { Users, ArrowLeft, MessageSquare, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApplicantMatchCard } from "@/components/ApplicantMatchCard";
import type { ApplicantRecommendation } from "@/hooks/useApplicantRecommendations";
import { toast } from "sonner";

interface ApplicantCardsPanelProps {
  applicants: ApplicantRecommendation[];
  onBack: () => void;
  onShowChat: () => void;
}

export const ApplicantCardsPanel = ({ applicants, onBack, onShowChat }: ApplicantCardsPanelProps) => {
  const handleScheduleInterviews = () => {
    toast.success("Interview scheduling coming soon!", {
      description: "We're working on this feature to help you schedule candidate interviews.",
    });
  };

  const handleSaveShortlist = () => {
    toast.success("Shortlist saved!", {
      description: "Your candidate shortlist has been saved for later review.",
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
            <h2 className="text-lg font-bold text-foreground">Top Candidate Matches</h2>
            <p className="text-sm text-muted-foreground">
              Based on your job requirements • {applicants.length} matches
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

      {/* Applicant Cards Grid */}
      <ScrollArea className="flex-1 p-4">
        {applicants.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {applicants.map((applicant, index) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <ApplicantMatchCard applicant={applicant} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Users className="w-12 h-12 mb-4 opacity-40" />
            <p className="text-sm">Tell us about the role to see candidate recommendations</p>
          </div>
        )}
      </ScrollArea>

      {/* Next Steps Footer */}
      {applicants.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t border-border bg-muted/30"
        >
          <div className="text-center mb-3">
            <h3 className="font-semibold text-foreground">What would you like to do next?</h3>
            <p className="text-sm text-muted-foreground">Choose how you'd like to proceed with these candidates</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleScheduleInterviews}
              className="gap-2 rounded-full px-6"
              size="lg"
            >
              <Calendar className="w-5 h-5" />
              Schedule Interviews
            </Button>
            <Button
              onClick={handleSaveShortlist}
              variant="outline"
              className="gap-2 rounded-full px-6"
              size="lg"
            >
              <Download className="w-5 h-5" />
              Save Shortlist
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
