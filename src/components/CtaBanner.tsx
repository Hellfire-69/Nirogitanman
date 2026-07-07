/**
 * CtaBanner — Closing call-to-action section before the Footer.
 * Terracotta secondary background. WhileInView entrance + button-in-button
 * arrow pattern matching the Hero CTA.
 */
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const silk = [0.16, 1, 0.3, 1] as const;

export function CtaBanner() {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: silk }}
        >
          <h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold max-w-2xl mx-auto text-background [text-wrap:balance]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ready to reclaim your health?
          </h2>
          <p className="text-lg md:text-xl opacity-85 max-w-xl mx-auto text-background [text-wrap:balance] leading-relaxed">
            Join the platform that bridges ancient wisdom and modern science to give you the best of both worlds.
          </p>
          {/* Button-in-button pattern matching Hero CTA */}
          <Link
            href="/dashboard"
            className="group inline-flex items-center justify-center rounded-full bg-background px-8 py-4 text-sm font-bold text-secondary shadow-lg hover:bg-background/92 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mt-2"
          >
            Get Started Now
            <span className="ml-3 w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
