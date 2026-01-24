import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skill } from "@/hooks/useSkillScores";
import { Bug, TrendingUp } from "lucide-react";

interface SkillsDebugPanelProps {
  skills: Skill[];
  isVisible: boolean;
}

function ScoreIndicator({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className={`w-2.5 h-2.5 rounded-full ${
            i <= score
              ? "bg-accent"
              : "bg-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

export function SkillsDebugPanel({ skills, isVisible }: SkillsDebugPanelProps) {
  const assessedCount = skills.filter((s) => s.score !== null).length;
  const averageScore =
    assessedCount > 0
      ? skills
          .filter((s) => s.score !== null)
          .reduce((sum, s) => sum + (s.score ?? 0), 0) / assessedCount
      : 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-0 h-full w-[400px] bg-card border-r border-border z-50 flex flex-col shadow-xl rounded-r-3xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-full bg-accent/30">
                <Bug className="w-4 h-4 text-accent-foreground" />
              </div>
              <h2 className="font-bold text-foreground">Skills Debug</h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 rounded-xl p-3">
                <div className="text-xs text-muted-foreground font-medium">Assessed</div>
                <div className="text-xl font-bold text-foreground">
                  {assessedCount}/{skills.length}
                </div>
              </div>
              <div className="bg-secondary/30 rounded-xl p-3">
                <div className="text-xs text-muted-foreground font-medium">Avg Score</div>
                <div className="text-xl font-bold text-foreground">
                  {averageScore > 0 ? averageScore.toFixed(1) : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Skills List */}
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {skills.map((skill) => (
                <motion.div
                  key={skill.rank}
                  layout
                  className={`p-3 rounded-xl transition-colors ${
                    skill.score !== null
                      ? "bg-accent/20 border border-accent/30"
                      : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                          #{skill.rank}
                        </span>
                        <span
                          className={`text-sm font-medium truncate ${
                            skill.score !== null
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                          title={skill.name}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <TrendingUp className="w-3 h-3 text-secondary" />
                        <span className="text-xs text-muted-foreground">
                          {skill.employerDemand}% demand
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <ScoreIndicator score={skill.score} />
                      {skill.score !== null && (
                        <span className="text-xs font-bold text-accent-foreground">
                          {skill.score}/5
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Legend */}
          <div className="p-3 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span>Assessed skill</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                <span>Not yet assessed</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
