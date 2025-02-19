import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { twitterSpaces } from "~/server/db/schema";

export const twitterSpacesRouter = createTRPCRouter({
  getSpacesById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(twitterSpaces)
        .where(eq(twitterSpaces.id, input.id));
    }),
});
