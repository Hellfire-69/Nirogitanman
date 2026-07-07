import {
  getDashboardUser,
  getUpcomingBookings,
  getActiveDietPlan,
  getDashboardStats,
  getActivityChartData,
} from "@/lib/dashboard-data";
import { GreetingHeader } from "@/components/dashboard/GreetingHeader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingBookings } from "@/components/dashboard/UpcomingBookings";
import { DietPlanSnapshot } from "@/components/dashboard/DietPlanSnapshot";
import { WellnessStatsRow } from "@/components/dashboard/WellnessStatsRow";
import { ActivityChart } from "@/components/dashboard/ActivityChart";

export default async function DashboardPage() {
  const [user, bookings, dietPlan, stats, activityData] = await Promise.all([
    getDashboardUser(),
    getUpcomingBookings(),
    getActiveDietPlan(),
    getDashboardStats(),
    getActivityChartData(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <GreetingHeader
        fullName={user?.full_name ?? "Guest"}
        doshaType={user?.dosha_type ?? null}
      />
      <WellnessStatsRow stats={stats} />
      <QuickActions />
      <ActivityChart data={activityData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingBookings bookings={bookings} />
        <DietPlanSnapshot plan={dietPlan} />
      </div>
    </div>
  );
}
