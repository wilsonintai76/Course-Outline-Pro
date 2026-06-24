import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Save, Undo2, Redo2, Loader2, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { api } from '../api';
import { useUndoableState } from '../hooks/useUndoableState';

// Temporary simplistic UI for CQI and JSU until requirements are refined
export default function DocumentEditor({ type }: { type: 'outline' | 'cqi' | 'jsu' }) {
  const { id } = useParams<{ id: string }>();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  const { value, updateValue, undo, redo, canUndo, canRedo, reset } = useUndoableState<any>({});
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsInitializing(true);
      if (id) {
        const data = await api.getDocument(parseInt(id), type);
        if (data && data.content) {
          let parsedData = data.content;
          try {
            if (typeof data.content === 'string') parsedData = JSON.parse(data.content);
          } catch(e) {}
          reset(parsedData || {});
          setLastSaved(data.lastUpdated);
        } else {
          reset({});
        }
      }
      setIsInitializing(false);
    };
    loadData();
  }, [id, type, reset]);

  const manualSave = async () => {
    if (!id || !value) return;
    setIsSaving(true);
    try {
      const response = await api.saveDocument(parseInt(id), type, JSON.stringify(value));
      if (response.success) {
        setLastSaved(response.lastUpdated);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isInitializing || !id) return;
    if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    autoSaveTimeoutRef.current = setTimeout(async () => {
      await manualSave();
    }, 1500);
    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [value, isInitializing, id]);

  const title = type === 'outline' ? 'Course Outline Editor' : type === 'cqi' ? 'CQI Editor' : 'JSU Editor';

  if (isInitializing) {
    return (
      <div className="h-full w-full flex items-center justify-center text-zinc-400">
        <Loader2 className="animate-spin w-8 h-8 text-amber-500" />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-zinc-950 font-sans min-h-screen overflow-hidden">
      <nav className="sticky top-0 z-50 h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 transition-colors">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${id}`} className="text-zinc-400 hover:text-amber-500 transition-colors p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-px h-5 bg-zinc-800"></div>
          <h1 className="text-lg font-bold text-zinc-100 tracking-tight uppercase hidden md:block">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={!canUndo} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300 transition-colors disabled:opacity-40"><Undo2 className="w-4 h-4" /></button>
          <button onClick={redo} disabled={!canRedo} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300 transition-colors disabled:opacity-40"><Redo2 className="w-4 h-4" /></button>
          <div className="w-px h-5 bg-zinc-800 mx-1"></div>
          <button onClick={manualSave} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded text-sm transition-colors">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative">
        <div className="flex bg-zinc-900/80 px-4 py-2 border-b border-zinc-800 items-center justify-between z-40">
           <AnimatePresence mode="popLayout">
            <motion.div key={isSaving ? 'saving' : 'saved'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              {isSaving ? (
                <><Loader2 className="w-3 h-3 text-amber-500 animate-spin" /><span className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">Saving</span></>
              ) : (
                <><span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span><span className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">Connected</span></>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="p-8 max-w-4xl mx-auto w-full flex-1">
          {/* Temporary RAW JSON Editor for CQI and JSU, until forms are defined */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col h-[600px]">
             <div className="bg-zinc-800/50 p-3 border-b border-zinc-800 font-mono text-xs text-zinc-400 flex items-center gap-2">
               <FileText className="w-4 h-4" /> JSON DATA
             </div>
             <textarea 
               value={JSON.stringify(value, null, 2)}
               onChange={(e) => {
                 try {
                   updateValue(JSON.parse(e.target.value));
                 } catch(err) {
                   // Ignore invalid JSON while typing
                 }
               }}
               className="flex-1 bg-transparent p-4 font-mono text-sm text-amber-500/80 outline-none resize-none"
               spellCheck={false}
             />
          </div>
        </div>
      </main>
    </div>
  );
}
