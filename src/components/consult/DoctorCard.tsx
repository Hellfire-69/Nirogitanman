"use client";

import { useState } from "react";
import { CalendarX2, CheckCircle2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { bookSlot } from "@/lib/actions/book-slot";
import type { DoctorWithSlots } from "@/lib/doctors-data";

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part !== "Dr.")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

interface DoctorCardProps {
  doctor: DoctorWithSlots;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [slots, setSlots] = useState(doctor.slots);
  const [pendingSlotId, setPendingSlotId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<
    { type: "success"; slotLabel: string } | { type: "error"; message: string } | null
  >(null);

  async function handleBook(slotId: string, slotLabel: string) {
    setPendingSlotId(slotId);
    setFeedback(null);

    const result = await bookSlot({ slotId });

    setPendingSlotId(null);

    if (result.success) {
      setSlots((current) => current.filter((slot) => slot.id !== slotId));
      setFeedback({ type: "success", slotLabel });
    } else {
      setSlots((current) => current.filter((slot) => slot.id !== slotId));
      setFeedback({ type: "error", message: result.error });
    }
  }

  return (
    <GlassCard className="group p-6 transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-5">
        <Avatar className="h-16 w-16 ring-2 ring-background shadow-md">
          <AvatarFallback className="bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)] font-medium text-lg">
            {initials(doctor.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 pt-1">
          <p className="font-heading text-xl font-semibold text-foreground truncate tracking-tight">
            {doctor.full_name}
          </p>
          <Badge variant="secondary" className="mt-2 bg-black/5 dark:bg-white/10 text-foreground/80 hover:bg-black/10 dark:hover:bg-white/20 border-transparent">
            {doctor.specialty}
          </Badge>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border/40">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Available Slots
          </p>
          <Badge variant="outline" className="h-5 text-[9px] uppercase border-[oklch(0.4_0.1_160)]/20 text-[oklch(0.4_0.1_160)] bg-[oklch(0.4_0.1_160)]/5">Live</Badge>
        </div>

        {slots.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
            <CalendarX2 className="h-4 w-4 opacity-50" strokeWidth={1.5} />
            No slots currently available.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {slots.map((slot) => (
              <Button
                key={slot.id}
                type="button"
                variant="outline"
                size="sm"
                disabled={pendingSlotId !== null}
                onClick={() => handleBook(slot.id, formatDateTime(slot.starts_at))}
                className="rounded-full transition-all duration-300 hover:border-[oklch(0.4_0.1_160)] hover:text-[oklch(0.4_0.1_160)] hover:shadow-sm active:scale-95"
              >
                {pendingSlotId === slot.id ? "Booking..." : formatDateTime(slot.starts_at)}
              </Button>
            ))}
          </div>
        )}

        {feedback?.type === "success" && (
          <div className="mt-4 flex items-start gap-2.5 bg-[oklch(0.4_0.1_160)]/5 p-3 rounded-xl border border-[oklch(0.4_0.1_160)]/10">
            <CheckCircle2 className="h-5 w-5 text-[oklch(0.4_0.1_160)] shrink-0" strokeWidth={1.5} />
            <p className="text-sm text-[oklch(0.4_0.1_160)] font-medium">
              Confirmed for {feedback.slotLabel}.
            </p>
          </div>
        )}
        {feedback?.type === "error" && (
          <div className="mt-4 p-3 rounded-xl bg-destructive/5 border border-destructive/10">
            <p className="text-sm text-destructive">{feedback.message}</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
