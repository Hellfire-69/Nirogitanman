import {
  getDashboardUser,
  getUpcomingBookings,
  getActiveDietPlan,
} from "@/lib/dashboard-data";
import { GreetingHeader } from "@/components/dashboard/GreetingHeader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingBookings } from "@/components/dashboard/UpcomingBookings";
import { DietPlanSnapshot } from "@/components/dashboard/DietPlanSnapshot";

export default async function DashboardPage() {
  const [user, bookings, dietPlan] = await Promise.all([
    getDashboardUser(),
    getUpcomingBookings(),
    getActiveDietPlan(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <GreetingHeader
        fullName={user?.full_name ?? "Guest"}
        doshaType={user?.dosha_type ?? null}
      />
      <QuickActions />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingBookings bookings={bookings} />
        <DietPlanSnapshot plan={dietPlan} />
      </div>
    </div>
  );
}
