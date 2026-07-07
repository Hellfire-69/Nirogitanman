/**
 * CtaBanner — Closing call-to-action section before the Footer.
 * Dramatic gradient background. WhileInView entrance + button-in-button
 * arrow pattern matching the Hero CTA.
 */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const silk = [0.16, 1, 0.3, 1] as const;

interface CtaBannerProps {
  bgImage?: string;
}

export function CtaBanner({ bgImage }: CtaBannerProps = {}) {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.25_0.05_160)] text-white py-24 md:py-32">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Call to action background"
            fill
            className="object-cover opacity-[0.15] mix-blend-overlay"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.25_0.05_160)]/90 via-transparent to-[oklch(0.25_0.05_160)]/50 pointer-events-none" />
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: silk }}
        >
          <h2
            className="font-heading text-5xl md:text-6xl lg:text-[4.5rem] font-bold max-w-3xl mx-auto text-white leading-[1.05] tracking-tighter drop-shadow-md"
          >
            Ready to reclaim your health?
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed">
            Join the platform that bridges ancient wisdom and modern science to give you the best of both worlds.
          </p>
          {/* Button-in-button pattern */}
          <Link
            href="/signup"
            className="group mt-6 inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-[16px] font-bold text-[oklch(0.35_0.1_160)] shadow-2xl hover:bg-white/95 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] ring-4 ring-white/20"
          >
            Get Started Now
            <span className="ml-4 w-10 h-10 rounded-full bg-[oklch(0.35_0.1_160)]/10 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
