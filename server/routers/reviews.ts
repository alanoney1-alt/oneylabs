import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { createReview, getPublishedReviews, getAllReviews, updateReview, deleteReview } from "../db";

export const reviewsRouter = router({
  /** Public: get published reviews */
  published: publicProcedure.query(async () => {
    return getPublishedReviews();
  }),

  /** Admin: get all reviews */
  list: protectedProcedure.query(async () => {
    return getAllReviews();
  }),

  /** Admin: add review manually */
  create: protectedProcedure
    .input(z.object({
      reviewerName: z.string().min(2),
      rating: z.number().min(1).max(5),
      text: z.string().optional(),
      source: z.string().default("google"),
      reviewDate: z.string().optional(),
      profilePhotoUrl: z.string().optional(),
      published: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      await createReview({
        reviewerName: input.reviewerName,
        rating: input.rating,
        text: input.text || null,
        source: input.source,
        reviewDate: input.reviewDate || null,
        profilePhotoUrl: input.profilePhotoUrl || null,
        published: input.published,
      });
      return { success: true };
    }),

  /** Admin: update review */
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      reviewerName: z.string().optional(),
      rating: z.number().min(1).max(5).optional(),
      text: z.string().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateReview(id, data as any);
      return { success: true };
    }),

  /** Admin: delete review */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteReview(input.id);
      return { success: true };
    }),
});
