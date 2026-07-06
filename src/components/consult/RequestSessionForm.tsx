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
    <GlassCard className="p-6">
      <h3 className="font-heading text-lg font-medium text-foreground mb-4">
        Request a Session
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            control={control}
            name="expertId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="expertId">Expert</FieldLabel>
                <Select
                  items={expertItems}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? "")}
                >
                  <SelectTrigger id="expertId" className="w-full">
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="preferredTime">Preferred time</FieldLabel>
                <Input
                  id="preferredTime"
                  placeholder="e.g. Weekday mornings, or Tue 10 Jul at 5pm"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <FieldDescription>
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="message">Message (optional)</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="Anything you'd like the expert to know beforehand"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {submitState.status === "error" && (
            <p className="text-sm text-destructive">{submitState.message}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-fit">
            {isSubmitting ? "Sending..." : "Send request"}
          </Button>
        </FieldGroup>
      </form>
    </GlassCard>
  );
}
