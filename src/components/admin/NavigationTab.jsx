import React, { useState } from 'react';
import {
  Compass,
  Save,
  Check,
  Plus,
  Trash2,
  Menu,
  ExternalLink
} from 'lucide-react';

export default function NavigationTab({
  lang = 'en'
}) {
  const [headerLinks, setHeaderLinks] = useState([
    { id: 'h-1', labelEn: 'Home', labelAr: 'الرئيسية', url: 'home' },
    { id: 'h-2', labelEn: 'About Us', labelAr: 'من نحن', url: 'about' },
    { id: 'h-3', labelEn: 'Our Services', labelAr: 'خدماتنا', url: 'services' },
    { id: 'h-4', labelEn: 'Fee Estimator', labelAr: 'حاسبة الرسوم', url: 'calculator' },
    { id: 'h-5', labelEn: 'FAQ', labelAr: 'الأسئلة الشائعة', url: 'faq' },
    { id: 'h-6', labelEn: 'Contact Us', labelAr: 'اتصل بنا', url: 'contact' }
  ]);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            <span>Navigation Menu Management</span>
          </h2>
          <p className="text-xs text-slate-400">
            Customize header navigation links, footer shortcuts, and quick scroll targets
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'Changes Saved!' : 'Save Navigation'}</span>
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="flex items-center gap-2">
            <Menu className="w-4 h-4 text-[#D4AF37]" />
            <span>Main Header Navigation Links</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setHeaderLinks(prev => [
                ...prev,
                { id: `h-${Date.now()}`, labelEn: 'New Link', labelAr: 'رابط جديد', url: 'services' }
              ]);
            }}
            className="px-2.5 py-1 text-xs font-bold text-slate-950 bg-[#D4AF37] rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Link</span>
          </button>
        </h3>

        <div className="space-y-3">
          {headerLinks.map((link, idx) => (
            <div key={link.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-500 w-6">#{idx + 1}</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Label (English)"
                  value={link.labelEn}
                  onChange={e => {
                    const val = e.target.value;
                    setHeaderLinks(prev => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], labelEn: val };
                      return copy;
                    });
                  }}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="text"
                  dir="rtl"
                  placeholder="العنوان (بالعربية)"
                  value={link.labelAr}
                  onChange={e => {
                    const val = e.target.value;
                    setHeaderLinks(prev => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], labelAr: val };
                      return copy;
                    });
                  }}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                />
                <input
                  type="text"
                  placeholder="Section ID (e.g. services, contact)"
                  value={link.url}
                  onChange={e => {
                    const val = e.target.value;
                    setHeaderLinks(prev => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], url: val };
                      return copy;
                    });
                  }}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="button"
                onClick={() => setHeaderLinks(prev => prev.filter((_, i) => i !== idx))}
                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-slate-900"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
