import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { createLead, getLeads, updateLeadStatus } from "../db";

export const leadsRouter = router({
  /** Submit a lead from contact form or chatbot */
  submit: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        phone: z.string().optional(),
        businessName: z.string().optional(),
        service: z.string().optional(),
        location: z.string().optional(),
        source: z.enum(["visibility_checker", "chatbot", "contact_form", "booking"]).default("contact_form"),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createLead({
        email: input.email,
        name: input.name || null,
        phone: input.phone || null,
        businessName: input.businessName || null,
        service: input.service || null,
        location: input.location || null,
        source: input.source,
        message: input.message || null,
      });

      await notifyOwner({
        title: `New Lead: ${input.name || input.email}`,
        content: `Source: ${input.source}\nEmail: ${input.email}\nBusiness: ${input.businessName || "N/A"}\nMessage: ${input.message || "N/A"}`,
      });

      return { success: true };
    }),

  /** Admin: list all leads */
  list: protectedProcedure.query(async () => {
    return getLeads();
  }),

  /** Admin: update lead status */
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
    }))
    .mutation(async ({ input }) => {
      await updateLeadStatus(input.id, input.status);
      return { success: true };
    }),
});
