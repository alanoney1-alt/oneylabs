import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { createBooking, getBookings, updateBookingStatus, createLead } from "../db";

export const bookingsRouter = router({
  /** Public: book an appointment */
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        businessName: z.string().optional(),
        serviceType: z.enum(["ai_audit", "consultation", "workshop", "build_session"]).default("ai_audit"),
        preferredDate: z.string(),
        preferredTime: z.string(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createBooking({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        businessName: input.businessName || null,
        serviceType: input.serviceType,
        preferredDate: input.preferredDate,
        preferredTime: input.preferredTime,
        notes: input.notes || null,
      });

      // Also create a lead
      await createLead({
        email: input.email,
        name: input.name,
        phone: input.phone || null,
        businessName: input.businessName || null,
        source: "booking",
        message: `Booked ${input.serviceType} for ${input.preferredDate} at ${input.preferredTime}`,
      });

      await notifyOwner({
        title: `New Booking: ${input.serviceType}`,
        content: `${input.name} (${input.email}) booked a ${input.serviceType} for ${input.preferredDate} at ${input.preferredTime}.\nBusiness: ${input.businessName || "N/A"}\nNotes: ${input.notes || "None"}`,
      });

      return { success: true };
    }),

  /** Admin: list all bookings */
  list: protectedProcedure.query(async () => {
    return getBookings();
  }),

  /** Admin: update booking status */
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      await updateBookingStatus(input.id, input.status);
      return { success: true };
    }),
});
