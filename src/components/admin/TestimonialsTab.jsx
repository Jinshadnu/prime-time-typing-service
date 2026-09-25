import React, { useState } from 'react';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  MessageSquareQuote,
  Image as ImageIcon
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function TestimonialsTab({
  testimonials,
  onSaveTestimonials,
  lang = 'en'
}) {
  const [items, setItems] = useState(testimonials);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const initialFormState = {
    name: '',
    role: 'Client / Business Owner',
    service: 'Tasheel & MOHRE Services',
    rating: 5,
    image: '',
    reviewEn: '',
    reviewAr: '',
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      role: item.role || '',
      service: item.service || '',
      rating: item.rating || 5,
      image: item.image || '',
      reviewEn: item.review?.en || (typeof item.review === 'string' ? item.review : ''),
      reviewAr: item.review?.ar || '',
      status: item.status || 'active'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    let updated;
    if (editingItem) {
      updated = items.map(t => {
        if (t.id === editingItem.id) {
          return {
            ...t,
            name: formData.name,
            role: formData.role,
            service: formData.service,
            rating: Number(formData.rating),
            image: formData.image,
            review: { en: formData.reviewEn, ar: formData.reviewAr },
            status: formData.status
          };
        }
        return t;
      });
    } else {
      const newItem = {
        id: `test-${Date.now()}`,
        name: formData.name,
        role: formData.role,
        service: formData.service,
        rating: Number(formData.rating),
        image: formData.image,
        review: { en: formData.reviewEn, ar: formData.reviewAr },
        status: formData.status
      };
      updated = [...items, newItem];
    }

    setItems(updated);
    onSaveTestimonials(updated);
    setIsFormOpen(false);
  };

  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const updated = items.filter(t => t.id !== itemToDelete.id);
      setItems(updated);
      onSaveTestimonials(updated);
      setIsDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-[#D4AF37]" />
            <span>Client Testimonials &amp; Reviews ({items.length})</span>
          </h2>
          <p className="text-xs text-slate-400">Manage client endorsements, ratings, and social proof</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(t => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < (t.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                    />
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-bold">
                  {t.service || 'Typing Service'}
                </span>
              </div>

              <p className="text-xs text-slate-300 italic line-clamp-3">
                "{t.review?.en || t.review}"
              </p>
              {t.review?.ar && (
                <p className="text-xs text-slate-400 font-arabic italic line-clamp-2" dir="rtl">
                  "{t.review.ar}"
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.role || 'Client'}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenDelete(t)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Service Referenced</label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                    <option value="3">⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              {/* Review Texts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Review (English) *</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.reviewEn}
                    onChange={e => setFormData({ ...formData, reviewEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Review (Arabic)</label>
                  <textarea
                    rows="3"
                    dir="rtl"
                    value={formData.reviewAr}
                    onChange={e => setFormData({ ...formData, reviewAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
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
                  <span>{editingItem ? 'Update Testimonial' : 'Add Testimonial'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData(prev => ({ ...prev, image: url }))}
        currentImage={formData.image}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Testimonial"
        message="Are you sure you want to remove this client review?"
        itemName={itemToDelete?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setItemToDelete(null);
        }}
      />

    </div>
  );
}
