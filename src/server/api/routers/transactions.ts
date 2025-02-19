import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { coupons, transactions, users } from "~/server/db/schema";

export const transactionsRouter = createTRPCRouter({
  createTransactions: protectedProcedure
    .input(
      z.object({
        npId: z.string(),
        orderId: z.string(),
        amount: z.number(),
        currency: z.string(),
        billingCycle: z.string(),
        expiresAt: z.date(),
        planId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(transactions).values({
        ...input,
        createdAt: new Date(),
        userId: ctx.session.user.id,
      });
    }),

  getTransactionByUser: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.query.transactions.findMany({
      where: eq(users.id, userId),
    });
  }),
});
