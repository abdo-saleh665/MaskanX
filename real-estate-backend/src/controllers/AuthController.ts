import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  
  /**
   * POST /api/auth/signup
   * Handles user registration
   */
  static async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newUser = await AuthService.registerUser(req.body);
      
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
        data: newUser
      });
    } catch (error) {
      next(error); // Route to global error handler
    }
  }

  /**
   * POST /api/auth/login
   * Handles user authentication
   */
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authData = await AuthService.loginUser(req.body);

      res.status(200).json({
        success: true,
        message: "Login successful!",
        token: authData.token, // Maintained at root for backwards compatibility, but also in data if needed
        data: authData.user
      });
    } catch (error) {
      next(error); // Route to global error handler
    }
  }
}
