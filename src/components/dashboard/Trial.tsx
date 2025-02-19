import React from "react";
import { Card, CardContent } from "../ui/card";
import { Clock } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { api } from "~/trpc/server";
import Link from "next/link";
import { MONTHLY_VALIDITY, TRIAL_VALIDITY, YEARLY_VALIDITY } from "~/constant/price";

const Trial = async () => {
  const user = await api.user.getUser();
  const createdAt = user?.createdAt;
  const createdAtDate = createdAt ? new Date(createdAt) : null;
  const currentDate = new Date();

  function generateRandomNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const orderId = generateRandomNumber();

  if (createdAtDate) {
    await api.userPlan.createTrial({
      planId: "5",
      transactionId: orderId.toString(),
      startDate: new Date(),
      endDate: new Date(createdAtDate.getTime() + 14 * 24 * 60 * 60 * 1000),
    });
  }

  const getPercentage = (remainingDays: number, totalDays: number): number => {
    if (totalDays <= 0) return 0;
    const percentage = (remainingDays / totalDays) * 100;
    return Math.round(Math.max(0, Math.min(100, percentage)));
  };

  const userPlans = await api.userPlan.getPlanByUser();

  const activeUserPlans = userPlans.filter((plan) => {
    if (!plan.startDate || !plan.endDate) return false;
    const startDate = new Date(plan.startDate);
    const endDate = new Date(plan.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  });

  const plans = {
    1: MONTHLY_VALIDITY,
    2: YEARLY_VALIDITY,
    3: MONTHLY_VALIDITY,
    4: YEARLY_VALIDITY,
    5: TRIAL_VALIDITY,
  } as Record<number, number>;

  const userValidPlanPeriod = activeUserPlans.map((plan) => {
    const planId = plan.planId;
    return plans[Number(planId)] ?? 0;
  });

  const totalDays = userValidPlanPeriod.reduce((a, b) => a + b, 0);

  let remainingDays = 0;
  let percentage = 0;

  if (activeUserPlans.length > 0 && totalDays > 0) {
    const minStartDate = activeUserPlans.reduce((minDate, plan) => {
      const startDate = new Date(plan.startDate);
      return startDate < minDate ? startDate : minDate;
    }, new Date());

    const maxEndDate = new Date(
      minStartDate.getTime() + totalDays * 24 * 60 * 60 * 1000,
    );

    remainingDays = Math.max(
      0,
      Math.ceil(
        (maxEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );

    percentage = getPercentage(remainingDays, totalDays);
  }

  console.log(
    "userValidPlanPeriod",
    userValidPlanPeriod,
    "remainingDays",
    remainingDays,
    "totalDays",
    totalDays,
  );

  const getTrialStatus = () => {
    if (totalDays === 0) {
      return "No active trial";
    } else if (remainingDays > 0) {
      return `${remainingDays} / ${totalDays} days left`;
    } else {
      return "Trial period has ended";
    }
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Clock size={30} />
            <div className="flex flex-col">
              <span>You are on a free trial of Professional Plan</span>
              <div className="flex items-center gap-4 whitespace-nowrap">
                <span>{getTrialStatus()}</span>
                {remainingDays > 0 && totalDays > 0 && (
                  <Progress value={100 - percentage} />
                )}
              </div>
            </div>
          </div>
          <Link href="/manage-billing">
            <Button>Manage Billing</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default Trial;
