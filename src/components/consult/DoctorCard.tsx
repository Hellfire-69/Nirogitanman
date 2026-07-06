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
    <GlassCard className="p-5">
      <div className="flex items-start gap-4">
        <Avatar size="lg">
          <AvatarFallback>{initials(doctor.full_name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-heading text-base font-medium text-foreground truncate">
            {doctor.full_name}
          </p>
          <Badge variant="outline" className="mt-1">
            {doctor.specialty}
          </Badge>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
          Available slots
        </p>

        {slots.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarX2 className="h-4 w-4" strokeWidth={1.75} />
            No slots currently available.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => (
              <Button
                key={slot.id}
                type="button"
                variant="outline"
                size="sm"
                disabled={pendingSlotId !== null}
                onClick={() => handleBook(slot.id, formatDateTime(slot.starts_at))}
              >
                {pendingSlotId === slot.id ? "Booking..." : formatDateTime(slot.starts_at)}
              </Button>
            ))}
          </div>
        )}

        {feedback?.type === "success" && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
            Booked for {feedback.slotLabel}.
          </p>
        )}
        {feedback?.type === "error" && (
          <p className="mt-3 text-sm text-destructive">{feedback.message}</p>
        )}
      </div>
    </GlassCard>
  );
}
