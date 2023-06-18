import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "y/server/api/trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: privateProcedure.query(async ({ ctx }) => {
    console.log(ctx.userId);
    return ctx.prisma.user.findFirst({
      where: {
        clerkId: ctx.userId,
      },
    });
  }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  updateUsername: privateProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          clerkId: ctx.userId,
        },
        data: {
          username: input.username,
        },
      });
    }),

  getUserByUsername: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          clerkId: input.id,
        },
        include: {
          Link: true,
        },
      });
    }),
});
