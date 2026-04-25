import { Review, ReviewAttributes } from "../models/Review";
import { Property } from "../models/Property";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

export class ReviewService {
  static async createReview(userId: number, data: ReviewAttributes) {
    const property = await Property.findByPk(data.property_id);
    if (!property) {
      throw new ApiError(404, "Property not found");
    }

    // Check if user already reviewed this property
    const existingReview = await Review.findOne({
      where: { property_id: data.property_id, user_id: userId }
    });
    if (existingReview) {
      throw new ApiError(400, "You have already reviewed this property");
    }

    return await Review.create({ ...data, user_id: userId });
  }

  static async getPropertyReviews(propertyId: number) {
    return await Review.findAll({
      where: { property_id: propertyId },
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
    });
  }

  static async deleteReview(reviewId: number, userId: number, role: string) {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      throw new ApiError(404, "Review not found");
    }

    if (review.user_id !== userId && role !== "admin") {
      throw new ApiError(403, "Not authorized to delete this review");
    }

    await review.destroy();
    return true;
  }
}
