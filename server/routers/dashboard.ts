import { protectedProcedure, router } from "../_core/trpc";
import { getDashboardStats } from "../db";

export const dashboardRouter = router({
  /** Admin: get dashboard stats */
  stats: protectedProcedure.query(async () => {
    return getDashboardStats();
  }),
});
