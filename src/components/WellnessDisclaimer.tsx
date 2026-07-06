import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WellnessDisclaimerProps {
  className?: string;
  compact?: boolean;
}

export function WellnessDisclaimer({ className, compact }: WellnessDisclaimerProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-xl border border-secondary/40 bg-secondary/10 px-3 py-2.5 text-foreground",
        className
      )}
    >
      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-secondary" strokeWidth={1.75} />
      <p className={cn("text-xs leading-snug", compact ? "line-clamp-2" : "")}>
        This is general wellness guidance, not medical advice. Please consult a doctor for
        any medical conditions.
      </p>
    </div>
  );
}
