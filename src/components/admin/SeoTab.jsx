import React, { useState } from 'react';
import {
  Globe,
  Save,
  Check,
  Search,
  ExternalLink,
  Code,
  Sparkles
} from 'lucide-react';

export default function SeoTab({
  seoData,
  onSaveSeo,
  lang = 'en'
}) {
  const [formData, setFormData] = useState(seoData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSeo(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#D4AF37]" />
            <span>Search Engine Optimization (SEO) &amp; Analytics</span>
          </h2>
          <p className="text-xs text-slate-400">
            Configure global meta tags, OpenGraph previews, Google Analytics 4, and Search Console tags
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'SEO Settings Saved!' : 'Save SEO Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Global Meta */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Global Search Meta Tags</span>
          </h3>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Global Website SEO Title *</label>
            <input
              type="text"
              required
              value={formData.globalTitle}
              onChange={e => setFormData({ ...formData, globalTitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Meta Description (150-160 characters recommended)</label>
            <textarea
              rows="3"
              value={formData.globalDescription}
              onChange={e => setFormData({ ...formData, globalDescription: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Target Keywords (Comma Separated)</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={e => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">OpenGraph Social Share Image URL</label>
            <input
              type="text"
              value={formData.ogImage}
              onChange={e => setFormData({ ...formData, ogImage: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Analytics & Webmaster */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Code className="w-4 h-4 text-emerald-400" />
            <span>Tracking &amp; Verification IDs</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Google Analytics Measurement ID</label>
              <input
                type="text"
                placeholder="e.g. G-XXXXXXXXXX"
                value={formData.googleAnalyticsId}
                onChange={e => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Google Search Console Verification Tag</label>
              <input
                type="text"
                placeholder="google-site-verification=..."
                value={formData.googleSearchConsole}
                onChange={e => setFormData({ ...formData, googleSearchConsole: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Google SERP Preview Card */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Google Search Results Preview</span>
          </span>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-2xl space-y-1 font-sans">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-4 h-4 rounded-full bg-amber-400/20 text-[#D4AF37] flex items-center justify-center text-[10px] font-bold">PT</span>
              <span>primetimetypingservice.com</span>
            </div>
            <h4 className="text-base text-blue-400 font-semibold hover:underline cursor-pointer">
              {formData.globalTitle || 'Prime Time Typing Services Abu Dhabi'}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              {formData.globalDescription || 'Professional typing services in Abu Dhabi for visas, permits and attestation.'}
            </p>
          </div>
        </div>

      </form>

    </div>
  );
}
