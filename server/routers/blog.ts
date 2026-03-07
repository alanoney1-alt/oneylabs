import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { createBlogPost, getPublishedBlogPosts, getAllBlogPosts, getBlogPostBySlug, updateBlogPost, deleteBlogPost } from "../db";

export const blogRouter = router({
  /** Public: get published posts */
  published: publicProcedure.query(async () => {
    return getPublishedBlogPosts();
  }),

  /** Public: get single post by slug */
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getBlogPostBySlug(input.slug);
    }),

  /** Admin: get all posts */
  list: protectedProcedure.query(async () => {
    return getAllBlogPosts();
  }),

  /** Admin: create post */
  create: protectedProcedure
    .input(z.object({
      slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
      title: z.string().min(5),
      excerpt: z.string().optional(),
      content: z.string().min(10),
      coverImageUrl: z.string().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      tags: z.string().optional(),
      status: z.enum(["draft", "published", "archived"]).default("draft"),
    }))
    .mutation(async ({ ctx, input }) => {
      await createBlogPost({
        slug: input.slug,
        title: input.title,
        excerpt: input.excerpt || null,
        content: input.content,
        coverImageUrl: input.coverImageUrl || null,
        metaTitle: input.metaTitle || null,
        metaDescription: input.metaDescription || null,
        tags: input.tags || null,
        authorId: ctx.user?.id || null,
        status: input.status,
        publishedAt: input.status === "published" ? new Date() : null,
      });
      return { success: true };
    }),

  /** Admin: update post */
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      slug: z.string().optional(),
      title: z.string().optional(),
      excerpt: z.string().optional(),
      content: z.string().optional(),
      coverImageUrl: z.string().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      tags: z.string().optional(),
      status: z.enum(["draft", "published", "archived"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const updateData: any = { ...data };
      if (data.status === "published") {
        updateData.publishedAt = new Date();
      }
      await updateBlogPost(id, updateData);
      return { success: true };
    }),

  /** Admin: delete post */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteBlogPost(input.id);
      return { success: true };
    }),
});
