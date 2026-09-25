import React, { useState, useMemo } from 'react';
import {
  Search,
  CreditCard,
  Activity,
  Home,
  Briefcase,
  Crown,
  Users,
  Globe,
  Plane,
  MapPin,
  FileCheck2,
  Languages,
  FileCheck,
  BadgeCheck,
  Compass,
  FileSpreadsheet,
  Clock,
  DollarSign,
  CheckCircle,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Filter,
  IdCard,
  Award,
  Car,
  Sparkles,
  ShieldCheck,
  FileText,
  Building2,
  FileBadge,
  Layers,
  Check
} from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

export default function ServicesSection({ lang, services = siteData.services, onSelectServiceForInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [activeModalService, setActiveModalService] = useState(null);
  const [customRequirementModal, setCustomRequirementModal] = useState(false);
  const [customReqText, setCustomReqText] = useState('');
  const [browseMode, setBrowseMode] = useState('departments'); // 'departments' | 'all-services'

  const t = siteData.translations[lang];

  const activeServices = services && services.length > 0 ? services : siteData.services;

  const iconMap = {
    CreditCard,
    Activity,
    Home,
    Briefcase,
    Crown,
    Users,
    Globe,
    Plane,
    MapPin,
    FileCheck2,
    Languages,
    FileCheck,
    BadgeCheck,
    Compass,
    FileSpreadsheet,
    IdCard,
    Award,
    Car,
    Sparkles,
    ShieldCheck,
    FileText,
    Building2,
    FileBadge,
    CheckCircle,
    Clock
  };

  // Dynamic category service counts
  const categoryCounts = useMemo(() => {
    return siteData.categories.reduce((acc, cat) => {
      acc[cat.id] = activeServices.filter(s => s.categoryId === cat.id).length;
      return acc;
    }, {});
  }, [activeServices]);

  const totalServicesCount = activeServices.length;

  // Active department object if a specific category is selected
  const activeDepartment = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return siteData.categories.find(c => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  // Dynamic filter logic
  let filteredServices = useMemo(() => {
    return activeServices.filter((srv) => {
      const matchesCategory = selectedCategory === 'all' || srv.categoryId === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const titleMatch = (srv.title?.[lang] || srv.title?.en || '').toLowerCase().includes(q);
      const descText = srv.shortDesc?.[lang] || srv.desc?.[lang] || srv.desc?.en || '';
      const descMatch = descText.toLowerCase().includes(q);
      
      // Also match department name
      const dept = siteData.categories.find(c => c.id === srv.categoryId);
      const deptMatch = dept && ((dept.name?.[lang] || '').toLowerCase().includes(q) || (dept.name?.en || '').toLowerCase().includes(q));

      return (selectedCategory === 'all' || matchesCategory) && (titleMatch || descMatch || deptMatch);
    });
  }, [activeServices, selectedCategory, searchQuery, lang]);

  // Dynamic sort logic
  filteredServices = useMemo(() => {
    return [...filteredServices].sort((a, b) => {
      if (sortBy === 'fastest') {
        return (a.processingTime?.[lang] || '').localeCompare(b.processingTime?.[lang] || '');
      } else if (sortBy === 'fee') {
        return (a.govtFeeRange?.[lang] || '').localeCompare(b.govtFeeRange?.[lang] || '');
      } else if (sortBy === 'name') {
        return (a.title?.[lang] || '').localeCompare(b.title?.[lang] || '');
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filteredServices, sortBy, lang]);

  const handleOpenInquiry = (service) => {
    setActiveModalService(null);
    onSelectServiceForInquiry(service);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customReqText.trim()) return;
    const customServiceObj = {
      id: 'custom-req',
      title: { en: `Custom Service: ${customReqText}`, ar: `خدمة مخصصة: ${customReqText}` },
      govtFeeRange: { en: 'Inquire for Quote', ar: 'حسب نوع المعاملة' },
      processingTime: { en: 'Same Day / Express', ar: 'في نفس اليوم / عاجل' },
      requirements: { en: ['Emirates ID', 'Relevant Documents'], ar: ['الهوية الإماراتية', 'المستندات المطلوبة'] }
    };
    setCustomRequirementModal(false);
    onSelectServiceForInquiry(customServiceObj);
  };

  return (
    <section id="services" className="py-20 bg-white text-slate-900 relative overflow-hidden select-none">
      <div className="container-custom relative z-10">

        {/* Section Header with Clyde Watermark */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-12 relative clyde-section-header">
            <div className="clyde-watermark-text select-none">
              {lang === 'ar' ? 'الخدمات' : 'SERVICES'}
            </div>

            <span className="clyde-subheading drop-shadow-xs">
              {lang === 'ar' ? 'جميع المعاملات الحكومية المعتمدة' : 'VERIFIED UAE GOVERNMENT CATALOG'}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-heading leading-tight">
              {t.servicesTitle}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
              {t.servicesSubtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Search & Sort Controls */}
        <AnimatedSection animation="fade-up" delay={150}>
          <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setBrowseMode('all-services');
                }}
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-50/90 border-2 border-slate-200 focus:border-[#D4AF37] rounded-2xl py-3.5 px-12 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm focus:shadow-md focus:bg-white"
              />
              <Search className="w-5 h-5 text-[#8C6A21] absolute left-4 [dir=rtl]:right-4 [dir=rtl]:left-auto top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 [dir=rtl]:left-4 [dir=rtl]:right-auto top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase shrink-0 hidden md:inline">
                {lang === 'ar' ? 'ترتيب:' : 'Sort:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 border-2 border-slate-200 focus:border-[#D4AF37] rounded-2xl py-3.5 px-4 text-xs font-bold text-slate-900 focus:outline-none transition-all shadow-sm cursor-pointer"
              >
                <option value="popular">{lang === 'ar' ? 'الأكثر طلباً (مميز)' : 'Most Popular (Featured)'}</option>
                <option value="fastest">{lang === 'ar' ? 'أسرع إنجاز' : 'Fastest Processing'}</option>
                <option value="name">{lang === 'ar' ? 'أبجدياً (A-Z)' : 'Alphabetical (A-Z)'}</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* 26 Department Quick Select Scroll Bar */}
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="mb-10">
            <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-modal-scrollbar pt-1 px-1">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#8C6A21] text-slate-950 font-black shadow-md scale-105 ring-1 ring-amber-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-200/90 hover:bg-slate-200 hover:scale-102'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{t.allCategories}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  selectedCategory === 'all' ? 'bg-slate-950 text-[#F5D77F]' : 'bg-slate-200 text-slate-700'
                }`}>
                  {siteData.categories.length}
                </span>
              </button>

              {siteData.categories.map((cat) => {
                const IconComp = iconMap[cat.icon] || FileCheck;
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery('');
                    }}
                    className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#8C6A21] text-slate-950 font-black shadow-md scale-105 ring-1 ring-amber-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-200/90 hover:bg-slate-200 hover:scale-102'
                    }`}
                  >
                    <IconComp className="w-4 h-4 text-[#8C6A21] shrink-0" />
                    <span className="whitespace-nowrap">{cat.name[lang]}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-slate-950 text-[#F5D77F]' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Active Department Showcase Banner (Displayed when a specific department is selected) */}
        {activeDepartment && selectedCategory !== 'all' && (
          <AnimatedSection animation="zoom-in" delay={100}>
            <div className="mb-12 relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 bg-slate-950 text-white">
              {/* Background Image Scrim */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activeDepartment.image}
                  alt={activeDepartment.name[lang]}
                  className="w-full h-full object-cover opacity-35 scale-105 filter blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              </div>

              <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37]/60 text-[#F5D77F] text-xs font-bold mb-3 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5D77F]" />
                    <span>{lang === 'ar' ? 'الخدمات التابعة لهذا القسم' : 'Selected Government Department'}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white font-heading mb-2 flex items-center gap-3">
                    <span>{activeDepartment.name[lang]}</span>
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    {activeDepartment.desc?.[lang] || activeDepartment.desc?.en}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-white font-black text-xs border border-white/20 backdrop-blur-md">
                      {filteredServices.length} {lang === 'ar' ? 'معاملات وخدمات متوفرة' : 'Available Services'}
                    </span>
                    <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'ar' ? 'معاملة حكومية رسمية معتمدة 100%' : '100% Verified Official Processing'}</span>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setBrowseMode('departments');
                    }}
                    className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                    <span>{lang === 'ar' ? 'عرض جميع الدوائر' : 'All 26 Departments'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${siteData.brand.whatsappLink}?text=${encodeURIComponent(
                      lang === 'ar'
                        ? `مرحباً برايم تايم للطباعة، أود الاستفسار عن خدمات: ${activeDepartment.name[lang]}`
                        : `Hello Prime Time Typing, I would like to inquire about: ${activeDepartment.name.en}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* View Mode Toggle when "All Departments" is active and no search query */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {lang === 'ar'
                  ? `تصفح 26 دائرة حكومية تشمل ${totalServicesCount}+ معاملة رسمية معتمدة`
                  : `Browse 26 Official UAE Portals covering ${totalServicesCount}+ verified typing services`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBrowseMode('departments')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  browseMode === 'departments'
                    ? 'bg-slate-900 text-[#F5D77F] shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {lang === 'ar' ? 'دليل الدوائر (26 دائرة)' : 'Department Portals (26)'}
              </button>
              <button
                onClick={() => setBrowseMode('all-services')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  browseMode === 'all-services'
                    ? 'bg-slate-900 text-[#F5D77F] shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {lang === 'ar' ? 'عرض كافة المعاملات' : 'All Individual Services'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: 26 DEPARTMENT PORTALS (Displayed when in departments mode) */}
        {selectedCategory === 'all' && !searchQuery && browseMode === 'departments' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {siteData.categories.map((cat, idx) => {
              const DeptIcon = iconMap[cat.icon] || FileCheck;
              const count = categoryCounts[cat.id] || 0;
              return (
                <AnimatedSection key={cat.id} animation="fade-up" delay={50 + (idx % 8) * 50}>
                  <div
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      window.scrollTo({ top: document.getElementById('services')?.offsetTop || 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-2xl border border-slate-200/70 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-500 ease-out flex flex-col justify-between group overflow-hidden cursor-pointer h-full transform hover:-translate-y-2 relative"
                  >
                    {/* Top Gold Accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>

                    <div>
                      {/* Department Photo Banner */}
                      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                        <img
                          src={cat.image}
                          alt={cat.name[lang]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3 [dir=rtl]:right-3 [dir=rtl]:left-auto z-20">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-extrabold shadow-sm">
                            <DeptIcon className="w-3.5 h-3.5 text-[#8C6A21] shrink-0" />
                            <span>{count} {lang === 'ar' ? 'معاملة' : 'Services'}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 pb-3">
                        <h3 className="text-base sm:text-[17px] font-bold text-slate-900 mb-2 group-hover:text-[#8C6A21] transition-colors font-heading leading-snug line-clamp-2 min-h-[2.75rem]">
                          {cat.name[lang]}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[2rem]">
                          {cat.desc?.[lang] || cat.desc?.en}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Trigger */}
                    <div className="p-5 pt-0 mt-auto">
                      <div className="w-full py-2.5 px-3 rounded-xl bg-slate-50 group-hover:bg-slate-900 text-slate-700 group-hover:text-[#F5D77F] font-bold text-xs transition-all duration-300 flex items-center justify-between border border-slate-200/80 group-hover:border-slate-900">
                        <span>{lang === 'ar' ? 'استعراض كافة المعاملات' : 'View All Services'}</span>
                        {lang === 'ar' ? (
                          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>

                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        ) : (
          /* VIEW 2: INDIVIDUAL SERVICE CARDS GRID (When a department is selected or in All Services view) */
          <div>
            {filteredServices.length === 0 ? (
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-slate-500 font-semibold mb-2">
                    {lang === 'ar' ? 'لم يتم العثور على خدمات تطابق البحث' : 'No services found matching your query.'}
                  </p>
                  <button
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="text-xs text-[#8C6A21] underline font-bold hover:text-slate-900 cursor-pointer"
                  >
                    {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                  </button>
                </div>
              </AnimatedSection>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((srv, idx) => {
                  const ServiceIcon = iconMap[srv.icon] || FileCheck;
                  const serviceFeeLabel = srv.estimatedCostStandard 
                    ? (lang === 'ar' ? `${srv.estimatedCostStandard} درهم` : `AED ${srv.estimatedCostStandard}`) 
                    : (srv.govtFeeRange?.[lang] || srv.govtFeeRange?.en || '');
                  const whatsappMsg = lang === 'ar'
                    ? `مرحباً برايم تايم للطباعة، أود الاستفسار عن خدمة: ${srv.title?.[lang] || srv.title?.en} (الرسوم: ${serviceFeeLabel})`
                    : `Hello Prime Time Typing, I would like to inquire about: ${srv.title?.en || srv.title?.[lang]} (Estimated Fee: ${serviceFeeLabel})`;
                  const reqList = srv.requirements?.[lang] || srv.requirements?.en || (Array.isArray(srv.requirements) ? srv.requirements : []);

                  return (
                    <AnimatedSection
                      key={srv.id + '-' + selectedCategory}
                      animation="zoom-in"
                      delay={100 + (idx % 6) * 60}
                    >
                      <div
                        className="bg-white rounded-2xl border border-slate-200/80 hover:border-[#D4AF37] shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(212,175,55,0.18)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-between group relative overflow-hidden h-full transform hover:-translate-y-2"
                      >
                        {/* Top Subtle Gold Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>

                        <div>
                          {/* 1. SERVICE IMAGE */}
                          {srv.image && (
                            <div
                              onClick={() => setActiveModalService(srv)}
                              className="relative w-full h-52 overflow-hidden bg-slate-100 cursor-pointer"
                            >
                              <img
                                src={srv.image}
                                alt={srv.title[lang]}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500"></div>

                              {/* Floating Category Tag */}
                              <div className="absolute top-3.5 left-3.5 [dir=rtl]:right-3.5 [dir=rtl]:left-auto z-20">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-extrabold shadow-sm">
                                  <ServiceIcon className="w-3.5 h-3.5 text-[#8C6A21] shrink-0" />
                                  <span className="truncate max-w-[150px]">
                                    {siteData.categories.find(c => c.id === srv.categoryId)?.name[lang]}
                                  </span>
                                </span>
                              </div>

                              {/* Popular Tag */}
                              {srv.featured && (
                                <div className="absolute top-3.5 right-3.5 [dir=rtl]:left-3.5 [dir=rtl]:right-auto bg-[#D4AF37] text-slate-950 text-[10px] font-black px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1 z-20">
                                  <Sparkles className="w-3 h-3 text-slate-950" />
                                  <span>{lang === 'ar' ? 'الأكثر طلباً' : 'Popular'}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 2. DESCRIPTION & TITLE */}
                          <div className="p-5 pb-3">
                            <h3
                              onClick={() => setActiveModalService(srv)}
                              className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-[#8C6A21] transition-colors leading-snug cursor-pointer line-clamp-2 min-h-[2.75rem] flex items-start"
                            >
                              {srv.title[lang]}
                            </h3>

                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[2rem]">
                              {srv.desc?.[lang] || srv.shortDesc?.[lang]}
                            </p>
                          </div>

                          {/* 3. PRICE & TURNAROUND HIGHLIGHT BADGE */}
                          <div className="mx-5 mb-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-[#D4AF37]/30 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                                {lang === 'ar' ? 'الرسوم القياسية / السعر' : 'Standard Fee / Price'}
                              </span>
                              <span className="text-sm sm:text-[15px] font-black text-slate-900 font-heading">
                                {srv.estimatedCostStandard 
                                  ? (lang === 'ar' ? `${srv.estimatedCostStandard} درهم` : `AED ${srv.estimatedCostStandard}`) 
                                  : (srv.govtFeeRange?.[lang] || srv.govtFeeRange?.en)}
                              </span>
                            </div>
                            <div className="text-right [dir=rtl]:text-left">
                              <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 justify-end [dir=rtl]:justify-start">
                                <Clock className="w-3 h-3 text-[#8C6A21]" />
                                <span>{lang === 'ar' ? 'المدة' : 'Turnaround'}</span>
                              </span>
                              <span className="text-xs font-bold text-slate-700">
                                {srv.processingTime?.[lang] || srv.processingTime?.en}
                              </span>
                            </div>
                          </div>

                          {/* 4. REQUIRED DOCUMENTS CHECKLIST */}
                          {reqList.length > 0 && (
                            <div className="mx-5 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                  <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{lang === 'ar' ? 'المستندات المطلوبة:' : 'Required Documents:'}</span>
                                </span>
                                <span className="text-[10px] font-extrabold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                                  {reqList.length} {lang === 'ar' ? 'مستندات' : 'items'}
                                </span>
                              </div>
                              <ul className="space-y-1.5">
                                {reqList.slice(0, 3).map((doc, dIdx) => (
                                  <li key={dIdx} className="text-[11.5px] text-slate-600 flex items-start gap-1.5 leading-snug">
                                    <span className="text-emerald-600 font-black shrink-0 mt-0.5">✓</span>
                                    <span className="line-clamp-1">{doc}</span>
                                  </li>
                                ))}
                              </ul>
                              {reqList.length > 3 && (
                                <button
                                  type="button"
                                  onClick={() => setActiveModalService(srv)}
                                  className="mt-1.5 text-[11px] text-[#8C6A21] hover:text-[#D4AF37] font-bold cursor-pointer transition-colors block"
                                >
                                  {lang === 'ar'
                                    ? `+ عرض باقي المستندات المطلوبة (${reqList.length - 3})`
                                    : `+ View ${reqList.length - 3} more document(s)`}
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* 5. ENQUIRY ACTIONS */}
                        <div className="px-5 pb-5 mt-auto">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <a
                              href={`https://wa.me/${siteData.brand.whatsappLink}?text=${encodeURIComponent(whatsappMsg)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <span>WhatsApp</span>
                              {lang === 'ar' ? (
                                <ArrowLeft className="w-3 h-3" />
                              ) : (
                                <ArrowRight className="w-3 h-3" />
                              )}
                            </a>

                            <button
                              onClick={() => handleOpenInquiry(srv)}
                              className="w-full bg-slate-900 hover:bg-[#D4AF37] hover:text-slate-950 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 group/btn"
                            >
                              <span>{lang === 'ar' ? 'طلب استفسار' : 'Enquire'}</span>
                              {lang === 'ar' ? (
                                <ArrowLeft className="w-3 h-3 group-hover/btn:-translate-x-1 transition-transform" />
                              ) : (
                                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                              )}
                            </button>
                          </div>

                          <button
                            onClick={() => setActiveModalService(srv)}
                            className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-slate-900 py-1 transition-colors cursor-pointer"
                          >
                            {lang === 'ar' ? 'عرض التفاصيل الكاملة والشروط ←' : 'View Full Details & Requirements →'}
                          </button>
                        </div>

                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Detailed Service Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl relative max-h-[92vh] flex flex-col border-2 border-[#D4AF37] animate-springIn ring-1 ring-slate-900/10 overflow-hidden">

            {/* Glassmorphic Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 [dir=rtl]:left-4 [dir=rtl]:right-auto z-30 text-white bg-slate-950/70 hover:bg-[#D4AF37] hover:text-slate-950 p-2.5 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 cursor-pointer border border-white/20"
              title={t.close}
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Fixed Header Banner */}
            {activeModalService.image && (
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950 shrink-0">
                <img
                  src={activeModalService.image}
                  alt={activeModalService.title[lang]}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="absolute bottom-4 left-5 right-5 [dir=rtl]:left-5 [dir=rtl]:right-5 flex items-center gap-3.5 z-10">
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#8C6A21] p-0.5 shadow-2xl ring-4 ring-white/30 shrink-0 flex items-center justify-center drop-shadow-[0_0_25px_rgba(212,175,55,0.7)]">
                    <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-[#F5D77F]">
                      {React.createElement(iconMap[activeModalService.icon] || FileCheck, { className: "w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" })}
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37]/60 text-[#F5D77F] text-[11px] font-bold mb-1 backdrop-blur-md shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#F5D77F]" />
                      <span>{siteData.categories.find(c => c.id === activeModalService.categoryId)?.name[lang]}</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-black text-white font-heading drop-shadow-md leading-snug">
                      {activeModalService.title[lang]}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-modal-scrollbar p-5 sm:p-7 space-y-6 text-start">
              {/* Section 1: Overview */}
              <div className="bg-gradient-to-br from-slate-50 via-slate-50 to-amber-50/20 p-4.5 rounded-2xl border border-slate-200/90 shadow-2xs relative">
                <div className="absolute top-4 left-0 [dir=rtl]:right-0 [dir=rtl]:left-auto w-1 h-8 bg-[#D4AF37] rounded-r-full [dir=rtl]:rounded-l-full [dir=rtl]:rounded-r-none"></div>
                <h4 className="text-xs uppercase font-black text-[#8C6A21] tracking-wider mb-2 pl-2 [dir=rtl]:pr-2 [dir=rtl]:pl-0">
                  {lang === 'ar' ? 'نظرة عامة على الخدمة' : 'Service Overview & Details'}
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-2 [dir=rtl]:pr-2 [dir=rtl]:pl-0">
                  {activeModalService.fullDesc?.[lang] || activeModalService.desc?.[lang] || activeModalService.shortDesc?.[lang]}
                </p>
              </div>

              {/* Section 2: Twin Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-[#D4AF37]/35 flex items-center gap-3.5 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5D77F] to-[#D4AF37] text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wider mb-0.5">{t.processingTime}</div>
                    <div className="text-sm sm:text-base font-black text-slate-900">{activeModalService.processingTime[lang]}</div>
                  </div>
                </div>

                <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200 flex items-center gap-3.5 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#F5D77F] flex items-center justify-center shrink-0 shadow-sm">
                    <DollarSign className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wider mb-0.5">{lang === 'ar' ? 'الرسوم القياسية' : 'Standard Fee'}</div>
                    <div className="text-sm sm:text-base font-black text-[#8C6A21]">
                      {activeModalService.estimatedCostStandard 
                        ? (lang === 'ar' ? `${activeModalService.estimatedCostStandard} درهم` : `AED ${activeModalService.estimatedCostStandard}`) 
                        : (activeModalService.govtFeeRange?.[lang] || activeModalService.govtFeeRange?.en)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Required Document Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2 font-heading">
                    <CheckCircle className="w-4.5 h-4.5 text-[#8C6A21]" />
                    <span>{t.keyRequirements}</span>
                  </h4>
                  <span className="text-[11px] font-bold text-[#8C6A21] bg-amber-50 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                    {(activeModalService?.requirements?.[lang] || activeModalService?.requirements?.en || []).length} {lang === 'ar' ? 'وثائق مطلوبة' : 'Documents'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {(activeModalService?.requirements?.[lang] || activeModalService?.requirements?.en || []).map((req, i) => (
                    <div key={i} className="text-xs sm:text-sm text-slate-800 font-semibold flex items-center gap-3 bg-white hover:bg-amber-50/30 p-3.5 rounded-xl border border-slate-200 hover:border-[#D4AF37]/60 transition-all duration-200 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6A21] text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        ✓
                      </div>
                      <span className="leading-snug">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Government System Trust Banner */}
              <div className="bg-slate-950 text-white p-4 rounded-2xl border border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#F5D77F] shrink-0">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {lang === 'ar' ? 'معاملة حكومية رسمية معتمدة' : 'Official UAE Portal Clearance'}
                    </div>
                    <div className="text-[11px] text-amber-200/80 font-medium">
                      {lang === 'ar' ? 'ضمان الدقة وتفادي الرفض' : '100% Accuracy Guarantee by Prime Time Typing'}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-black text-[#F5D77F] bg-[#D4AF37]/20 px-3 py-1 rounded-lg border border-[#D4AF37]/40">
                  {lang === 'ar' ? 'مركز أبوظبي' : 'Abu Dhabi Hub'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 sm:px-7 border-t border-slate-200/90 bg-slate-50/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-200/80 transition-all cursor-pointer"
              >
                {t.close}
              </button>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/${siteData.brand.whatsappLink}?text=${encodeURIComponent(
                    lang === 'ar'
                      ? `مرحباً، أود الاستفسار عن خدمة: ${activeModalService.title[lang]}`
                      : `Hello, I would like to inquire about: ${activeModalService.title.en}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                >
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => handleOpenInquiry(activeModalService)}
                  className="btn-gold text-xs sm:text-sm px-5 py-2.5 cursor-pointer shadow-md hover:scale-[1.02]"
                >
                  <span>{t.inquireService}</span>
                  {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Custom Requirement Modal */}
      {customRequirementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full shadow-2xl relative p-6 sm:p-8 border-2 border-[#D4AF37] animate-springIn">
            <button
              onClick={() => setCustomRequirementModal(false)}
              className="absolute top-4 right-4 [dir=rtl]:left-4 [dir=rtl]:right-auto text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 text-[#8C6A21] flex items-center justify-center mb-4 border border-[#D4AF37]/40 shadow-xs">
              <Sparkles className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">
              {lang === 'ar' ? 'طلب معاملة حكومية غير مدرجة' : 'Request Unlisted Government Service'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              {lang === 'ar'
                ? 'هل لديك معاملة خاصة أو ترخيص حكومي غير موجود بالقائمة؟ اكتب تفاصيل طلبك وسنقوم بمساعدتك فوراً.'
                : 'Have a specialized transaction or unlisted permit? Tell us your requirement and our clearance team will process it right away.'
              }
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {lang === 'ar' ? 'تفاصيل المعاملة المطلوبة' : 'Service Details / Requirement'}
                </label>
                <textarea
                  rows="3"
                  value={customReqText}
                  onChange={(e) => setCustomReqText(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: تجديد رخصة تجارية، نقل كفالة، تصحيح وضع...' : 'e.g., Trade license renewal, sponsorship transfer, MoFA legalization...'}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#D4AF37] rounded-2xl p-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomRequirementModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {t.close}
                </button>
                <button
                  type="submit"
                  className="btn-gold text-xs py-2.5 px-6 font-bold shadow-md cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'إرسال الطلب' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
