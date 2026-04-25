import { Router } from "express";
import { ReviewController } from "../controllers/ReviewController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { reviewValidation } from "../validations/reviewValidation";

const router = Router();

// Public endpoints
router.get("/property/:propertyId", ReviewController.getPropertyReviews);

// Protected endpoints
router.use(authenticate);
router.post("/", validateRequest(reviewValidation.create), ReviewController.createReview);
router.delete("/:id", ReviewController.deleteReview);

export default router;
