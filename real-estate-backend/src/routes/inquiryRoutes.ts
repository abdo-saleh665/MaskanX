import { Router } from "express";
import { InquiryController } from "../controllers/InquiryController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { inquiryValidation } from "../validations/inquiryValidation";

const router = Router();

// Ensure all inquiry routes are authenticated
router.use(authenticate);

// User endpoints
router.post("/", validateRequest(inquiryValidation.create), InquiryController.createInquiry);
router.get("/my-inquiries", InquiryController.getUserInquiries);

// Property Owner endpoints
router.get("/property/:propertyId", InquiryController.getPropertyInquiries);
router.patch("/:id/status", validateRequest(inquiryValidation.updateStatus), InquiryController.updateInquiryStatus);

export default router;
