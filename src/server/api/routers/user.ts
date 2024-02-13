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

  updateUser: protectedProcedure
    .input(
      z.object({
        username: z.string().optional(),
        bio: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updateData: Record<string, any> = {};

      if (input.username) {
        updateData.username = input.username;
      }

      if (input.bio) {
        updateData.bio = input.bio;
      }

      if (input.image) {
        updateData.image = input.image;
      }

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: updateData,
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
