import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

export default function FaqSection({ lang }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const t = siteData.translations[lang] || siteData.translations.en;
  const faqs = siteData.faqs || [];

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const questionText = faq.question[lang]?.toLowerCase() || '';
    const answerText = faq.answer[lang]?.toLowerCase() || '';
    return questionText.includes(q) || answerText.includes(q);
  });

  const whatsappNumber = siteData.brand.whatsappLink || siteData.brand.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '971');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar' ? 'مرحباً، لدي استفسار إضافي لم أجده في الأسئلة الشائعة' : 'Hello, I have an inquiry not covered in the FAQs.'
  )}`;
  const phoneTel = siteData.brand.phoneTel || (siteData.brand.phone.startsWith('+') ? siteData.brand.phone.replace(/\s+/g, '') : '+971' + siteData.brand.phone.replace(/^0/, '').replace(/\s+/g, ''));

  return (
    <section id="faq" className="py-20 bg-white text-slate-900 relative overflow-hidden">

      {/* Ambient Gold Glows */}
      <div className="glow-gold top-1/3 left-10 opacity-15"></div>
      <div className="glow-gold bottom-10 right-10 opacity-15"></div>

      <div className="container-custom relative z-10">

        {/* Section Header with Clyde Signature Watermark */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-14 relative clyde-section-header">
            <div className="clyde-watermark-text select-none">
              {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </div>

            <span className="clyde-subheading drop-shadow-xs">
              {lang === 'ar' ? 'الأسئلة الشائعة والمعلومات' : 'FREQUENTLY ASKED QUESTIONS'}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-heading leading-tight">
              {lang === 'ar' ? 'إجابات شاملة لكافة استفسارات المعاملات الحكومية' : 'Everything You Need to Know'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
              {t.faqSubtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Search Bar - Glassmorphic Pill */}
        <AnimatedSection animation="fade-up" delay={150}>
          <div className="max-w-xl mx-auto mb-14 relative group">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث في الأسئلة الشائعة (مثل الإقامة الذهبية، الفحص الطبي)...' : 'Search questions (e.g. Golden Visa, MOFA, Medical, MOHRE)...'}
                className="w-full bg-slate-50/90 border-2 border-slate-200 focus:border-[#D4AF37] rounded-full py-4 px-14 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-300 shadow-md focus:shadow-xl focus:bg-white"
              />
              <Search className="w-5 h-5 text-[#8C6A21] absolute left-5 [dir=rtl]:right-5 [dir=rtl]:left-auto top-1/2 -translate-y-1/2 group-focus-within:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-semibold mb-2">
                {lang === 'ar' ? 'لم يتم العثور على أسئلة تطابق البحث' : 'No matching questions found.'}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#8C6A21] underline font-bold cursor-pointer hover:text-slate-900"
              >
                {lang === 'ar' ? 'عرض جميع الأسئلة' : 'Show All Questions'}
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <AnimatedSection key={faq.id} animation="fade-up" delay={100 + (idx % 6) * 60}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden relative ${
                      isOpen
                        ? 'bg-gradient-to-r from-amber-50/60 via-white to-amber-50/30 border-[#D4AF37] shadow-xl ring-1 ring-[#D4AF37]/30'
                        : 'bg-white border-slate-200/90 hover:border-[#D4AF37]/60 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Left Accent Bar on Open */}
                    {isOpen && (
                      <div className="absolute left-0 [dir=rtl]:right-0 [dir=rtl]:left-auto top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#F5D77F] via-[#D4AF37] to-[#8C6A21]"></div>
                    )}

                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-start p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    >
                      <span className={`text-base sm:text-lg font-bold font-heading transition-colors ${
                        isOpen ? 'text-[#8C6A21]' : 'text-slate-900 group-hover:text-[#8C6A21]'
                      }`}>
                        {faq.question[lang]}
                      </span>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#8C6A21] text-slate-950 shadow-md rotate-180' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-[#D4AF37] group-hover:text-slate-950'
                      }`}>
                        <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-3 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/80 animate-fadeIn font-sans">
                        {faq.answer[lang]}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })
          )}
        </div>

        {/* Still Have Questions Banner Card - Executive Redesign */}
        <AnimatedSection animation="zoom-in" delay={200}>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-500 ease-out text-center relative overflow-hidden group transform hover:-translate-y-1.5">
            {/* Top Glowing Gold Line on Hover */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#8C6A21] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>

            {/* Ambient Background Glow Orbs */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

            {/* Floating Gold Medallion Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#8C6A21] p-0.5 shadow-xl ring-4 ring-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] mx-auto mb-6 shrink-0 relative z-20">
              <div className="w-full h-full rounded-[14px] bg-slate-950/90 backdrop-blur-md flex items-center justify-center text-[#F5D77F] group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-all duration-300">
                <Sparkles className="w-7 h-7 stroke-[2.2]" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 font-heading group-hover:text-[#8C6A21] transition-colors leading-tight relative z-20">
              {lang === 'ar' ? 'لديك استفسار آخر غير موجود في القائمة؟' : 'Still Have Questions? We Are Ready to Assist'}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans relative z-20">
              {lang === 'ar'
                ? 'فريق مستشاري برايم تايم للطباعة على استعداد دائم للإجابة عن كافة التساؤلات المتعلقة بالإقامات، الفحص الطبي، والخدمات الحكومية.'
                : 'Our document clearance specialists are available to guide you through visa rules, MOHRE requirements, and official fees.'
              }
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] pulse-wa group/wa text-xs sm:text-sm uppercase tracking-wider"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>{lang === 'ar' ? 'استفسر مباشرة عبر الواتساب' : 'Chat via WhatsApp'}</span>
              </a>

              <a
                href={`tel:${phoneTel}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] border border-slate-800 group/phone text-xs sm:text-sm tracking-wider"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] group-hover/phone:rotate-12 transition-transform" />
                <span dir="ltr">{siteData.brand.phone}</span>
              </a>
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
