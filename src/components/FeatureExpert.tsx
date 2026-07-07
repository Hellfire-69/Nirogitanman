"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureExpert() {
  return (
    <section className="py-24 overflow-hidden relative bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Mockup - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
            className="relative lg:h-[500px] flex items-center justify-center order-2 lg:order-1"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[oklch(0.65_0.15_45)]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-md">
              <div className="flex gap-4 mb-6">
                {["Ayurveda", "Yoga", "Lifestyle"].map((tag, i) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: silk }}
                  >
                    <Badge variant="outline" className="h-8 px-4 rounded-full bg-white dark:bg-black shadow-sm text-foreground/80 border-border/50">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <GlassCard className="p-6 border-white/20 shadow-2xl bg-white/60 dark:bg-black/60 backdrop-blur-2xl">
                <div className="flex flex-col gap-6">
                  
                  {/* Expert 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5, ease: silk }}
                    className="flex items-center gap-5 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <Avatar className="h-16 w-16 ring-4 ring-background shadow-md">
                      <AvatarFallback className="bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)] font-medium text-lg">
                        RK
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-heading text-lg font-semibold text-foreground truncate tracking-tight">
                          Rahul Khanna
                        </p>
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-background px-2 py-0.5 rounded-full shadow-sm">
                          <Sparkles className="w-3 h-3 text-[oklch(0.65_0.15_45)]" />
                          Top Rated
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Certified Yoga Instructor</p>
                    </div>
                  </motion.div>

                  {/* Expert 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7, ease: silk }}
                    className="flex items-center gap-5 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <Avatar className="h-16 w-16 ring-4 ring-background shadow-md">
                      <AvatarFallback className="bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)] font-medium text-lg">
                        ND
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-lg font-semibold text-foreground truncate tracking-tight mb-1">
                        Neha Desai
                      </p>
                      <p className="text-sm text-muted-foreground">Ayurvedic Lifestyle Coach</p>
                    </div>
                  </motion.div>

                </div>
              </GlassCard>
            </div>
          </motion.div>

          {/* Text Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: silk }}
            className="max-w-xl order-1 lg:order-2"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)]">
              <Leaf className="w-3.5 h-3.5" />
              Expert Consultation
            </div>
            
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Holistic coaching for mind and body.
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Transform your daily habits with guidance from certified wellness experts. Whether you need to refine your yoga practice, manage stress, or improve your sleep hygiene, our coaches provide the practical support you need.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Personalized Ayurvedic lifestyle coaching",
                "Guided Yoga and meditation sessions",
                "Actionable routines for sleep and stress management"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[oklch(0.65_0.15_45)]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[oklch(0.65_0.15_45)]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="group inline-flex items-center text-sm font-semibold bg-[oklch(0.65_0.15_45)] text-white pl-6 pr-2 py-2 rounded-full hover:bg-[oklch(0.60_0.15_45)] transition-all duration-300 ease-out w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.65_0.15_45)]/30 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Meet Our Experts
              <span className="ml-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
