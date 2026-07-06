"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

interface GreetingHeaderProps {
  fullName: string;
  doshaType: string | null;
}

export function GreetingHeader({ fullName, doshaType }: GreetingHeaderProps) {
  const firstName = fullName.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Welcome back
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-foreground">
          {firstName}
        </h1>
        {doshaType && (
          <Badge variant="secondary" className="h-6 px-3 text-xs">
            {doshaType} Dosha
          </Badge>
        )}
      </div>
    </motion.div>
  );
}
