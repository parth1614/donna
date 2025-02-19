"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { MONTHLY_CYCLE, MONTHLY_VALIDITY, YEARLY_CYCLE, YEARLY_VALIDITY } from "~/constant/price";
import { updateCouponUseCount } from "~/actions/coupons";

const BillingSuccess = () => {
  const query = useSearchParams();
  const orderId = query.get("order_id");
  const amount = query.get("amount");
  const billingCycle = query.get("billingCycle");
  const currency = query.get("currency");
  const planId = query.get("planId");
  const npId = query.get("NP_id");
  const selectedCoupon = query.get("selectedCoupon");
  const validity =
    billingCycle === MONTHLY_CYCLE
      ? MONTHLY_VALIDITY
      : billingCycle === YEARLY_CYCLE
        ? YEARLY_VALIDITY
        : 0;
  const router = useRouter();

  const transaction = api.transactions.createTransactions.useMutation();
  if (selectedCoupon) {
    updateCouponUseCount(selectedCoupon).catch((error) => {
      console.log("[ERROR while updating coupon]", error?.message || error);
    });
  }
  const userPlan = api.userPlan.create.useMutation({
    onSuccess: (data) => {
      console.log("userPlan", data);
      router.push("/");
    },
    onError: (error) => {
      console.log("error", error);
      router.push("/");
    },
  });

  useEffect(() => {
    if (orderId && amount && billingCycle && currency && planId && npId) {
      userPlan.mutate({
        planId: planId,
        transactionId: orderId,
        startDate: new Date(),
        endDate: new Date(
          new Date().getTime() + validity * 24 * 60 * 60 * 1000,
        ),
      });
      transaction.mutate({
        orderId: orderId,
        amount: Math.round(Number(amount)),
        billingCycle: billingCycle,
        currency: currency,
        planId: Number(planId),
        npId: npId,
        expiresAt: new Date(
          new Date().getTime() + validity * 24 * 60 * 60 * 1000,
        ),
      });
    }
  }, [orderId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-4 md:p-12">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <h1 className="text-center text-2xl font-bold">
        Thank you for subscribing
      </h1>
      <Link href="/">
        <Button> Go to Home</Button>
      </Link>
    </div>
  );
};

export default BillingSuccess;

// const url = new URL("http://localhost:3000/manage-billing/payment-success?order_id=458722&amount=14&billingCycle=monthly&currency=usd&selectedPlan=pro&NP_id=52700096907");
