import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "y/server/api/trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  updateUsername: protectedProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
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
      return ctx.db.user.findFirst({
        where: {
          username: input.id,
        },
        include: {
          links: true,
        },
      });
    }),
});
