"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Utensils, Coffee, Sun, Apple, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";

const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureDietPlan() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
            className="max-w-xl"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)]">
              <Sparkles className="w-3.5 h-3.5" />
              AI Diet Plan
            </div>
            
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Nutrition tailored to your unique biology.
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              No generic meal plans. Our AI analyzes your dosha, dietary preferences, and wellness goals to generate a highly personalized, sustainable Ayurvedic diet that balances your body from the inside out.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Dosha-specific meal recommendations",
                "Balances digestion and energy levels",
                "Incorporates seasonal Ayurvedic ingredients"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[oklch(0.4_0.1_160)]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[oklch(0.4_0.1_160)]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="group inline-flex items-center text-sm font-semibold bg-[oklch(0.4_0.1_160)] text-white pl-6 pr-2 py-2 rounded-full hover:bg-[oklch(0.35_0.1_160)] transition-all duration-300 ease-out w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.4_0.1_160)]/30 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Generate Free Plan
              <span className="ml-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1">
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
            className="relative lg:h-[500px] flex items-center justify-center"
          >
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[oklch(0.4_0.1_160)]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-md">
              <GlassCard className="p-8 border-white/20 shadow-2xl bg-white/60 dark:bg-black/60 backdrop-blur-2xl">
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-heading text-xl font-bold">Your Daily Plan</h3>
                    <p className="text-sm text-muted-foreground">Pitta Pacifying Diet</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.4_0.1_160)]/10 flex items-center justify-center text-[oklch(0.4_0.1_160)]">
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
                      className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default"
                    >
                      <div className="flex gap-4">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-black shadow-sm flex items-center justify-center text-muted-foreground">
                          <meal.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm text-foreground">{meal.title}</h4>
                            <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">{meal.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{meal.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Decorative floating element */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6, ease: silk }}
                className="absolute -bottom-6 -left-8 md:-left-12 px-6 py-4 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-border flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[oklch(0.65_0.15_45)]/10 flex items-center justify-center text-[oklch(0.65_0.15_45)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Metabolism</p>
                  <p className="font-bold text-foreground">+24% Efficiency</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
