import React from 'react';
import { Quote, Star, Users } from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

export default function Testimonials({ lang }) {
  const t = siteData.translations[lang];

  return (
    <section id="testimonials" className="py-20 bg-white text-slate-900 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="glow-gold top-0 right-10 opacity-15"></div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge-gold mb-3">
              <Users className="w-4 h-4 text-[#8C6A21]" />
              <span>{lang === 'ar' ? 'آراء المتعاملين' : 'Client Testimonials'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-heading">
              {lang === 'ar' ? 'ماذا يقول عملاؤنا عن خدماتنا' : 'We are Trusted Worldwide'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {lang === 'ar' 
                ? 'تجارب حقيقية من شركائنا وعملائنا في إنجاز التوثيق والمعاملات الحكومية'
                : 'Read verified experiences from our valued corporate and individual clients across UAE'
              }
            </p>
          </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {siteData.testimonials.map((testi, idx) => (
            <AnimatedSection 
              key={testi.id} 
              animation={idx % 2 === 0 ? 'fade-right' : 'fade-left'} 
              delay={150 + idx * 150}
            >
              <div
                className="bg-white p-8 rounded-3xl border border-slate-200/60 hover:border-[#D4AF37]/50 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(212,175,55,0.15)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-between text-start group relative overflow-hidden h-full transform hover:-translate-y-2"
              >
                {/* Top Subtle Gold Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>

                <div className="relative z-10">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] transform group-hover:scale-110 transition-transform duration-500" style={{ transitionDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-slate-100 group-hover:text-[#D4AF37]/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out" />
                  </div>

                  <p className="text-slate-600 text-[15px] leading-relaxed mb-10 font-medium">
                    "{testi.text[lang]}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100/80 relative z-10">
                  <div className="relative">
                    <img
                      src={testi.photo}
                      alt={testi.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-500"
                    />
                    {/* Elegant floating ring around avatar on hover */}
                    <div className="absolute inset-0 rounded-full ring-2 ring-[#D4AF37]/20 group-hover:ring-[#D4AF37]/80 transition-all duration-500 scale-105 group-hover:scale-110 pointer-events-none"></div>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#8C6A21] transition-colors font-heading leading-tight mb-0.5">
                      {testi.name}
                    </h3>
                    <div className="text-[13px] font-semibold text-[#8C6A21]/90">
                      {testi.company}
                    </div>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
