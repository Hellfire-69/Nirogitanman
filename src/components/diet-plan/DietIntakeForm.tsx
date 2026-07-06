"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";

import { GlassCard } from "@/components/dashboard/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { WellnessDisclaimer } from "@/components/WellnessDisclaimer";
import {
  generateDietPlanSchema,
  DIET_GOALS,
  DOSHA_PREFERENCES,
  DIETARY_RESTRICTIONS,
  type GenerateDietPlanInput,
} from "@/lib/diet-plan-schema";
import { generateDietPlan } from "@/lib/actions/generate-diet-plan";

const goalItems = DIET_GOALS.map((goal) => ({ label: goal, value: goal }));
const doshaItems = DOSHA_PREFERENCES.map((dosha) => ({ label: dosha, value: dosha }));

export function DietIntakeForm() {
  const [submitState, setSubmitState] = useState<
    { status: "idle" } | { status: "success" } | { status: "error"; message: string }
  >({ status: "idle" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<GenerateDietPlanInput>({
    resolver: zodResolver(generateDietPlanSchema),
    defaultValues: {
      goal: undefined,
      doshaPreference: undefined,
      dietaryRestrictions: [],
    },
  });

  async function onSubmit(values: GenerateDietPlanInput) {
    setSubmitState({ status: "idle" });
    const result = await generateDietPlan(values);

    if (result.success) {
      setSubmitState({ status: "success" });
      reset();
    } else {
      setSubmitState({ status: "error", message: result.error });
    }
  }

  return (
    <GlassCard className="p-6">
      <h3 className="font-heading text-lg font-medium text-foreground mb-1">
        Generate your diet plan
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        A few quick questions — your plan is built from vetted wellness facts, not open-ended
        AI guesswork.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            control={control}
            name="goal"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="goal">Primary goal</FieldLabel>
                <Select
                  items={goalItems}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value ?? undefined)}
                >
                  <SelectTrigger id="goal" className="w-full">
                    <SelectValue placeholder="Choose a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="doshaPreference"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="doshaPreference">Dosha preference</FieldLabel>
                <Select
                  items={doshaItems}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value ?? undefined)}
                >
                  <SelectTrigger id="doshaPreference" className="w-full">
                    <SelectValue placeholder="Choose a dosha, or Not sure" />
                  </SelectTrigger>
                  <SelectContent>
                    {doshaItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Not sure? Choose &quot;Not sure&quot; and we&apos;ll skip dosha-specific facts.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="dietaryRestrictions"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="dietaryRestrictions">
                  Dietary restrictions (optional)
                </FieldLabel>
                <div id="dietaryRestrictions" className="flex flex-wrap gap-2">
                  {DIETARY_RESTRICTIONS.map((restriction) => {
                    const selected = field.value?.includes(restriction);
                    return (
                      <button
                        key={restriction}
                        type="button"
                        onClick={() => {
                          const current = field.value ?? [];
                          field.onChange(
                            selected
                              ? current.filter((item) => item !== restriction)
                              : [...current, restriction]
                          );
                        }}
                      >
                        <Badge
                          variant={selected ? "default" : "outline"}
                          className="cursor-pointer px-3 py-1 h-auto"
                        >
                          {restriction}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {submitState.status === "error" && (
            <p className="text-sm text-destructive">{submitState.message}</p>
          )}

          {submitState.status === "success" && (
            <p className="text-sm text-primary">
              Your new diet plan is ready — see it above.
            </p>
          )}

          <WellnessDisclaimer />

          <Button type="submit" disabled={isSubmitting} className="w-fit">
            <Sparkles className="h-4 w-4" />
            {isSubmitting ? "Generating..." : "Generate diet plan"}
          </Button>
        </FieldGroup>
      </form>
    </GlassCard>
  );
}
