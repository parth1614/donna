import { and, eq, is } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userPlan, users } from "~/server/db/schema";

export const userPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        transactionId: z.string() || z.null(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("User does not have a trial");

      await ctx.db
        .insert(userPlan)
        .values({
          ...input,
          createdAt: new Date(),
          userId: ctx.session.user.id,
        })
        .onConflictDoNothing();
    }),

  createTrial: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        transactionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.userPlan.findFirst({
        where: and(
          eq(userPlan.userId, ctx.session.user.id),
          eq(userPlan.planId, "5"),
        ),
      });

      console.log("User", user);
      if (user) {
        console.log("User already has a trial");
        return;
      }

      console.log("User does not have a trial");

      await ctx.db.insert(userPlan).values({
        ...input,
        createdAt: new Date(),
        userId: ctx.session.user.id,
      });

      console.log("done");
    }),

  getPlanByUser: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.query.userPlan.findMany({
      where: eq(userPlan.userId, userId),
    });
  }),

  getLatestPlanByUser: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.query.userPlan.findFirst({
      where: eq(userPlan.userId, userId),
    });
  }),
});
