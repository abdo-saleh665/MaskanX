import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/ReviewService";

export class ReviewController {
  static async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const newReview = await ReviewService.createReview(user.id, req.body);
      res.status(201).json({
        success: true,
        message: "Review added successfully",
        data: newReview,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPropertyReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const propertyId = parseInt(req.params.propertyId, 10);
      const reviews = await ReviewService.getPropertyReviews(propertyId);
      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const id = parseInt(req.params.id, 10);
      await ReviewService.deleteReview(id, user.id, user.role);
      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
