"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { coupons } from "~/server/db/schema";

const createCoupon = async (couponData: any) => {
  if (!couponData) return null;

  const createdCoupon = await db.insert(coupons).values(couponData).returning();
  return createdCoupon[0];
}

const fetchCoupons = async () => {
  const availableCoupons = await db.select().from(coupons);
  return availableCoupons;
}

const fetchCouponByCode = async (couponCode: string) => {

  const coupon = await db
    .select()
    .from(coupons)
    .where(eq(coupons.code, couponCode));

  if (!coupon[0] || coupon?.length === 0) {
    return "No such coupons found";
  }

  if (coupon[0]?.use_count && coupon[0]?.use_count >= coupon[0]?.exhaust_limit) {
    return "Coupon has ended";
  }

  return coupon[0];
}

const updateCoupon = async (couponData: any, couponCode: string) => {
  if (!couponData) return null;

  const updatedCoupon = await db
    .update(coupons)
    .set(couponData)
    .where(eq(coupons.code, couponCode))
    .returning();
  return updatedCoupon[0];
}

const updateCouponUseCount = async (couponCode: string) => {
  console.log("HERE UPDATING COUPON")
  const updatedCoupon = await db
    .update(coupons)
    .set({ use_count: sql`${coupons.use_count} + 1` })
    .where(eq(coupons.code, couponCode))
    .returning();
    console.log("updatedCouponUPDATINGGG", updatedCoupon)
  return updatedCoupon[0];
}

export { fetchCoupons, createCoupon, updateCoupon, fetchCouponByCode, updateCouponUseCount }