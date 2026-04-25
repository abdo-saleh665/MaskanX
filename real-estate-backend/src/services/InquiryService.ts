import { Inquiry, InquiryAttributes } from "../models/Inquiry";
import { Property } from "../models/Property";
import { ApiError } from "../utils/ApiError";

export class InquiryService {
  static async createInquiry(userId: number, data: InquiryAttributes) {
    const property = await Property.findByPk(data.property_id);
    if (!property) {
      throw new ApiError(404, "Property not found");
    }

    return await Inquiry.create({ ...data, user_id: userId });
  }

  static async getUserInquiries(userId: number) {
    return await Inquiry.findAll({
      where: { user_id: userId },
      include: [{ model: Property, as: "property" }],
    });
  }

  static async getPropertyInquiries(propertyId: number, ownerId: number) {
    const property = await Property.findByPk(propertyId);
    if (!property || property.owner_id !== ownerId) {
      throw new ApiError(403, "Not authorized to view inquiries for this property");
    }

    return await Inquiry.findAll({
      where: { property_id: propertyId },
    });
  }

  static async updateInquiryStatus(inquiryId: number, ownerId: number, status: string) {
    const inquiry = await Inquiry.findByPk(inquiryId, {
      include: [{ model: Property, as: "property" }],
    });

    if (!inquiry) {
      throw new ApiError(404, "Inquiry not found");
    }

    // Only property owner can update inquiry status
    if ((inquiry as any).property.owner_id !== ownerId) {
      throw new ApiError(403, "Not authorized to update this inquiry");
    }

    return await inquiry.update({ status });
  }
}
