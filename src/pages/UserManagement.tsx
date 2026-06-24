import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Users, Shield, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useOutletContext } from 'react-router-dom';

const AVAILABLE_PERMISSIONS = [
  { id: 'can_manage_departments', label: 'Manage Departments' },
  { id: 'can_manage_programmes', label: 'Manage Programmes' },
  { id: 'can_manage_courses', label: 'Manage Courses' }
];

export default function UserManagement() {
  const { user: currentUser } = useOutletContext<{ user: any }>();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await api.listUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTogglePermission = async (userId: number, currentPerms: string[], permToToggle: string) => {
    setSavingId(userId);
    const hasPerm = currentPerms.includes(permToToggle);
    const newPerms = hasPerm 
      ? currentPerms.filter(p => p !== permToToggle)
      : [...currentPerms, permToToggle];
    
    await api.updateUserPermissions(userId, newPerms);
    
    // Optimistic UI update
    setUsers(users.map(u => u.id === userId ? { ...u, permissions: newPerms } : u));
    setSavingId(null);
  };

  if (!currentUser?.is_superuser) {
    return <div className="p-8 text-red-500">Access Denied. Administrator privileges required.</div>;
  }

  if (loading) return <div className="p-8 text-zinc-400">Loading users...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <Users className="w-8 h-8 text-amber-500" />
            User Management (PBAC)
          </h1>
          <p className="text-zinc-400 mt-2">Manage user access and granular permissions.</p>
        </div>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-900/50 text-xs uppercase font-semibold text-zinc-500 border-b border-zinc-700">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Permissions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700/50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-zinc-100 text-base mb-1">{u.username}</div>
                  <div className="text-zinc-500">{u.email || 'No email'}</div>
                </td>
                <td className="px-6 py-4">
                  {u.is_superuser ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <Shield className="w-3.5 h-3.5" />
                      Administrator
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-700 text-zinc-300">
                      Standard User
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {u.is_superuser ? (
                    <div className="text-zinc-500 italic text-xs">Administrators have all permissions by default.</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_PERMISSIONS.map(perm => {
                        const hasPerm = u.permissions?.includes(perm.id);
                        return (
                          <button
                            key={perm.id}
                            onClick={() => handleTogglePermission(u.id, u.permissions || [], perm.id)}
                            disabled={savingId === u.id}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                              hasPerm 
                                ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20' 
                                : 'bg-zinc-900 text-zinc-500 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-300'
                            } ${savingId === u.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {hasPerm && <Check className="w-3.5 h-3.5" />}
                            {perm.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
