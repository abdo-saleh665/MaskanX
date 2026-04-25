import { Router } from "express";
import { BookingController } from "../controllers/BookingController";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { bookingValidation } from "../validations/bookingValidation";

const router = Router();

// Ensure all booking routes are authenticated
router.use(authenticate);

// User endpoints
router.post("/", validateRequest(bookingValidation.create), BookingController.createBooking);
router.get("/my-bookings", BookingController.getUserBookings);

// Property Owner endpoints
router.get("/property/:propertyId", BookingController.getPropertyBookings);
router.patch("/:id/status", validateRequest(bookingValidation.updateStatus), BookingController.updateBookingStatus);

export default router;
