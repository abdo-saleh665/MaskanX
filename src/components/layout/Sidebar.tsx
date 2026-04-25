import Link from 'next/link';
import { Home, Building2, Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';

export const Sidebar = () => {
  return (
    <aside className="w-72 bg-[#0F172A] min-h-screen text-slate-300 flex flex-col justify-between py-8 shadow-2xl relative z-10 border-r border-[#1e293b]">
      
      {/* Brand Signature */}
      <div>
        <div className="w-full px-8 mb-12 flex items-center">
          <div>
            <h2 className="text-2xl font-bold text-white font-outfit tracking-wider">MaskanX</h2>
            <p className="text-[10px] text-indigo-400 font-semibold tracking-[0.2em] uppercase mt-0.5">Admin Portal</p>
          </div>
        </div>

        {/* Navigation Map */}
        <nav className="w-full flex flex-col gap-2 px-4">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 mt-4">Menu</p>
          
          <Link href="/dashboard" className="px-4 py-3 rounded-xl hover:bg-[#1e293b] hover:text-white transition-all group flex items-center gap-4 text-sm font-medium">
            <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            Overview
          </Link>

          <Link href="/dashboard/properties" className="px-4 py-3 bg-indigo-500/10 text-indigo-300 rounded-xl transition-all shadow-[inset_2px_0_0_0_#6366f1] flex items-center gap-4 text-sm font-medium relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Building2 className="w-5 h-5 text-indigo-400 relative z-10" />
            <span className="relative z-10">Properties</span>
          </Link>

          <Link href="/dashboard/users" className="px-4 py-3 rounded-xl hover:bg-[#1e293b] hover:text-white transition-all group flex items-center gap-4 text-sm font-medium">
            <Users className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            Clients & Users
          </Link>

          <Link href="/dashboard/settings" className="px-4 py-3 rounded-xl hover:bg-[#1e293b] hover:text-white transition-all group flex items-center gap-4 text-sm font-medium">
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Admin Profile & Logout Footer */}
      <div className="px-4 mt-auto">
        <div className="p-4 rounded-xl bg-[#1e293b] flex items-center gap-3 mb-4 border border-slate-700/50">
          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden relative">
            <Image src="https://i.pravatar.cc/150?img=11" alt="Admin Avatar" fill className="object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Administrator</p>
            <p className="text-xs text-slate-400 truncate">admin@maskanx.com</p>
          </div>
        </div>
        
        <button className="w-full text-left px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-4 text-sm font-medium group">
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Secure Logout
        </button>
      </div>

    </aside>
  );
};
