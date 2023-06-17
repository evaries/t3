import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "y/server/api/trpc";

export const linkRouter = createTRPCRouter({
  getAllLinks: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.link.findMany();
  }),

  getAllUserLinks: privateProcedure.query(async ({ ctx }) => {
    return ctx.prisma.link.findMany({
      where: { authorId: ctx.userId },
    });
  }),

  getLinksByUserId: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.link.findMany({
        where: { authorId: input.id },
      });
    }),

  createLink: privateProcedure
    .input(
      z.object({
        name: z.string().min(1),
        to: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.link.create({
        data: {
          authorId: ctx.userId,
          name: input.name,
          to: input.to,
        },
      });
    }),

  deleteLink: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.link.delete({
        where: { id: input.id },
      });
    }),

  updateLink: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        to: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = {
        authorId: ctx.userId,
        ...(input.name && { name: input.name }),
        ...(input.to && { to: input.to }),
      };
      return ctx.prisma.link.update({
        where: { id: input.id },
        data,
      });
    }),
});
