"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Placeholder } from "./Placeholder";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center space-y-8"
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <Placeholder name="Hero Illustration (Serene Wellness Theme)" className="w-full aspect-[4/3] rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
