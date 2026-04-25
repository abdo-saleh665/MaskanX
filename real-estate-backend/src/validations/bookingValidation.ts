import { z } from "zod";

export const bookingValidation = {
  create: z.object({
    body: z.object({
      property_id: z.number().int().positive("Property ID must be valid"),
      start_date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
      end_date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
      total_price: z.number().positive("Total price must be a positive number"),
    }).refine((data) => new Date(data.end_date) > new Date(data.start_date), {
      message: "End date must be after start date",
      path: ["end_date"],
    }),
  }),
  updateStatus: z.object({
    body: z.object({
      status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
    }),
  }),
};
