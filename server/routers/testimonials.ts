import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { createTestimonial, getPublishedTestimonials, getAllTestimonials, updateTestimonial, deleteTestimonial } from "../db";

export const testimonialsRouter = router({
  /** Public: get published testimonials */
  published: publicProcedure.query(async () => {
    return getPublishedTestimonials();
  }),

  /** Admin: get all testimonials */
  list: protectedProcedure.query(async () => {
    return getAllTestimonials();
  }),

  /** Admin: create testimonial */
  create: protectedProcedure
    .input(z.object({
      clientName: z.string().min(2),
      businessName: z.string().optional(),
      industry: z.string().optional(),
      quote: z.string().min(10),
      rating: z.number().min(1).max(5).optional(),
      imageUrl: z.string().optional(),
      beforeMetric: z.string().optional(),
      afterMetric: z.string().optional(),
      featured: z.boolean().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      await createTestimonial({
        clientName: input.clientName,
        businessName: input.businessName || null,
        industry: input.industry || null,
        quote: input.quote,
        rating: input.rating || null,
        imageUrl: input.imageUrl || null,
        beforeMetric: input.beforeMetric || null,
        afterMetric: input.afterMetric || null,
        featured: input.featured ?? false,
        published: input.published ?? true,
      });
      return { success: true };
    }),

  /** Admin: update testimonial */
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      clientName: z.string().optional(),
      businessName: z.string().optional(),
      industry: z.string().optional(),
      quote: z.string().optional(),
      rating: z.number().min(1).max(5).optional(),
      imageUrl: z.string().optional(),
      beforeMetric: z.string().optional(),
      afterMetric: z.string().optional(),
      featured: z.boolean().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateTestimonial(id, data as any);
      return { success: true };
    }),

  /** Admin: delete testimonial */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteTestimonial(input.id);
      return { success: true };
    }),
});
