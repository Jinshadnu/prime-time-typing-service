import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  FolderTree,
  FileText,
  FileCheck2,
  Home,
  Image as ImageIcon,
  Building2,
  HelpCircle,
  MessageSquareQuote,
  BookOpen,
  Compass,
  Users,
  MessageSquare,
  Globe,
  Settings,
  ShieldCheck,
  Activity,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search,
  Sparkles,
  Phone,
  MessageCircle,
  Share2,
  Clock,
  Key
} from 'lucide-react';
import primeTimeLogo from '../../assets/prime_time_logo.jpeg';

export default function AdminLayout({
  activeTab,
  onSelectTab,
  onLogout,
  onClosePanel,
  unreadEnquiriesCount = 0,
  currentUser = { name: 'Super Administrator', role: 'Super Admin', email: 'admin@primetimetypingservice.com' },
  children,
  lang = 'en',
  onToggleLang
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(true);
  const [contentMenuOpen, setContentMenuOpen] = useState(true);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const isAr = lang === 'ar';

  const navItemClass = (tabId) => `
    flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all
    ${activeTab === tabId
      ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/20 translate-x-1'
      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    }
  `;

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${isAr ? 'rtl' : 'ltr'}`}>
      
      {/* Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <img
              src={primeTimeLogo}
              alt="Prime Time Logo"
              className="w-9 h-9 rounded-xl object-contain bg-white/5 p-1 border border-[#D4AF37]/30 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-sm tracking-tight font-heading">
                  PRIME TIME
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold border border-[#D4AF37]/30 uppercase">
                  CMS v5.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400">UAE Government Typing Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Right: Actions, Language Toggle, Live Website Link & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Live Preview Button */}
          <button
            onClick={onClosePanel}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isAr ? 'معاينة الموقع المباشر' : 'Live Website'}</span>
          </button>

          {/* Language Switcher */}
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/20 transition-colors"
            >
              {lang === 'en' ? 'العربية (AR)' : 'English (EN)'}
            </button>
          )}

          {/* Notification Bell */}
          <button
            onClick={() => onSelectTab('enquiries')}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 relative transition-colors"
            title="Enquiries"
          >
            <Bell className="w-4 h-4" />
            {unreadEnquiriesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-600 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden md:block text-start">
              <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-amber-400/90 font-medium">{currentUser.role}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>

      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 ${isAr ? 'right-0' : 'left-0'} z-30 w-64 bg-slate-900 border-r border-slate-800/80
            flex flex-col justify-between py-4 px-3 overflow-y-auto transition-transform duration-300 shadow-2xl lg:shadow-none
            ${isSidebarOpen ? 'translate-x-0' : isAr ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="space-y-4">
            
            {/* 1. Dashboard */}
            <div>
              <button
                onClick={() => {
                  onSelectTab('dashboard');
                  setIsSidebarOpen(false);
                }}
                className={navItemClass('dashboard')}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </div>

            {/* 2. Services Section */}
            <div className="space-y-1">
              <button
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-white"
              >
                <span>Services Management</span>
                {servicesMenuOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {servicesMenuOpen && (
                <div className="space-y-1 pl-2 border-l border-slate-800 ml-3">
                  <button
                    onClick={() => { onSelectTab('services'); setIsSidebarOpen(false); }}
                    className={navItemClass('services')}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>All Services</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('categories'); setIsSidebarOpen(false); }}
                    className={navItemClass('categories')}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Categories</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('subcategories'); setIsSidebarOpen(false); }}
                    className={navItemClass('subcategories')}
                  >
                    <FolderTree className="w-3.5 h-3.5" />
                    <span>Subcategories</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('documents'); setIsSidebarOpen(false); }}
                    className={navItemClass('documents')}
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Documents Bank</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Website Content Section */}
            <div className="space-y-1">
              <button
                onClick={() => setContentMenuOpen(!contentMenuOpen)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-white"
              >
                <span>Website Content</span>
                {contentMenuOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {contentMenuOpen && (
                <div className="space-y-1 pl-2 border-l border-slate-800 ml-3">
                  <button
                    onClick={() => { onSelectTab('homepage'); setIsSidebarOpen(false); }}
                    className={navItemClass('homepage')}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Homepage Copy</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('banners'); setIsSidebarOpen(false); }}
                    className={navItemClass('banners')}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Hero Banners</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('about'); setIsSidebarOpen(false); }}
                    className={navItemClass('about')}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>About Us</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('faqs'); setIsSidebarOpen(false); }}
                    className={navItemClass('faqs')}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>FAQs</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('testimonials'); setIsSidebarOpen(false); }}
                    className={navItemClass('testimonials')}
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5" />
                    <span>Testimonials</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('blogs'); setIsSidebarOpen(false); }}
                    className={navItemClass('blogs')}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Blog / News</span>
                  </button>
                  <button
                    onClick={() => { onSelectTab('navigation'); setIsSidebarOpen(false); }}
                    className={navItemClass('navigation')}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Navigation</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4. CRM & Enquiries */}
            <div className="space-y-1">
              <span className="block px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                CRM &amp; Leads
              </span>
              <button
                onClick={() => { onSelectTab('enquiries'); setIsSidebarOpen(false); }}
                className={navItemClass('enquiries')}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="flex-1 text-start">Enquiries</span>
                {unreadEnquiriesCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 font-black text-[10px]">
                    {unreadEnquiriesCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => { onSelectTab('customers'); setIsSidebarOpen(false); }}
                className={navItemClass('customers')}
              >
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </button>
            </div>

            {/* 5. Media & SEO */}
            <div className="space-y-1">
              <span className="block px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Assets &amp; Growth
              </span>
              <button
                onClick={() => { onSelectTab('media'); setIsSidebarOpen(false); }}
                className={navItemClass('media')}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Media Library</span>
              </button>
              <button
                onClick={() => { onSelectTab('seo'); setIsSidebarOpen(false); }}
                className={navItemClass('seo')}
              >
                <Globe className="w-4 h-4" />
                <span>SEO &amp; Tracking</span>
              </button>
            </div>

            {/* 6. Settings & Administration */}
            <div className="space-y-1">
              <span className="block px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                System
              </span>
              <button
                onClick={() => { onSelectTab('settings'); setIsSidebarOpen(false); }}
                className={navItemClass('settings')}
              >
                <Settings className="w-4 h-4" />
                <span>Business Settings</span>
              </button>
              <button
                onClick={() => { onSelectTab('users'); setIsSidebarOpen(false); }}
                className={navItemClass('users')}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Users &amp; Roles</span>
              </button>
              <button
                onClick={() => { onSelectTab('logs'); setIsSidebarOpen(false); }}
                className={navItemClass('logs')}
              >
                <Activity className="w-4 h-4" />
                <span>Activity Logs</span>
              </button>
            </div>

          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-slate-800/80 px-2 text-[10px] text-slate-500">
            <p className="font-bold text-slate-400">Prime Time Typing Services</p>
            <p>Madinat Zayed, Abu Dhabi, UAE</p>
          </div>

        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-slate-950 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
