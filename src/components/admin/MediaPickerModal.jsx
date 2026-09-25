import React, { useState } from 'react';
import { Image as ImageIcon, X, Check, Search, Plus, ExternalLink } from 'lucide-react';
import { getStoredMedia, addMediaItem } from '../../utils/adminStorage';

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelectImage,
  currentImage = '',
  title = 'Select Media Asset',
  lang = 'en'
}) {
  const [mediaList, setMediaList] = useState(() => getStoredMedia());
  const [searchTerm, setSearchTerm] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'custom'

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter(m => 
    m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    const updated = addMediaItem({
      title: uploadTitle.trim() || 'Custom Asset',
      url: customUrl.trim(),
      category: 'Uploaded'
    });
    setMediaList(updated);
    onSelectImage(customUrl.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="text-xs text-slate-400">Choose from existing library or provide custom URL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'library' 
                ? 'bg-[#D4AF37] text-slate-950 shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Media Library ({mediaList.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'custom' 
                ? 'bg-[#D4AF37] text-slate-950 shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            + Add URL / Upload
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'library' ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search media by title..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {filteredMedia.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No media items match your search.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredMedia.map(item => {
                    const isSelected = currentImage === item.url;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectImage(item.url);
                          onClose();
                        }}
                        className={`group relative rounded-xl border p-2 cursor-pointer transition-all duration-200 bg-slate-950/60 hover:border-[#D4AF37] ${
                          isSelected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30' : 'border-slate-800'
                        }`}
                      >
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center relative mb-2">
                          {item.url ? (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-slate-700" />
                          )}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-[#D4AF37] text-slate-950 rounded-full p-1 shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-300 truncate">{item.title}</p>
                        <p className="text-[10px] text-slate-500">{item.category}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleAddCustom} className="space-y-4 max-w-md mx-auto py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Asset Title</label>
                <input
                  type="text"
                  placeholder="e.g. Work Permit Service Banner"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Direct Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={customUrl}
                  onChange={e => setCustomUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              {customUrl && (
                <div className="mt-3 p-2 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400 mb-2">Live Image Preview:</p>
                  <img
                    src={customUrl}
                    alt="Preview"
                    className="max-h-36 mx-auto rounded-lg object-cover"
                    onError={(e) => {
                      e.target.alt = "Invalid Image URL";
                    }}
                  />
                </div>
              )}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Save & Select Image
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-500">
          <span>Click any image to attach to your form</span>
          <button
            onClick={() => {
              onSelectImage('');
              onClose();
            }}
            className="text-red-400 hover:text-red-300 font-medium transition-colors"
          >
            Remove Image
          </button>
        </div>

      </div>
    </div>
  );
}
