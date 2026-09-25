import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Globe,
  Menu,
  X,
  Shield,
  Search
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Navbar({
  lang,
  setLang,
  activeSection,
  setActiveSection,
  onOpenContactModal,
  onOpenAdmin,
  onOpenSearch
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = siteData?.translations?.[lang] || siteData?.translations?.en || {};

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices },
    { id: 'estimator', label: t.navCalculator },
    { id: 'faq', label: t.navFaq },
    { id: 'contact', label: t.navContact }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappNumber = siteData.brand.whatsappLink || siteData.brand.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '971');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar' ? 'مرحباً، أود الاستفسار عن المعاملات الحكومية وخدمات الطباعة' : 'Hello, I would like to inquire about government typing and document clearance.'
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3 sm:py-3.5 text-slate-900'
          : 'bg-transparent text-white border-b border-white/10 py-3.5 sm:py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name (Wildhaven style) */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/30 shadow-xs group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center p-0.5">
            <img
              src={siteData.brand.logo}
              alt="Prime Time Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <div
              className={`text-lg sm:text-xl font-bold tracking-tight flex items-baseline font-heading transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              <span>{lang === 'ar' ? 'برايم تايم' : 'Prime Time'}</span>
              <span className="text-[#D4AF37] ms-0.5">.</span>
            </div>
            <div
              className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${
                isScrolled ? 'text-[#8C6A21]' : 'text-white/70'
              }`}
            >
              {siteData.brand.subname[lang]}
            </div>
          </div>
        </div>

        {/* Desktop Nav Items (Exact Wildhaven 11px uppercase tracking-wider style) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 font-sans">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer focus:outline-none select-none ${
                  isScrolled
                    ? isActive
                      ? 'text-[#8C6A21] font-bold'
                      : 'text-slate-700 hover:text-slate-950 hover:opacity-75'
                    : isActive
                    ? 'text-white font-bold border-b border-[#D4AF37] pb-0.5'
                    : 'text-white/80 hover:text-white hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Wildhaven pill CTA + Search + Language) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isScrolled
                  ? 'text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                  : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md'
              }`}
              title={lang === 'ar' ? 'البحث عن خدمة' : 'Search Services'}
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs ${
              isScrolled
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md'
            }`}
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* WhatsApp / Book Consultation Button (Exact Wildhaven pill style) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-2 rounded-full text-[11px] uppercase tracking-wider font-semibold px-5 py-2.5 transition-all duration-300 shadow-md ${
              isScrolled
                ? 'bg-[#25D366] hover:bg-[#1EBE5D] text-white hover:scale-105'
                : 'backdrop-blur-md border border-white/30 bg-white/10 text-white hover:bg-white hover:text-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:scale-105'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.chatWhatsapp}</span>
          </a>

          {/* Admin Portal Shortcut */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className={`hidden xl:flex items-center gap-1 text-xs font-semibold px-2 py-1 transition-colors cursor-pointer ${
                isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
              }`}
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'لوحة التحكم' : 'Admin'}</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isScrolled
                ? 'text-slate-900 bg-slate-100 border border-slate-200'
                : 'text-white bg-white/10 border border-white/20 backdrop-blur-md'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#D4AF37]" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Wildhaven style clip/slide down) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-white/15 px-6 py-6 shadow-2xl backdrop-blur-2xl text-white animate-springIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-start py-3 text-[11px] uppercase tracking-wider font-semibold transition-all border-b border-white/10 ${
                  activeSection === item.id
                    ? 'text-[#D4AF37] font-bold ps-2 border-s-2 border-[#D4AF37]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 flex items-center justify-between mt-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/15 px-3.5 py-2 rounded-full border border-white/25"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-white/90 bg-white/15 px-3.5 py-2 rounded-full border border-white/25"
                >
                  <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'لوحة التحكم' : 'Admin'}</span>
                </button>
              )}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-full text-center shadow-lg text-xs uppercase"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{t.chatWhatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
