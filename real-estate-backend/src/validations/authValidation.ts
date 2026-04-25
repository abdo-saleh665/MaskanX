import { z } from "zod";

export const authValidation = {
  // Schema for POST /api/auth/signup
  register: z.object({
    body: z.object({
      name: z.string({
        required_error: "Name is required",
      }).min(3, "Name must be at least 3 characters long"),
      
      email: z.string({
        required_error: "Email is required",
      }).email("Invalid email address format"),
      
      password: z.string({
        required_error: "Password is required",
      }).min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
        
      termsAccepted: z.boolean({
        required_error: "You must specify if terms are accepted",
      }).refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
      
      // Optional fields
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phoneNumber: z.string().optional(),
      role: z.enum(["user", "admin"]).optional(),
    }),
  }),

  // Schema for POST /api/auth/login
  login: z.object({
    body: z.object({
      email: z.string({
        required_error: "Email is required",
      }).email("Invalid email address format"),
      password: z.string({
        required_error: "Password is required",
      }),
    }),
  }),
};
