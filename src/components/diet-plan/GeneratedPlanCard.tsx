import { Salad } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty";
import { WellnessDisclaimer } from "@/components/WellnessDisclaimer";
import type { ActiveDietPlan } from "@/lib/dashboard-data";

interface GeneratedPlanCardProps {
  plan: ActiveDietPlan | null;
}

export function GeneratedPlanCard({ plan }: GeneratedPlanCardProps) {
  if (!plan) {
    return (
      <GlassCard className="p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Salad />
            </EmptyMedia>
            <EmptyTitle>No active diet plan yet</EmptyTitle>
            <EmptyDescription>
              Fill out the form below to generate your first plan.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </GlassCard>
    );
  }

  const day = plan.generated_plan.days[0];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-heading text-lg font-medium text-foreground">
          {plan.intake_data.goal}
        </h3>
        <Badge variant="secondary">Active</Badge>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {plan.intake_data.dosha_preference !== "Not sure" && (
          <Badge variant="outline">{plan.intake_data.dosha_preference}</Badge>
        )}
        {plan.intake_data.dietary_restrictions.map((restriction) => (
          <Badge key={restriction} variant="outline">
            {restriction}
          </Badge>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{plan.generated_plan.summary}</p>

      {day && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
          {Object.entries(day.meals).map(([meal, item]) => (
            <div key={meal} className="rounded-xl border border-border/50 bg-card/50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {meal}
              </p>
              <p className="text-xs text-foreground mt-1">{item}</p>
            </div>
          ))}
        </div>
      )}

      {plan.generated_plan.notes.length > 0 && (
        <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
          {plan.generated_plan.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}

      <WellnessDisclaimer />
    </GlassCard>
  );
}
