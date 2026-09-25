import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  ArrowUpDown
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function FaqsTab({
  faqs,
  onSaveFaqs,
  lang = 'en'
}) {
  const [faqList, setFaqList] = useState(faqs);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const initialFormState = {
    category: 'General',
    questionEn: '',
    questionAr: '',
    answerEn: '',
    answerAr: '',
    displayOrder: faqList.length + 1,
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormData({
      ...initialFormState,
      displayOrder: faqList.length + 1
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      category: faq.category || 'General',
      questionEn: faq.question?.en || '',
      questionAr: faq.question?.ar || '',
      answerEn: faq.answer?.en || '',
      answerAr: faq.answer?.ar || '',
      displayOrder: faq.displayOrder || 1,
      status: faq.status || 'active'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.questionEn && !formData.questionAr) return;

    let updated;
    if (editingFaq) {
      updated = faqList.map(f => {
        if (f.id === editingFaq.id) {
          return {
            ...f,
            category: formData.category,
            question: { en: formData.questionEn, ar: formData.questionAr },
            answer: { en: formData.answerEn, ar: formData.answerAr },
            displayOrder: Number(formData.displayOrder),
            status: formData.status
          };
        }
        return f;
      });
    } else {
      const newFaq = {
        id: `faq-${Date.now()}`,
        category: formData.category,
        question: { en: formData.questionEn, ar: formData.questionAr },
        answer: { en: formData.answerEn, ar: formData.answerAr },
        displayOrder: Number(formData.displayOrder),
        status: formData.status
      };
      updated = [...faqList, newFaq];
    }

    setFaqList(updated);
    onSaveFaqs(updated);
    setIsFormOpen(false);
  };

  const handleOpenDelete = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (faqToDelete) {
      const updated = faqList.filter(f => f.id !== faqToDelete.id);
      setFaqList(updated);
      onSaveFaqs(updated);
      setIsDeleteOpen(false);
      setFaqToDelete(null);
    }
  };

  const filteredFaqs = faqList.filter(f => {
    const qEn = f.question?.en?.toLowerCase() || '';
    const qAr = f.question?.ar || '';
    const matchesSearch = qEn.includes(searchTerm.toLowerCase()) || qAr.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
            <span>Frequently Asked Questions ({faqList.length})</span>
          </h2>
          <p className="text-xs text-slate-400">Manage global website FAQs in English and Arabic</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={faq.id}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                  {faq.category || 'General'}
                </span>
                <span className="text-xs text-slate-500 font-mono">#{faq.displayOrder || idx + 1}</span>
              </div>
              <h3 className="font-bold text-white text-sm">
                {faq.question?.en}
              </h3>
              <p className="text-xs text-slate-400 font-arabic">
                {faq.question?.ar}
              </p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {faq.answer?.en}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOpenDelete(faq)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit FAQ Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
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
                  <label className="block font-semibold text-slate-300 mb-1">Category Group</label>
                  <input
                    type="text"
                    placeholder="e.g. Tasheel & Visas, Payments, Timing"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
              </div>

              {/* Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Question (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.questionEn}
                    onChange={e => setFormData({ ...formData, questionEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Question (Arabic) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={formData.questionAr}
                    onChange={e => setFormData({ ...formData, questionAr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                  />
                </div>
              </div>

              {/* Answers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Answer (English) *</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.answerEn}
                    onChange={e => setFormData({ ...formData, answerEn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Answer (Arabic) *</label>
                  <textarea
                    rows="4"
                    required
                    dir="rtl"
                    value={formData.answerAr}
                    onChange={e => setFormData({ ...formData, answerAr: e.target.value })}
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
                  <span>{editingFaq ? 'Save FAQ' : 'Add FAQ'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ question?"
        itemName={faqToDelete?.question?.en}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setFaqToDelete(null);
        }}
      />

    </div>
  );
}
