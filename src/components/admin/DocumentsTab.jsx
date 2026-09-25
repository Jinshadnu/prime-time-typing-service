import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  FileText
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function DocumentsTab({
  documents,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const initialFormState = {
    nameEn: '',
    nameAr: '',
    isRequired: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingDoc(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc);
    setFormData({
      nameEn: doc.name?.en || (typeof doc.name === 'string' ? doc.name : ''),
      nameAr: doc.name?.ar || '',
      isRequired: Boolean(doc.isRequired)
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.nameEn && !formData.nameAr) return;

    if (editingDoc) {
      onUpdateDocument(editingDoc.id, formData);
    } else {
      onAddDocument(formData);
    }
    setIsFormOpen(false);
  };

  const handleOpenDelete = (doc) => {
    setDocToDelete(doc);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (docToDelete) {
      onDeleteDocument(docToDelete.id);
      setIsDeleteOpen(false);
      setDocToDelete(null);
    }
  };

  const filteredDocs = documents.filter(d => {
    const enName = d.name?.en || (typeof d.name === 'string' ? d.name : '');
    const arName = d.name?.ar || '';
    return enName.toLowerCase().includes(searchTerm.toLowerCase()) || arName.includes(searchTerm);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-400" />
            <span>Master Required Documents Bank ({documents.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Standard checklist of official documents (Passport, Emirates ID, Tenancy, Degrees) reusable across all services
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Document Type</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search document requirements..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <th className="py-3 px-4 text-start font-semibold">#</th>
                <th className="py-3 px-4 text-start font-semibold">Document Name (English)</th>
                <th className="py-3 px-4 text-start font-semibold">Document Name (Arabic)</th>
                <th className="py-3 px-4 text-center font-semibold">Standard Mandatory</th>
                <th className="py-3 px-4 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">
                    No documents found.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc, idx) => (
                  <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400/80" />
                        <span>{doc.name?.en || doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-arabic text-sm">
                      {doc.name?.ar || '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.isRequired ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {doc.isRequired ? 'Mandatory' : 'Optional / Specific'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(doc)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(doc)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20"
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

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-white">
                {editingDoc ? 'Edit Document Requirement' : 'Add Document Requirement'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Document Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Attested Educational Certificate"
                  value={formData.nameEn}
                  onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Document Title (Arabic) *</label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  placeholder="مثال: المؤهل الدراسي المصدق"
                  value={formData.nameAr}
                  onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mandatoryCheck"
                  checked={formData.isRequired}
                  onChange={e => setFormData({ ...formData, isRequired: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D4AF37] bg-slate-950 border-slate-800"
                />
                <label htmlFor="mandatoryCheck" className="text-xs text-slate-300 font-semibold">
                  Mark as Default Mandatory Requirement
                </label>
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
                  <span>{editingDoc ? 'Update Document' : 'Save Document'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Document Item"
        message="Are you sure you want to delete this document from the master bank?"
        itemName={docToDelete?.name?.en || docToDelete?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setDocToDelete(null);
        }}
      />

    </div>
  );
}
