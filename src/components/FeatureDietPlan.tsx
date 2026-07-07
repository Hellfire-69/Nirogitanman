"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Utensils, Coffee, Sun, Apple, Sparkles, Droplets, Flame } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";

const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureDietPlan() {
  return (
    <section className="py-24 md:py-32 overflow-hidden relative bg-gradient-to-b from-background to-[oklch(0.4_0.1_160)]/[0.02]">
      {/* Soft teal glow for the section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[oklch(0.4_0.1_160)]/[0.03] blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
            className="max-w-xl"
          >
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)]">
              <Sparkles className="w-3.5 h-3.5" />
              AI Diet Plan
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
              Nutrition tailored to your unique biology.
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed max-w-[90%]">
              No generic meal plans. Our AI analyzes your dosha, dietary preferences, and wellness goals to generate a highly personalized, sustainable Ayurvedic diet that balances your body from the inside out.
            </p>
            
            <ul className="space-y-5 mb-12">
              {[
                "Dosha-specific meal recommendations",
                "Balances digestion and energy levels",
                "Incorporates seasonal Ayurvedic ingredients"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-4 text-foreground font-medium">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.4_0.1_160)]/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.4_0.1_160)] shadow-[0_0_10px_rgba(0,100,80,0.5)]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="group inline-flex items-center text-sm font-semibold bg-[oklch(0.4_0.1_160)] text-white pl-7 pr-3 py-3 rounded-full hover:bg-[oklch(0.35_0.1_160)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.4_0.1_160)]/30 shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(0,100,80,0.6)] active:scale-[0.98]"
            >
              Generate Free Plan
              <span className="ml-5 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

          {/* Visual Mockup - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: silk }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Background glowing blob for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[oklch(0.4_0.1_160)]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-[22rem]">
              <GlassCard className="p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] bg-white/70 dark:bg-black/70 backdrop-blur-3xl z-10">
                <div className="mb-7 flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-2xl font-bold tracking-tight">Daily Plan</h3>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Pitta Pacifying Diet</p>
                  </div>
                  <div className="w-12 h-12 rounded-[1rem] bg-[oklch(0.4_0.1_160)] flex items-center justify-center text-white shadow-md">
                    <Utensils className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Coffee, title: "Morning Routine", time: "07:00 AM", desc: "Warm water with lemon & raw honey." },
                    { icon: Sun, title: "Lunch (Main Meal)", time: "01:00 PM", desc: "Quinoa bowl with steamed asparagus and ghee." },
                    { icon: Apple, title: "Afternoon Snack", time: "04:30 PM", desc: "Handful of soaked almonds and dates." }
                  ].map((meal, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, ease: silk }}
                      className="p-4 rounded-[1.25rem] bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors cursor-default"
                    >
                      <div className="flex gap-4">
                        <div className="w-11 h-11 shrink-0 rounded-[0.85rem] bg-white dark:bg-black/50 shadow-sm flex items-center justify-center text-foreground/70">
                          <meal.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                             <h4 className="font-bold text-sm text-foreground">{meal.title}</h4>
                             <span className="text-[9px] font-bold tracking-[0.1em] text-muted-foreground uppercase">{meal.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed pr-2">{meal.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Decorative floating element: Hydration */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: silk }}
                className="absolute -top-8 -right-8 md:-right-14 p-1 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-2xl border border-white/50 dark:border-white/10 z-20"
              >
                <div className="bg-white dark:bg-black rounded-[14px] px-5 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Hydration</p>
                    <p className="font-heading font-bold text-foreground text-lg">2.4 / 3.0 L</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative floating element: Metabolism */}
              <motion.div
                initial={{ opacity: 0, y: -30, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7, ease: silk }}
                className="absolute -bottom-10 -left-6 md:-left-16 p-1 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-2xl border border-white/50 dark:border-white/10 z-20"
              >
                <div className="bg-white dark:bg-black rounded-[14px] px-5 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.65_0.15_45)]/10 flex items-center justify-center text-[oklch(0.65_0.15_45)]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Metabolism</p>
                    <p className="font-heading font-bold text-foreground text-lg">+24%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
