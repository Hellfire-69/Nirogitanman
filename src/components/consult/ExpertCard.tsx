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
    <GlassCard className="p-5">
      <div className="flex items-start gap-4">
        <Avatar size="lg">
          <AvatarFallback>{initials(expert.full_name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-heading text-base font-medium text-foreground truncate">
            {expert.full_name}
          </p>
          <Badge variant="outline" className="mt-1">
            {expert.specialty}
          </Badge>
        </div>
      </div>
      {expert.bio && (
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {expert.bio}
        </p>
      )}
    </GlassCard>
  );
}
