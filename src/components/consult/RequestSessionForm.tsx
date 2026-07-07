"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

import { GlassCard } from "@/components/dashboard/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { requestExpertSession } from "@/lib/actions/request-expert-session";
import type { Expert } from "@/lib/experts-data";

const formSchema = z.object({
  expertId: z.string().min(1, "Please choose an expert"),
  preferredTime: z.string().trim().min(1, "Preferred time is required"),
  message: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RequestSessionFormProps {
  experts: Expert[];
}

export function RequestSessionForm({ experts }: RequestSessionFormProps) {
  const [submitState, setSubmitState] = useState<
    { status: "idle" } | { status: "success" } | { status: "error"; message: string }
  >({ status: "idle" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { expertId: "", preferredTime: "", message: "" },
  });

  const expertItems = experts.map((expert) => ({
    label: `${expert.full_name} — ${expert.specialty}`,
    value: expert.id,
  }));

  async function onSubmit(values: FormValues) {
    setSubmitState({ status: "idle" });
    const result = await requestExpertSession(values);

    if (result.success) {
      setSubmitState({ status: "success" });
      reset();
    } else {
      setSubmitState({ status: "error", message: result.error });
    }
  }

  if (submitState.status === "success") {
    return (
      <GlassCard className="p-6 flex flex-col items-center text-center gap-3">
        <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={1.75} />
        <h3 className="font-heading text-lg font-medium text-foreground">
          Request sent
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your session request has been submitted. The expert&apos;s team will reach out
          to confirm a time.
        </p>
        <Button variant="outline" onClick={() => setSubmitState({ status: "idle" })}>
          Request another session
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8 md:p-10">
      <div className="mb-8">
        <h3 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
          Request a Session
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Fill in your details below and we&apos;ll schedule a session with your chosen expert.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-6">
          <Controller
            control={control}
            name="expertId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="expertId" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Expert</FieldLabel>
                <Select
                  items={expertItems}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? "")}
                >
                  <SelectTrigger id="expertId" className="w-full h-12 bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:ring-primary/20 focus:border-primary/30">
                    <SelectValue placeholder="Choose an expert" />
                  </SelectTrigger>
                  <SelectContent>
                    {expertItems.map((item) => (
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
            name="preferredTime"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="preferredTime" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Preferred time</FieldLabel>
                <Input
                  id="preferredTime"
                  placeholder="e.g. Weekday mornings, or Tue 10 Jul at 5pm"
                  aria-invalid={fieldState.invalid}
                  className="h-12 bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:bg-transparent focus:ring-primary/20 focus:border-primary/30"
                  {...field}
                />
                <FieldDescription className="text-xs opacity-70 mt-1">
                  Share any dates/times that work — the expert&apos;s team will confirm.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Message (optional)</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="Anything you'd like the expert to know beforehand"
                  aria-invalid={fieldState.invalid}
                  className="min-h-[120px] bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:bg-transparent focus:ring-primary/20 focus:border-primary/30 resize-none p-4"
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {submitState.status === "error" && (
            <p className="text-sm font-medium text-destructive mt-2">{submitState.message}</p>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="group relative rounded-full px-8 py-6 text-base w-full sm:w-auto overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? "Sending..." : "Send request"}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </Button>
          </div>
        </FieldGroup>
      </form>
    </GlassCard>
  );
}
