import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export type VoicePersona = "alloy" | "ash" | "ballad" | "coral" | "echo" | "sage" | "shimmer" | "verse";

interface VoicePersonaSelectorProps {
  selectedPersona: VoicePersona;
  onSelectPersona: (persona: VoicePersona) => void;
  disabled?: boolean;
}

const PERSONAS: { id: VoicePersona; name: string; description: string }[] = [
  { id: "alloy", name: "Alloy", description: "Neutral & balanced" },
  { id: "ash", name: "Ash", description: "Warm & conversational" },
  { id: "ballad", name: "Ballad", description: "Soft & thoughtful" },
  { id: "coral", name: "Coral", description: "Clear & professional" },
  { id: "echo", name: "Echo", description: "Calm & measured" },
  { id: "sage", name: "Sage", description: "Wise & reassuring" },
  { id: "shimmer", name: "Shimmer", description: "Bright & energetic" },
  { id: "verse", name: "Verse", description: "Expressive & dynamic" },
];

export const VoicePersonaSelector = ({
  selectedPersona,
  onSelectPersona,
  disabled = false,
}: VoicePersonaSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border p-4 shadow-md max-w-md w-full"
    >
      <h3 className="text-sm font-bold text-foreground mb-3">Voice Persona</h3>
      <div className="grid grid-cols-2 gap-2">
        {PERSONAS.map((persona) => (
          <motion.div
            key={persona.id}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`
              flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors
              ${selectedPersona === persona.id 
                ? "bg-primary/20 border-2 border-primary" 
                : "bg-muted/50 border-2 border-transparent hover:bg-muted"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={() => !disabled && onSelectPersona(persona.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{persona.name}</p>
              <p className="text-xs text-muted-foreground truncate">{persona.description}</p>
            </div>
            <Switch
              checked={selectedPersona === persona.id}
              onCheckedChange={() => !disabled && onSelectPersona(persona.id)}
              disabled={disabled}
              className="ml-2"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
