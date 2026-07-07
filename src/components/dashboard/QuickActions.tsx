"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Stethoscope, Salad, MessageCircle, ArrowRight } from "lucide-react";
import { GlassCard } from "./GlassCard";

const ACTIONS = [
  {
    label: "Doctor Consult",
    description: "Book a session with a physician",
    href: "/consult/doctor",
    icon: Stethoscope,
    accent: {
      bg: "bg-[oklch(0.4_0.1_160)]/10",
      text: "text-[oklch(0.4_0.1_160)]",
      border: "hover:border-[oklch(0.4_0.1_160)]/30",
    },
  },
  {
    label: "Diet Plan",
    description: "View your active nutrition plan",
    href: "/diet-plan",
    icon: Salad,
    accent: {
      bg: "bg-[oklch(0.65_0.15_45)]/10",
      text: "text-[oklch(0.65_0.15_45)]",
      border: "hover:border-[oklch(0.65_0.15_45)]/30",
    },
  },
  {
    label: "AI Assistant",
    description: "Ask the Ayurvedic assistant",
    href: "/assistant",
    icon: MessageCircle,
    accent: {
      bg: "bg-muted",
      text: "text-muted-foreground",
      border: "hover:border-border",
    },
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {ACTIONS.map((action, index) => (
        <motion.div
          key={action.href}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.08 + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={action.href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2rem]">
            <GlassCard
              className={`group flex flex-col gap-4 p-6 h-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] ${action.accent.border} hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-12 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 ${action.accent.bg} ${action.accent.text}`}
                >
                  <action.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex size-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 opacity-0 -translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex-1 mt-2">
                <p
                  className="text-xl font-semibold text-foreground tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {action.label}
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
