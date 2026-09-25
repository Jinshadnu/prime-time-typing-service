import React, { useState } from 'react';
import {
  FolderTree,
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  Check,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function SubcategoriesTab({
  categories,
  subcategories,
  onAddSubcategory,
  onUpdateSubcategory,
  onDeleteSubcategory,
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [subToDelete, setSubToDelete] = useState(null);

  const initialFormState = {
    categoryId: categories[0]?.id || 'tasheel',
    nameEn: '',
    nameAr: '',
    slug: '',
    descEn: '',
    descAr: '',
    displayOrder: subcategories.length + 1,
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingSubcategory(null);
    setFormData({
      ...initialFormState,
      categoryId: categoryFilter !== 'all' ? categoryFilter : (categories[0]?.id || 'tasheel'),
      displayOrder: subcategories.length + 1
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (sub) => {
    setEditingSubcategory(sub);
    setFormData({
      categoryId: sub.categoryId || 'tasheel',
      nameEn: sub.name?.en || '',
      nameAr: sub.name?.ar || '',
      slug: sub.slug || sub.id,
      descEn: sub.desc?.en || '',
      descAr: sub.desc?.ar || '',
      displayOrder: sub.displayOrder || 1,
      status: sub.status || 'active'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.nameEn && !formData.nameAr) return;

    if (editingSubcategory) {
      onUpdateSubcategory(editingSubcategory.id, formData);
    } else {
      onAddSubcategory(formData);
    }
    setIsFormOpen(false);
  };

  const handleOpenDelete = (sub) => {
    setSubToDelete(sub);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (subToDelete) {
      onDeleteSubcategory(subToDelete.id);
      setIsDeleteOpen(false);
      setSubToDelete(null);
    }
  };

  const handleToggleStatus = (sub) => {
    const nextStatus = sub.status === 'active' ? 'inactive' : 'active';
    onUpdateSubcategory(sub.id, { status: nextStatus });
  };

  // Filter Subcategories
  const filteredSubs = subcategories.filter(sub => {
    const matchesSearch =
      sub.name?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name?.ar?.includes(searchTerm) ||
      sub.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || sub.categoryId === categoryFilter;
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name?.en : catId;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-emerald-400" />
            <span>Subcategories ({subcategories.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Organize services under dedicated subcategories for each government department
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subcategory</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subcategories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Main Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name?.en}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

      </div>

      {/* Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <th className="py-3 px-4 text-start font-semibold">Order</th>
                <th className="py-3 px-4 text-start font-semibold">Subcategory Name (EN / AR)</th>
                <th className="py-3 px-4 text-start font-semibold">Main Department</th>
                <th className="py-3 px-4 text-start font-semibold">Slug</th>
                <th className="py-3 px-4 text-center font-semibold">Status</th>
                <th className="py-3 px-4 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSubs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No subcategories found for selected filters.
                  </td>
                </tr>
              ) : (
                filteredSubs.map((sub, idx) => (
                  <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors group">
                    
                    <td className="py-3 px-4 text-slate-400 font-mono font-bold">
                      #{sub.displayOrder || idx + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <FolderTree className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{sub.name?.en}</p>
                          <p className="text-slate-400 text-[11px] font-arabic">{sub.name?.ar}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-[#D4AF37] border border-amber-500/20 font-medium text-[11px]">
                        <Layers className="w-3 h-3" />
                        <span>{getCategoryName(sub.categoryId)}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {sub.slug || sub.id}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(sub)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors inline-flex items-center gap-1 ${
                          sub.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${sub.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        <span>{sub.status === 'active' ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(sub)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="Edit Subcategory"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(sub)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                          title="Delete Subcategory"
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

      {/* Add / Edit Subcategory Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FolderTree className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
                  </h3>
                  <p className="text-xs text-slate-400">Map this subcategory under a main government category</p>
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
              
              {/* Category Select */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Main Government Department *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name?.en} ({cat.name?.ar})
                    </option>
                  ))}
                </select>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Subcategory Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Labour Services"
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
                  <label className="block font-semibold text-slate-300 mb-1">Subcategory Name (Arabic) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    placeholder="مثال: خدمات تصاريح العمل"
                    value={formData.nameAr}
                    onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Slug & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. labour-services"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={e => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                  <span>{editingSubcategory ? 'Update Subcategory' : 'Create Subcategory'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Subcategory"
        message="Are you sure you want to delete this subcategory? Services under it will remain active."
        itemName={subToDelete?.name?.en}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSubToDelete(null);
        }}
      />

    </div>
  );
}
