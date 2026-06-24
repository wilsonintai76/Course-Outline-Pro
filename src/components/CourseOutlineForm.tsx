import { CourseOutlineData } from '../types';
import { Trash2 } from 'lucide-react';

function LearningTimesInput({ data, handleChange }: { data: CourseOutlineData, handleChange: (field: keyof CourseOutlineData, value: any) => void }) {
  return (
    <div className="space-y-4 overflow-x-auto pb-4">
      {data?.learningTimes?.map((lt, i) => (
        <div key={`lt-${i}`} className="border border-[var(--border-panel)] rounded p-2 flex gap-2 w-max bg-[var(--bg-panel)]/50 items-center text-xs">
          <input className="w-20 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1" value={lt.topic} placeholder="Topic" onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], topic: e.target.value}; handleChange('learningTimes', a); }} />
          <div className="text-zinc-500 ml-2">F2F:</div>
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Kuliah" value={lt.f2fKuliah} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], f2fKuliah: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Tutorial" value={lt.f2fTutorial} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], f2fTutorial: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Tugasan 1" value={lt.f2fTugasan1} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], f2fTugasan1: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Tugasan 2" value={lt.f2fTugasan2} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], f2fTugasan2: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Tugasan 3" value={lt.f2fTugasan3} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], f2fTugasan3: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Pembentangan" value={lt.f2fPembentangan} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], f2fPembentangan: e.target.value}; handleChange('learningTimes', a); }} />
          <div className="text-zinc-500 ml-2">NF2F:</div>
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Berpandu" value={lt.nf2fBerpandu} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], nf2fBerpandu: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Kendiri" value={lt.nf2fKendiri} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], nf2fKendiri: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Tugasan 1" value={lt.nf2fTugasan1} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], nf2fTugasan1: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Tugasan 2" value={lt.nf2fTugasan2} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], nf2fTugasan2: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Tugasan 3" value={lt.nf2fTugasan3} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], nf2fTugasan3: e.target.value}; handleChange('learningTimes', a); }} />
          <input className="w-10 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 text-center" title="Pembentangan" value={lt.nf2fPembentangan} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], nf2fPembentangan: e.target.value}; handleChange('learningTimes', a); }} />
          <div className="text-zinc-500 ml-2">Total:</div>
          <input className="w-12 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded px-1 py-1 font-bold text-center" value={lt.totalSLT} onChange={e => { const a=[...(data?.learningTimes || [])]; a[i]={...a[i], totalSLT: e.target.value}; handleChange('learningTimes', a); }} />
          
          <button className="ml-2 p-1 text-zinc-500 hover:text-red-500" onClick={() => {
              const arr = (data?.learningTimes || []).filter((_, idx) => idx !== i);
              handleChange('learningTimes', arr);
          }}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button className="text-sm bg-[var(--brand-nav)] text-white hover:bg-[var(--brand-hover)] px-3 py-1.5 rounded font-medium transition-colors" onClick={() => handleChange('learningTimes', [...(data?.learningTimes || []), { topic: '', f2fKuliah: '', f2fTutorial: '', f2fTugasan1: '', f2fTugasan2: '', f2fTugasan3: '', f2fPembentangan: '', nf2fBerpandu: '', nf2fKendiri: '', nf2fTugasan1: '', nf2fTugasan2: '', nf2fTugasan3: '', nf2fPembentangan: '', totalSLT: '' }])}>+ Add Schedule Row</button>
    </div>
  );
}

function WeeklyScheduleInput({ data, handleChange }: { data: CourseOutlineData, handleChange: (field: keyof CourseOutlineData, value: any) => void }) {
  return (
    <div className="space-y-4">
      {data?.weeklySchedule?.map((wk, i) => (
        <div key={`wk-${i}`} className="bg-[var(--bg-panel)]/30 border border-[var(--border-panel)] rounded p-4 relative pt-6 mt-2">
           <button 
            className="absolute top-2 right-2 p-1.5 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
            onClick={() => {
              const arr = (data?.weeklySchedule || []).filter((_, idx) => idx !== i);
              handleChange('weeklySchedule', arr);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="flex justify-between items-center bg-black/10 -mx-4 -mt-4 px-4 py-2 border-b border-[var(--border-panel)] mb-2">
            <span className="text-sm font-bold text-zinc-400">Week Session</span>
            <input className="w-24 bg-transparent border-none text-right font-bold focus:outline-none placeholder:text-zinc-600" value={wk.week} onChange={e => {
              const arr = [...(data?.weeklySchedule || [])];
              arr[i] = { ...arr[i], week: e.target.value };
              handleChange('weeklySchedule', arr);
            }} placeholder="M1-M3"/>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <input className="col-span-1 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 text-sm outline-none focus:border-[var(--brand-hover)]" value={wk.topic} placeholder="Topic 1.0" onChange={e => {
              const arr = [...(data?.weeklySchedule || [])];
              arr[i] = { ...arr[i], topic: e.target.value };
              handleChange('weeklySchedule', arr);
            }} />
            <input className="col-span-3 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 text-sm outline-none focus:border-[var(--brand-hover)]" value={wk.contactHours} placeholder="Contact Hours (e.g. Kuliah=5)" onChange={e => {
              const arr = [...(data?.weeklySchedule || [])];
              arr[i] = { ...arr[i], contactHours: e.target.value };
              handleChange('weeklySchedule', arr);
            }} />
          </div>
          <textarea className="w-full h-20 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 text-sm outline-none focus:border-[var(--brand-hover)] resize-y" value={wk.content} placeholder="Content Description" onChange={e => {
            const arr = [...(data?.weeklySchedule || [])];
            arr[i] = { ...arr[i], content: e.target.value };
            handleChange('weeklySchedule', arr);
          }} />
          <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 text-sm outline-none focus:border-[var(--brand-hover)]" value={wk.assessment} placeholder="Assessment" onChange={e => {
            const arr = [...(data?.weeklySchedule || [])];
            arr[i] = { ...arr[i], assessment: e.target.value };
            handleChange('weeklySchedule', arr);
          }} />
        </div>
      ))}
      <button className="text-sm bg-[var(--brand-nav)] text-white hover:bg-[var(--brand-hover)] px-3 py-1.5 rounded font-medium transition-colors" onClick={() => handleChange('weeklySchedule', [...(data?.weeklySchedule || []), { week: '', topic: '', contactHours: '', content: '', assessment: '' }])}>+ Add Week</button>
    </div>
  );
}

