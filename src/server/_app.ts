import {
  userRouter,
} from "@/server/routers";
import { router } from "@/server/trpc";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
