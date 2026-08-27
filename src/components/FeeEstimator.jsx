import React, { useState, useEffect } from 'react';
import { Calculator, Clock, DollarSign, FileCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

export default function FeeEstimator({ lang, onSelectServiceForInquiry }) {
  const [selectedServiceId, setSelectedServiceId] = useState(siteData.services[0].id);
  const [applicantCount, setApplicantCount] = useState(1);
  const [urgency, setUrgency] = useState('standard');
  const [isRecalculating, setIsRecalculating] = useState(false);

  const t = siteData.translations[lang];

  const currentService = siteData.services.find(s => s.id === selectedServiceId) || siteData.services[0];

  // Trigger brief pulse animation whenever estimation params change
  useEffect(() => {
    setIsRecalculating(true);
    const timer = setTimeout(() => setIsRecalculating(false), 500);
    return () => clearTimeout(timer);
  }, [selectedServiceId, applicantCount, urgency]);

  return (
    <section id="estimator" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="glow-gold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge-gold mb-3">
              <Calculator className="w-4 h-4 text-[#8C6A21]" />
              <span>{t.estimatorBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-serif">
              {t.estimatorTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t.estimatorSubtitle}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="zoom-in" delay={150}>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Input Controls */}
              <div className="space-y-6 text-start">
                
                {/* Select Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    {t.selectServiceLabel}
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-colors shadow-inner"
                  >
                    {siteData.services.map((s) => (
                      <option key={s.id} value={s.id} className="bg-white">
                        {s.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Applicants Slider / Counter */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {t.applicantCountLabel}
                    </label>
                    <span className="text-sm font-black text-[#0A0B0E] bg-[#D4AF37] px-3 py-1 rounded-lg shadow-sm">
                      {applicantCount} {applicantCount === 1 ? (lang === 'ar' ? 'شخص' : 'Person') : (lang === 'ar' ? 'أشخاص' : 'People')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={applicantCount}
                    onChange={(e) => setApplicantCount(parseInt(e.target.value))}
                    className="w-full accent-[#D4AF37] bg-slate-200 h-2.5 rounded-lg cursor-pointer transition-all"
                  />
                </div>

                {/* Speed / Urgency Switcher */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    {t.urgencyLabel}
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setUrgency('standard')}
                      className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border text-start transition-all duration-300 cursor-pointer ${
                        urgency === 'standard'
                          ? 'bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-[#D4AF37]'
                      }`}
                    >
                      {t.standardSpeed}
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgency('express')}
                      className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border text-start transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        urgency === 'express'
                          ? 'bg-gradient-to-r from-[#F5E5C0] via-[#D4AF37] to-[#9E7D3B] text-slate-900 border-[#D4AF37] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-[#D4AF37]'
                      }`}
                    >
                      <span>{t.expressSpeed}</span>
                      <span className="text-[10px] bg-red-600 text-white font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">VIP</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Estimation Output Card - White Transparent Glass */}
              <div 
                className={`bg-white/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between h-full text-start shadow-xl relative overflow-hidden backdrop-blur-xl ${
                  isRecalculatePulse(isRecalculating)
                }`}
              >
                <div>
                  <div className="text-xs text-[#8C6A21] font-black tracking-wider uppercase mb-1 flex items-center justify-between font-serif">
                    <span>{currentService.title[lang]}</span>
                    {isRecalculating && (
                      <span className="text-[10px] text-[#8C6A21] animate-pulse">
                        {lang === 'ar' ? 'جاري الحساب...' : 'Updating...'}
                      </span>
                    )}
                  </div>
                  
                  {/* Cost Estimation */}
                  <div className="my-4 pb-4 border-b border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">{t.estimatedCostRange}</div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 flex items-baseline gap-1 font-serif">
                      <span className="gradient-text-gold transition-all">
                        {currentService.govtFeeRange[lang]}
                      </span>
                    </div>
                    {applicantCount > 1 && (
                      <div className="text-[11px] text-[#8C6A21] mt-1 font-bold">
                        {lang === 'ar' ? `التقدير شاملاً عدد المتقدمين (${applicantCount})` : `Estimated total for ${applicantCount} applicants`}
                      </div>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="mb-4 pb-4 border-b border-slate-200 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#8C6A21] shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">{t.estimatedDuration}</div>
                      <div className="text-sm font-bold text-slate-900">
                        {urgency === 'express' ? (lang === 'ar' ? 'نفس اليوم (في غضون ساعات قليلة)' : 'Same Day (Within 2-4 Hours)') : currentService.processingTime[lang]}
                      </div>
                    </div>
                  </div>

                  {/* Document Requirements List */}
                  <div>
                    <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#8C6A21]" />
                      <span>{t.keyRequirements}:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 max-h-32 overflow-y-auto pr-2">
                      {currentService.requirements[lang].map((req, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Inquire CTA */}
                <button
                  onClick={() => onSelectServiceForInquiry(currentService)}
                  className="mt-6 w-full btn-gold text-xs sm:text-sm py-3.5 justify-center group shadow-[0_10px_25px_rgba(212,175,55,0.35)]"
                >
                  <span>{t.inquireService}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>

              </div>

            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}

function isRecalculatePulse(recalc) {
  return recalc ? 'ring-2 ring-[#D4AF37] scale-[1.01]' : '';
}
