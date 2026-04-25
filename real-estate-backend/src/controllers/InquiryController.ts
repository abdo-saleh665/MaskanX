import { Request, Response, NextFunction } from "express";
import { InquiryService } from "../services/InquiryService";

export class InquiryController {
  static async createInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const newInquiry = await InquiryService.createInquiry(user.id, req.body);
      res.status(201).json({
        success: true,
        message: "Inquiry sent successfully",
        data: newInquiry,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserInquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const inquiries = await InquiryService.getUserInquiries(user.id);
      res.status(200).json({
        success: true,
        data: inquiries,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPropertyInquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const propertyId = parseInt(req.params.propertyId, 10);
      const inquiries = await InquiryService.getPropertyInquiries(propertyId, user.id);
      res.status(200).json({
        success: true,
        data: inquiries,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateInquiryStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const id = parseInt(req.params.id, 10);
      const updatedInquiry = await InquiryService.updateInquiryStatus(id, user.id, req.body.status);
      res.status(200).json({
        success: true,
        message: "Inquiry status updated",
        data: updatedInquiry,
      });
    } catch (error) {
      next(error);
    }
  }
}
