import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Globe, 
  Menu, 
  X, 
  Clock, 
  MapPin, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Navbar({ lang, setLang, activeSection, setActiveSection, onOpenContactModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = siteData.translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = `https://wa.me/${siteData.brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    lang === 'ar' ? 'مرحباً، أود الاستفسار عن المعاملات الحكومية وخدمات الطباعة' : 'Hello, I would like to inquire about government typing and travel services.'
  )}`;

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Announcement & Info Bar - White Transparent */}
      <div className="bg-white/80 backdrop-blur-md text-slate-700 text-xs py-2.5 border-b border-slate-200/60 hidden sm:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-[#8C6A21]" />
              {siteData.brand.workingHours[lang]}
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#8C6A21]" />
              {lang === 'ar' ? 'أبوظبي - بناية دار السلام، الكورنيش' : 'Abu Dhabi - Dar Al Salam Building, Corniche'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-[#8C6A21] text-slate-800 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C6A21]" />
              <span dir="ltr">{siteData.brand.phone}</span>
            </a>
            
            <div className="h-3 w-px bg-slate-300"></div>

            {/* Language Selector Pill */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-300 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 transition-transform duration-500 hover:rotate-180 text-[#8C6A21]" />
              <span>{lang === 'en' ? 'العربية (AR)' : 'English (EN)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar - White Transparent */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3 border-b border-slate-200/80' 
          : 'bg-white/70 backdrop-blur-md py-4 border-b border-slate-100'
      }`}>
        <div className="container-custom flex justify-between items-center">
          
          {/* Logo & Brand Emblem */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-13 h-13 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform duration-300 bg-slate-900 flex items-center justify-center p-0.5">
              <img 
                src={siteData.brand.logo} 
                alt="Prime Time Typing Logo"
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 font-serif">
                {siteData.brand.name[lang]}
              </div>
              <div className="text-[11px] sm:text-xs text-[#8C6A21] font-bold tracking-wider uppercase">
                {siteData.brand.subname[lang]}
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeSection === item.id 
                    ? 'bg-[#D4AF37] text-slate-900 font-black shadow-md scale-105' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all duration-300 hover:scale-105 pulse-wa"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{t.chatWhatsapp}</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold text-[#8C6A21] bg-slate-100 px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 active:scale-95 transition-transform"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'العربية' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 animate-spin" style={{ animationDuration: '0.3s' }} /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-5 shadow-2xl animate-springIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-start px-4 py-3 rounded-xl font-bold transition-all duration-300 animate-hero-title ${
                  activeSection === item.id
                    ? 'bg-[#D4AF37] text-slate-900 shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-200 mt-2 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl text-center shadow-lg pulse-wa"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>{t.chatWhatsapp}</span>
              </a>

              <a
                href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-bold py-3 rounded-xl border border-slate-300"
              >
                <Phone className="w-4 h-4 text-[#8C6A21]" />
                <span dir="ltr">{siteData.brand.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
