"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

interface GreetingHeaderProps {
  fullName: string;
  doshaType: string | null;
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function GreetingHeader({ fullName, doshaType }: GreetingHeaderProps) {
  const firstName = fullName.split(" ")[0];
  const greeting = useMemo(() => getTimeGreeting(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl bg-[oklch(0.4_0.1_160)]/[0.06] border border-[oklch(0.4_0.1_160)]/[0.12] px-6 py-6 md:py-8"
    >
      {/* Decorative background blobs */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.4 0.1 160) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-6 left-12 h-24 w-24 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.15 45) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-2">
        {/* Time-of-day label */}
        <div className="flex items-center gap-1.5">
          <Leaf
            className="h-3.5 w-3.5 text-[oklch(0.4_0.1_160)]"
            strokeWidth={2}
          />
          <span className="text-xs font-medium uppercase tracking-widest text-[oklch(0.4_0.1_160)]/80">
            {greeting}
          </span>
        </div>

        {/* Name + dosha badge */}
        <div className="flex flex-wrap items-end gap-3">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {firstName}
          </h1>
          {doshaType && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge
                variant="secondary"
                className="h-6 px-3 text-xs mb-1 bg-[oklch(0.65_0.15_45)]/15 text-[oklch(0.55_0.15_45)] border-[oklch(0.65_0.15_45)]/30"
              >
                {doshaType} Dosha
              </Badge>
            </motion.div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-0.5">
          Here&rsquo;s your wellness overview.
        </p>
      </div>
    </motion.div>
  );
}
