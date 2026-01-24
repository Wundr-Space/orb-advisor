import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings } from "lucide-react";
import { VoicePersonaSelector, type VoicePersona } from "./VoicePersonaSelector";

interface VoiceSettingsPanelProps {
  isVisible: boolean;
  selectedPersona: VoicePersona;
  onSelectPersona: (persona: VoicePersona) => void;
  disabled?: boolean;
}

export function VoiceSettingsPanel({
  isVisible,
  selectedPersona,
  onSelectPersona,
  disabled,
}: VoiceSettingsPanelProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-[320px] bg-card border-l border-border z-40 flex flex-col shadow-xl rounded-l-3xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-accent/30">
                <Settings className="w-4 h-4 text-accent-foreground" />
              </div>
              <h2 className="font-bold text-foreground">Voice Settings</h2>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Voice Persona
                </h3>
                <VoicePersonaSelector
                  selectedPersona={selectedPersona}
                  onSelectPersona={onSelectPersona}
                  disabled={disabled}
                />
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
