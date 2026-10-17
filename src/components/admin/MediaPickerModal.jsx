import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  X,
  Check,
  Search,
  Plus,
  Upload,
  Link as LinkIcon,
  Loader2,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { getStoredMedia, addMediaItem } from '../../utils/adminStorage';
import { uploadImageFromFile, compressAndReadImage, formatBytes } from '../../utils/imageUploadHelper';

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelectImage,
  currentImage = '',
  title = 'Select or Upload Media Asset',
  category = 'General',
  lang = 'en'
}) {
  const [mediaList, setMediaList] = useState(() => getStoredMedia());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'library' | 'url'

  // Device Upload State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileTitle, setFileTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // URL State
  const [customUrl, setCustomUrl] = useState('');
  const [urlTitle, setUrlTitle] = useState('');

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter(m => 
    m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = async (file) => {
    setUploadError('');
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WEBP, SVG, GIF)');
      return;
    }
    setSelectedFile(file);
    const suggestedTitle = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    setFileTitle(suggestedTitle);

    try {
      const result = await compressAndReadImage(file);
      setFilePreview(result);
    } catch (err) {
      setUploadError('Could not process image file: ' + err.message);
    }
  };

  const handleConfirmDeviceUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsProcessing(true);
    setUploadError('');

    try {
      const res = await uploadImageFromFile(selectedFile, category);
      setMediaList(getStoredMedia());
      onSelectImage(res.url);
      onClose();
    } catch (err) {
      setUploadError('Upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddCustomUrl = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    const updated = addMediaItem({
      title: urlTitle.trim() || 'Custom Asset',
      url: customUrl.trim(),
      category: category || 'Uploaded'
    });
    setMediaList(updated);
    onSelectImage(customUrl.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5E5C0] via-[#D4AF37] to-[#9E7D3B] text-slate-950 flex items-center justify-center shadow-md">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
              <p className="text-xs text-slate-400">Upload directly from device or choose from your media library</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-2 border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'upload' 
                ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload from Device</span>
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'library' 
                ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Media Library ({mediaList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'url' 
                ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Image URL</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1">

          {/* TAB 1: UPLOAD FROM DEVICE */}
          {activeTab === 'upload' && (
            <div className="space-y-4 max-w-lg mx-auto">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Drag and Drop Dropzone */}
              {!filePreview ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                    dragActive
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.01]'
                      : 'border-slate-700 hover:border-[#D4AF37] bg-slate-950/60 hover:bg-slate-950'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] flex items-center justify-center shadow-inner">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">
                      Click to choose image or drag &amp; drop here
                    </p>
                    <p className="text-xs text-slate-400">
                      Supports JPG, PNG, WebP, GIF, SVG (automatic high-res compression)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 text-xs font-bold bg-[#D4AF37] text-slate-950 rounded-xl shadow-md hover:bg-[#e2bd45]"
                  >
                    Select Image File
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4" />
                      <span>Ready to Upload</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                      }}
                      className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                    >
                      Change file
                    </button>
                  </div>

                  {/* Image Preview & Details */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      <img
                        src={filePreview.dataUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs space-y-1.5 flex-1 min-w-0">
                      <div className="font-semibold text-white truncate">{selectedFile.name}</div>
                      <div className="text-slate-400 text-[11px]">
                        Size: <span className="text-amber-400 font-mono">{filePreview.size}</span>
                        {filePreview.width && (
                          <span className="ml-2 font-mono">({filePreview.width}x{filePreview.height}px)</span>
                        )}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium">
                        ✓ Auto-compressed &amp; optimized for instant loading
                      </div>
                    </div>
                  </div>

                  {/* Asset Title input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Asset Title (for Media Library)
                    </label>
                    <input
                      type="text"
                      value={fileTitle}
                      onChange={e => setFileTitle(e.target.value)}
                      placeholder="e.g. VIP Visa Service Office"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleConfirmDeviceUpload}
                      className="px-5 py-2 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e2bd45] rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading &amp; Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Upload &amp; Attach Image</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search media by title or category..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {filteredMedia.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  <ImageIcon className="w-10 h-10 mx-auto text-slate-700 mb-2" />
                  <p>No media items match your search.</p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="mt-3 text-xs text-[#D4AF37] hover:underline font-bold"
                  >
                    + Upload an image from device now
                  </button>
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
                          isSelected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-lg' : 'border-slate-800'
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
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                          <span>{item.category}</span>
                          <span>{item.size || ''}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FROM DIRECT URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleAddCustomUrl} className="space-y-4 max-w-md mx-auto py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Asset Title</label>
                <input
                  type="text"
                  placeholder="e.g. Service Banner Photo"
                  value={urlTitle}
                  onChange={e => setUrlTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Direct Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... or /banners/slide1.jpg"
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
                  Attach URL Image
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Supports local device files &amp; web URLs</span>
          </span>
          {currentImage && (
            <button
              onClick={() => {
                onSelectImage('');
                onClose();
              }}
              className="text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              Remove Current Image
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
