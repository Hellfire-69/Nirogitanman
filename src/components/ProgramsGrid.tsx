/**
 * ProgramsGrid — Landing page "Our Programs" section.
 * Renders a swipeable, animated card carousel of the 5 Ayurvedic health programs
 * alongside a numbered navigation list; each card links to the Expert Consult flow.
 */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const programs = [
  {
    title: "Immunity Booster",
    desc: "Strengthen your natural defenses through personalized Ayurvedic diets and holistic practices.",
    image: "/programs/immunity-booster.png",
  },
  {
    title: "Digestive Wellness",
    desc: "Heal your gut, optimize metabolism, and solve chronic digestive issues permanently.",
    image: "/programs/digestive-wellness.png",
  },
  {
    title: "Stress & Mental Balance",
    desc: "Find calm and focus with guided Yoga, meditation, and nervine tonics.",
    image: "/programs/stress-mental.png",
  },
  {
    title: "Weight Management",
    desc: "Sustainable fat loss combining modern nutritional science with Ayurvedic body-typing.",
    image: "/programs/weight-management.png",
  },
  {
    title: "Skin & Hair Care",
    desc: "Rejuvenate naturally with targeted internal detox and topical herbal regimens.",
    image: "/programs/skin-hair.png",
  },
];

const SWIPE_THRESHOLD = 80;

const cardVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 60 : -60,
    opacity: 0,
    rotate: direction >= 0 ? 6 : -6,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -220 : 220,
    opacity: 0,
    rotate: direction >= 0 ? -10 : 10,
    scale: 0.92,
    transition: { duration: 0.22, ease: [0.5, 0, 0.75, 0] as [number, number, number, number] },
  }),
};

export function ProgramsGrid() {
  const [[index, direction], setIndexDirection] = useState<[number, number]>([0, 1]);
  const total = programs.length;

  const paginate = (delta: number) => {
    setIndexDirection(([current]) => [(current + delta + total) % total, delta]);
  };

  const jumpTo = (target: number) => {
    setIndexDirection(([current]) => [target, target >= current ? 1 : -1]);
  };

  const active = programs[index];
  const peek = [1, 2].map((offset) => programs[(index + offset) % total]);

  return (
    <section id="programs" className="bg-background py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-center">
          {/* Copy + navigation list */}
          <div>
            <div className="mb-6 inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-primary/10 text-primary">
              Our Programs
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Targeted <br />Healing Paths
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-md">
              Choose a specialized wellness program tailored to your unique biology and lifestyle goals.
            </p>

            <div className="flex flex-col gap-3">
              {programs.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => jumpTo(i)}
                  aria-label={`Show ${p.title}`}
                  aria-current={i === index}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    i === index ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 ${
                      i === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border-2 border-border text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-lg transition-colors duration-200 ${
                      i === index ? "font-bold text-foreground" : "text-muted-foreground font-medium"
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Stacked card widget — self-contained, no page scroll involvement */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="relative aspect-[4/5] w-full" role="group" aria-roledescription="carousel" aria-label="Health programs">
              {/* Decorative peek cards behind the active card */}
              {peek.map((p, i) => (
                <div
                  key={`peek-${p.title}`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[2rem] overflow-hidden ring-1 ring-border/50"
                  style={{
                    transform: `translateY(${(i + 1) * 14}px) scale(${1 - (i + 1) * 0.05}) rotate(${
                      i % 2 === 0 ? (i + 1) * 3 : -(i + 1) * 3
                    }deg)`,
                    zIndex: 0 - i,
                  }}
                >
                  <Image src={p.image} alt="" fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-background/50" />
                </div>
              ))}

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={active.title}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_event, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
                    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
                  }}
                  className="absolute inset-0 z-10 cursor-grab rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-border/50 bg-background active:cursor-grabbing"
                >
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover pointer-events-none"
                    priority={index === 0}
                    sizes="(max-width: 768px) 90vw, 460px"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#005346]/95 via-[#005346]/60 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 z-10">
                    <h3 className="font-heading text-3xl font-bold text-white mb-3 tracking-tight drop-shadow-sm">
                      {active.title}
                    </h3>
                    <p className="text-white/90 mb-8 text-base leading-relaxed drop-shadow-sm">
                      {active.desc}
                    </p>
                    <Link
                      href="/consult/expert"
                      className="group inline-flex items-center text-sm font-semibold bg-white text-black pl-6 pr-2 py-2 rounded-full hover:bg-gray-50 transition-all duration-300 ease-out w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-primary shadow-xl active:scale-[0.98]"
                    >
                      Consult Expert
                      <span className="ml-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls: bounded to this widget only */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => paginate(-1)}
                aria-label="Previous program"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-200 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {programs.map((p, i) => (
                  <button
                    key={`dot-${p.title}`}
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to ${p.title}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${
                      i === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                aria-label="Next program"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-200 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
