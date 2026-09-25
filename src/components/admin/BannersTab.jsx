import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Calendar,
  ExternalLink,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function BannersTab({
  banners,
  onSaveBanners,
  lang = 'en'
}) {
  const [bannerList, setBannerList] = useState(banners);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const initialFormState = {
    badgeEn: '15+ Years Official UAE Clearance',
    badgeAr: '15+ عاماً من المعاملات الحكومية المعتمدة',
    titleEn: '',
    titleAr: '',
    descEn: '',
    descAr: '',
    image: '',
    ctaTextEn: 'Explore Services',
    ctaTextAr: 'استكشف الخدمات',
    ctaUrl: '#services',
    displayOrder: bannerList.length + 1,
    status: 'active',
    startDate: '',
    endDate: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({
      ...initialFormState,
      displayOrder: bannerList.length + 1
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      badgeEn: banner.badge?.en || '',
      badgeAr: banner.badge?.ar || '',
      titleEn: banner.title?.en || '',
      titleAr: banner.title?.ar || '',
      descEn: banner.description?.en || banner.desc?.en || '',
      descAr: banner.description?.ar || banner.desc?.ar || '',
      image: banner.image || '',
      ctaTextEn: banner.ctaText?.en || 'Explore Services',
      ctaTextAr: banner.ctaText?.ar || 'استكشف الخدمات',
      ctaUrl: banner.ctaUrl || '#services',
      displayOrder: banner.displayOrder || 1,
      status: banner.status || 'active',
      startDate: banner.startDate || '',
      endDate: banner.endDate || ''
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.titleEn && !formData.titleAr) return;

    let updated;
    if (editingBanner) {
      updated = bannerList.map(b => {
        if (b.id === editingBanner.id) {
          return {
            ...b,
            badge: { en: formData.badgeEn, ar: formData.badgeAr },
            title: { en: formData.titleEn, ar: formData.titleAr },
            description: { en: formData.descEn, ar: formData.descAr },
            image: formData.image,
            ctaText: { en: formData.ctaTextEn, ar: formData.ctaTextAr },
            ctaUrl: formData.ctaUrl,
            displayOrder: Number(formData.displayOrder),
            status: formData.status,
            startDate: formData.startDate,
            endDate: formData.endDate
          };
        }
        return b;
      });
    } else {
      const newBanner = {
        id: `slide-${Date.now()}`,
        badge: { en: formData.badgeEn, ar: formData.badgeAr },
        title: { en: formData.titleEn, ar: formData.titleAr },
        description: { en: formData.descEn, ar: formData.descAr },
        image: formData.image,
        ctaText: { en: formData.ctaTextEn, ar: formData.ctaTextAr },
        ctaUrl: formData.ctaUrl,
        displayOrder: Number(formData.displayOrder),
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate
      };
      updated = [newBanner, ...bannerList];
    }

    setBannerList(updated);
    onSaveBanners(updated);
    setIsFormOpen(false);
  };

  const handleOpenDelete = (banner) => {
    setBannerToDelete(banner);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bannerToDelete) {
      const updated = bannerList.filter(b => b.id !== bannerToDelete.id);
      setBannerList(updated);
      onSaveBanners(updated);
      setIsDeleteOpen(false);
      setBannerToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
            <span>Hero Slider &amp; Banners ({bannerList.length})</span>
          </h2>
          <p className="text-xs text-slate-400">Manage rotating luxury hero slides and campaign banners</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide Banner</span>
        </button>
      </div>

      {/* Grid of Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bannerList.map((banner, idx) => (
          <div
            key={banner.id}
            className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D4AF37]/40 transition-all"
          >
            <div>
              {/* Banner Image Preview */}
              <div className="aspect-video w-full bg-slate-950 relative overflow-hidden flex items-center justify-center">
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt={banner.title?.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <ImageIcon className="w-10 h-10 text-slate-700" />
                )}
                
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  Slide #{banner.displayOrder || idx + 1}
                </div>

                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    banner.status === 'active' ? 'bg-emerald-500/80 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {banner.status || 'active'}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                  {banner.badge?.en}
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-2">
                  {banner.title?.en}
                </h3>
                <p className="text-xs text-slate-400 font-arabic line-clamp-1">
                  {banner.title?.ar}
                </p>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {banner.description?.en || banner.desc?.en}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
              <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                CTA: {banner.ctaUrl || '#services'}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(banner)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenDelete(banner)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Banner Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingBanner ? 'Edit Hero Banner' : 'Add New Hero Banner'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              
              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Badge / Tag (English)</label>
                  <input
                    type="text"
                    value={formData.badgeEn}
                    onChange={e => setFormData({ ...formData, badgeEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Badge / Tag (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.badgeAr}
                    onChange={e => setFormData({ ...formData, badgeAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Banner Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Banner Title (Arabic) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={formData.titleAr}
                    onChange={e => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Description (English)</label>
                  <textarea
                    rows="3"
                    value={formData.descEn}
                    onChange={e => setFormData({ ...formData, descEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Description (Arabic)</label>
                  <textarea
                    rows="3"
                    dir="rtl"
                    value={formData.descAr}
                    onChange={e => setFormData({ ...formData, descAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Banner Image *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Image URL or choose from Media Library"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center gap-1.5 shrink-0"
                  >
                    <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span>Media Library</span>
                  </button>
                </div>
              </div>

              {/* CTA and Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">CTA URL Link</label>
                  <input
                    type="text"
                    value={formData.ctaUrl}
                    onChange={e => setFormData({ ...formData, ctaUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={e => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingBanner ? 'Save Banner' : 'Create Banner'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData(prev => ({ ...prev, image: url }))}
        currentImage={formData.image}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Hero Banner"
        message="Are you sure you want to delete this slide banner?"
        itemName={bannerToDelete?.title?.en}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setBannerToDelete(null);
        }}
      />

    </div>
  );
}
