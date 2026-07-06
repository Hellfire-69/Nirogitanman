"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { CalendarClock } from "lucide-react";
import { GlassCard } from "./GlassCard";
import type { UpcomingBooking } from "@/lib/dashboard-data";

function initials(name: string) {
  return name
    .split(" ")
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

interface UpcomingBookingsProps {
  bookings: UpcomingBooking[];
}

export function UpcomingBookings({ bookings }: UpcomingBookingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-5">
        <h2 className="font-heading text-lg font-medium text-foreground mb-4">
          Upcoming Bookings
        </h2>
        {bookings.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarClock />
              </EmptyMedia>
              <EmptyTitle>No upcoming bookings</EmptyTitle>
              <EmptyDescription>
                Book a consultation to see it appear here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-3">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 px-4 py-3"
              >
                <Avatar>
                  <AvatarFallback>{initials(booking.doctorName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {booking.doctorName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {booking.specialty} &middot; {formatDateTime(booking.startsAt)}
                  </p>
                </div>
                <Badge
                  variant={booking.status === "confirmed" ? "default" : "outline"}
                  className="capitalize"
                >
                  {booking.status}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </motion.div>
  );
}
