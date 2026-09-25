import React from 'react';
import {
  Layers,
  FolderTree,
  FileText,
  CheckCircle2,
  XCircle,
  Star,
  MessageSquare,
  Clock,
  CheckCheck,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Phone,
  Eye,
  Sparkles,
  ExternalLink,
  Users,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function DashboardTab({
  categories,
  subcategories,
  services,
  enquiries,
  onNavigateTab,
  onOpenAddService,
  onOpenAddCategory,
  onOpenAddSubcategory,
  onSelectEnquiry,
  lang = 'en'
}) {
  const isAr = lang === 'ar';

  const totalCategories = categories.length;
  const totalSubcategories = subcategories.length;
  const totalServices = services.length;
  const activeServices = services.filter(s => s.status === 'active').length;
  const inactiveServices = services.filter(s => s.status === 'inactive').length;
  const featuredServices = services.filter(s => s.featured).length;

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const pendingEnquiries = enquiries.filter(e => e.status === 'In Progress' || e.status === 'Contacted').length;
  const completedEnquiries = enquiries.filter(e => e.status === 'Completed').length;

  const recentEnquiries = enquiries.slice(0, 5);
  const recentlyUpdatedServices = services.slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">New</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Contacted</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">In Progress</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completed</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome & Quick Action Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#1e1b13] border border-[#D4AF37]/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prime Time Executive Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isAr ? 'لوحة تحكم وإدارة المحتوى' : 'Service & Content Management Hub'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {isAr ? 'إدارة شاملة لجميع الدوائر الحكومية، الخدمات، الطلبات، وبوابات الدفع' : 'Monitor live government typing catalog, manage enquiries, and update live website content instantly.'}
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={onOpenAddService}
              className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة خدمة جديدة' : 'Add New Service'}</span>
            </button>
            <button
              onClick={onOpenAddCategory}
              className="px-3.5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>+ Category</span>
            </button>
            <button
              onClick={onOpenAddSubcategory}
              className="px-3.5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <FolderTree className="w-4 h-4 text-emerald-400" />
              <span>+ Subcategory</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Categories */}
        <div 
          onClick={() => onNavigateTab('categories')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Main Categories</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#D4AF37] border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalCategories}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Govt Departments</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#D4AF37]" />
          </div>
        </div>

        {/* Total Subcategories */}
        <div 
          onClick={() => onNavigateTab('subcategories')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subcategories</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalSubcategories}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Organized Branches</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
          </div>
        </div>

        {/* Total Services */}
        <div 
          onClick={() => onNavigateTab('services')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Services</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalServices}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span className="text-emerald-400 font-semibold">{activeServices} Active</span>
            <span className="text-slate-500">({inactiveServices} off)</span>
          </div>
        </div>

        {/* Total Enquiries */}
        <div 
          onClick={() => onNavigateTab('enquiries')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalEnquiries}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span className="text-blue-400 font-semibold">{newEnquiries} New Leads</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400" />
          </div>
        </div>

        {/* Featured Services */}
        <div 
          onClick={() => onNavigateTab('services')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-md col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Featured Services</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{featuredServices}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Highlighted on Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400" />
          </div>
        </div>

      </div>

      {/* Enquiry Quick Status Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Enquiry Pipeline:</span>
        </div>
        <div className="flex items-center flex-wrap gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span>{newEnquiries} New Leads</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>{pendingEnquiries} In Progress / Contacted</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{completedEnquiries} Completed</span>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('enquiries')}
          className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 ml-auto"
        >
          <span>View All Enquiries CRM</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Two Column Layout: Recent Enquiries & Recently Updated Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span>Recent Customer Enquiries</span>
              </h2>
              <p className="text-xs text-slate-400">Incoming inquiries from website contact form and estimators</p>
            </div>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1"
            >
              View all ({enquiries.length})
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-x-auto">
            {recentEnquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">No enquiries yet.</div>
            ) : (
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-800/80 pb-2">
                    <th className="font-semibold text-start pb-2">Customer</th>
                    <th className="font-semibold text-start pb-2">Service</th>
                    <th className="font-semibold text-start pb-2">Date</th>
                    <th className="font-semibold text-start pb-2">Status</th>
                    <th className="font-semibold text-end pb-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {recentEnquiries.map(enq => (
                    <tr key={enq.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-3 pr-2">
                        <p className="font-bold text-white truncate max-w-[140px]">{enq.name}</p>
                        <p className="text-[11px] text-slate-400">{enq.phone}</p>
                      </td>
                      <td className="py-3 pr-2 max-w-[160px]">
                        <p className="text-slate-300 truncate">{enq.serviceName}</p>
                        <span className="text-[10px] text-slate-500 uppercase">{enq.categoryId}</span>
                      </td>
                      <td className="py-3 pr-2 text-slate-400 whitespace-nowrap text-[11px]">
                        {enq.date}
                      </td>
                      <td className="py-3 pr-2">
                        {getStatusBadge(enq.status)}
                      </td>
                      <td className="py-3 text-end">
                        <button
                          onClick={() => onSelectEnquiry(enq)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recently Updated Services (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Active Services Catalog</span>
              </h2>
              <p className="text-xs text-slate-400">Quick view of live services</p>
            </div>
            <button
              onClick={() => onNavigateTab('services')}
              className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1"
            >
              Manage all ({services.length})
            </button>
          </div>

          <div className="space-y-3 flex-1">
            {recentlyUpdatedServices.map(srv => (
              <div
                key={srv.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate">
                      {srv.title?.en || srv.title}
                    </span>
                    {srv.featured && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300">Featured</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                    <span className="uppercase text-[#D4AF37] font-semibold">{srv.categoryId}</span>
                    <span>•</span>
                    <span>Std: AED {srv.estimatedCostStandard || srv.govtFee || 250}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`w-2 h-2 rounded-full ${srv.status === 'active' ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <button
                    onClick={() => onNavigateTab('services')}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Panel */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateTab('homepage')}
                className="p-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl text-start border border-slate-700/60 transition-colors flex items-center justify-between"
              >
                <span>Edit Homepage</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('banners')}
                className="p-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl text-start border border-slate-700/60 transition-colors flex items-center justify-between"
              >
                <span>Manage Banners</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('settings')}
                className="p-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl text-start border border-slate-700/60 transition-colors flex items-center justify-between"
              >
                <span>WhatsApp Settings</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('seo')}
                className="p-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl text-start border border-slate-700/60 transition-colors flex items-center justify-between"
              >
                <span>SEO & Analytics</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
