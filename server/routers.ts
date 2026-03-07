import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { visibilityRouter } from "./routers/visibility";
import { leadsRouter } from "./routers/leads";
import { bookingsRouter } from "./routers/bookings";
import { testimonialsRouter } from "./routers/testimonials";
import { blogRouter } from "./routers/blog";
import { reviewsRouter } from "./routers/reviews";
import { chatbotRouter } from "./routers/chatbot";
import { dashboardRouter } from "./routers/dashboard";
import { agentRouter } from "./routers/agent";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  visibility: visibilityRouter,
  leads: leadsRouter,
  bookings: bookingsRouter,
  testimonials: testimonialsRouter,
  blog: blogRouter,
  reviews: reviewsRouter,
  chatbot: chatbotRouter,
  dashboard: dashboardRouter,
  agent: agentRouter,
});

export type AppRouter = typeof appRouter;
