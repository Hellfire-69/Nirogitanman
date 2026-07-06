"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Stethoscope, Salad, MessageCircle } from "lucide-react";
import { GlassCard } from "./GlassCard";

const ACTIONS = [
  {
    label: "Doctor Consult",
    description: "Book a session with a physician",
    href: "/consult/doctor",
    icon: Stethoscope,
  },
  {
    label: "Diet Plan",
    description: "View your active nutrition plan",
    href: "/diet-plan",
    icon: Salad,
  },
  {
    label: "AI Assistant",
    description: "Ask the Ayurvedic assistant",
    href: "/assistant",
    icon: MessageCircle,
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {ACTIONS.map((action, index) => (
        <motion.div
          key={action.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 + index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ y: -4 }}
        >
          <Link href={action.href}>
            <GlassCard className="flex flex-col gap-3 p-5 h-full transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <action.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-heading text-base font-medium text-foreground">
                  {action.label}
                </p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
