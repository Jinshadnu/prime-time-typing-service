import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Send,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  Save,
  Check,
  X,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function EnquiriesTab({
  enquiries,
  settings,
  onUpdateStatus,
  onDeleteEnquiry,
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Active Enquiry Detail Modal
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('New');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [enqToDelete, setEnqToDelete] = useState(null);

  const handleOpenDetail = (enq) => {
    setActiveEnquiry(enq);
    setEditingNotes(enq.notes || '');
    setSelectedStatus(enq.status || 'New');
  };

  const handleSaveDetail = () => {
    if (activeEnquiry) {
      onUpdateStatus(activeEnquiry.id, selectedStatus, editingNotes);
      setActiveEnquiry(prev => ({
        ...prev,
        status: selectedStatus,
        notes: editingNotes
      }));
    }
  };

  const handleOpenDelete = (enq) => {
    setEnqToDelete(enq);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (enqToDelete) {
      onDeleteEnquiry(enqToDelete.id);
      setIsDeleteOpen(false);
      if (activeEnquiry && activeEnquiry.id === enqToDelete.id) {
        setActiveEnquiry(null);
      }
      setEnqToDelete(null);
    }
  };

  // WhatsApp 1-Click Message Composer
  const handleOpenWhatsApp = (enq) => {
    const rawNumber = enq.phone ? enq.phone.replace(/[^0-9]/g, '') : '';
    const template = settings?.whatsappTemplate || "Hello {customer_name}, regarding your inquiry for {service_name} at Prime Time Typing Services:";
    const message = template
      .replace('{customer_name}', enq.name || 'Customer')
      .replace('{service_name}', enq.serviceName || 'UAE Government Service')
      .replace('{category_name}', enq.categoryId || 'General');

    const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">New</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Contacted</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">In Progress</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">{status}</span>;
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      e.name?.toLowerCase().includes(term) ||
      e.phone?.includes(term) ||
      e.email?.toLowerCase().includes(term) ||
      e.serviceName?.toLowerCase().includes(term) ||
      e.id?.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || e.categoryId === categoryFilter;

    return matchesSearch && matchesStatus && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
            <span>Customer Enquiries &amp; Leads CRM ({enquiries.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Track inquiries, update statuses, manage internal notes, and chat directly via WhatsApp
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, phone, or service..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Statuses</option>
            <option value="New">New Leads</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <th className="py-3 px-4 text-start font-semibold">Ref ID</th>
                <th className="py-3 px-4 text-start font-semibold">Customer</th>
                <th className="py-3 px-4 text-start font-semibold">Service Requested</th>
                <th className="py-3 px-4 text-start font-semibold">Date &amp; Source</th>
                <th className="py-3 px-4 text-center font-semibold">Status</th>
                <th className="py-3 px-4 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No inquiries match current search criteria.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-3 px-4 font-mono font-bold text-amber-300">
                      {enq.id}
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-white">{enq.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        <span>{enq.phone}</span>
                        {enq.email && <span>• {enq.email}</span>}
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold text-slate-200 truncate">{enq.serviceName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{enq.message || 'No additional notes'}</p>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <p className="text-slate-300 font-mono text-[11px]">{enq.date}</p>
                      <p className="text-[10px] text-slate-500">{enq.source || 'Website'}</p>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(enq.status)}
                    </td>

                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Click WhatsApp Button */}
                        <button
                          onClick={() => handleOpenWhatsApp(enq)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDetail(enq)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="View Details & Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(enq)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                          title="Delete Enquiry"
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

      {/* Enquiry Detail & Notes Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-amber-300">{activeEnquiry.id}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeEnquiry.name}</h3>
              </div>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              
              {/* Quick Contact Bar */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-4 text-slate-300">
                  <a href={`tel:${activeEnquiry.phone}`} className="flex items-center gap-1.5 hover:text-[#D4AF37]">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>{activeEnquiry.phone}</span>
                  </a>
                  {activeEnquiry.email && (
                    <a href={`mailto:${activeEnquiry.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37]">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>{activeEnquiry.email}</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleOpenWhatsApp(activeEnquiry)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>

              {/* Service & Message */}
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Service Inquired:</label>
                  <p className="font-bold text-white text-sm">{activeEnquiry.serviceName}</p>
                  <p className="text-slate-400 text-xs mt-0.5">Department: {activeEnquiry.categoryId}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Customer Message / Inquiry Notes:</label>
                  <p className="text-slate-200 whitespace-pre-wrap">{activeEnquiry.message || 'No additional message.'}</p>
                </div>
              </div>

              {/* Status Update & Internal Notes */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Update Enquiry Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="New">New Lead</option>
                    <option value="Contacted">Contacted / Call Completed</option>
                    <option value="In Progress">In Progress / Documents Received</option>
                    <option value="Completed">Completed / Visa & Documents Cleared</option>
                    <option value="Cancelled">Cancelled / Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Internal Admin Notes (Private):</label>
                  <textarea
                    rows="3"
                    placeholder="e.g. Spoke with client, quoted AED 450, waiting for attested marriage certificate via WhatsApp..."
                    value={editingNotes}
                    onChange={e => setEditingNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleOpenDelete(activeEnquiry)}
                className="px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Lead</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveEnquiry(null)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveDetail}
                  className="px-5 py-2 font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Status &amp; Notes</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Enquiry Record"
        message="Are you sure you want to permanently delete this customer enquiry?"
        itemName={enqToDelete ? `${enqToDelete.id} - ${enqToDelete.name}` : ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setEnqToDelete(null);
        }}
      />

    </div>
  );
}
