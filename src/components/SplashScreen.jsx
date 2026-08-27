import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function SplashScreen({ lang, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusText, setStatusText] = useState('');

  const t = siteData.translations[lang] || siteData.translations.en;

  useEffect(() => {
    // Phase status messages
    const statuses = lang === 'ar' ? [
      'جاري الاتصال بالبوابات الحكومية...',
      'التحقق من الخدمات والتصديقات...',
      'مرحباً بكم في برايم تايم للطباعة'
    ] : [
      'Initializing UAE Government Gateways...',
      'Loading Attestation & Typing Services...',
      'Welcome to Prime Time Typing'
    ];

    setStatusText(statuses[0]);

    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        
        if (next > 40 && next < 85) {
          setStatusText(statuses[1]);
        } else if (next >= 85) {
          setStatusText(statuses[2]);
        }

        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        // Delay to allow fade out animation to finish before calling onComplete
        const completeTimeout = setTimeout(() => {
          if (onComplete) onComplete();
        }, 700);
        return () => clearTimeout(completeTimeout);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white text-slate-900 flex flex-col items-center justify-center transition-all duration-700 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#D4AF37]/20 via-amber-50/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        
        {/* Animated Brand Emblem */}
        <div className="relative mb-8 group">
          
          {/* Pulsing Outer Rings */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#D4AF37]/30 via-[#F5E5C0]/40 to-[#D4AF37]/30 blur-md animate-pulse"></div>
          
          {/* Outer Shield Box with Logo Image */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#F5E5C0] via-[#D4AF37] to-[#9E7D3B] p-1 shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <img 
                src={siteData.brand.logo} 
                alt="Prime Time Typing Logo"
                className="w-full h-full object-cover rounded-[20px]" 
              />
            </div>
          </div>

          {/* Floating Sparkle Badge */}
          <div className="absolute -top-2 -right-2 bg-[#D4AF37] text-slate-900 p-1.5 rounded-full shadow-lg border-2 border-white animate-spin" style={{ animationDuration: '8s' }}>
            <Sparkles className="w-4 h-4 fill-slate-900" />
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-2 font-serif">
            <span className="gradient-text-gold">
              {siteData.brand.name[lang]}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#8C6A21] font-bold tracking-wider uppercase">
            {siteData.brand.subname[lang]}
          </p>

          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6A21]" />
            <span>{lang === 'ar' ? 'أبوظبي - بناية دار السلام، الكورنيش' : 'Abu Dhabi Corniche - Official Hub'}</span>
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full max-w-xs space-y-3">
          <div className="flex justify-between items-center text-xs font-bold px-1">
            <span className="text-slate-300 font-mono transition-all duration-300">
              {statusText}
            </span>
            <span className="text-[#F5E5C0] font-mono text-sm">
              {progress}%
            </span>
          </div>

          {/* Golden Progress Track */}
          <div className="w-full h-2 bg-[#18191D] rounded-full overflow-hidden p-0.5 border border-[#D4AF37]/30 shadow-inner relative">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F5E5C0] to-[#D4AF37] rounded-full transition-all duration-200 ease-out shadow-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Footer Tagline */}
        <p className="mt-12 text-[11px] text-slate-400 font-medium">
          {lang === 'ar' ? 'مركز خدمات ومعاملات حكومية موثوق في الإمارات' : 'Trusted UAE Government Document Clearance'}
        </p>

      </div>
    </div>
  );
}
