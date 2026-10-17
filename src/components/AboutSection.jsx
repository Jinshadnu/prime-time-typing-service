import React from 'react';
import aboutOfficeImg from '../assets/about_office.jpg';
import {
  Building2,
  ShieldCheck,
  PlaneTakeoff,
  Crown,
  Sparkles,
  Award,
  Users,
  Clock,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { siteData } from '../data/siteData';
import AnimatedSection from './AnimatedSection';
import AnimatedCounter from './AnimatedCounter';

export default function AboutSection({ lang, aboutData = {} }) {
  const t = siteData.translations[lang];

  const badge = (lang === 'ar' ? aboutData?.badgeAr : aboutData?.badgeEn) || aboutData?.badgeEn || aboutData?.badgeAr || t.aboutBadge;
  const heading = (lang === 'ar' ? aboutData?.headingAr : aboutData?.headingEn) || aboutData?.headingEn || aboutData?.headingAr || t.aboutHeading;
  const desc1 = (lang === 'ar' ? aboutData?.desc1Ar : aboutData?.desc1En) || aboutData?.desc1En || aboutData?.desc1Ar || t.aboutDesc1;
  const desc2 = (lang === 'ar' ? aboutData?.desc2Ar : aboutData?.desc2En) || aboutData?.desc2En || aboutData?.desc2Ar || t.aboutDesc2;
  const imageSrc = aboutData?.image || aboutOfficeImg;
  const mission = (lang === 'ar' ? aboutData?.missionAr : aboutData?.missionEn) || aboutData?.missionEn || aboutData?.missionAr;
  const vision = (lang === 'ar' ? aboutData?.visionAr : aboutData?.visionEn) || aboutData?.visionEn || aboutData?.visionAr;

  const defaultStats = [
    { id: 'stat-1', value: '2026', label: { en: 'Since 25th Sep 2026', ar: 'منذ 25 سبتمبر 2026' } },
    { id: 'stat-2', value: '100%', label: { en: 'Legal Precision', ar: 'دقة قانونية معتمدة' } },
    { id: 'stat-3', value: '99.8%', label: { en: 'Satisfaction Rate', ar: 'نسبة رضا المتعاملين' } },
    { id: 'stat-4', value: '10+', label: { en: 'Govt Portals Supported', ar: 'بوابات ودوائر حكومية معتمدة' } }
  ];

  const statsList = (aboutData?.stats && Array.isArray(aboutData.stats) && aboutData.stats.length > 0)
    ? aboutData.stats
    : defaultStats;

  const milestoneIcons = {
    Building2,
    ShieldCheck,
    PlaneTakeoff,
    Crown,
    Sparkles
  };

  const values = [
    {
      title: { en: "100% Legal Precision", ar: "الدقة القانونية 100%" },
      desc: { en: "Strict compliance with ICP, GDRFA, and Dubai Economy standards.", ar: "التزام تام بمتطلبات الجهات الرسمية لمنع التأخير والرفض." },
      icon: ShieldCheck
    },
    {
      title: { en: "Rapid Express Turnaround", ar: "إنجاز فوري وعاجل" },
      desc: { en: "Urgent VIP typing desks operating with same-day submission.", ar: "مكاتب طباعة VIP للإنهاء العاجل في نفس اليوم." },
      icon: Clock
    },
    {
      title: { en: "Transparent Fee Structure", ar: "شفافية مطلقة في الرسوم" },
      desc: { en: "No hidden charges; exact government breakdown provided upfront.", ar: "بدون رسوم خفية؛ تفصيل شامل للرسوم الحكومية والأتعاب." },
      icon: Award
    }
  ];

  return (
    <section id="about" className="py-20 bg-white text-slate-900 relative overflow-hidden">

      {/* Decorative Accent Background Glow */}
      <div className="glow-gold top-0 right-0 opacity-15 -z-0"></div>
      <div className="glow-gold bottom-0 left-0 opacity-15 -z-0"></div>

      <div className="container-custom relative z-10">

        {/* Top Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">

          {/* Left Column: Image Collage & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <AnimatedSection animation="fade-right" delay={100}>
              <div className="relative mx-auto max-w-md lg:max-w-none">

                {/* Main Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/50 transform hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={imageSrc}
                    alt="Prime Time Typing Abu Dhabi Office"
                    className="w-full h-[440px] sm:h-[480px] lg:h-[520px] object-cover object-top"
                    onError={(e) => {
                      if (e.currentTarget.src !== aboutOfficeImg) {
                        e.currentTarget.src = aboutOfficeImg;
                      }
                    }}
                  />
                </div>

                {/* Floating Badge (Since 25th Sep 2026) */}
                <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:right-6 bg-white text-slate-900 p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-[#D4AF37] flex items-center gap-3 sm:gap-4 animate-float z-20 max-w-[90%]">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#F5E5C0] via-[#D4AF37] to-[#9E7D3B] text-[#0A0B0E] flex items-center justify-center shadow-md shrink-0">
                    <Calendar className="w-6 h-6 text-[#0A0B0E]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-[#8C6A21] font-heading tracking-tight">
                      {lang === 'ar' ? 'منذ 25 سبتمبر 2026' : 'Since 25th Sep 2026'}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
                      {lang === 'ar' ? 'مركز معاملات حكومية معتمد • أبوظبي' : 'Official Government Clearance • Abu Dhabi'}
                    </div>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Text Story */}
          <div className="lg:col-span-7 text-start">
            <AnimatedSection animation="fade-left" delay={150}>
              <div className="badge-gold mb-4">
                <Award className="w-4 h-4 text-[#8C6A21]" />
                <span>{badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight font-heading">
                {heading}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg mb-4 leading-relaxed">
                {desc1}
              </p>

              <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
                {desc2}
              </p>

              {/* Mission & Vision Statements */}
              {(mission || vision) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {mission && (
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-[#D4AF37]/30 text-start shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#8C6A21] mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{lang === 'ar' ? 'رسالتنا' : 'Our Mission'}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">{mission}</p>
                    </div>
                  )}
                  {vision && (
                    <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-start shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5 flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">{vision}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Core Values Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <AnimatedSection key={i} animation="zoom-in" delay={250 + i * 100}>
                      <div className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full">
                        <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#8C6A21] flex items-center justify-center mb-3.5 border border-[#D4AF37]/30">
                          <Icon className="w-5 h-5 text-[#8C6A21]" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mb-1 font-heading">{v.title[lang]}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{v.desc[lang]}</p>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>

            </AnimatedSection>
          </div>
        </div>

        {/* Counter Stats Banner Section - White Transparent Glass */}
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 text-slate-900 shadow-xl mb-24 border border-slate-200/90 relative overflow-hidden shimmer-card">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200 [dir=rtl]:lg:divide-x-reverse">
              {statsList.map((stat, idx) => {
                const label = typeof stat.label === 'object'
                  ? (stat.label?.[lang] || stat.label?.en || '')
                  : (stat.label || '');
                return (
                  <div key={stat.id || idx} className="p-4">
                    <div className="text-3xl sm:text-5xl font-black text-[#8C6A21] mb-2 tracking-tight font-heading gradient-text-gold">
                      <AnimatedCounter value={stat.value || '0'} />
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700 font-bold">
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </AnimatedSection>

        {/* Interactive Milestones Timeline */}
        <div className="max-w-4xl mx-auto">

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3 font-heading">
                {t.milestonesTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                {t.milestonesSubtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className="relative border-s-2 border-[#D4AF37]/50 ms-4 md:ms-32 space-y-10">
            {siteData.milestones.map((m, idx) => {
              const IconComp = milestoneIcons[m.iconName] || Building2;
              return (
                <AnimatedSection
                  key={idx}
                  animation="fade-up"
                  delay={150 + idx * 120}
                >
                  <div className="relative ps-8 group">

                    {/* Timeline Dot/Icon */}
                    <div className="absolute -left-[19px] [dir=rtl]:-right-[19px] top-0 w-9 h-9 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center text-[#8C6A21] shadow-md group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-slate-900 transition-all duration-300">
                      <IconComp className="w-4 h-4" />
                    </div>

                    {/* Content Box */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 transform group-hover:-translate-y-1">
                      <span className="inline-block bg-[#0F172A] text-[#F5E5C0] text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                        {m.year}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#8C6A21] transition-colors font-heading">
                        {m.title[lang]}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {m.description[lang]}
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
