"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Salad, ArrowRight } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { WellnessDisclaimer } from "@/components/WellnessDisclaimer";
import type { ActiveDietPlan } from "@/lib/dashboard-data";

interface DietPlanSnapshotProps {
  plan: ActiveDietPlan | null;
}

export function DietPlanSnapshot({ plan }: DietPlanSnapshotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-medium text-foreground">
            Active Diet Plan
          </h2>
          {plan && <Badge variant="secondary">Active</Badge>}
        </div>

        {!plan ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Salad />
              </EmptyMedia>
              <EmptyTitle>No active diet plan</EmptyTitle>
              <EmptyDescription>
                Generate a plan to see your daily meals here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                {plan.intake_data.goal}
              </p>
              <p className="text-sm text-muted-foreground">
                {plan.generated_plan.summary}
              </p>
            </div>
            {plan.generated_plan.days[0] && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {Object.entries(plan.generated_plan.days[0].meals).map(
                  ([meal, item]) => (
                    <div
                      key={meal}
                      className="rounded-xl border border-border/50 bg-card/50 px-3 py-2"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {meal}
                      </p>
                      <p className="text-xs text-foreground mt-1 line-clamp-2">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
            <WellnessDisclaimer compact />
            <Link
              href="/diet-plan"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline w-fit"
            >
              View full plan
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
