import React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="relative rounded-[2rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10"
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-[calc(2rem-0.375rem)] bg-background/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
