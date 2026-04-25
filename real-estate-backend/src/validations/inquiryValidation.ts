import { z } from "zod";

export const inquiryValidation = {
  create: z.object({
    body: z.object({
      property_id: z.number().int().positive("Property ID must be valid"),
      message: z.string().min(10, "Message must be at least 10 characters long"),
    }),
  }),
  updateStatus: z.object({
    body: z.object({
      status: z.enum(["open", "replied", "closed"]),
    }),
  }),
};
