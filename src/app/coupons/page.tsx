import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import CouponsDashboard from "~/components/dashboard/CouponsDashboard";

export default async function SpacesPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!process.env.ADMIN_USER_ID!.includes(session?.user?.id as string)) {
    return null;
  }

  // const name = session?.user.name;
  // const adminUserId: string | undefined = process.env.ADMIN_USER_ID ?? session?.user.id;

  return (
    <div className="flex flex-col gap-8 p-4">
      <CouponsDashboard />
    </div>
  );
}
