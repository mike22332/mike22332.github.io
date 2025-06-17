import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import paymentProcessRoute from "./routes/payment/process/route";
import processSubscriptionRoute from "./routes/payment/processSubscription/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  payment: createTRPCRouter({
    process: paymentProcessRoute,
    processSubscription: processSubscriptionRoute,
  }),
});

export type AppRouter = typeof appRouter;