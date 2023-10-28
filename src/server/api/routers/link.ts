import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "y/server/api/trpc";

export const linkRouter = createTRPCRouter({
  getAllLinks: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.link.findMany();
  }),

  getAllUserLinks: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.link.findMany({
      where: { authorId: ctx.session.user.id },
    });
  }),

  getLinksByUserId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.link.findMany({
        where: { authorId: input.id },
      });
    }),

  createLink: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        to: z.string().min(1),
        position: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.create({
        data: {
          authorId: ctx.session.user.id,
          name: input.name,
          to: input.to,
          position: input.position,
          userId: ctx.session.user.id,
        },
      });
    }),

  deleteLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.delete({
        where: { id: input.id },
      });
    }),

  updateLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        to: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = {
        authorId: ctx.session.user.id,
        ...(input.name && { name: input.name }),
        ...(input.to && { to: input.to }),
      };
      return ctx.db.link.update({
        where: { id: input.id },
        data,
      });
    }),

  setIsActive: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.update({
        where: { id: input.id },
        data: {
          isActive: input.isActive,
        },
      });
    }),
});
