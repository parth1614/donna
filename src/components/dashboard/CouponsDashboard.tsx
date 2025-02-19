"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Loader2, RefreshCcw } from "lucide-react";
import {
  createCoupon,
  fetchCoupons,
} from "../../actions/coupons";

interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  max_discount_amount: number;
  min_order_amount: number;
  use_count?: number;
  exhaust_limit: number;
  createdAt: string;
  updatedAt: string;
}

export default function CouponsDashboard() {
  // State variables for coupon inputs
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number>();
  const [maxDiscountAmount, setMaxDiscountAmount] = useState<number>();
  const [minProductAmount, setMinProductAmount] = useState<number>();
  const [exhaustLimit, setExhaustLimit] = useState<number>();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("active"); // Tab state

  const fetchAllCoupons = useCallback(() => {
    setIsUpdating(true);
    fetchCoupons()
      //@ts-ignore
      .then((coupons) => setCoupons(coupons))
      .catch((error) => {
        console.error("Error fetching coupons:", error);
        toast.error("Failed to fetch coupons");
      })
      .finally(() => setIsUpdating(false));
  }, []);

  useEffect(() => {
    void fetchAllCoupons();
    const intervalId = setInterval(() => void fetchAllCoupons(), 10000);
    return () => clearInterval(intervalId);
  }, [fetchAllCoupons]);

  const addCoupon = () => {
    if (
      !couponCode ||
      discountPercentage! <= 0 ||
      maxDiscountAmount! <= 0 ||
      minProductAmount! < 0 ||
      exhaustLimit! < 0
    ) {
      toast.error("Please fill in all fields with valid values");
      return;
    }

    setIsAddingCoupon(true);
    const newCouponData = {
      code: couponCode,
      discount_percentage: discountPercentage,
      max_discount_amount: maxDiscountAmount,
      min_order_amount: minProductAmount,
      exhaust_limit: exhaustLimit,
    };

    createCoupon(newCouponData)
      .then((newCoupon) => {
        //@ts-ignore
        setCoupons((prev) => [newCoupon, ...prev]);
        setCouponCode("");
        setDiscountPercentage(0);
        setMaxDiscountAmount(0);
        setMinProductAmount(0);
        setExhaustLimit(0);
        toast.success(`Coupon "${newCoupon?.code}" added successfully`);
      })
      .catch((error) => {
        console.error("Error adding coupon:", error);
        toast.error("Failed to add coupon");
      })
      .finally(() => setIsAddingCoupon(false));
  };

  const activeCoupons = coupons.filter(
    (coupon) => (coupon.use_count || 0) < coupon.exhaust_limit
  );
  const finishedCoupons = coupons.filter(
    (coupon) => (coupon.use_count || 0) >= coupon.exhaust_limit
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Add Coupon Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add Coupon</CardTitle>
          <CardDescription>
            Create coupons for your amazing customers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full gap-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 basis-2/3">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              placeholder="Discount Percentage"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={maxDiscountAmount}
              onChange={(e) => setMaxDiscountAmount(Number(e.target.value))}
              placeholder="Max Discount Amount"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={minProductAmount}
              onChange={(e) => setMinProductAmount(Number(e.target.value))}
              placeholder="Min Product Amount"
              disabled={isAddingCoupon}
            />
            <Input
              type="number"
              value={exhaustLimit}
              onChange={(e) => setExhaustLimit(Number(e.target.value))}
              placeholder="Exhaust Limit"
              disabled={isAddingCoupon}
            />
          </div>
          <Button onClick={addCoupon} disabled={isAddingCoupon}>
            {isAddingCoupon ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Coupon"
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          variant={activeTab === "active" ? "default" : null}
          onClick={() => setActiveTab("active")}
        >
          Active Coupons
        </Button>
        <Button
          variant={activeTab === "finished" ? "default" : null}
          onClick={() => setActiveTab("finished")}
        >
          Finished Coupons
        </Button>
      </div>

      {/* Coupons List based on the selected tab */}
      <div className="mt-4">
        {activeTab === "active" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCoupons.map((coupon) => (
              <Card key={coupon.id} className="w-full">
                <CardHeader>
                  <CardTitle className="truncate text-sm">
                    {coupon.code}
                  </CardTitle>
                  <CardDescription>
                    Discount: {coupon?.discount_percentage}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p>
                    <strong>Max Discount:</strong> ${coupon?.max_discount_amount}
                  </p>
                  <p>
                    <strong>Min Product Amount:</strong> ${coupon?.min_order_amount}
                  </p>
                  <p>
                    <strong>Exhaust Limit:</strong> {coupon?.exhaust_limit}
                  </p>
                  <p>
                    <strong>Use Count:</strong> {coupon?.use_count}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {finishedCoupons.map((coupon) => (
              <Card key={coupon.id} className="w-full">
                <CardHeader>
                  <CardTitle className="truncate text-sm">
                    {coupon.code}
                  </CardTitle>
                  <CardDescription>
                    Discount: {coupon?.discount_percentage}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p>
                    <strong>Max Discount:</strong> ${coupon?.max_discount_amount}
                  </p>
                  <p>
                    <strong>Min Product Amount:</strong> ${coupon?.min_order_amount}
                  </p>
                  <p>
                    <strong>Exhaust Limit:</strong> {coupon?.exhaust_limit}
                  </p>
                  <p>
                    <strong>Use Count:</strong> {coupon?.use_count}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
