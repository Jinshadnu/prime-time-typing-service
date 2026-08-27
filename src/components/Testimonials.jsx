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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-serif">
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
                className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-start group relative h-full transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] transform group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                    <Quote className="w-9 h-9 text-[#D4AF37]/40 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all duration-300" />
                  </div>

                  <p className="text-slate-700 text-base leading-relaxed italic mb-8">
                    "{testi.text[lang]}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                  <img
                    src={testi.photo}
                    alt={testi.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#8C6A21] transition-colors font-serif">
                      {testi.name}
                    </h3>
                    <div className="text-xs font-bold text-[#8C6A21]">
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
