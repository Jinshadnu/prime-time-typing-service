import React, { useState } from 'react';
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
  Filter
} from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

export default function ServicesSection({ lang, onSelectServiceForInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalService, setActiveModalService] = useState(null);

  const t = siteData.translations[lang];

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
    FileSpreadsheet
  };

  // Filter logic
  const filteredServices = siteData.services.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.categoryId === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const titleMatch = srv.title?.[lang]?.toLowerCase().includes(q);
    const descText = srv.shortDesc?.[lang] || srv.desc?.[lang] || '';
    const descMatch = descText.toLowerCase().includes(q);
    return matchesCategory && (titleMatch || descMatch);
  });

  const handleOpenInquiry = (service) => {
    setActiveModalService(null);
    onSelectServiceForInquiry(service);
  };

  return (
    <section id="services" className="py-20 bg-white text-slate-900 relative overflow-hidden">
      <div className="container-custom">
        
        {/* Section Header */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="badge-gold mb-3">
              <FileCheck className="w-4 h-4 text-[#8C6A21]" />
              <span>{lang === 'ar' ? 'جميع المترجمات والمعاملات الرسمية' : 'Verified UAE Government Catalog'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-serif">
              {t.servicesTitle}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {t.servicesSubtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Filter Controls: Search & Category Tabs */}
        <div className="mb-12">
          
          {/* Search Bar */}
          <AnimatedSection animation="fade-up" delay={150}>
            <div className="max-w-xl mx-auto mb-8 relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#D4AF37] rounded-2xl py-3.5 px-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm focus:shadow-md"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 [dir=rtl]:right-4 [dir=rtl]:left-auto top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 [dir=rtl]:left-4 [dir=rtl]:right-auto top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Category Tabs */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  selectedCategory === 'all'
                    ? 'bg-[#D4AF37] text-slate-900 font-black shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:scale-102'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>{t.allCategories}</span>
              </button>

              {siteData.categories.map((cat) => {
                const IconComp = iconMap[cat.iconName] || FileCheck;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#D4AF37] text-slate-900 font-black shadow-md scale-105'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:scale-102'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{cat.name[lang]}</span>
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-semibold mb-2">
                {lang === 'ar' ? 'لم يتم العثور على خدمات تطابق البحث' : 'No services found matching your query.'}
              </p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs text-[#8C6A21] underline font-bold hover:text-slate-900"
              >
                {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv, idx) => {
              const ServiceIcon = iconMap[srv.iconName] || iconMap[srv.icon] || FileCheck;
              return (
                <AnimatedSection 
                  key={srv.id + '-' + selectedCategory}
                  animation="zoom-in"
                  delay={100 + (idx % 6) * 80}
                >
                  <div
                    className="bg-white hover:bg-slate-50/80 rounded-3xl border border-slate-200/90 hover:border-[#D4AF37] p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full transform hover:-translate-y-1.5"
                  >
                    {/* Top Badge if Featured */}
                    {srv.featured && (
                      <div className="absolute top-5 right-5 [dir=rtl]:left-5 [dir=rtl]:right-auto bg-amber-50 text-[#8C6A21] text-[11px] font-black px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
                        {lang === 'ar' ? 'خدمة ممتازة' : 'Popular'}
                      </div>
                    )}

                    <div>
                      {/* Icon Box */}
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#8C6A21] border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-slate-900 transition-all duration-300 shadow-sm">
                        <ServiceIcon className="w-7 h-7" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#8C6A21] transition-colors font-serif">
                        {srv.title[lang]}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3">
                        {srv.shortDesc?.[lang] || srv.desc?.[lang]}
                      </p>
                    </div>

                    {/* Metadata & Actions */}
                    <div>
                      <div className="pt-4 border-t border-slate-200 mb-5 text-xs text-slate-500 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#8C6A21]" />
                            {t.processingTime}:
                          </span>
                          <span className="font-bold text-slate-800">{srv.processingTime[lang]}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-medium">
                            <DollarSign className="w-3.5 h-3.5 text-[#8C6A21]" />
                            {t.governmentFee}:
                          </span>
                          <span className="font-bold text-[#8C6A21]">{srv.govtFeeRange[lang]}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => setActiveModalService(srv)}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs py-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                        >
                          {t.viewDetails}
                        </button>

                        <button
                          onClick={() => handleOpenInquiry(srv)}
                          className="w-full btn-gold text-xs py-2.5 cursor-pointer shadow-sm"
                        >
                          <span>{lang === 'ar' ? 'طلب الآن' : 'Inquire'}</span>
                          {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        )}

      </div>

      {/* Detailed Service Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border-2 border-[#D4AF37] animate-springIn">
            
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 right-6 [dir=rtl]:left-6 [dir=rtl]:right-auto text-slate-400 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#8C6A21] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-sm">
                {React.createElement(iconMap[activeModalService.iconName] || iconMap[activeModalService.icon] || FileCheck, { className: "w-7 h-7" })}
              </div>
              <div>
                <span className="text-xs font-bold text-[#8C6A21] uppercase tracking-wider">
                  {siteData.categories.find(c => c.id === activeModalService.categoryId)?.name[lang]}
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-serif">
                  {activeModalService.title[lang]}
                </h3>
              </div>
            </div>

            <div className="space-y-6 text-start">
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">Description</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeModalService.fullDesc?.[lang] || activeModalService.desc?.[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs text-slate-500 font-semibold mb-1">{t.processingTime}</div>
                  <div className="text-sm font-extrabold text-slate-900">{activeModalService.processingTime[lang]}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold mb-1">{t.governmentFee}</div>
                  <div className="text-sm font-extrabold text-[#8C6A21]">{activeModalService.govtFeeRange[lang]}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#8C6A21]" />
                  <span>{t.keyRequirements}</span>
                </h4>
                <ul className="space-y-2">
                  {activeModalService.requirements[lang].map((req, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                {t.close}
              </button>

              <button
                onClick={() => handleOpenInquiry(activeModalService)}
                className="btn-gold text-sm px-6 py-2.5 shadow-sm"
              >
                <span>{t.inquireService}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
