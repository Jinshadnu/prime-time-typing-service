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

  const whatsappUrl = `https://wa.me/${siteData.brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    lang === 'ar' ? 'مرحباً، لدي استفسار إضافي لم أجده في الأسئلة الشائعة' : 'Hello, I have an inquiry not covered in the FAQs.'
  )}`;

  return (
    <section id="faq" className="py-20 bg-white text-slate-900 relative overflow-hidden">
      
      {/* Ambient Gold Glows */}
      <div className="glow-gold top-1/3 left-10 opacity-15"></div>
      <div className="glow-gold bottom-10 right-10 opacity-15"></div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="badge-gold mb-3">
              <HelpCircle className="w-4 h-4 text-[#8C6A21]" />
              <span>{t.faqTitle}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-serif">
              {lang === 'ar' ? 'الأسئلة الشائعة حول الخدمات الحكومية والطباعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {t.faqSubtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Search Bar */}
        <AnimatedSection animation="fade-up" delay={150}>
          <div className="max-w-xl mx-auto mb-12 relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث في الأسئلة الشائعة (مثل الإقامة الذهبية، الفحص الطبي، السفارات)...' : 'Search questions (e.g. Golden Visa, MOFA, Medical, MOHRE)...'}
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#D4AF37] rounded-2xl py-3.5 px-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm focus:shadow-md"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 [dir=rtl]:right-4 [dir=rtl]:left-auto top-1/2 -translate-y-1/2" />
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
                className="text-xs text-[#8C6A21] underline font-bold"
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
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-slate-50 border-[#D4AF37] shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-start p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    >
                      <span className={`text-base sm:text-lg font-bold font-serif transition-colors ${
                        isOpen ? 'text-[#8C6A21]' : 'text-slate-900 group-hover:text-[#8C6A21]'
                      }`}>
                        {faq.question[lang]}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#D4AF37] text-slate-900 rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/80 animate-fadeIn">
                        {faq.answer[lang]}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })
          )}
        </div>

        {/* Still Have Questions Banner Card */}
        <AnimatedSection animation="zoom-in" delay={200}>
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#8C6A21] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-2 font-serif">
              {lang === 'ar' ? 'لديك استفسار آخر غير موجود في القائمة؟' : 'Still Have Questions? We are Ready to Assist'}
            </h3>
            
            <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
              {lang === 'ar' 
                ? 'فريق مستشاري برايم تايم للطباعة على استعداد دائم للإجابة عن كافة التساؤلات المتعلقة بالإقامات، الفحص الطبي، والخدمات الحكومية.' 
                : 'Our document clearance specialists are available to guide you through visa rules, MOHRE requirements, and official fees.'
              }
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>{lang === 'ar' ? 'استفسر مباشرة عبر الواتساب' : 'Chat via WhatsApp'}</span>
              </a>

              <a
                href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 text-[#8C6A21]" />
                <span dir="ltr">{siteData.brand.phone}</span>
              </a>
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
