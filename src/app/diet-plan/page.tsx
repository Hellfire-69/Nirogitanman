import { getActiveDietPlan } from "@/lib/dashboard-data";
import { GeneratedPlanCard } from "@/components/diet-plan/GeneratedPlanCard";
import { DietIntakeForm } from "@/components/diet-plan/DietIntakeForm";

export default async function DietPlanPage() {
  const plan = await getActiveDietPlan();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
          Diet Plan
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
          Your AI-assisted diet plan
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Generated from a small, vetted wellness facts table — general guidance only, not
          medical advice.
        </p>
      </div>

      <GeneratedPlanCard plan={plan} />
      <DietIntakeForm />
    </div>
  );
}
