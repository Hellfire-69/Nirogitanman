"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Salad,
  MessageCircle,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Expert Consult", href: "/consult/expert", icon: Users },
  { label: "Doctor Consult", href: "/consult/doctor", icon: Stethoscope },
  { label: "Diet Plan", href: "/diet-plan", icon: Salad },
  { label: "AI Assistant", href: "/assistant", icon: MessageCircle },
  { label: "Profile", href: "/profile", icon: User },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export function DashboardNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-30 md:border-r md:border-border/50 md:bg-background/50 md:backdrop-blur-2xl md:supports-[backdrop-filter]:bg-background/40">
        <Link href="/" className="flex items-center gap-2 px-6 py-6 shrink-0">
          <Image
            src="/nirogitanman_logo.png"
            alt="NirogiTanman Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-heading font-bold text-lg text-primary tracking-tight">
            NirogiTanman
          </span>
        </Link>
        <nav aria-label="Dashboard Navigation" className="flex flex-col gap-1 px-4 py-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="dashboard-nav-active"
                    className="absolute inset-0 rounded-xl bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon className="relative z-10 h-4 w-4" strokeWidth={1.75} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => logout()}
          className="mt-auto flex items-center gap-3 rounded-xl px-4 py-2.5 mx-4 mb-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Log out
        </button>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/50 backdrop-blur-2xl border-b border-border/50 supports-[backdrop-filter]:bg-background/40">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nirogitanman_logo.png"
            alt="NirogiTanman Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="font-heading font-bold text-base text-primary tracking-tight">
            NirogiTanman
          </span>
        </Link>
        <button
          className="p-2 -mr-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-4 top-20 z-40 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <nav aria-label="Dashboard Navigation" className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.75} />
                Log out
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
