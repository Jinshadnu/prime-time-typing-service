import React, { useState } from 'react';
import {
  Home,
  Save,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Plus,
  Trash2,
  Check
} from 'lucide-react';

export default function HomepageTab({
  homepageData,
  onSaveHomepage,
  lang = 'en'
}) {
  const [formData, setFormData] = useState(homepageData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveHomepage(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Home className="w-5 h-5 text-[#D4AF37]" />
            <span>Homepage Content Manager</span>
          </h2>
          <p className="text-xs text-slate-400">
            Control main website hero headings, CTA button labels, key statistics, and value propositions
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'Changes Saved!' : 'Save Homepage Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Hero Section Headlines */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Main Hero Section Copy</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Heading (English)</label>
              <textarea
                rows="2"
                value={formData.heroHeading?.en || ''}
                onChange={e => setFormData({
                  ...formData,
                  heroHeading: { ...formData.heroHeading, en: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Heading (Arabic)</label>
              <textarea
                rows="2"
                dir="rtl"
                value={formData.heroHeading?.ar || ''}
                onChange={e => setFormData({
                  ...formData,
                  heroHeading: { ...formData.heroHeading, ar: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subheading (English)</label>
              <textarea
                rows="3"
                value={formData.heroSubheading?.en || ''}
                onChange={e => setFormData({
                  ...formData,
                  heroSubheading: { ...formData.heroSubheading, en: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subheading (Arabic)</label>
              <textarea
                rows="3"
                dir="rtl"
                value={formData.heroSubheading?.ar || ''}
                onChange={e => setFormData({
                  ...formData,
                  heroSubheading: { ...formData.heroSubheading, ar: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Button (English)</label>
              <input
                type="text"
                value={formData.ctaPrimaryText?.en || ''}
                onChange={e => setFormData({
                  ...formData,
                  ctaPrimaryText: { ...formData.ctaPrimaryText, en: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Button (Arabic)</label>
              <input
                type="text"
                dir="rtl"
                value={formData.ctaPrimaryText?.ar || ''}
                onChange={e => setFormData({
                  ...formData,
                  ctaPrimaryText: { ...formData.ctaPrimaryText, ar: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
              />
            </div>
          </div>
        </div>

        {/* Statistics Counters */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Key Performance Numbers &amp; Counters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(formData.stats || []).map((stat, idx) => (
              <div key={stat.id || idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Metric Value</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...prev.stats];
                        copy[idx] = { ...copy[idx], value: val };
                        return { ...prev, stats: copy };
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-sm font-bold text-amber-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Label (English)</label>
                  <input
                    type="text"
                    value={stat.label?.en || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...prev.stats];
                        copy[idx] = { ...copy[idx], label: { ...copy[idx].label, en: val } };
                        return { ...prev, stats: copy };
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Label (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={stat.label?.ar || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...prev.stats];
                        copy[idx] = { ...copy[idx], label: { ...copy[idx].label, ar: val } };
                        return { ...prev, stats: copy };
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Points */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Why Choose Us Value Pillars</span>
          </h3>

          <div className="space-y-3">
            {(formData.whyChooseUs || []).map((item, idx) => (
              <div key={item.id || idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Pillar Title (English)"
                    value={item.title?.en || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...prev.whyChooseUs];
                        copy[idx] = { ...copy[idx], title: { ...copy[idx].title, en: val } };
                        return { ...prev, whyChooseUs: copy };
                      });
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    placeholder="عنوان الميزة (بالعربية)"
                    value={item.title?.ar || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...prev.whyChooseUs];
                        copy[idx] = { ...copy[idx], title: { ...copy[idx].title, ar: val } };
                        return { ...prev, whyChooseUs: copy };
                      });
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <textarea
                    rows="2"
                    placeholder="Description (English)"
                    value={item.desc?.en || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...prev.whyChooseUs];
                        copy[idx] = { ...copy[idx], desc: { ...copy[idx].desc, en: val } };
                        return { ...prev, whyChooseUs: copy };
                      });
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <textarea
                    rows="2"
                    dir="rtl"
                    placeholder="الوصف (بالعربية)"
                    value={item.desc?.ar || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const copy = [...prev.whyChooseUs];
                        copy[idx] = { ...copy[idx], desc: { ...copy[idx].desc, ar: val } };
                        return { ...prev, whyChooseUs: copy };
                      });
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </form>

    </div>
  );
}
