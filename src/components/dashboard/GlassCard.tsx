import React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-background/50 backdrop-blur-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] supports-[backdrop-filter]:bg-background/40",
        className
      )}
      {...props}
    />
  );
}
