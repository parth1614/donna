import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import OverviewLayout from "~/components/privateLibrary/OverviewLayout";
import dynamic from 'next/dynamic';

// Dynamically import the DatePickerWithRange component
const DynamicDatePickerWithRange = dynamic(
  () => import('~/components/ui/datePicker').then((mod) => mod.DatePickerWithRange),
  { ssr: false }
);

const Page: React.FC = async () => {
  const session = await getServerAuthSession();

  // const userId = session?.user?.id;
  const userId = process.env.CURRENT_USER_ID ?? session?.user.id;


  if (!session) {
    redirect("/api/auth/signin");
  }
  
  // Default date range (15 days ago to today)
  const defaultStartDate = new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultEndDate = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="flex w-full flex-col justify-center gap-10 px-4 py-6">
        <div className="flex w-full flex-row gap-5 overflow-x-auto p-2">
          <DynamicDatePickerWithRange 
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
          />
        </div>
        <OverviewLayout
          userId={userId ?? ""}
          startDate={defaultStartDate ?? ""}
          endDate={defaultEndDate ?? ""}
        />
      </div>
    </div>
  );
};

export default Page;