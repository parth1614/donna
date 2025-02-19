"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { userPlan } from "~/server/db/schema";
import { getServerAuthSession } from "~/server/auth";

const createUserPlanWithoutTransaction = async (input: any) => {
  const session = await getServerAuthSession();
  const userId = session?.user?.id
  input = {
    ...input,
    userId: userId,
    createdAt: new Date(),
  }
  await db
    .insert(userPlan)
    .values((input))
    .returning();
}

export { createUserPlanWithoutTransaction }