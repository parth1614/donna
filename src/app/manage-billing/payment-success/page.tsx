// import { Suspense } from "react";
import { Suspense } from "react";
import BillingSuccess from "~/components/billing/BillingSuccess";

export const metadata = {
  title: "Smart Donna AI",
  description:
    "Automatically record, transcribe, and get actionable insights from your meetings.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Page = () => {
  return (
    <Suspense>
      <BillingSuccess />
    </Suspense>
  );
};

export default Page;

// http://localhost:3000/manage-billing/payment-success?order_id=34738&NP_id=4567658585
