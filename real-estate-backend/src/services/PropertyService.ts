import { Property, PropertyAttributes } from '../models/Property';
import { ApiError } from '../utils/ApiError';

export class PropertyService {
  /**
   * Fetch all properties with pagination and query optimization
   */
  static async getAllProperties(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Property.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'price', 'location', 'bedrooms', 'bathrooms', 'area'] // Query optimization: select specific columns
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      properties: rows,
    };
  }

  /**
   * Fetch properties owned by a specific user
   */
  static async getMyProperties(ownerId: number, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Property.findAndCountAll({
      where: { owner_id: ownerId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'price', 'location', 'bedrooms', 'bathrooms', 'area', 'status']
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      properties: rows,
    };
  }

  /**
   * Fetch a single property by ID
   */
  static async getPropertyById(id: number) {
    const property = await Property.findByPk(id);
    if (!property) {
      throw new ApiError(404, 'Property not found');
    }
    return property;
  }

  /**
   * Create a new property
   */
  static async createProperty(ownerId: number, data: PropertyAttributes) {
    return await Property.create({ ...data, owner_id: ownerId });
  }

  /**
   * Update an existing property
   */
  static async updateProperty(id: number, ownerId: number, role: string, data: Partial<PropertyAttributes>) {
    const property = await this.getPropertyById(id);
    
    if (property.owner_id !== ownerId && role !== "admin") {
      throw new ApiError(403, "Not authorized to update this property");
    }

    return await property.update(data);
  }

  /**
   * Delete a property
   */
  static async deleteProperty(id: number, ownerId: number, role: string) {
    const property = await this.getPropertyById(id);

    if (property.owner_id !== ownerId && role !== "admin") {
      throw new ApiError(403, "Not authorized to delete this property");
    }

    await property.destroy();
    return true;
  }
}
