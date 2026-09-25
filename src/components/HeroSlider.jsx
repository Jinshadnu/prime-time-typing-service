import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  CreditCard,
  Award,
  FileText,
  Plane,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

const SLIDE_DURATION = 5500; // 5.5 seconds per slide (like Wildhaven)

export default function HeroSlider({
  lang,
  onNavigateSection
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = siteData?.heroBanners || [];
  const t = siteData?.translations?.[lang] || siteData?.translations?.en || {};

  const nextSlide = useCallback(() => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Progress Bar Timer (Exact Wildhaven linear progress logic)
  useEffect(() => {
    if (isPaused || !slides || slides.length === 0) return;

    const interval = 50; // update every 50ms
    const step = 100 / (SLIDE_DURATION / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slides.length]);

  const handleNavClick = (id) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappNumber = siteData?.brand?.whatsappLink || siteData?.brand?.whatsapp?.replace(/[^0-9]/g, '').replace(/^0/, '971') || '971507602200';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar' ? 'مرحباً، أود الاستفسار عن المعاملات الحكومية وخدمات الطباعة' : 'Hello, I would like to inquire about government typing and document clearance.'
  )}`;

  const quickIcons = {
    CreditCard,
    Award,
    FileText,
    Plane
  };

  if (!slides || slides.length === 0) return null;

  const current = slides[currentSlide] || slides[0] || {};

  return (
    <section id="home" className="relative select-none bg-white">

      {/* =========================================================================
          WILDHAVEN FULL-SCREEN BANNER (100% WIDTH, FULL HEIGHT, CINEMATIC OVERLAY)
          ========================================================================= */}
      <div
        className="relative h-[100svh] min-h-[520px] sm:min-h-[620px] max-h-[1080px] w-full overflow-hidden bg-slate-950"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide Background Images with Smooth Cross-Fade */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <picture className="w-full h-full block">
                {slide.mobileImage && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={slide.mobileImage}
                  />
                )}
                <img
                  src={slide.image}
                  alt={slide.title?.[lang] || 'Prime Time Typing'}
                  className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </picture>

              {/* Wildhaven Cinematic Overlays: Bright, crisp mobile visibility + bottom contrast for text */}
              <div className="absolute inset-0 bg-black/20 sm:bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent sm:via-black/25 sm:to-black/35" />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent [dir=rtl]:bg-gradient-to-l" />
            </div>
          );
        })}

        {/* Ambient Warm Golden Glow */}
        <div className="glow-gold -top-20 -left-20 opacity-15 pointer-events-none z-10"></div>

        {/* =====================================================================
            HERO CONTENT ANCHORED AT BOTTOM-LEFT (EXACT WILDHAVEN LAYOUT)
            ===================================================================== */}
        <div className="absolute bottom-14 sm:bottom-24 md:bottom-28 left-4 sm:left-8 md:left-12 lg:left-20 right-4 sm:right-8 md:right-12 lg:right-20 z-20 text-white max-w-3xl [dir=rtl]:text-right">
          
          {/* Eyebrow Pill / Subtitle */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-white/90">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D4AF37]" />
            <span>
              {current?.badge?.[lang] || current?.badge?.en || (lang === 'ar' ? 'مركز معاملات حكومية معتمد • أبوظبي' : 'OFFICIAL GOVERNMENT CLEARANCE • ABU DHABI')}
            </span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-2 sm:mb-4 font-heading drop-shadow-md">
            {current?.id === 'slide1' ? (
              lang === 'ar' ? (
                <>
                  <span className="block font-light">خدمات الطباعة و</span>
                  <span className="block font-bold text-white">المعاملات الحكومية</span>
                </>
              ) : (
                <>
                  <span className="block font-light">Fast & Accurate</span>
                  <span className="block font-bold text-white">Typing Services</span>
                </>
              )
            ) : current?.id === 'slide2' ? (
              lang === 'ar' ? (
                <>
                  <span className="block font-light">معاملات الإقامة و</span>
                  <span className="block font-bold text-white">تصاريح العمل</span>
                </>
              ) : (
                <>
                  <span className="block font-light">Seamless Residency &</span>
                  <span className="block font-bold text-white">Labour Visa Clearance</span>
                </>
              )
            ) : (
              lang === 'ar' ? (
                <>
                  <span className="block font-light">تأسيس الشركات و</span>
                  <span className="block font-bold text-white">تصديق الوثائق</span>
                </>
              ) : (
                <>
                  <span className="block font-light">Complete Business Setup &</span>
                  <span className="block font-bold text-white">Certificate Attestation</span>
                </>
              )
            )}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-white/85 text-xs sm:text-base lg:text-lg mb-3.5 sm:mb-8 leading-relaxed max-w-xl font-normal drop-shadow-sm line-clamp-2 sm:line-clamp-none">
            {current?.description?.[lang] || current?.description?.en || ''}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-2 sm:gap-4">
            {/* Primary Action Button (Wildhaven Book Now style) */}
            <button
              onClick={() => handleNavClick('services')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 sm:gap-3 bg-white text-slate-900 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-white/90 transition-all duration-300 shadow-xl active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>{t.heroCtaPrimary}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              )}
            </button>

            {/* Secondary Glass Action Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366] fill-[#25D366] shrink-0" />
              <span>{t.chatWhatsapp}</span>
            </a>
          </div>

        </div>

        {/* =====================================================================
            HORIZONTAL LINE PROGRESS BARS AT VERY BOTTOM (SIGNATURE WILDHAVEN UI)
            ===================================================================== */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 md:left-12 lg:left-20 right-4 sm:right-8 md:right-12 lg:right-20 z-20 flex gap-1.5 sm:gap-3">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className="flex-1 h-[2px] sm:h-[3px] bg-white/30 hover:bg-white/50 rounded-full overflow-hidden cursor-pointer transition-colors"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                style={{
                  width: idx === currentSlide ? `${progress}%` : idx < currentSlide ? "100%" : "0%"
                }}
              />
            </button>
          ))}
        </div>

      </div>

      {/* =========================================================================
          POPULAR SERVICES GRID (BELOW THE FOLD)
          ========================================================================= */}
      <div className="container-custom py-16 sm:py-20">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#8C6A21] block mb-2 font-heading">
                {lang === 'ar' ? 'الخدمات الأكثر طلباً' : 'POPULAR GOVERNMENT SERVICES'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
                {t.quickLinksTitle}
              </h2>
            </div>

            <button
              onClick={() => handleNavClick('services')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8C6A21] hover:text-slate-900 transition-colors group cursor-pointer self-start sm:self-auto"
            >
              <span>{lang === 'ar' ? 'عرض جميع المعاملات' : 'View All Services'}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
        </AnimatedSection>

        {/* Quick Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteData.quickLinks.map((item, idx) => {
            const IconComp = quickIcons[item.iconName] || CreditCard;
            return (
              <AnimatedSection
                key={item.id}
                animation="fade-up"
                delay={120 + idx * 80}
              >
                <div
                  onClick={() => handleNavClick('services')}
                  className="bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#D4AF37] p-6 rounded-3xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group shadow-sm hover:shadow-xl relative overflow-hidden min-h-[170px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#D4AF37] text-slate-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                      {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#8C6A21] transition-colors font-heading mb-1">
                      {item.title[lang]}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc[lang]}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

    </section>
  );
}
