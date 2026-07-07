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
    <GlassCard className="p-8 md:p-10">
      <div className="mb-8">
        <h3 className="font-heading text-2xl font-semibold text-foreground tracking-tight mb-2">
          Your Profile
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Manage your personal details and dosha preferences here.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-6">
          <Field className="gap-2">
            <FieldLabel htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email</FieldLabel>
            <Input id="email" value={user.email} disabled readOnly className="h-12 bg-black/5 dark:bg-white/5 border-transparent opacity-50 cursor-not-allowed" />
            <FieldDescription className="text-xs opacity-70 mt-1">Managed by your account sign-in, not editable here.</FieldDescription>
          </Field>

          <Controller
            control={control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="fullName" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Name</FieldLabel>
                <Input id="fullName" {...field} className="h-12 bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:bg-transparent focus:ring-primary/20 focus:border-primary/30" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="doshaType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="doshaType" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Dosha preference</FieldLabel>
                <Select
                  items={doshaItems}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value ?? null)}
                >
                  <SelectTrigger id="doshaType" className="w-full h-12 bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:ring-primary/20 focus:border-primary/30">
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
            <p className="text-sm font-medium text-destructive mt-2">{submitState.message}</p>
          )}

          {submitState.status === "success" && (
            <div className="bg-[oklch(0.4_0.1_160)]/5 p-4 rounded-xl border border-[oklch(0.4_0.1_160)]/10 text-sm font-medium text-[oklch(0.4_0.1_160)]">
              Your profile has been updated.
            </div>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="group relative rounded-full px-8 py-6 text-base w-full sm:w-auto overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Save className="h-4 w-4 transition-transform group-hover:scale-110" />
                {isSubmitting ? "Saving..." : "Save changes"}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </Button>
          </div>
        </FieldGroup>
      </form>
    </GlassCard>
  );
}
