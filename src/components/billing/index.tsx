"use client";
import React, { useState } from "react";
import Subscription from "./Subscription";
import Cart from "./Cart";
import { MONTHLY_CYCLE, PRO_MONTHLY, PRO_PLAN } from "~/constant/price";

export interface Plan {
  id: number;
  selectedPlan: string;
  billingCycle: string;
  currency: string;
  price: number;
  setDiscountedPrice?: (price: number) => void;
  discountedPrice?: number;
  selectedCoupon?: string;
}

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>({
    id: 1,
    selectedPlan: PRO_PLAN,
    billingCycle: MONTHLY_CYCLE,
    currency: "usd",
    price: PRO_MONTHLY,
  });
  const [discountedPrice, setDiscountedPrice] = useState(PRO_MONTHLY);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  console.log("selectedCouponINDEX", selectedCoupon);
  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  console.log("selectedPlan", selectedPlan);

  return (
    <div>
      <h1 className="mb-4 mt-6 px-6 text-2xl font-bold">Manage Billing</h1>
      <div className="flex flex-col gap-3 md:flex-row">
        <Subscription setDiscountedPrice={setDiscountedPrice} discountedPrice={discountedPrice} onSelectPlan={handleSelectPlan} setSelectedCoupon={setSelectedCoupon}/>
        <Cart {...selectedPlan} setDiscountedPrice={setDiscountedPrice} discountedPrice={discountedPrice} selectedCoupon={selectedCoupon}/>
      </div>
    </div>
  );
};

export default Billing;
