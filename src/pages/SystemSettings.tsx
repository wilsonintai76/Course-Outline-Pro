import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Settings, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { useOutletContext } from 'react-router-dom';

export default function SystemSettings() {
  const { user } = useOutletContext<{ user: any }>();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  // Form states
  const [institutionName, setInstitutionName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    const data = await api.getSettings();
    if (data) {
      setSettings(data);
      setInstitutionName(data.institution_name);
      setLogoUrl(data.logo_url || '');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccess('');
    const updated = await api.updateSettings(settings.id, {
      institution_name: institutionName,
      logo_url: logoUrl
    });
    if (updated) {
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setSettings(updated);
    }
    setSaving(false);
  };

  if (!user?.is_superuser) {
    return <div className="p-8 text-red-500">Access Denied. Administrator privileges required.</div>;
  }

  if (loading) return <div className="p-8 text-zinc-400">Loading settings...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <Settings className="w-8 h-8 text-amber-500" />
            System Settings
          </h1>
          <p className="text-zinc-400 mt-2">Manage global institution settings and branding.</p>
        </div>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave} 
        className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 shadow-xl"
      >
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center font-medium">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Institution Name</label>
            <input 
              required
              value={institutionName} 
              onChange={e => setInstitutionName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-100 focus:border-amber-500 outline-none transition-colors"
              placeholder="e.g. University of Technology"
            />
            <p className="text-xs text-zinc-500 mt-2">This name will appear on all generated documents and Course Outlines.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Institution Logo URL</label>
            <div className="flex gap-4 items-start">
              <input 
                value={logoUrl} 
                onChange={e => setLogoUrl(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-100 focus:border-amber-500 outline-none transition-colors"
                placeholder="https://example.com/logo.png"
              />
              <div className="w-24 h-24 shrink-0 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <span className="text-xs text-zinc-600 font-medium">No Logo</span>
                )}
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-2">Provide a URL for the institution's logo. This will be embedded in the header of the Course Outline PDF.</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-700/50 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : (
              <>
                <Save className="w-5 h-5" /> Save Settings
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
