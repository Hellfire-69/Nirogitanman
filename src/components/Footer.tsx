/**
 * Footer — Site-wide footer with brand block and navigation columns.
 * Subtle tinted background separating it from the CtaBanner above,
 * staggered entrance, and improved typographic hierarchy.
 */
"use client";

import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { motion } from "motion/react";

/* Silk ease — shared across the landing page */
const silk = [0.16, 1, 0.3, 1] as const;

const exploreLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Expert Consult", href: "/consult/expert" },
  { label: "Doctor Consult", href: "/consult/doctor" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  return (
    <footer
      className="relative border-t border-border/60"
      style={{
        /* Subtle warm-tinted surface — just slightly darker than sand, clearly distinct from CTA banner terracotta */
        background: "oklch(0.95 0.012 75)",
      }}
    >
      {/* Faint decorative top edge accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 pt-24 pb-12">
        {/* Main columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-16 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.64, ease: silk }}
        >
          {/* Brand block */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 w-fit group"
              aria-label="NirogiTanman home"
            >
              <span className="font-heading font-bold text-2xl text-primary tracking-tight group-hover:text-primary/80 transition-colors duration-200">
                NirogiTanman
              </span>
              <Leaf
                className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors duration-200"
                strokeWidth={1.5}
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[26rem]">
              An integrative wellness platform bridging Ayurveda, Yoga, and Modern
              Medicine for a balanced, healthy life. Built on time-tested principles,
              guided by certified experts.
            </p>
            {/* Brand colour stripe — visual identity anchor */}
            <div className="flex gap-1.5 mt-1">
              <span className="h-1.5 w-8 rounded-full bg-primary" />
              <span className="h-1.5 w-4 rounded-full bg-secondary/70" />
              <span className="h-1.5 w-2 rounded-full bg-primary/30" />
            </div>
          </div>

          {/* Explore column */}
          <div>
            <p className="text-xs font-bold text-foreground/60 uppercase tracking-[0.2em] mb-6">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <p className="text-xs font-bold text-foreground/60 uppercase tracking-[0.2em] mb-6">
              Legal
            </p>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-border/50 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: silk }}
        >
          <p>© {new Date().getFullYear()} NirogiTanman. All rights reserved.</p>
          <p className="italic">Not a substitute for professional medical advice.</p>
        </motion.div>
      </div>
    </footer>
  );
}
