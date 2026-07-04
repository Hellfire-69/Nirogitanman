import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto text-background [text-wrap:balance]">
          Ready to reclaim your health?
        </h2>
        <p className="mb-10 text-lg md:text-xl opacity-90 max-w-xl mx-auto text-background [text-wrap:balance]">
          Join the platform that bridges ancient wisdom and modern science to give you the best of both worlds.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full bg-background px-8 py-4 text-sm font-bold text-secondary shadow-lg hover:bg-background/90 active:scale-[0.98] transition-all"
        >
          Get Started Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
