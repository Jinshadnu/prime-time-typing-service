import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Calendar,
  User,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function BlogTab({
  blogs,
  onSaveBlogs,
  lang = 'en'
}) {
  const [blogList, setBlogList] = useState(blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const initialFormState = {
    titleEn: '',
    titleAr: '',
    slug: '',
    excerptEn: '',
    excerptAr: '',
    contentEn: '',
    contentAr: '',
    category: 'Residency Visas',
    author: 'Prime Time Editorial',
    image: '',
    publishedDate: new Date().toISOString().substring(0, 10),
    status: 'published'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      titleEn: blog.title?.en || '',
      titleAr: blog.title?.ar || '',
      slug: blog.slug || blog.id,
      excerptEn: blog.excerpt?.en || '',
      excerptAr: blog.excerpt?.ar || '',
      contentEn: blog.content?.en || '',
      contentAr: blog.content?.ar || '',
      category: blog.category || 'General',
      author: blog.author || 'Prime Time Editorial',
      image: blog.image || '',
      publishedDate: blog.publishedDate || '',
      status: blog.status || 'published'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.titleEn && !formData.titleAr) return;

    let updated;
    if (editingBlog) {
      updated = blogList.map(b => {
        if (b.id === editingBlog.id) {
          return {
            ...b,
            title: { en: formData.titleEn, ar: formData.titleAr },
            slug: formData.slug || b.id,
            excerpt: { en: formData.excerptEn, ar: formData.excerptAr },
            content: { en: formData.contentEn, ar: formData.contentAr },
            category: formData.category,
            author: formData.author,
            image: formData.image,
            publishedDate: formData.publishedDate,
            status: formData.status
          };
        }
        return b;
      });
    } else {
      const newBlog = {
        id: `blog-${Date.now()}`,
        title: { en: formData.titleEn, ar: formData.titleAr },
        slug: formData.slug || `blog-${Date.now()}`,
        excerpt: { en: formData.excerptEn, ar: formData.excerptAr },
        content: { en: formData.contentEn, ar: formData.contentAr },
        category: formData.category,
        author: formData.author,
        image: formData.image,
        publishedDate: formData.publishedDate,
        status: formData.status
      };
      updated = [newBlog, ...blogList];
    }

    setBlogList(updated);
    onSaveBlogs(updated);
    setIsFormOpen(false);
  };

  const handleOpenDelete = (blog) => {
    setBlogToDelete(blog);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      const updated = blogList.filter(b => b.id !== blogToDelete.id);
      setBlogList(updated);
      onSaveBlogs(updated);
      setIsDeleteOpen(false);
      setBlogToDelete(null);
    }
  };

  const filteredBlogs = blogList.filter(b => {
    const tEn = b.title?.en?.toLowerCase() || '';
    const tAr = b.title?.ar || '';
    return tEn.includes(searchTerm.toLowerCase()) || tAr.includes(searchTerm);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <span>Blog &amp; Government News Articles ({blogList.length})</span>
          </h2>
          <p className="text-xs text-slate-400">Publish guides, visa updates, and corporate regulations</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search news and articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBlogs.map(blog => (
          <div
            key={blog.id}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{blog.publishedDate}</span>
                </span>
              </div>

              <h3 className="font-bold text-white text-sm line-clamp-2">
                {blog.title?.en}
              </h3>
              <p className="text-xs text-slate-400 font-arabic line-clamp-1" dir="rtl">
                {blog.title?.ar}
              </p>
              <p className="text-xs text-slate-400 line-clamp-2">
                {blog.excerpt?.en}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-500" />
                <span>{blog.author}</span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(blog)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenDelete(blog)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Article Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingBlog ? 'Edit Blog Article' : 'Write New Article'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              
              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Article Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Article Title (Arabic) *</label>
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

              {/* Slug, Category, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Excerpts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Short Excerpt (English)</label>
                  <textarea
                    rows="2"
                    value={formData.excerptEn}
                    onChange={e => setFormData({ ...formData, excerptEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Short Excerpt (Arabic)</label>
                  <textarea
                    rows="2"
                    dir="rtl"
                    value={formData.excerptAr}
                    onChange={e => setFormData({ ...formData, excerptAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Content Full */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Article Body (English)</label>
                  <textarea
                    rows="6"
                    value={formData.contentEn}
                    onChange={e => setFormData({ ...formData, contentEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Article Body (Arabic)</label>
                  <textarea
                    rows="6"
                    dir="rtl"
                    value={formData.contentAr}
                    onChange={e => setFormData({ ...formData, contentAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Featured Cover Image</label>
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
                  <span>{editingBlog ? 'Save Article' : 'Publish Article'}</span>
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
        title="Delete Article"
        message="Are you sure you want to delete this blog post?"
        itemName={blogToDelete?.title?.en}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setBlogToDelete(null);
        }}
      />

    </div>
  );
}
