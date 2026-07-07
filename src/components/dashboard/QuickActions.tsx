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
          <Link href={action.href} className="block h-full">
            <GlassCard
              className={`group flex flex-col gap-3 p-5 h-full transition-all duration-200 border-border/50 ${action.accent.border} hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]`}
            >
              <div
                className={`flex size-10 items-center justify-center rounded-full ${action.accent.bg} ${action.accent.text}`}
              >
                <action.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <p
                  className="text-base font-medium text-foreground"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {action.label}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {action.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                <span>Open</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
