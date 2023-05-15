import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "y/server/api/trpc";

export const postRouter = createTRPCRouter({

  getAllPost: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany()
  }),

  getPostByAuthorId: privateProcedure.query(async ({ ctx }) => {
    const authorId = ctx.userId
    return ctx.prisma.post.findMany({
      where: {
        author: authorId
      }
    })
  }),

  createPost: privateProcedure.input(z.object({
    content: z.string().min(1)
  })).mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId
    return ctx.prisma.post.create({
      data: {
        author: authorId,
        content: input.content
      }
    })
  }),

  deletePost: privateProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    return ctx.prisma.post.delete({
      where: { id: input.id }
    })
  })
});
