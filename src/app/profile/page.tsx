import { getDashboardUser } from "@/lib/dashboard-data";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default async function ProfilePage() {
  const user = await getDashboardUser();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">Profile</p>
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
          Your profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Update your name and dosha preference.
        </p>
      </div>

      <ProfileForm user={user} />
    </div>
  );
}
