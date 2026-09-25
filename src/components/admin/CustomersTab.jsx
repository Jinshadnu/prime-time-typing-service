import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  Calendar,
  FileText,
  MessageCircle,
  Eye,
  CheckCircle2,
  X
} from 'lucide-react';

export default function CustomersTab({
  customers,
  settings,
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      c.name?.toLowerCase().includes(term) ||
      c.phone?.includes(term) ||
      c.email?.toLowerCase().includes(term)
    );
  });

  const handleOpenWhatsApp = (cust) => {
    const rawNumber = cust.phone ? cust.phone.replace(/[^0-9]/g, '') : '';
    const message = `Hello ${cust.name}, this is Prime Time Typing Services:`;
    const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Customers &amp; Client Directory ({customers.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Automatically organized list of clients who have submitted inquiries or requested typing services
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers by name, phone, or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <th className="py-3 px-4 text-start font-semibold">Client Name</th>
                <th className="py-3 px-4 text-start font-semibold">Contact Info</th>
                <th className="py-3 px-4 text-center font-semibold">Total Inquiries</th>
                <th className="py-3 px-4 text-start font-semibold">Last Active</th>
                <th className="py-3 px-4 text-start font-semibold">Services Requested</th>
                <th className="py-3 px-4 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(cust => (
                  <tr key={cust.id} className="hover:bg-slate-800/40 transition-colors group">
                    
                    <td className="py-3 px-4 font-bold text-white">
                      {cust.name}
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-mono text-slate-300">{cust.phone}</p>
                      {cust.email && <p className="text-[11px] text-slate-500">{cust.email}</p>}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                        {cust.totalEnquiries || 1}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {cust.lastEnquiryDate}
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {(cust.servicesRequested || []).slice(0, 2).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] truncate max-w-[140px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenWhatsApp(cust)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="View Customer Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
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

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedCustomer.name}</h3>
                <p className="text-xs text-slate-400">Client Profile &amp; Services History</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono text-white font-bold">{selectedCustomer.phone}</span>
                </div>
                {selectedCustomer.email && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-slate-200">{selectedCustomer.email}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">First Registered:</span>
                  <span className="font-mono text-slate-400">{selectedCustomer.createdDate || '2026-01-01'}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-300 mb-2">Services Inquired / Cleared:</h4>
                <div className="space-y-1.5">
                  {(selectedCustomer.servicesRequested || ['General Typing']).map((srv, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-white font-medium truncate">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenWhatsApp(selectedCustomer)}
                  className="px-4 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
