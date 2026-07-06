"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const emailPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type EmailPasswordInput = z.infer<typeof emailPasswordSchema>;

export async function login(input: EmailPasswordInput) {
  const parsed = emailPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "Invalid email or password." };
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { success: false as const, error: "Incorrect email or password." };
  }

  return { success: true as const };
}

const signupSchema = emailPasswordSchema.extend({
  fullName: z.string().trim().min(1, "Name is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export async function signup(input: SignupInput) {
  const parsed = signupSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "Please fill out all fields correctly." };
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.fullName } },
  });

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const };
}

export async function logout() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
