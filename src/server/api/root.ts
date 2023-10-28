import { createTRPCRouter } from "y/server/api/trpc";
import { userRouter } from "./routers/user";
import { linkRouter } from "./routers/link";

export const appRouter = createTRPCRouter({
  user: userRouter,
  link: linkRouter,
});

export type AppRouter = typeof appRouter;
