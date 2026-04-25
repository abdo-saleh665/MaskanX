export interface Property {
  id: number;
  title: string;
  description?: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  status: string;
  images?: string[];
  owner_id?: number;
  owner?: { name: string; email: string };
  featured?: boolean;
  // Legacy fields used by hooks/components
  page?: string;
  property_info?: any;
  amenities?: string[];
  type?: string;
}