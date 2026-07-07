"use client";

import { motion } from "motion/react";
import { CalendarCheck2, Salad, MessageSquare, Clock } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/lib/dashboard-data";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent: "teal" | "terracotta" | "neutral";
  delay: number;
}

const ACCENT_CLASSES = {
  teal: {
    icon: "bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)]",
    value: "text-[oklch(0.4_0.1_160)]",
  },
  terracotta: {
    icon: "bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)]",
    value: "text-[oklch(0.65_0.15_45)]",
  },
  neutral: {
    icon: "bg-muted text-muted-foreground",
    value: "text-foreground",
  },
};

function StatCard({ icon: Icon, label, value, sub, accent, delay }: StatCardProps) {
  const classes = ACCENT_CLASSES[accent];
  
  // Radial highlights for each accent
  const radialBg = 
    accent === "teal" ? "radial-gradient(circle at 100% 0%, oklch(0.4 0.1 160 / 0.08) 0%, transparent 60%)" :
    accent === "terracotta" ? "radial-gradient(circle at 100% 0%, oklch(0.65 0.15 45 / 0.08) 0%, transparent 60%)" :
    "radial-gradient(circle at 100% 0%, rgba(150,150,150, 0.05) 0%, transparent 60%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <GlassCard className="flex flex-col gap-4 p-6 h-full relative overflow-hidden group">
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-50 group-hover:opacity-100" 
          style={{ background: radialBg }} 
        />
        <div className={cn("relative z-10 flex size-12 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110", classes.icon)}>
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <div className="relative z-10 flex flex-col gap-1 mt-auto">
          <span
            className={cn(
              "font-heading text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight",
              classes.value
            )}
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {value}
          </span>
          <span className="text-sm font-medium text-foreground tracking-wide uppercase text-[10px] opacity-80 mt-2">{label}</span>
          {sub && (
            <span className="text-xs text-muted-foreground leading-snug">{sub}</span>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

interface WellnessStatsRowProps {
  stats: DashboardStats;
}

function formatNextBooking(iso: string | null): string {
  if (!iso) return "None scheduled";
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return `In ${diffDays} days`;
}

export function WellnessStatsRow({ stats }: WellnessStatsRowProps) {
  const nextBookingLabel = formatNextBooking(stats.nextBookingAt);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={CalendarCheck2}
        label="Consultations"
        value={stats.totalBookings}
        sub={stats.totalBookings === 0 ? "Book your first session" : "Total booked"}
        accent="teal"
        delay={0.06}
      />
      <StatCard
        icon={Clock}
        label="Next Appointment"
        value={nextBookingLabel}
        sub={
          stats.nextBookingAt
            ? new Date(stats.nextBookingAt).toLocaleString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
              })
            : "Visit Doctor Consult to book"
        }
        accent="teal"
        delay={0.12}
      />
      <StatCard
        icon={Salad}
        label="Active Diet Plans"
        value={stats.totalDietPlans}
        sub={stats.totalDietPlans === 0 ? "Generate a plan to start" : "Plans active"}
        accent="terracotta"
        delay={0.18}
      />
      <StatCard
        icon={MessageSquare}
        label="AI Chat Sessions"
        value={stats.totalChatSessions}
        sub={stats.totalChatSessions === 0 ? "Ask the Ayurvedic assistant" : "Sessions completed"}
        accent="neutral"
        delay={0.24}
      />
    </div>
  );
}
