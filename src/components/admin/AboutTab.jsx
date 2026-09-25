import React, { useState } from 'react';
import {
  Building2,
  Save,
  Check,
  Plus,
  Trash2,
  Image as ImageIcon,
  Award,
  Milestone
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';

export default function AboutTab({
  aboutData = {},
  onSaveAbout,
  lang = 'en'
}) {
  const [formData, setFormData] = useState({
    badgeEn: 'Trusted Government Typing Hub',
    badgeAr: 'مركز طباعة حكومي معتمد',
    headingEn: 'Accurate Typing Solutions at Prime Time Typing',
    headingAr: 'خدمات طباعة سريعة ودقيقة لدى برايم تايم',
    desc1En: 'Prime Time Typing Services is a trusted provider of professional typing and corporate services, dedicated to addressing the diverse needs of individuals and businesses across the UAE. Conveniently located Near Meat Mart, Madinat Zayed, Abu Dhabi, Prime Time has built a reputation for reliability, accuracy, and efficiency.',
    desc1Ar: 'برايم تايم لخدمات الطباعة هو مركزك الموثوق لإنجاز وتخليص كافة المعاملات الحكومية والمؤسسية في دولة الإمارات العربية المتحدة. يقع مركزنا بالقرب من ميت مارت، مدينة زايد، أبوظبي، حيث نفخر بتقديم حلول توثيق تمتاز بالدقة المتناهية والسرعة الفائقة والاحترافية العالية.',
    desc2En: 'With over 15 years of expertise in delivering seamless documentation and support solutions, we stand as a dependable partner for clients seeking hassle-free services tailored to their unique requirements.',
    desc2Ar: 'مع خبرة تتجاوز 15 عاماً في تخليص المستندات الرسمية، نلتزم بمرافقة عملائنا من الأفراد والمؤسسات لإنهاء إجراءات الإقامة، وتصاريح العمل، والمعاملات الرقمية بكل سلاسة ويسر.',
    image: '',
    missionEn: 'To deliver flawless, transparent, and prompt government application clearances for businesses and individuals.',
    missionAr: 'تقديم خدمات تخليص معاملات حكومية دقيقة وشفافة وسريعة للأفراد والشركات بأعلى معايير الجودة.',
    visionEn: 'To be the most preferred and technologically integrated corporate documentation partner in the Emirate of Abu Dhabi.',
    visionAr: 'أن نكون المركز الرائد والأكثر كفاءة واعتماداً في مجال تخليص المعاملات والخدمات المؤسسية في إمارة أبوظبي.'
  });

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
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
