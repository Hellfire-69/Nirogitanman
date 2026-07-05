"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getImageProps } from "next/image";

export function Hero() {
  const common = { alt: "Botanical Illustration", fill: true, priority: true, sizes: "100vw", className: "object-cover" };
  const { props: mobile } = getImageProps({ ...common, src: "/hero/hero-mobile.png" });
  const { props: desktop } = getImageProps({ ...common, src: "/hero/hero-desktop.png" });

  return (
    <section className="relative overflow-hidden w-full min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Image (Art Directed) */}
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop.srcSet} />
        <img {...mobile} alt="Botanical Illustration" />
      </picture>

      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-background/70 md:hidden z-0" />

      {/* Desktop Overlay */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-background/60 via-background/20 to-transparent z-0" />

      {/* Content Block */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-2xl flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl text-primary [text-wrap:balance]">
              Integrative Wellness for a Balanced Life
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl/relaxed [text-wrap:balance]">
              Experience the harmony of Ayurveda, the precision of Allopathy, and the calm of Yoga. A unified approach to heal, thrive, and sustain your health.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/90 active:scale-[0.98] transition-all"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#programs"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-4 text-sm font-semibold text-primary hover:bg-primary/5 active:scale-[0.98] transition-all"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
