import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { User, Mail, Save, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await api.getProfile();
      if (data) {
        setProfile(data);
        setUsername(data.username || '');
        setEmail(data.email || '');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const updated = await api.updateProfile({ username, email });
    if (updated) setProfile(updated);
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-zinc-400">Loading profile...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-amber-500/20 p-4 rounded-full">
          <User className="w-10 h-10 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Your Profile</h1>
          <p className="text-zinc-400">Manage your account settings.</p>
        </div>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-8 shadow-xl"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Username
            </label>
            <input 
              required
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-100 focus:border-amber-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input 
              type="email"
              required
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-100 focus:border-amber-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
        </div>
      </motion.form>
    </div>
  );
}
