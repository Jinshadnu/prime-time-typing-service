import React, { useState, useEffect } from 'react';
import {
  Building2,
  Save,
  Check,
  Plus,
  Trash2,
  Image as ImageIcon,
  Award,
  Milestone,
  TrendingUp,
  Upload
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';

export default function AboutTab({
  aboutData = {},
  onSaveAbout,
  lang = 'en'
}) {
  const [formData, setFormData] = useState(() => ({
    badgeEn: aboutData?.badgeEn || 'Trusted Government Typing Hub',
    badgeAr: aboutData?.badgeAr || 'مركز طباعة حكومي معتمد',
    headingEn: aboutData?.headingEn || 'Accurate Typing Solutions at Prime Time Typing',
    headingAr: aboutData?.headingAr || 'خدمات طباعة سريعة ودقيقة لدى برايم تايم',
    desc1En: aboutData?.desc1En || 'Prime Time Typing Services is a trusted provider of professional typing and corporate services, dedicated to addressing the diverse needs of individuals and businesses across the UAE. Conveniently located Near Meat Mart, Madinat Zayed, Abu Dhabi, Prime Time has built a reputation for reliability, accuracy, and efficiency.',
    desc1Ar: aboutData?.desc1Ar || 'برايم تايم لخدمات الطباعة هو مركزك الموثوق لإنجاز وتخليص كافة المعاملات الحكومية والمؤسسية في دولة الإمارات العربية المتحدة. يقع مركزنا بالقرب من ميت مارت، مدينة زايد، أبوظبي، حيث نفخر بتقديم حلول توثيق تمتاز بالدقة المتناهية والسرعة الفائقة والاحترافية العالية.',
    desc2En: aboutData?.desc2En || 'Delivering seamless documentation and support solutions, we stand as a dependable partner for clients seeking hassle-free services tailored to their unique requirements.',
    desc2Ar: aboutData?.desc2Ar || 'نلتزم بمرافقة عملائنا من الأفراد والمؤسسات لإنهاء إجراءات الإقامة، وتصاريح العمل، والمعاملات الرقمية بكل سلاسة ويسر ووفق أعلى معايير الدقة والسرعة.',
    image: aboutData?.image || '',
    missionEn: aboutData?.missionEn || 'To deliver flawless, transparent, and prompt government application clearances for businesses and individuals.',
    missionAr: aboutData?.missionAr || 'تقديم خدمات تخليص معاملات حكومية دقيقة وشفافة وسريعة للأفراد والشركات بأعلى معايير الجودة.',
    visionEn: aboutData?.visionEn || 'To be the most preferred and technologically integrated corporate documentation partner in the Emirate of Abu Dhabi.',
    visionAr: aboutData?.visionAr || 'أن نكون المركز الرائد والأكثر كفاءة واعتماداً في مجال تخليص المعاملات والخدمات المؤسسية في إمارة أبوظبي.',
    stats: (aboutData?.stats && Array.isArray(aboutData.stats) && aboutData.stats.length > 0)
      ? aboutData.stats
      : [
        { id: 'stat-1', value: '2026', label: { en: 'Since 25th Sep 2026', ar: 'منذ 25 سبتمبر 2026' } },
        { id: 'stat-2', value: '100%', label: { en: 'Legal Precision', ar: 'دقة قانونية معتمدة' } },
        { id: 'stat-3', value: '99.8%', label: { en: 'Satisfaction Rate', ar: 'نسبة رضا المتعاملين' } },
        { id: 'stat-4', value: '10+', label: { en: 'Govt Portals Supported', ar: 'بوابات ودوائر حكومية معتمدة' } }
      ]
  }));

  useEffect(() => {
    if (aboutData && Object.keys(aboutData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...aboutData,
        stats: (aboutData.stats && Array.isArray(aboutData.stats) && aboutData.stats.length > 0)
          ? aboutData.stats
          : (prev.stats || [])
      }));
    }
  }, [aboutData]);

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSaveAbout) onSaveAbout(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#D4AF37]" />
            <span>About Us &amp; Company Profile</span>
          </h2>
          <p className="text-xs text-slate-400">
            Manage company story, mission, vision, and corporate credentials
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'Changes Saved!' : 'Save About Us'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">

        {/* Main Headings */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>About Section Headlines</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Badge Text (English)</label>
              <input
                type="text"
                value={formData.badgeEn}
                onChange={e => setFormData({ ...formData, badgeEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Badge Text (Arabic)</label>
              <input
                type="text"
                dir="rtl"
                value={formData.badgeAr}
                onChange={e => setFormData({ ...formData, badgeAr: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Section Heading (English)</label>
              <input
                type="text"
                value={formData.headingEn}
                onChange={e => setFormData({ ...formData, headingEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Section Heading (Arabic)</label>
              <input
                type="text"
                dir="rtl"
                value={formData.headingAr}
                onChange={e => setFormData({ ...formData, headingAr: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>
        </div>

        {/* Office Photo & Media */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>Office Photo &amp; Visual Asset</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsMediaPickerOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#D4AF37] text-slate-950 hover:bg-[#e0bc42] transition-all flex items-center gap-1.5 shadow-md"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload / Choose Photo</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-full sm:w-48 h-32 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="About Section Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-center p-3 text-slate-500">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-40 text-[#D4AF37]" />
                  <span className="text-[10px] block">Default office photo active</span>
                </div>
              )}
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="block font-semibold text-slate-300">Custom Image URL</label>
              <input
                type="text"
                value={formData.image || ''}
                placeholder="https://... or choose from media library (leaves default if empty)"
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <p className="text-[11px] text-slate-400">
                Provide a direct URL to a photo of your office, customer lounge, or executive desk. Leave empty to use the built-in Madinat Zayed office photography.
              </p>
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 pt-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset to default photo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Story & Paragraphs */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Company Story Paragraphs</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Paragraph 1 (English)</label>
              <textarea
                rows="4"
                value={formData.desc1En}
                onChange={e => setFormData({ ...formData, desc1En: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Paragraph 1 (Arabic)</label>
              <textarea
                rows="4"
                dir="rtl"
                value={formData.desc1Ar}
                onChange={e => setFormData({ ...formData, desc1Ar: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Paragraph 2 (English)</label>
              <textarea
                rows="3"
                value={formData.desc2En}
                onChange={e => setFormData({ ...formData, desc2En: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Paragraph 2 (Arabic)</label>
              <textarea
                rows="3"
                dir="rtl"
                value={formData.desc2Ar}
                onChange={e => setFormData({ ...formData, desc2Ar: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Milestone className="w-4 h-4 text-purple-400" />
            <span>Mission &amp; Vision</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Mission Statement (English)</label>
              <textarea
                rows="2"
                value={formData.missionEn}
                onChange={e => setFormData({ ...formData, missionEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Mission Statement (Arabic)</label>
              <textarea
                rows="2"
                dir="rtl"
                value={formData.missionAr}
                onChange={e => setFormData({ ...formData, missionAr: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Vision Statement (English)</label>
              <textarea
                rows="2"
                value={formData.visionEn}
                onChange={e => setFormData({ ...formData, visionEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Vision Statement (Arabic)</label>
              <textarea
                rows="2"
                dir="rtl"
                value={formData.visionAr}
                onChange={e => setFormData({ ...formData, visionAr: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>
        </div>

        {/* Key Statistics & Performance Counters (Dynamic 4-Counter Stats Bar) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Key Statistics &amp; Performance Counters</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Customize the 4 prominent highlight metrics displayed in the About Us stats bar and floating badges (e.g. 2026, 100%, 99.8%, 10+)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(formData.stats || []).map((stat, idx) => (
              <div key={stat.id || idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-800/80 pb-1.5">
                  <span>Metric #{idx + 1}</span>
                  <span className="text-amber-400 font-mono text-xs">{stat.value}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Metric Value / Number *</label>
                  <input
                    type="text"
                    value={stat.value}
                    placeholder="e.g. 2026, 100%, 99.8%, 10+"
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...(prev.stats || [])];
                        copy[idx] = { ...copy[idx], value: val };
                        return { ...prev, stats: copy };
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-sm font-bold text-amber-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Label (English)</label>
                    <input
                      type="text"
                      value={stat.label?.en || ''}
                      placeholder="e.g. Years Experience"
                      onChange={e => {
                        const val = e.target.value;
                        setFormData(prev => {
                          const copy = [...(prev.stats || [])];
                          copy[idx] = { ...copy[idx], label: { ...copy[idx].label, en: val } };
                          return { ...prev, stats: copy };
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Label (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={stat.label?.ar || ''}
                      placeholder="سنوات من الخبرة"
                      onChange={e => {
                        const val = e.target.value;
                        setFormData(prev => {
                          const copy = [...(prev.stats || [])];
                          copy[idx] = { ...copy[idx], label: { ...copy[idx].label, ar: val } };
                          return { ...prev, stats: copy };
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </form>

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData(prev => ({ ...prev, image: url }))}
        currentImage={formData.image}
      />

    </div>
  );
}
