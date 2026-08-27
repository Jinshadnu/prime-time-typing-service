import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  MessageSquare,
  CreditCard,
  Award,
  FileText,
  Plane,
  CheckCircle2
} from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

export default function HeroSlider({ lang, onNavigateSection }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slides = siteData.heroBanners;
  const t = siteData.translations[lang];
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const whatsappUrl = `https://wa.me/${siteData.brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    lang === 'ar' ? 'مرحباً، أرغب بالاستفسار عبر الواتساب' : 'Hello, I want to make an inquiry via WhatsApp.'
  )}`;

  const quickIcons = {
    CreditCard,
    Award,
    FileText,
    Plane
  };

  return (
    <section className="relative bg-[#0A0B0E] text-white overflow-hidden select-none">
      {/* Main Carousel Viewport with Horizontal Auto-Scroll */}
      <div 
        className="relative min-h-[600px] md:min-h-[680px] flex items-center overflow-hidden"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Horizontal Track for Smooth Auto-Scrolling */}
        <div 
          className="flex w-full h-full transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
          style={{ 
            transform: lang === 'ar' 
              ? `translateX(${currentSlide * 100}%)` 
              : `translateX(-${currentSlide * 100}%)` 
          }}
        >
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className="w-full flex-shrink-0 relative min-h-[600px] md:min-h-[680px] flex items-center"
              >
                {/* Background Image with Zoom Overlay */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ backgroundImage: `url('${slide.image}')` }}
                ></div>

                {/* Transparent Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40"></div>

                {/* Dynamic Glow Accents */}
                <div className="glow-gold -top-20 -left-20 opacity-30"></div>

                {/* Slide Content */}
                <div className="container-custom relative z-20 h-full flex items-center py-16 md:py-24">
                  <div className="max-w-3xl text-left flex flex-col items-start">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#F5E5C0] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 shadow-lg backdrop-blur-md">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
                      <span>{slide.badge[lang]}</span>
                    </div>

                    {/* Dynamic Title */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight font-serif drop-shadow-xl">
                      <span className="gradient-text-gold">{slide.title[lang]}</span>
                    </h1>

                    {/* Dynamic Description */}
                    <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed mb-8 font-normal max-w-2xl drop-shadow-md">
                      {slide.description[lang]}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => onNavigateSection('services')}
                        className="btn-gold text-sm md:text-base px-7 py-3.5 sm:py-4 group cursor-pointer shadow-xl w-full sm:w-auto justify-center"
                      >
                        <span>{t.heroCtaPrimary}</span>
                        {lang === 'ar' ? (
                          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        ) : (
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 bg-white/90 hover:bg-white text-slate-900 font-bold px-7 py-3.5 sm:py-4 rounded-xl border border-white/60 transition-all hover:scale-105 cursor-pointer text-sm md:text-base shadow-lg w-full sm:w-auto text-center backdrop-blur-md"
                      >
                        <MessageSquare className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                        <span>{t.heroCtaSecondary}</span>
                      </a>
                    </div>

                    {/* Trust Highlights */}
                    <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/15 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-xs md:text-sm text-slate-200">
                      <div className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{lang === 'ar' ? 'اعتماد 100% من الجهات الحكومية' : '100% Government Portal Verified'}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{lang === 'ar' ? 'معالجة عاجلة في نفس اليوم' : 'Same-Day Express Processing'}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{lang === 'ar' ? 'فريق مستشارين دائم الخدمة' : 'Dedicated Multilingual Experts'}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Navigation Controls - Transparent Glass Floating Bar */}
      <div className="absolute z-30 bottom-3 right-3 sm:bottom-6 sm:right-6 md:right-12 left-auto flex items-center gap-2 sm:gap-3 bg-slate-950/80 backdrop-blur-xl px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 shadow-2xl max-w-[calc(100vw-1.5rem)] text-white">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-slate-200 hover:text-[#D4AF37] p-1.5 transition-colors cursor-pointer"
          title={isPlaying ? "Pause autoplay" : "Play autoplay"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="h-4 w-px bg-white/20"></div>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#D4AF37] shadow-lg' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="h-4 w-px bg-white/20"></div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={lang === 'ar' ? handleNext : handlePrev}
            className="text-slate-200 hover:text-[#D4AF37] p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={lang === 'ar' ? handlePrev : handleNext}
            className="text-slate-200 hover:text-[#D4AF37] p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Quick Links Floating Section - White Transparent Banner */}
      <div className="relative z-30 bg-white/80 backdrop-blur-xl border-t border-b border-slate-200/80 py-12">
        <div className="container-custom">
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight font-serif">
                {t.quickLinksTitle}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto">
                {t.quickLinksSubtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {siteData.quickLinks.map((item, idx) => {
              const IconComp = quickIcons[item.iconName] || CreditCard;
              return (
                <AnimatedSection 
                  key={item.id} 
                  animation="fade-up" 
                  delay={150 + idx * 100}
                >
                  <div
                    onClick={() => onNavigateSection('services')}
                    className="bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37] p-5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group shadow-sm hover:shadow-lg relative overflow-hidden"
                  >
                    {/* Hover Glow Light */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-amber-50/40 to-transparent pointer-events-none"></div>

                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#8C6A21] transition-colors font-serif">
                        {item.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {item.desc[lang]}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
