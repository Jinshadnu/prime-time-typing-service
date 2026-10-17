import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, ExternalLink, MessageSquarePlus, MapPin, Sparkles } from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';
import { getStoredTestimonials, getStoredSettings } from '../utils/adminStorage';

// Official Multi-color Google "G" SVG
function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

export default function Testimonials({ lang = 'en' }) {
  const [testimonials, setTestimonials] = useState(() => getStoredTestimonials());
  const [settings, setSettings] = useState(() => getStoredSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(getStoredTestimonials());
      setSettings(getStoredSettings());
    };
    window.addEventListener('primetime_admin_data_updated', handleUpdate);
    return () => window.removeEventListener('primetime_admin_data_updated', handleUpdate);
  }, []);

  const googleUrl = settings?.googleReviewsUrl || siteData.brand?.googleReviewsUrl || "https://maps.app.goo.gl/fXYcpkeP2NwUp9cH8";
  const ratingValue = settings?.googleRating || siteData.brand?.googleRating || "5.0";
  const reviewCount = settings?.googleReviewCount || testimonials.length || 6;

  // Filter only active testimonials
  const activeTestimonials = testimonials.filter(t => t.status !== 'inactive');

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white text-slate-900 relative overflow-hidden">

      {/* Decorative Gold Radial Glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-xs mb-4">
              <GoogleIcon className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wider text-slate-800 uppercase">
                {lang === 'ar' ? 'تقييمات خرائط جوجل المعتمدة' : 'Verified Google Maps Reviews'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-heading tracking-tight">
              {lang === 'ar' ? 'آراء وتجارب عملائنا على جوجل' : 'Real Client Reviews on Google'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'تقييمات وتجارب حقيقية موثقة من أصحاب الأعمال والأفراد الذين أنجزوا معاملاتهم في برايم تايم'
                : 'Authentic 5-star experiences from UAE residents and business owners who rely on Prime Time Typing'
              }
            </p>

            {/* Google Rating Overview Banner */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-md max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                  <GoogleIcon className="w-7 h-7" />
                </div>
                <div className="text-start">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900 font-heading">{ratingValue}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {lang === 'ar'
                      ? `بناءً على تقييمات خرائط جوجل (${reviewCount}+ تقييم معتمد)`
                      : `Based on Google Maps reviews (${reviewCount}+ verified reviews)`
                    }
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F28] hover:from-[#E5C158] hover:to-[#C6A035] text-slate-950 text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'اكتب تقييماً' : 'Write a Review'}</span>
                </a>
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  title={lang === 'ar' ? 'عرض في خرائط جوجل' : 'View on Google Maps'}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#8C6A21]" />
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTestimonials.map((testi, idx) => {
            const reviewText = testi.review?.[lang] || testi.text?.[lang] || testi.review?.en || testi.text?.en || '';
            const reviewDate = typeof testi.date === 'object' ? (testi.date?.[lang] || testi.date?.en) : (testi.date || (lang === 'ar' ? 'حديثاً' : 'Recently'));
            const reviewerRole = testi.role || testi.company || (lang === 'ar' ? 'عميل معتمد على جوجل' : 'Verified Google Customer');
            const ratingScore = Number(testi.rating) || 5;

            return (
              <AnimatedSection
                key={testi.id || idx}
                animation="fade-up"
                delay={100 + (idx % 3) * 120}
              >
                <div
                  className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-[#D4AF37]/60 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(212,175,55,0.18)] transition-all duration-300 flex flex-col justify-between text-start group relative overflow-hidden h-full transform hover:-translate-y-1.5"
                >
                  {/* Subtle Top Gold Border Highlight on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

                  {/* Top Header: Reviewer Avatar, Name, Google Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      
                      {/* Avatar & Author Info */}
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          {testi.photo || testi.image ? (
                            <img
                              src={testi.photo || testi.image}
                              alt={testi.name}
                              className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-11 h-11 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-[#8C6A21] font-bold text-sm flex items-center justify-center border border-[#D4AF37]/30 shadow-xs ${testi.photo || testi.image ? 'hidden' : 'flex'}`}
                          >
                            {testi.name?.charAt(0) || 'G'}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#8C6A21] transition-colors font-heading leading-snug">
                              {testi.name}
                            </h3>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50 shrink-0" title="Verified Customer" />
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {reviewerRole}
                          </div>
                        </div>
                      </div>

                      {/* Google G Icon Pill */}
                      <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                        <GoogleIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Star Rating & Date */}
                    <div className="flex items-center justify-between mb-3.5 pt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < ratingScore ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">
                        {reviewDate}
                      </span>
                    </div>

                    {/* Service Tag if Available */}
                    {testi.service && (
                      <div className="inline-block mb-3 px-2.5 py-0.5 rounded-md bg-amber-50/80 border border-[#D4AF37]/20 text-[10.5px] font-bold text-[#8C6A21]">
                        {testi.service}
                      </div>
                    )}

                    {/* Review Body */}
                    <p className="text-slate-700 text-[13.5px] leading-relaxed font-normal">
                      "{reviewText}"
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <GoogleIcon className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'منشور على خرائط جوجل' : 'Posted on Google Maps'}</span>
                    </span>
                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C6A21] hover:underline font-bold inline-flex items-center gap-0.5"
                    >
                      <span>{lang === 'ar' ? 'عرض التقييم' : 'View'}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom Callout to Google Maps */}
        <AnimatedSection animation="fade-up" delay={300}>
          <div className="mt-14 text-center">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>{lang === 'ar' ? 'اقرأ جميع الآراء والتقييمات على صفحتنا في خرائط جوجل' : 'Read all customer reviews on our official Google Maps profile'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#8C6A21] transition-colors" />
            </a>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
