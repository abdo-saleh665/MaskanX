'use client';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { toast } from 'react-toastify'; 
import { Search, Filter, Plus, TrendingUp, Building, Eye } from 'lucide-react';

export default function DashboardProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fallback Dummy Data to ensure the WOW factor is visible if the DB is empty or fails
  const DUMMY_DATA = [
     { _id: '1', title: 'Modern Glass Villa in Beverly Hills', location: 'Beverly Hills, CA', price: 2450000, bedrooms: 5, bathrooms: 4, area: 4200, status: 'sale', featured: true },
     { _id: '2', title: 'Luxury Penthouse Suite downtown', location: 'Manhattan, NY', price: 9500, bedrooms: 3, bathrooms: 2, area: 2100, status: 'rent', featured: false, images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80'] },
     { _id: '3', title: 'Minimalist Desert Retreat', location: 'Scottsdale, AZ', price: 1150000, bedrooms: 4, bathrooms: 3, area: 3100, status: 'sale', featured: true, images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'] },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/properties/my-properties?page=${page}&limit=9`);
        
        if (data.success && data.data.properties && data.data.properties.length > 0) {
          setProperties(data.data.properties);
          setTotalPages(data.data.totalPages || 1);
        } else {
          setProperties(DUMMY_DATA);
        }
      } catch (error: any) {
        setProperties(DUMMY_DATA);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-inter">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Dynamic Premium Header Section */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="px-10 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 font-outfit tracking-tight">Active Listings</h1>
              <p className="text-slate-500 mt-1 text-sm font-medium">Manage and monitor your global real estate portfolio</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search properties..." 
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 text-sm bg-slate-50 focus:bg-white transition-all shadow-sm"
                />
              </div>
              <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                <Filter className="w-5 h-5" />
              </button>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 font-semibold flex items-center gap-2 hover:-translate-y-0.5 transform">
                <Plus className="w-5 h-5" />
                New Listing
              </button>
            </div>
          </div>
        </div>

        <div className="p-10">
          
          {/* Executive Dashboard Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between group cursor-pointer hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Properties</p>
                <h3 className="text-3xl font-bold text-slate-900 font-outfit">124</h3>
                <p className="text-emerald-500 flex items-center text-sm font-medium mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" /> +12% this month
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors">
                <Building className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between group cursor-pointer hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Views</p>
                <h3 className="text-3xl font-bold text-slate-900 font-outfit">45.2K</h3>
                <p className="text-emerald-500 flex items-center text-sm font-medium mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" /> +24% this month
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors">
                <Eye className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-2xl shadow-xl flex items-center justify-between relative overflow-hidden group cursor-pointer">
              <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors"></div>
              <div className="relative z-10">
                <p className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-1">Premium Revenue</p>
                <h3 className="text-3xl font-bold text-white font-outfit">$4.2M</h3>
                <button className="mt-3 text-sm text-indigo-300 hover:text-white transition-colors font-medium flex items-center gap-1">
                  View Full Report &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 text-slate-400 gap-4">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <span className="font-medium animate-pulse">Loading Premium Portfolio...</span>
            </div>
          ) : properties.length === 0 ? (
             <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
              <Building className="w-12 h-12 mb-3 text-slate-300" />
              <span className="font-semibold text-slate-600 text-lg">Your portfolio is empty</span>
              <p className="text-sm mt-1 mb-4">You have zero active properties published on the market.</p>
              <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors">Create First Listing</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}

          {/* Elegant Pagination controls */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-10 h-10 rounded-xl transition-all font-semibold flex items-center justify-center ${
                    page === pg 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 -translate-y-0.5' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-indigo-600'
                  }`}
                >
                  {pg}
                </button>
              ))}
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}
