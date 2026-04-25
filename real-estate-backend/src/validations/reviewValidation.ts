import { z } from "zod";

export const reviewValidation = {
  create: z.object({
    body: z.object({
      property_id: z.number().int().positive("Property ID must be valid"),
      rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
      comment: z.string().min(5, "Comment must be at least 5 characters long"),
    }),
  }),
};
