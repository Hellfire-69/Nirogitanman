import { Salad, Coffee, Sun, Utensils, Apple } from "lucide-react";
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(day.meals).map(([meal, item]) => {
            const Icon = meal === "breakfast" ? Coffee : meal === "lunch" ? Sun : meal === "dinner" ? Utensils : Apple;
            return (
              <div key={meal} className="group relative overflow-hidden rounded-[1.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 transition-all duration-300 hover:bg-black/[0.07] dark:hover:bg-white/[0.07] hover:border-black/10 dark:hover:border-white/20">
                <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-12">
                  <Icon className="w-16 h-16" />
                </div>
                <div className="relative z-10 flex items-center gap-2 mb-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-background shadow-sm text-foreground">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {meal}
                  </p>
                </div>
                <p className="relative z-10 text-sm font-medium text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            );
          })}
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