function CLOInput({ data, handleChange }: { data: CourseOutlineData, handleChange: (field: keyof CourseOutlineData, value: any) => void }) {
  return (
    <div className="space-y-3 mb-6">
      {data?.clos?.map((clo, i) => (
        <div key={`clo-${i}`} className="flex gap-2">
          <input className="w-20 md:w-24 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 outline-none focus:border-[var(--brand-hover)]" value={clo.id} onChange={e => {
            const newCLOs = [...(data?.clos || [])];
            newCLOs[i] = { ...newCLOs[i], id: e.target.value };
            handleChange('clos', newCLOs);
          }} />
          <input className="flex-1 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 outline-none focus:border-[var(--brand-hover)]" value={clo.description} onChange={e => {
            const newCLOs = [...(data?.clos || [])];
            newCLOs[i] = { ...newCLOs[i], description: e.target.value };
            handleChange('clos', newCLOs);
          }} />
          <input className="w-24 md:w-32 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 outline-none focus:border-[var(--brand-hover)]" value={clo.mapping} onChange={e => {
            const newCLOs = [...(data?.clos || [])];
            newCLOs[i] = { ...newCLOs[i], mapping: e.target.value };
            handleChange('clos', newCLOs);
          }} />
          <button 
            className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
            onClick={() => {
              const newCLOs = (data?.clos || []).filter((_, idx) => idx !== i);
              handleChange('clos', newCLOs);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button className="text-sm bg-[var(--brand-nav)] text-white hover:bg-[var(--brand-hover)] px-3 py-1.5 rounded font-medium transition-colors" onClick={() => handleChange('clos', [...(data?.clos || []), { id: `CLO${(data?.clos?.length || 0) + 1}`, description: '', mapping: '' }])}>+ Add CLO</button>
    </div>
  );
}

function AssessmentsInput({ data, handleChange }: { data: CourseOutlineData, handleChange: (field: keyof CourseOutlineData, value: any) => void }) {
  return (
    <div className="space-y-3">
      {data?.assessments?.map((a, i) => (
        <div key={`ast-${i}`} className="flex gap-2">
          <input className="flex-1 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 outline-none focus:border-[var(--brand-hover)]" value={a.type} placeholder="Assessment Name" onChange={e => {
            const arr = [...(data?.assessments || [])];
            arr[i] = { ...arr[i], type: e.target.value };
            handleChange('assessments', arr);
          }} />
          <input className="w-20 md:w-24 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 outline-none focus:border-[var(--brand-hover)]" value={a.quantity} placeholder="Qty" onChange={e => {
            const arr = [...(data?.assessments || [])];
            arr[i] = { ...arr[i], quantity: e.target.value };
            handleChange('assessments', arr);
          }} />
          <input className="w-20 md:w-24 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-2 outline-none focus:border-[var(--brand-hover)]" value={a.percentage} placeholder="%" onChange={e => {
            const arr = [...(data?.assessments || [])];
            arr[i] = { ...arr[i], percentage: e.target.value };
            handleChange('assessments', arr);
          }} />
          <button 
            className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
            onClick={() => {
              const arr = (data?.assessments || []).filter((_, idx) => idx !== i);
              handleChange('assessments', arr);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button className="text-sm bg-[var(--brand-nav)] text-white hover:bg-[var(--brand-hover)] px-3 py-1.5 rounded font-medium transition-colors" onClick={() => handleChange('assessments', [...(data?.assessments || []), { type: '', quantity: '1', percentage: '10%' }])}>+ Add Assessment</button>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function CourseOutlineForm({ data, onChange }: { data: CourseOutlineData, onChange: (d: CourseOutlineData) => void }) {
  const [activeTab, setActiveTab] = useState<'general' | 'outcomes' | 'assessments' | 'slt' | 'schedule' | 'signatures'>('general');

  const handleChange = (field: keyof CourseOutlineData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const tabs = [
    { id: 'general', label: 'General Info' },
    { id: 'outcomes', label: 'Outcomes (CLO/PLO)' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'slt', label: 'Learning Time (SLT)' },
    { id: 'schedule', label: 'Weekly Schedule' },
    { id: 'signatures', label: 'Signatures' },
  ] as const;

  return (
    <div className="p-4 md:p-8 space-y-6 bg-transparent text-[var(--text-primary)] max-w-5xl mx-auto w-full pb-32">
      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 border-b border-[var(--border-panel)] pb-2 mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-t-lg font-bold text-sm whitespace-nowrap transition-colors",
              activeTab === tab.id 
                ? "bg-[var(--bg-panel)] text-[var(--brand-hover)] border border-[var(--border-panel)] border-b-0 -mb-[9px] pb-3 shadow-sm z-10 relative" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-[var(--bg-panel)]/50 border border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[var(--bg-panel)]/30 border border-[var(--border-panel)] rounded-b-xl rounded-tr-xl p-6 shadow-sm">
        {activeTab === 'general' && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="text-xl font-bold border-b border-[var(--border-panel)] pb-2 mb-6 text-[var(--brand-hover)]">Brand & Info</h2>
            <div className="mb-4">
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Department Name</label>
              <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)] transition-colors" value={data?.departmentName || ''} onChange={e => handleChange('departmentName', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Course Name</label>
                <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)] transition-colors" value={data?.courseName || ''} onChange={e => handleChange('courseName', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Course Code</label>
                <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)] transition-colors" value={data?.courseCode || ''} onChange={e => handleChange('courseCode', e.target.value)} />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Synopsis</label>
              <textarea className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)] h-32 transition-colors" value={data?.synopsis || ''} onChange={e => handleChange('synopsis', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Credit Value</label>
                <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)] transition-colors" value={data?.creditValue || ''} onChange={e => handleChange('creditValue', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Prerequisite</label>
                <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)] transition-colors" value={data?.prerequisite || ''} onChange={e => handleChange('prerequisite', e.target.value)} />
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'outcomes' && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="text-xl font-bold border-b border-[var(--border-panel)] pb-2 mb-6 text-[var(--brand-hover)]">Course Learning Outcomes (CLO) & PLO</h2>
            <CLOInput data={data} handleChange={handleChange} />
            <div className="mt-8 border-t border-[var(--border-panel)] pt-6">
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Programme Learning Outcomes (PLO)</label>
              <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)] transition-colors" value={data?.plo || ''} onChange={e => handleChange('plo', e.target.value)} placeholder="*Refer to attachment" />
            </div>
          </motion.section>
        )}

        {activeTab === 'assessments' && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="text-xl font-bold border-b border-[var(--border-panel)] pb-2 mb-6 text-[var(--brand-hover)]">Assessments</h2>
            <AssessmentsInput data={data} handleChange={handleChange} />
          </motion.section>
        )}

        {activeTab === 'slt' && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="text-xl font-bold border-b border-[var(--border-panel)] pb-2 mb-6 text-[var(--brand-hover)]">7. Learning Time</h2>
            <LearningTimesInput data={data} handleChange={handleChange} />
          </motion.section>
        )}

        {activeTab === 'schedule' && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="text-xl font-bold border-b border-[var(--border-panel)] pb-2 mb-6 text-[var(--brand-hover)]">Weekly Schedule</h2>
            <WeeklyScheduleInput data={data} handleChange={handleChange} />
          </motion.section>
        )}

        {activeTab === 'signatures' && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="text-xl font-bold border-b border-[var(--border-panel)] pb-2 mb-6 text-[var(--brand-hover)]">9. References</h2>
            <textarea className="w-full h-40 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 text-sm leading-relaxed outline-none focus:border-[var(--brand-hover)] transition-colors mb-8" value={data?.references || ''} onChange={e => handleChange('references', e.target.value)} />
            
            <h2 className="text-xl font-bold border-b border-[var(--border-panel)] pb-2 mb-6 text-[var(--brand-hover)]">Signatures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 bg-black/10 p-6 rounded-lg border border-[var(--border-panel)]">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Prepared by (Name)</label>
                  <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)]" value={data?.preparedByName || ''} onChange={e => handleChange('preparedByName', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Date Prepared</label>
                  <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)]" value={data?.datePrepared || ''} onChange={e => handleChange('datePrepared', e.target.value)} />
                </div>
              </div>
              <div className="space-y-4 bg-black/10 p-6 rounded-lg border border-[var(--border-panel)]">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Verified by (Name)</label>
                  <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)]" value={data?.verifiedByName || ''} onChange={e => handleChange('verifiedByName', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Date Verified</label>
                  <input className="w-full bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded p-3 outline-none focus:border-[var(--brand-hover)]" value={data?.dateVerified || ''} onChange={e => handleChange('dateVerified', e.target.value)} />
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
