import React from 'react';
import { MapPin, Mail, Phone, ArrowUp, ShieldCheck } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { siteData } from '../data/siteData';

export default function Footer({ lang, onNavigate }) {
  const t = siteData.translations[lang];

  const scrollToTop = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-slate-50 text-slate-800 pt-16 pb-12 border-t border-slate-200/80">
      <div className="container-custom">
        
        {/* Top 3 Info Cards Grid - White Transparent Glass */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-200">
          
          {/* Address Box */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#D4AF37] transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8C6A21] flex items-center justify-center shrink-0 border border-[#D4AF37]/30 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-1">{t.officeLocation}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                {siteData.brand.address[lang]}
              </p>
            </div>
          </div>

          {/* Mailbox Box */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#D4AF37] transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8C6A21] flex items-center justify-center shrink-0 border border-[#D4AF37]/30 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-1">{t.emailUs}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {siteData.brand.email}
              </p>
            </div>
          </div>

          {/* Phone Box */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#D4AF37] transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8C6A21] flex items-center justify-center shrink-0 border border-[#D4AF37]/30 shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-1">{t.directPhone}</h4>
              <p className="text-xs text-slate-800 font-bold leading-relaxed font-serif" dir="ltr">
                {siteData.brand.phone}
              </p>
            </div>
          </div>

        </div>

        {/* Center Brand & Navigation */}
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-black shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center p-0.5">
              <img 
                src={siteData.brand.logo} 
                alt="Prime Time Typing Logo"
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-serif">
                {siteData.brand.name[lang]}
              </h3>
              <p className="text-xs text-[#8C6A21] font-bold">
                {siteData.brand.subname[lang]}
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={siteData.brand.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-200 hover:bg-[#D4AF37] text-slate-800 hover:text-slate-900 flex items-center justify-center transition-colors shadow-sm"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href={siteData.brand.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-200 hover:bg-[#D4AF37] text-slate-800 hover:text-slate-900 flex items-center justify-center transition-colors shadow-sm"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-white hover:bg-[#D4AF37] text-slate-800 hover:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition-all cursor-pointer shadow-sm"
          >
            <span>{lang === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'}</span>
            <ArrowUp className="w-4 h-4 text-[#8C6A21]" />
          </button>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-200 text-center space-y-3">
          <p className="text-[11px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
            {t.footerDisclaimer}
          </p>
          <p className="text-xs text-[#8C6A21] font-bold">
            {t.footerCopyright}
          </p>
        </div>

      </div>
    </footer>
  );
}
