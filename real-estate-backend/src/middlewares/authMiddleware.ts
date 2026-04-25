import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * Validates JWT token from the Authorization header Authorization: Bearer <token>
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Not authorized, token missing");
    }

    const token = authHeader.split(" ")[1];
    
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    
    // Fetch user and attach to request
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new ApiError(401, "Not authorized, user no longer exists");
    }

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error: any) {
    next(new ApiError(401, "Not authorized, token failed"));
  }
};

/**
 * Role-Based Access Control
 * Example usage: authorizeRoles("admin", "manager")
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user;
    if (!user || !roles.includes(user.role)) {
      return next(new ApiError(403, `User role (${user?.role || "unknown"}) is not authorized to access this resource`));
    }
    next();
  };
};
