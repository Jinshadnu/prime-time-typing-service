import React, { useState } from 'react';
import {
  Activity,
  Search,
  Filter,
  Clock,
  User,
  Shield,
  Layers,
  FileText
} from 'lucide-react';

export default function ActivityLogsTab({
  logs = [],
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(l =>
    l.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.record?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.module?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.admin?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#D4AF37]" />
            <span>Activity Audit Logs ({logs.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time chronological log of administrative modifications, service additions, and status changes
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search activity logs by action, module or admin..."
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
                <th className="py-3 px-4 text-start font-semibold">Timestamp</th>
                <th className="py-3 px-4 text-start font-semibold">Administrator</th>
                <th className="py-3 px-4 text-start font-semibold">Action</th>
                <th className="py-3 px-4 text-start font-semibold">Module</th>
                <th className="py-3 px-4 text-start font-semibold">Affected Record</th>
                <th className="py-3 px-4 text-end font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500 font-sans">
                    No activity logs recorded.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-sans font-bold text-white">
                      {log.admin}
                    </td>
                    <td className="py-3 px-4 font-sans text-amber-300 font-semibold">
                      {log.action}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-sans text-[11px]">
                        {log.module}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-300 max-w-xs truncate">
                      {log.record}
                    </td>
                    <td className="py-3 px-4 text-end text-slate-500 text-[11px]">
                      {log.ip || '127.0.0.1'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
