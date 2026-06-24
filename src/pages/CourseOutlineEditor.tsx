import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Save, Undo2, Redo2, Palette, Loader2, ArrowLeft, FileText, LayoutTemplate } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useUndoableState } from '../hooks/useUndoableState';
import { Theme, CourseOutlineData } from '../types';
import { defaultOutline } from '../lib/constants';
import { CourseOutlinePreview } from '../components/CourseOutlinePreview';
import { CourseOutlineForm } from '../components/CourseOutlineForm';
import { api } from '../api';

export default function CourseOutlineEditor() {
  const { id } = useParams<{ id: string }>();
  const [isInitializing, setIsInitializing] = useState(true);
  const [theme, setTheme] = useState<Theme>('crimson');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form');

  const { value, updateValue, undo, redo, canUndo, canRedo, reset } = useUndoableState<CourseOutlineData>(defaultOutline);
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [logoUrl, setLogoUrl] = useState<string>('');
  const [institutionName, setInstitutionName] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      setIsInitializing(true);
      // Fetch global settings
      api.getSettings().then(settings => {
        if (settings) {
          if (settings.logo_url) setLogoUrl(settings.logo_url);
          if (settings.institution_name) setInstitutionName(settings.institution_name);
        }
      });
      if (id) {
        const data = await api.getDocument(parseInt(id), 'outline');
        if (data && data.content) {
          let parsedData = defaultOutline;
          try {
             parsedData = typeof data.content === 'string' && data.content.startsWith('{') 
               ? JSON.parse(data.content) 
               : data.content; 
             
             if (!parsedData || typeof parsedData !== 'object') parsedData = defaultOutline; 
          } catch(e) { }
          
          let finalData = typeof parsedData === 'object' && parsedData !== null && !Array.isArray(parsedData) 
            ? { ...defaultOutline, ...parsedData } 
            : defaultOutline;
          reset(finalData);
          setLastSaved(data.lastUpdated);
        } else {
          reset(defaultOutline);
        }
      }
      setIsInitializing(false);
    };
    
    loadData();
  }, [id, reset]);

  // Handle Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'crimson');
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const manualSave = async () => {
    if (!value || !id) return;
    setIsSaving(true);
    try {
      const response = await api.saveDocument(parseInt(id), 'outline', JSON.stringify(value));
      if (response.success) {
        setLastSaved(response.lastUpdated);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save logic
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

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course-outline-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-workspace)] text-[var(--text-primary)]">
        <Loader2 className="animate-spin w-8 h-8 text-[var(--brand-nav)]" />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[var(--bg-workspace)] text-[var(--text-primary)] font-sans min-h-screen h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 h-14 bg-[var(--brand-nav)] border-b border-[var(--brand-nav-border)] flex items-center justify-between px-6 shrink-0 transition-colors">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${id}`} className="text-white/80 hover:text-white transition-colors p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-px h-5 bg-[var(--brand-nav-border)]"></div>
          <h1 className="text-lg font-bold text-white tracking-tight uppercase hidden md:block">Outline Editor</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={!canUndo} className="p-1.5 hover:bg-[var(--brand-hover)] rounded text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent" title="Undo">
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={redo} disabled={!canRedo} className="p-1.5 hover:bg-[var(--brand-hover)] rounded text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent" title="Redo">
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-[var(--brand-nav-border)] mx-1"></div>
          <button onClick={manualSave} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--brand-nav-border)] text-white hover:bg-[var(--brand-hover)] rounded text-sm transition-colors">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[var(--brand-nav)] rounded font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg ml-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>
        </div>
      </nav>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Settings (Theme only now) */}
        <aside className="h-full w-64 bg-[var(--bg-panel)] border-r border-[var(--border-panel)] flex flex-col shrink-0 hidden md:flex transition-colors">
          <div className="p-4 border-b border-[var(--border-panel)] transition-colors flex justify-between items-center">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Settings</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase mb-2 block">Theme Accessibility</label>
              <select 
                value={theme}
                onChange={(e) => changeTheme(e.target.value as Theme)}
                className="w-full bg-zinc-800 border border-zinc-700 text-xs py-1.5 px-2 rounded focus:ring-1 focus:ring-[var(--brand-hover)] outline-none text-zinc-300"
              >
                <option value="crimson">Deep Crimson (Default)</option>
                <option value="contrast">High Contrast</option>
                <option value="slate">Minimal Slate</option>
                <option value="amber">Warm Amber</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Code Editor Section */}
        <main className="flex-1 flex flex-col bg-[var(--bg-editor)] transition-colors overflow-hidden relative">
          <div className="flex bg-[var(--bg-panel)] px-4 py-2 border-b border-[var(--border-panel)] items-center gap-4 transition-colors shrink-0 absolute top-0 left-0 right-0 z-40 shadow-sm">
            <div className="flex bg-black/20 rounded-md p-1 border border-white/5">
              <button 
                onClick={() => setViewMode('form')}
                className={cn("px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5", viewMode === 'form' ? "bg-[var(--brand-nav)] text-white shadow" : "text-zinc-400 hover:text-white")}
              >
                <LayoutTemplate className="w-3.5 h-3.5" />
                Editor
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={cn("px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5", viewMode === 'preview' ? "bg-[var(--brand-nav)] text-white shadow" : "text-zinc-400 hover:text-white")}
              >
                <FileText className="w-3.5 h-3.5" />
                Preview PDF
              </button>
            </div>
            <div className="flex-1"></div>
            {viewMode === 'preview' && (
              <button 
                onClick={async () => {
                  const res = await api.generatePdf();
                  if (res.error) console.error("PDF Gen Error:", res.error);
                }}
                className="px-3 py-1 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                Save as PDF
              </button>
            )}
            <AnimatePresence mode="popLayout">
              <motion.div 
                key={isSaving ? 'saving' : 'saved'}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3 h-3 text-[var(--brand-hover)] animate-spin" />
                    <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">Saving</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                    <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">Connected</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="w-full relative flex-1 overflow-y-auto mt-[49px]">
            {viewMode === 'form' ? (
              <CourseOutlineForm data={value} onChange={updateValue} />
            ) : (
              <div className="bg-white text-black min-h-[800px] shadow-2xl p-8 print:p-0 print:shadow-none mx-auto w-full max-w-[800px]">
                <CourseOutlinePreview data={value} globalLogo={logoUrl} institutionName={institutionName} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
