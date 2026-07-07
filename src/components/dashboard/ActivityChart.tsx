"use client";

import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GlassCard } from "./GlassCard";
import { Activity } from "lucide-react";
import type { ActivityDay } from "@/lib/dashboard-data";

interface ActivityChartProps {
  data: ActivityDay[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/60 bg-background/90 backdrop-blur-md px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color }} className="leading-snug">
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        )
      )}
    </div>
  );
}

export function ActivityChart({ data }: ActivityChartProps) {
  const totalActivity = data.reduce((sum, d) => sum + d.bookings + d.chats, 0);
  const isEmpty = totalActivity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className="font-heading text-lg font-medium text-foreground"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Wellness Activity
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)]">
            <Activity className="h-4 w-4" strokeWidth={1.75} />
          </div>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Activity className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-foreground">No activity yet</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Your wellness journey starts here — book a consultation or generate a diet plan to see
              your activity chart.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.4 0.1 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.4 0.1 160)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTerracotta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.15 45)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="oklch(0.65 0.15 45)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.9 0.01 75)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "oklch(0.5 0.01 250)", fontFamily: "inherit" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "oklch(0.5 0.01 250)", fontFamily: "inherit" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                formatter={(value: string) =>
                  value === "bookings" ? "Consultations" : "AI Chats"
                }
              />
              <Area
                type="monotone"
                dataKey="bookings"
                name="bookings"
                stroke="oklch(0.4 0.1 160)"
                strokeWidth={2}
                fill="url(#gradTeal)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="chats"
                name="chats"
                stroke="oklch(0.65 0.15 45)"
                strokeWidth={2}
                fill="url(#gradTerracotta)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </GlassCard>
    </motion.div>
  );
}
