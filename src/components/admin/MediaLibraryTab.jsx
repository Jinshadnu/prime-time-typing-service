import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Upload,
  FileText
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function MediaLibraryTab({
  media,
  onAddMedia,
  onDeleteMedia,
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'General',
    size: '320 KB'
  });

  const handleCopyUrl = (item) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.url) return;
    onAddMedia(formData);
    setFormData({ title: '', url: '', category: 'General', size: '320 KB' });
    setIsUploadOpen(false);
  };

  const handleOpenDelete = (item) => {
    setMediaToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (mediaToDelete) {
      onDeleteMedia(mediaToDelete.id);
      setIsDeleteOpen(false);
      setMediaToDelete(null);
    }
  };

  const filteredMedia = media.filter(m =>
    m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
            <span>Media Library &amp; Asset Manager ({media.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Store and manage logos, service banner photos, and document icons
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Add Image</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media assets..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map(item => {
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="aspect-video w-full rounded-xl bg-slate-950 overflow-hidden relative mb-3 flex items-center justify-center">
                  {item.url ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-700" />
                  )}

                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[9px] font-bold text-slate-300 border border-slate-800">
                    {item.category || 'Asset'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-xs truncate mb-0.5">{item.title}</h3>
                <p className="text-[10px] text-slate-500 font-mono">{item.size || '300 KB'}</p>
              </div>

              <div className="pt-2.5 border-t border-slate-800/80 mt-2.5 flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(item)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                    isCopied ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="Copy Direct URL"
                >
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => handleOpenDelete(item)}
                  className="p-1 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-white">Add Image Asset</h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Asset Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Golden Visa Banner"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Category Group</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="General">General</option>
                  <option value="Banners">Banners</option>
                  <option value="Services">Services</option>
                  <option value="Branding">Branding / Logos</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Direct Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {formData.url && (
                <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <p className="text-[10px] text-slate-500 mb-1">Preview:</p>
                  <img
                    src={formData.url}
                    alt="Preview"
                    className="max-h-32 mx-auto rounded-lg object-cover"
                    onError={e => { e.target.alt = "Invalid URL"; }}
                  />
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Asset</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Media Asset"
        message="Are you sure you want to remove this media asset?"
        itemName={mediaToDelete?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setMediaToDelete(null);
        }}
      />

    </div>
  );
}
