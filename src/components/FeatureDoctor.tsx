"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureDoctor() {
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
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Consultation
            </div>
            
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Clinical expertise, just a click away.
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              When you need medical guidance, easily book online sessions with certified Ayurvedic and Allopathic doctors. Our integrated approach ensures you get the right care at the right time.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Certified Ayurvedic & Allopathic specialists",
                "Instant slot booking & confirmation",
                "Seamless video consultations"
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
              Book a Session
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
            className="relative lg:h-[500px] flex flex-col items-center justify-center gap-6"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[oklch(0.4_0.1_160)]/5 blur-[100px] rounded-full pointer-events-none" />
            
            {/* Doctor Card 1 */}
            <motion.div 
              className="relative w-full max-w-md z-10"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: silk }}
            >
              <GlassCard className="p-6 border-white/20 shadow-xl bg-white/60 dark:bg-black/60 backdrop-blur-2xl">
                <div className="flex items-start gap-5">
                  <Avatar className="h-14 w-14 ring-2 ring-background shadow-md">
                    <AvatarFallback className="bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)] font-medium text-lg">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="font-heading text-lg font-semibold text-foreground truncate tracking-tight">
                      Dr. Sarah Mitchell
                    </p>
                    <Badge variant="secondary" className="mt-2 bg-black/5 dark:bg-white/10 text-foreground/80 hover:bg-black/10 dark:hover:bg-white/20 border-transparent">
                      Ayurvedic General Medicine
                    </Badge>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Available Slots
                    </p>
                    <Badge variant="outline" className="h-5 text-[9px] uppercase border-[oklch(0.4_0.1_160)]/20 text-[oklch(0.4_0.1_160)] bg-[oklch(0.4_0.1_160)]/5">Live</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full text-xs hover:border-[oklch(0.4_0.1_160)] hover:text-[oklch(0.4_0.1_160)]">Today, 2:00 PM</Button>
                    <Button variant="outline" size="sm" className="rounded-full text-xs hover:border-[oklch(0.4_0.1_160)] hover:text-[oklch(0.4_0.1_160)]">Today, 4:30 PM</Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Doctor Card 2 */}
            <motion.div 
              className="relative w-full max-w-md z-0 ml-8 opacity-70 scale-95 origin-top-left hidden sm:block"
              initial={{ y: 0 }}
              whileInView={{ y: -20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: silk }}
            >
              <GlassCard className="p-6 border-white/20 shadow-md bg-white/40 dark:bg-black/40 backdrop-blur-xl pointer-events-none">
                <div className="flex items-start gap-5">
                  <Avatar className="h-14 w-14 ring-2 ring-background shadow-md">
                    <AvatarFallback className="bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)] font-medium text-lg">
                      AP
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="font-heading text-lg font-semibold text-foreground truncate tracking-tight">
                      Dr. Arjun Patel
                    </p>
                    <Badge variant="secondary" className="mt-2 bg-black/5 dark:bg-white/10 text-foreground/80 border-transparent">
                      Internal Medicine
                    </Badge>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-border/40">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full text-xs">Tomorrow, 10:00 AM</Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
