import React, { useState } from 'react';
import {
  Settings,
  Save,
  Check,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Share2,
  Building,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';

export default function SettingsTab({
  settings,
  onSaveSettings,
  onResetDefaults,
  lang = 'en'
}) {
  const [formData, setFormData] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('general'); // 'general' | 'contact' | 'whatsapp' | 'socials' | 'hours'
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#D4AF37]" />
            <span>Business &amp; System Settings</span>
          </h2>
          <p className="text-xs text-slate-400">
            Configure company branding, WhatsApp integration, phone numbers, and operational hours
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
            <span>{saveSuccess ? 'Settings Saved!' : 'Save All Settings'}</span>
          </button>
        </div>
      </div>

      {/* Subnav Pills */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {[
          { id: 'general', label: 'Company Branding', icon: Building },
          { id: 'contact', label: 'Contact & Location', icon: Phone },
          { id: 'whatsapp', label: 'WhatsApp Integration', icon: MessageCircle },
          { id: 'socials', label: 'Social Media', icon: Share2 },
          { id: 'hours', label: 'Business Hours', icon: Clock }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* SECTION 1: GENERAL BRANDING */}
        {activeSection === 'general' && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building className="w-4 h-4 text-[#D4AF37]" />
              <span>Legal Company Names &amp; Brand</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Company Name (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName?.en || ''}
                  onChange={e => setFormData({
                    ...formData,
                    companyName: { ...formData.companyName, en: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Company Name (Arabic) *</label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={formData.companyName?.ar || ''}
                  onChange={e => setFormData({
                    ...formData,
                    companyName: { ...formData.companyName, ar: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline / Motto (English)</label>
                <input
                  type="text"
                  value={formData.tagline?.en || ''}
                  onChange={e => setFormData({
                    ...formData,
                    tagline: { ...formData.tagline, en: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline / Motto (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.tagline?.ar || ''}
                  onChange={e => setFormData({
                    ...formData,
                    tagline: { ...formData.tagline, ar: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Default Currency</label>
                <input
                  type="text"
                  value={formData.currency || 'AED'}
                  onChange={e => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Timezone</label>
                <input
                  type="text"
                  value={formData.timezone || 'Asia/Dubai'}
                  onChange={e => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: CONTACT & LOCATION */}
        {activeSection === 'contact' && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Contact Channels &amp; Office Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Direct Phone (Display) *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Phone Dial Link (tel:)</label>
                <input
                  type="text"
                  value={formData.phoneTel}
                  onChange={e => setFormData({ ...formData, phoneTel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Official Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Office Address (English) *</label>
                <textarea
                  rows="2"
                  value={formData.address?.en || ''}
                  onChange={e => setFormData({
                    ...formData,
                    address: { ...formData.address, en: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Office Address (Arabic) *</label>
                <textarea
                  rows="2"
                  dir="rtl"
                  value={formData.address?.ar || ''}
                  onChange={e => setFormData({
                    ...formData,
                    address: { ...formData.address, ar: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Google Maps Direct Link URL</label>
              <input
                type="url"
                value={formData.mapUrl}
                onChange={e => setFormData({ ...formData, mapUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Google Maps Embed URL</label>
              <input
                type="text"
                value={formData.gmapEmbed}
                onChange={e => setFormData({ ...formData, gmapEmbed: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        )}

        {/* SECTION 3: WHATSAPP INTEGRATION */}
        {activeSection === 'whatsapp' && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct Support &amp; Message Templates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">WhatsApp Number (Display)</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Raw International Number (e.g. 971507602200)</label>
                <input
                  type="text"
                  value={formData.whatsappRaw}
                  onChange={e => setFormData({ ...formData, whatsappRaw: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Dynamic WhatsApp Message Template
              </label>
              <p className="text-[11px] text-slate-400 mb-2">
                Variables supported: <code className="text-amber-300 font-mono">{"{customer_name}"}</code>, <code className="text-amber-300 font-mono">{"{service_name}"}</code>, <code className="text-amber-300 font-mono">{"{category_name}"}</code>
              </p>
              <textarea
                rows="4"
                value={formData.whatsappTemplate}
                onChange={e => setFormData({ ...formData, whatsappTemplate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        )}

        {/* SECTION 4: SOCIAL MEDIA */}
        {activeSection === 'socials' && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Social Media Accounts &amp; Channels</span>
            </h3>

            <div className="space-y-3">
              {['facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'].map(network => {
                const urlKey = network;
                const enabledKey = `${network}Enabled`;

                return (
                  <div key={network} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`enable-${network}`}
                      checked={Boolean(formData.socials?.[enabledKey])}
                      onChange={e => setFormData({
                        ...formData,
                        socials: { ...formData.socials, [enabledKey]: e.target.checked }
                      })}
                      className="w-4 h-4 rounded text-[#D4AF37] bg-slate-900 border-slate-800"
                    />
                    <label htmlFor={`enable-${network}`} className="text-xs font-bold text-white capitalize w-24">
                      {network}
                    </label>
                    <input
                      type="url"
                      placeholder={`https://${network}.com/...`}
                      value={formData.socials?.[urlKey] || ''}
                      onChange={e => setFormData({
                        ...formData,
                        socials: { ...formData.socials, [urlKey]: e.target.value }
                      })}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 5: BUSINESS HOURS */}
        {activeSection === 'hours' && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Working Hours &amp; Emergency Support</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Working Hours (English)</label>
                <input
                  type="text"
                  value={formData.workingHours?.en || ''}
                  onChange={e => setFormData({
                    ...formData,
                    workingHours: { ...formData.workingHours, en: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Working Hours (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.workingHours?.ar || ''}
                  onChange={e => setFormData({
                    ...formData,
                    workingHours: { ...formData.workingHours, ar: e.target.value }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">24/7 Emergency Support Contact</label>
              <input
                type="text"
                value={formData.emergencyContact || ''}
                onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        )}

      </form>

      {/* Danger Zone: Reset System */}
      <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/40 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-red-400">Reset All CMS Data to Defaults</h4>
          <p className="text-xs text-slate-400">Revert all categories, services, settings and banners to initial factory seed</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all admin CMS data to factory defaults?")) {
              onResetDefaults();
            }
          }}
          className="px-4 py-2 text-xs font-bold text-red-300 bg-red-950/80 hover:bg-red-900 border border-red-800/80 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Defaults</span>
        </button>
      </div>

    </div>
  );
}
