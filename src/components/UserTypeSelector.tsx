import { motion } from "framer-motion";
import { Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export type UserType = "jobseeker" | "recruiter";

interface UserTypeSelectorProps {
  onSelectType: (type: UserType) => void;
}

export const UserTypeSelector = ({ onSelectType }: UserTypeSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="lg"
          onClick={() => onSelectType("jobseeker")}
          className="
            px-8 py-8 text-lg font-bold tracking-wide
            bg-primary hover:bg-primary/90 text-primary-foreground
            rounded-2xl shadow-lg
            transition-colors duration-200
            flex flex-col gap-3 h-auto
          "
        >
          <Briefcase className="w-8 h-8" />
          <span>I'm looking for a job</span>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="lg"
          onClick={() => onSelectType("recruiter")}
          className="
            px-8 py-8 text-lg font-bold tracking-wide
            bg-secondary hover:bg-secondary/90 text-secondary-foreground
            rounded-2xl shadow-lg
            transition-colors duration-200
            flex flex-col gap-3 h-auto
          "
        >
          <Users className="w-8 h-8" />
          <span>I'm looking to hire</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
