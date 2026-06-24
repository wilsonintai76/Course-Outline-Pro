import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Plus, Building2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useOutletContext } from 'react-router-dom';

export default function Departments() {
  const { user } = useOutletContext<{ user: any }>();
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showDeptForm, setShowDeptForm] = useState(false);
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const d = await api.listDepartments();
    setDepartments(d);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createDepartment({ name: deptName, code: deptCode });
    setDeptName('');
    setDeptCode('');
    setShowDeptForm(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
      await api.deleteDepartment(id);
      fetchData();
    }
  };

  if (!user?.is_superuser && !user?.permissions?.includes('can_manage_departments')) {
    return <div className="p-8 text-red-500">Access Denied. You do not have permission to manage departments.</div>;
  }

  if (loading) return <div className="p-8 text-zinc-400">Loading departments...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-amber-500" />
            Departments
          </h1>
          <p className="text-zinc-400 mt-2">Manage institution departments.</p>
        </div>
        <button 
          onClick={() => setShowDeptForm(true)}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Department
        </button>
      </div>

      {showDeptForm && (
        <motion.form 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreateDepartment} 
          className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mb-8 flex gap-4 items-end shadow-xl"
        >
          <div className="flex-1">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Department Code</label>
            <input 
              required value={deptCode} onChange={e => setDeptCode(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none"
              placeholder="e.g. FSKM"
            />
          </div>
          <div className="flex-[3]">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Department Name</label>
            <input 
              required value={deptName} onChange={e => setDeptName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none"
              placeholder="e.g. Faculty of Computer Science"
            />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowDeptForm(false)} className="px-4 py-2 rounded text-zinc-400 hover:bg-zinc-700">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-amber-500 text-black font-bold hover:bg-amber-600">Save</button>
          </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div key={dept.id} className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-zinc-900 p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-amber-500" />
                </div>
                <button 
                  onClick={() => handleDelete(dept.id)}
                  className="text-zinc-500 hover:text-red-500 transition-colors"
                  title="Delete Department"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-zinc-100 mb-1">{dept.name}</h2>
              <span className="text-sm text-zinc-400 font-mono">{dept.code}</span>
            </div>
          </div>
        ))}
        {departments.length === 0 && (
          <div className="col-span-full text-center p-12 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
            No departments found. Create your first department to get started.
          </div>
        )}
      </div>
    </div>
  );
}
