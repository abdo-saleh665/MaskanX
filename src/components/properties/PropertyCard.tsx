import { BedSingle, Bath, SquareUser, MapPin, Building, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const PropertyCard = ({ property }: { property: any }) => {
  const imageUrl = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
      {/* Premium Image Header */}
      <div className="relative h-60 bg-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
        <Image 
          src={imageUrl}
          alt={property.title || 'Luxury Property'}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <div className="bg-indigo-600 shadow-lg text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
            {property.status === 'rent' ? 'FOR RENT' : 'FOR SALE'}
          </div>
          {property.featured && (
            <div className="bg-amber-500 shadow-lg text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
              FEATURED
            </div>
          )}
        </div>

        {/* Price Overlay */}
        <div className="absolute bottom-4 left-4 z-20">
          <p className="text-white text-2xl font-bold font-outfit drop-shadow-md">
            ${property.price?.toLocaleString() || '1,250,000'}
            {property.status === 'rent' && <span className="text-sm font-normal text-slate-200">/mo</span>}
          </p>
        </div>
      </div>
      
      {/* Property Information */}
      <div className="p-6 flex-1 flex flex-col">
        <Link href={`/properties/${property.id || '#'}`} className="hover:text-indigo-600 transition-colors">
          <h3 className="text-xl font-bold text-slate-900 font-outfit mb-2 line-clamp-1" title={property.title}>
            {property.title || 'Modern Glass Villa in Beverly Hills'}
          </h3>
        </Link>
        
        <div className="flex items-center text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">
          <MapPin className="w-4 h-4 mr-1.5 text-indigo-500" />
          <p className="truncate" title={property.location}>{property.location || "123 Platinum Ave, Beverly Hills, CA"}</p>
        </div>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-auto">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-50 transition-colors">
            <BedSingle className="w-5 h-5 text-slate-400 mb-1 group-hover:text-indigo-600 transition-colors" />
            <span className="font-semibold text-slate-800">{property.bedrooms || 4}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-50 transition-colors">
            <Bath className="w-5 h-5 text-slate-400 mb-1 group-hover:text-indigo-600 transition-colors" />
            <span className="font-semibold text-slate-800">{property.bathrooms || 3}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-50 transition-colors">
            <Building className="w-5 h-5 text-slate-400 mb-1 group-hover:text-indigo-600 transition-colors" />
            <div className="flex items-baseline">
              <span className="font-semibold text-slate-800">{property.area || '3,500'}</span>
              <span className="text-[10px] text-slate-500 ml-0.5">sqft</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden relative">
              <Image src="https://i.pravatar.cc/150?img=33" alt="Agent" fill className="object-cover" />
            </div>
            <span className="text-xs font-medium text-slate-600">{property.owner?.name || 'Sarah Jenkins'}</span>
          </div>
          <div className="flex items-center text-xs text-slate-400 gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
            <Eye className="w-4 h-4" />
            1.2k Views
          </div>
        </div>
      </div>
    </div>
  );
};
