"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";

import { GlassCard } from "@/components/dashboard/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/profile-schema";
import { DOSHA_PREFERENCES } from "@/lib/diet-plan-schema";
import { updateProfile } from "@/lib/actions/update-profile";
import type { DashboardUser } from "@/lib/dashboard-data";

const doshaItems = DOSHA_PREFERENCES.map((dosha) => ({ label: dosha, value: dosha }));

interface ProfileFormProps {
  user: DashboardUser | null;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [submitState, setSubmitState] = useState<
    { status: "idle" } | { status: "success" } | { status: "error"; message: string }
  >({ status: "idle" });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.full_name ?? "",
      doshaType: (user?.dosha_type as UpdateProfileInput["doshaType"]) ?? null,
    },
  });

  async function onSubmit(values: UpdateProfileInput) {
    setSubmitState({ status: "idle" });
    const result = await updateProfile(values);

    if (result.success) {
      setSubmitState({ status: "success" });
    } else {
      setSubmitState({ status: "error", message: result.error });
    }
  }

  if (!user) {
    return (
      <GlassCard className="p-6">
        <p className="text-sm text-muted-foreground">
          Could not load your profile. Please try refreshing the page.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" value={user.email} disabled readOnly />
            <FieldDescription>Managed by your account sign-in, not editable here.</FieldDescription>
          </Field>

          <Controller
            control={control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="fullName">Name</FieldLabel>
                <Input id="fullName" {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="doshaType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="doshaType">Dosha preference</FieldLabel>
                <Select
                  items={doshaItems}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value ?? null)}
                >
                  <SelectTrigger id="doshaType" className="w-full">
                    <SelectValue placeholder="Not set" />
                  </SelectTrigger>
                  <SelectContent>
                    {doshaItems.map((item) => (
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

          {submitState.status === "error" && (
            <p className="text-sm text-destructive">{submitState.message}</p>
          )}

          {submitState.status === "success" && (
            <p className="text-sm text-primary">Your profile has been updated.</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-fit">
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </FieldGroup>
      </form>
    </GlassCard>
  );
}
