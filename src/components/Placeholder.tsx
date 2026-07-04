import React from "react";

interface PlaceholderProps {
  name: string;
  className?: string;
}

export function Placeholder({ name, className = "" }: PlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center p-6 border-2 border-dashed border-muted-foreground/30 bg-muted/20 text-muted-foreground rounded-lg ${className}`}
    >
      <div className="text-center">
        <span className="block text-sm font-semibold tracking-wide uppercase">
          TODO: {name}
        </span>
        <span className="block text-xs mt-1 opacity-70">Asset Missing</span>
      </div>
    </div>
  );
}
