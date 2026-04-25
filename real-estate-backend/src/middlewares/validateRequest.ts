import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

/**
 * Validates incoming request data against a specified Zod schema.
 */
export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Map zod error issues into a single descriptive string
        const errorMessages = error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(", ");
        return next(new ApiError(400, `Validation Failed - ${errorMessages}`));
      }
      next(error);
    }
  };
};
