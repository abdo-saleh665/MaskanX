import { Booking, BookingAttributes } from "../models/Booking";
import { Property } from "../models/Property";
import { ApiError } from "../utils/ApiError";

export class BookingService {
  static async createBooking(userId: number, data: BookingAttributes) {
    const property = await Property.findByPk(data.property_id);
    if (!property) {
      throw new ApiError(404, "Property not found");
    }

    return await Booking.create({ ...data, user_id: userId });
  }

  static async getUserBookings(userId: number) {
    return await Booking.findAll({
      where: { user_id: userId },
      include: [{ model: Property, as: "property" }],
    });
  }

  static async getPropertyBookings(propertyId: number, ownerId: number) {
    const property = await Property.findByPk(propertyId);
    if (!property || property.owner_id !== ownerId) {
      throw new ApiError(403, "Not authorized to view bookings for this property");
    }

    return await Booking.findAll({
      where: { property_id: propertyId },
    });
  }

  static async updateBookingStatus(bookingId: number, ownerId: number, status: string) {
    const booking = await Booking.findByPk(bookingId, {
      include: [{ model: Property, as: "property" }],
    });

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    // Only property owner can update booking status
    if ((booking as any).property.owner_id !== ownerId) {
      throw new ApiError(403, "Not authorized to update this booking");
    }

    return await booking.update({ status });
  }
}
