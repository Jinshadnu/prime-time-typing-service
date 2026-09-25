import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  ArrowUpDown,
  Filter,
  Eye,
  Check,
  X
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const AVAILABLE_ICONS = [
  'Briefcase', 'Award', 'Users', 'Home', 'FileCheck2', 'Plane', 'ShieldCheck',
  'Globe', 'Building2', 'Crown', 'Car', 'Sparkles', 'FileBadge', 'BadgeCheck',
  'IdCard', 'Languages', 'MapPin', 'Clock', 'CreditCard', 'FileText'
];

export default function CategoriesTab({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const initialFormState = {
    nameEn: '',
    nameAr: '',
    slug: '',
    descEn: '',
    descAr: '',
    icon: 'Briefcase',
    image: '',
    displayOrder: categories.length + 1,
    featured: false,
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      ...initialFormState,
      displayOrder: categories.length + 1
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      nameEn: category.name?.en || '',
      nameAr: category.name?.ar || '',
      slug: category.slug || category.id,
      descEn: category.desc?.en || '',
      descAr: category.desc?.ar || '',
      icon: category.icon || 'Briefcase',
      image: category.image || '',
      displayOrder: category.displayOrder || 1,
      featured: Boolean(category.featured),
      status: category.status || 'active'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.nameEn && !formData.nameAr) return;

    if (editingCategory) {
      onUpdateCategory(editingCategory.id, formData);
    } else {
      onAddCategory(formData);
    }
    setIsFormOpen(false);
  };

  const handleOpenDelete = (category) => {
    setCategoryToDelete(category);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      onDeleteCategory(categoryToDelete.id);
      setIsDeleteOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleToggleStatus = (category) => {
    const nextStatus = category.status === 'active' ? 'inactive' : 'active';
    onUpdateCategory(category.id, { status: nextStatus });
  };

  const handleToggleFeatured = (category) => {
    onUpdateCategory(category.id, { featured: !category.featured });
  };

  // Filtering
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = 
      cat.name?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.name?.ar?.includes(searchTerm) ||
      cat.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || cat.status === statusFilter;
    const matchesFeatured = featuredFilter === 'all' || 
      (featuredFilter === 'featured' ? cat.featured : !cat.featured);

    return matchesSearch && matchesStatus && matchesFeatured;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <span>Main Categories ({categories.length})</span>
          </h2>
          <p className="text-xs text-slate-400">Manage government departments and top-level service categories</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search categories (e.g. Tasheel, Tamm)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          <select
            value={featuredFilter}
            onChange={e => setFeaturedFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Visibility</option>
            <option value="featured">Featured On Home</option>
            <option value="standard">Standard</option>
          </select>
        </div>

      </div>

      {/* Categories Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <th className="py-3 px-4 text-start font-semibold">Order</th>
                <th className="py-3 px-4 text-start font-semibold">Category (English & Arabic)</th>
                <th className="py-3 px-4 text-start font-semibold">Slug</th>
                <th className="py-3 px-4 text-start font-semibold">Icon</th>
                <th className="py-3 px-4 text-center font-semibold">Featured</th>
                <th className="py-3 px-4 text-center font-semibold">Status</th>
                <th className="py-3 px-4 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat, idx) => (
                  <tr key={cat.id} className="hover:bg-slate-800/40 transition-colors group">
                    
                    {/* Display Order */}
                    <td className="py-3 px-4 text-slate-400 font-mono font-bold">
                      #{cat.displayOrder || idx + 1}
                    </td>

                    {/* Category Title & Desc */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] flex items-center justify-center shrink-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{cat.name?.en}</p>
                          <p className="text-slate-400 text-[11px] font-arabic">{cat.name?.ar}</p>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded-md border border-slate-800 text-[11px]">
                        {cat.slug || cat.id}
                      </span>
                    </td>

                    {/* Icon */}
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-[10px]">
                        {cat.icon || 'Briefcase'}
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(cat)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          cat.featured
                            ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                            : 'bg-slate-800 text-slate-600 hover:text-slate-400'
                        }`}
                        title={cat.featured ? 'Featured on Home' : 'Not Featured'}
                      >
                        <Star className={`w-4 h-4 ${cat.featured ? 'fill-amber-300' : ''}`} />
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(cat)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors inline-flex items-center gap-1 ${
                          cat.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        <span>{cat.status === 'active' ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(cat)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingCategory ? 'Edit Main Category' : 'Add New Main Category'}
                  </h3>
                  <p className="text-xs text-slate-400">Configure department name, slug, descriptions, and icon</p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tasheel Services"
                    value={formData.nameEn}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        nameEn: val,
                        slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }));
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category Name (Arabic) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    placeholder="مثال: خدمات تسهيل"
                    value={formData.nameAr}
                    onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Slug & Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. tasheel-services"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Icon Style</label>
                  <select
                    value={formData.icon}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {AVAILABLE_ICONS.map(ic => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Description (English)</label>
                  <textarea
                    rows="3"
                    placeholder="Overview of this government department..."
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
                    placeholder="وصف تفصيلي للخدمات والمعاملات..."
                    value={formData.descAr}
                    onChange={e => setFormData({ ...formData, descAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Image & Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={e => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Featured on Homepage</label>
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featuredCat"
                      checked={formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#D4AF37] bg-slate-950 border-slate-800 focus:ring-0"
                    />
                    <label htmlFor="featuredCat" className="text-xs text-slate-300">Feature this department</label>
                  </div>
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Cover / Category Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
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
                  <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Main Category"
        message="Are you sure you want to delete this category? Associated services will remain but will require re-assignment."
        itemName={categoryToDelete?.name?.en}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setCategoryToDelete(null);
        }}
      />

    </div>
  );
}
