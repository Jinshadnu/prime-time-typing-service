import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  User,
  Lock,
  Key,
  Shield
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

const ROLES = [
  { name: 'Super Admin', desc: 'Full unrestricted access to services, content, settings, users and activity logs.' },
  { name: 'Admin', desc: 'Manage government services, content, enquiries, customers and SEO.' },
  { name: 'Content Manager', desc: 'Update homepage copy, banners, blogs, FAQs and testimonials.' },
  { name: 'Enquiry Manager', desc: 'Manage incoming leads, customer CRM and WhatsApp follow-ups.' }
];

export default function UsersTab({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  lang = 'en'
}) {
  const [userList, setUserList] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const initialFormState = {
    name: '',
    email: '',
    username: '',
    role: 'Admin',
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      username: user.username || '',
      role: user.role || 'Admin',
      status: user.status || 'active'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    let updated;
    if (editingUser) {
      updated = userList.map(u => u.id === editingUser.id ? { ...u, ...formData } : u);
      if (onUpdateUser) onUpdateUser(editingUser.id, formData);
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        ...formData,
        createdDate: new Date().toISOString().substring(0, 10)
      };
      updated = [...userList, newUser];
      if (onAddUser) onAddUser(newUser);
    }

    setUserList(updated);
    setIsFormOpen(false);
  };

  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      const updated = userList.filter(u => u.id !== userToDelete.id);
      setUserList(updated);
      if (onDeleteUser) onDeleteUser(userToDelete.id);
      setIsDeleteOpen(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = userList.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span>Admin Users &amp; Role Access ({userList.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Manage administrative credentials, assign roles, and configure system permissions
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <th className="py-3 px-4 text-start font-semibold">User Profile</th>
                <th className="py-3 px-4 text-start font-semibold">Username / Email</th>
                <th className="py-3 px-4 text-start font-semibold">Assigned Role</th>
                <th className="py-3 px-4 text-center font-semibold">Status</th>
                <th className="py-3 px-4 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-white">{user.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-mono text-slate-300 font-bold">{user.username}</p>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-[#D4AF37] border border-amber-500/20 font-semibold text-[11px]">
                      {user.role}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                      {user.status || 'Active'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-end">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {user.role !== 'Super Admin' && (
                        <button
                          onClick={() => handleOpenDelete(user)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Breakdown Matrix */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Key className="w-4 h-4 text-amber-400" />
          <span>Role Permissions Matrix</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {ROLES.map(r => (
            <div key={r.name} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-amber-300 block mb-1">{r.name}</span>
              <p className="text-slate-400 text-[11px]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-white">
                {editingUser ? 'Edit Admin User' : 'Create Admin User'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Username *</label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Role *</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {ROLES.map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
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
                  <span>{editingUser ? 'Save User' : 'Create User'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Admin User"
        message="Are you sure you want to delete this administrator account?"
        itemName={userToDelete?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setUserToDelete(null);
        }}
      />

    </div>
  );
}
