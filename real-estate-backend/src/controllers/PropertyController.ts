import { Request, Response, NextFunction } from 'express';
import { PropertyService } from '../services/PropertyService';

export class PropertyController {
  
  // GET /api/properties?page=1&limit=10
  static async getProperties(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse pagination parameters (default: page 1, 10 items per page)
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const paginatedData = await PropertyService.getAllProperties(page, limit);
      
      res.status(200).json({
        success: true,
        message: 'Properties retrieved successfully',
        data: paginatedData
      });
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }

  // GET /api/properties/my-properties
  static async getMyProperties(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const paginatedData = await PropertyService.getMyProperties(user.id, page, limit);
      
      res.status(200).json({
        success: true,
        message: 'My properties retrieved successfully',
        data: paginatedData
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/properties/:id
  static async getProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const property = await PropertyService.getPropertyById(id);
      
      res.status(200).json({
        success: true,
        message: 'Property retrieved successfully',
        data: property
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/properties
  static async createProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const newProperty = await PropertyService.createProperty(user.id, req.body);
      
      res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: newProperty
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/properties/:id
  static async updateProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const id = parseInt(req.params.id, 10);
      const updatedProperty = await PropertyService.updateProperty(id, user.id, user.role, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Property updated successfully',
        data: updatedProperty
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/properties/:id
  static async deleteProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const id = parseInt(req.params.id, 10);
      await PropertyService.deleteProperty(id, user.id, user.role);
      
      res.status(200).json({
        success: true,
        message: 'Property deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}
