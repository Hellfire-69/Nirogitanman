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
    <GlassCard className="p-8 md:p-10">
      <div className="mb-8">
        <h3 className="font-heading text-2xl font-semibold text-foreground tracking-tight mb-2">
          Generate your diet plan
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A few quick questions — your plan is built from vetted wellness facts, not open-ended
          AI guesswork.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-6">
          <Controller
            control={control}
            name="goal"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="goal" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Primary goal</FieldLabel>
                <Select
                  items={goalItems}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value ?? undefined)}
                >
                  <SelectTrigger id="goal" className="w-full h-12 bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:ring-primary/20 focus:border-primary/30">
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
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="doshaPreference" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Dosha preference</FieldLabel>
                <Select
                  items={doshaItems}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value ?? undefined)}
                >
                  <SelectTrigger id="doshaPreference" className="w-full h-12 bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:ring-primary/20 focus:border-primary/30">
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
                <FieldDescription className="text-xs opacity-70 mt-1">
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
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="dietaryRestrictions" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Dietary restrictions (optional)
                </FieldLabel>
                <div id="dietaryRestrictions" className="flex flex-wrap gap-2 mt-1">
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
                        className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full transition-transform active:scale-95"
                      >
                        <Badge
                          variant={selected ? "default" : "secondary"}
                          className={`cursor-pointer px-4 py-2 h-auto text-sm transition-colors duration-300 ${!selected && 'bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10'}`}
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
            <p className="text-sm font-medium text-destructive mt-2">{submitState.message}</p>
          )}

          {submitState.status === "success" && (
            <div className="bg-[oklch(0.4_0.1_160)]/5 p-4 rounded-xl border border-[oklch(0.4_0.1_160)]/10 text-sm font-medium text-[oklch(0.4_0.1_160)]">
              Your new diet plan is ready — see it above.
            </div>
          )}

          <div className="pt-2">
            <WellnessDisclaimer compact />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="group relative rounded-full px-8 py-6 text-base w-full sm:w-auto overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                {isSubmitting ? "Generating..." : "Generate diet plan"}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </Button>
          </div>
        </FieldGroup>
      </form>
    </GlassCard>
  );
}
