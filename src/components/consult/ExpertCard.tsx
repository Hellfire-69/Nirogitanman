import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/dashboard/GlassCard";
import type { Expert } from "@/lib/experts-data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface ExpertCardProps {
  expert: Expert;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <GlassCard className="group p-6 transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-5">
        <Avatar className="h-16 w-16 ring-2 ring-background shadow-md">
          <AvatarFallback className="bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)] font-medium text-lg">
            {initials(expert.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 pt-1">
          <p className="font-heading text-xl font-semibold text-foreground truncate tracking-tight">
            {expert.full_name}
          </p>
          <Badge variant="secondary" className="mt-2 bg-black/5 dark:bg-white/10 text-foreground/80 hover:bg-black/10 dark:hover:bg-white/20 border-transparent">
            {expert.specialty}
          </Badge>
        </div>
      </div>
      {expert.bio && (
        <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
          {expert.bio}
        </p>
      )}
    </GlassCard>
  );
}
