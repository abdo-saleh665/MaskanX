import { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/BookingService";

export class BookingController {
  static async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const newBooking = await BookingService.createBooking(user.id, req.body);
      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: newBooking,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserBookings(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const bookings = await BookingService.getUserBookings(user.id);
      res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPropertyBookings(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const propertyId = parseInt(req.params.propertyId, 10);
      const bookings = await BookingService.getPropertyBookings(propertyId, user.id);
      res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateBookingStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const id = parseInt(req.params.id, 10);
      const updatedBooking = await BookingService.updateBookingStatus(id, user.id, req.body.status);
      res.status(200).json({
        success: true,
        message: "Booking status updated",
        data: updatedBooking,
      });
    } catch (error) {
      next(error);
    }
  }
}
