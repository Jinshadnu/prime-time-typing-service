import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Building
} from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';

export default function ContactSection({ lang, preselectedService }) {
  const t = siteData.translations[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: siteData.categories[0].id,
    serviceId: siteData.services[0].id,
    message: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // If a user clicked "Inquire" on a service card, auto-select it!
  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({
        ...prev,
        category: preselectedService.categoryId,
        serviceId: preselectedService.id
      }));
    }
  }, [preselectedService]);

  // Handle category change -> auto select first service in category
  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    const catServices = siteData.services.filter(s => s.categoryId === newCat);
    setFormData(prev => ({
      ...prev,
      category: newCat,
      serviceId: catServices.length > 0 ? catServices[0].id : ''
    }));
  };

  // Strict UAE Phone Validation Regex
  const validateUAEPhone = (phoneStr) => {
    const clean = phoneStr.trim();
    if (!clean) return false;
    const uaeRegex = /^(?:\+971|00971|0)?5[024568]\d{7}$/;
    const sanitized = clean.replace(/[\s\-\(\)]/g, '');
    return uaeRegex.test(sanitized);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, phone: val }));
    if (val && !validateUAEPhone(val)) {
      setPhoneError(t.uaePhoneInvalid);
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUAEPhone(formData.phone)) {
      setPhoneError(t.uaePhoneInvalid);
      return;
    }
    setPhoneError('');
    setIsSubmitted(true);
  };

  const currentCategoryServices = siteData.services.filter(s => s.categoryId === formData.category);

  return (
    <section id="contact" className="py-20 bg-white text-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="glow-gold bottom-0 left-0 opacity-15"></div>

      <div className="container-custom relative z-10">
        
        {/* Section Title */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge-gold mb-3">
              <MessageSquare className="w-4 h-4 text-[#8C6A21]" />
              <span>{lang === 'ar' ? 'استجابة سريعة خلال 30 دقيقة' : 'Rapid 30-Minute Response'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-serif">
              {t.contactTitle}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {t.contactSubtitle}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Direct Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6 text-start">
            
            {/* Phone Card */}
            <AnimatedSection animation="fade-right" delay={150}>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8C6A21] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.directPhone}</div>
                  <a 
                    href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`} 
                    className="text-lg font-black text-slate-900 hover:text-[#8C6A21] transition-colors block font-serif"
                    dir="ltr"
                  >
                    {siteData.brand.phone}
                  </a>
                  <a 
                    href={`https://wa.me/${siteData.brand.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366] font-bold hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <span>WhatsApp:</span>
                    <span dir="ltr">{siteData.brand.whatsapp}</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Email Card */}
            <AnimatedSection animation="fade-right" delay={250}>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8C6A21] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.emailUs}</div>
                  <a 
                    href={`mailto:${siteData.brand.email}`} 
                    className="text-base font-bold text-slate-900 hover:text-[#8C6A21] transition-colors block"
                  >
                    {siteData.brand.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'ar' ? 'للاستفسارات والمعاملات الرسمية' : 'For corporate proposals & document processing'}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Address & Hours Card */}
            <AnimatedSection animation="fade-right" delay={350}>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5E5C0] via-[#D4AF37] to-[#9E7D3B] text-[#0A0B0E] flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.officeLocation}</div>
                  <p className="text-sm font-bold text-slate-900 leading-snug mb-3 font-serif">
                    {siteData.brand.address[lang]}
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-4 h-4 text-[#8C6A21]" />
                    <span>{siteData.brand.workingHours[lang]}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-start relative overflow-hidden">
                
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-springIn">
                    <div className="w-16 h-16 bg-amber-50 text-[#8C6A21] rounded-full flex items-center justify-center mx-auto shadow-sm border border-[#D4AF37]/50">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 font-serif">
                      {t.formSuccessTitle}
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                      {t.formSuccessDesc}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          category: siteData.categories[0].id,
                          serviceId: siteData.services[0].id,
                          message: ''
                        });
                      }}
                      className="btn-gold text-xs px-6 py-3 mt-4"
                    >
                      {lang === 'ar' ? 'إرسال طلب آخر' : 'Submit Another Request'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-6 font-serif">
                      {lang === 'ar' ? 'نموذج تقديم الطلبات والاستفسارات' : 'Official Service Inquiry Form'}
                    </h3>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          {t.formName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder={lang === 'ar' ? 'محمد علي العبدالله' : 'John Doe'}
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 rounded-xl py-3 px-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          {t.formEmail} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="name@example.com"
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 rounded-xl py-3 px-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Phone & Category Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          {t.formPhone} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="+971 50 138 5165"
                          className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${
                            phoneError ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50'
                          }`}
                          dir="ltr"
                        />
                        {phoneError && (
                          <div className="flex items-center gap-1 text-xs text-red-600 mt-1 font-semibold animate-fadeIn">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{phoneError}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          {t.formCategory}
                        </label>
                        <select
                          value={formData.category}
                          onChange={handleCategoryChange}
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-slate-900 focus:outline-none transition-all font-semibold shadow-inner"
                        >
                          {siteData.categories.map((cat) => (
                            <option key={cat.id} value={cat.id} className="bg-white">
                              {cat.name[lang]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Specific Service Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.formSpecificService}
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => setFormData(prev => ({ ...prev, serviceId: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-slate-900 focus:outline-none transition-all font-semibold shadow-inner"
                      >
                        {currentCategoryServices.map((srv) => (
                          <option key={srv.id} value={srv.id} className="bg-white">
                            {srv.title[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.formMessage}
                      </label>
                      <textarea
                        rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder={lang === 'ar' ? 'يرجى كتابة أية متطلبات أو استفسارات إضافية هنا...' : 'Write any specific inquiries or visa details here...'}
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 rounded-xl py-3 px-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-gold text-base py-4 shadow-md justify-center cursor-pointer"
                    >
                      <Send className="w-5 h-5" />
                      <span>{t.formSubmit}</span>
                    </button>

                  </form>
                )}

              </div>
            </AnimatedSection>
          </div>

        </div>

        {/* Map Embed Section */}
        <AnimatedSection animation="zoom-in" delay={150}>
          <div className="bg-slate-50 rounded-3xl p-4 border border-slate-200 shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 mb-2">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#8C6A21]" />
                <span className="text-sm font-bold text-slate-900 font-serif">
                  {lang === 'ar' ? 'خريطة موقع بناية دار السلام - كورنيش أبوظبي' : 'Dar Al Salam Building Location Map - Abu Dhabi Corniche'}
                </span>
              </div>
              <span className="text-xs text-[#8C6A21] font-semibold">
                {lang === 'ar' ? 'الطابق الثالث، مكتب 309' : '3rd Floor, Office 309'}
              </span>
            </div>

            <div className="w-full h-80 rounded-2xl overflow-hidden relative">
              <iframe
                title="Prime Time Typing Location Map"
                src={siteData.brand.gmapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
