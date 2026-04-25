import { z } from "zod";

export const propertyValidation = {
  create: z.object({
    body: z.object({
      title: z.string().min(5, "Title must be at least 5 characters long"),
      description: z.string().min(10, "Description must be at least 10 characters long"),
      price: z.number().positive("Price must be a positive number"),
      location: z.string().min(3, "Location must be at least 3 characters long"),
      bedrooms: z.number().int().nonnegative("Bedrooms must be a non-negative integer"),
      bathrooms: z.number().int().nonnegative("Bathrooms must be a non-negative integer"),
      area: z.number().positive("Area must be a positive number"),
      status: z.enum(["available", "sold", "rented"]).optional(),
    }),
  }),
  update: z.object({
    body: z.object({
      title: z.string().min(5).optional(),
      description: z.string().min(10).optional(),
      price: z.number().positive().optional(),
      location: z.string().min(3).optional(),
      bedrooms: z.number().int().nonnegative().optional(),
      bathrooms: z.number().int().nonnegative().optional(),
      area: z.number().positive().optional(),
      status: z.enum(["available", "sold", "rented"]).optional(),
    }),
  }),
};
