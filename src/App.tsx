import { useState, useEffect, useRef } from 'react';
import { Download, Save, Undo2, Redo2, Palette, Loader2, Moon, Sun, CheckCircle2, FileText, LayoutTemplate } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { auth, db, signInAnonymously, onAuthStateChanged, signOut, doc, getDoc, setDoc, onSnapshot } from './lib/firebase';
import { useUndoableState } from './hooks/useUndoableState';
import { Theme, CourseOutlineData } from './types';
import { defaultOutline } from './lib/constants';
import { CourseOutlinePreview } from './components/CourseOutlinePreview';
import { CourseOutlineForm } from './components/CourseOutlineForm';

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [theme, setTheme] = useState<Theme>('crimson');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form');

  const { value, updateValue, undo, redo, canUndo, canRedo, reset } = useUndoableState<CourseOutlineData>(defaultOutline);
  
  // The timer for debounced auto-save
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Authenticate user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Auth error:", error);
          setUserId('local-only');
        });
      }
    });
    return unsubscribe;
  }, []);

  // Sync with Firestore
  useEffect(() => {
    if (!userId) return;

    if (userId === 'local-only') {
      const saved = localStorage.getItem('course-outline');
      if (saved) {
        try {
          let parsed = JSON.parse(saved);
          if (typeof parsed === 'string') {
             try { parsed = JSON.parse(parsed); } catch(e){}
          }
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.courseName) {
            reset({ ...defaultOutline, ...parsed });
          } else {
            reset(defaultOutline);
          }
        } catch(e) {
          reset(defaultOutline);
        }
      } else {
        reset(defaultOutline);
      }
      setIsInitializing(false);
      return;
    }
    
    const docRef = doc(db, 'notes', userId);
    
    // Initial fetch
    getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        let parsedData = defaultOutline;
        try {
           parsedData = typeof data.content === 'string' && data.content.startsWith('{') 
             ? JSON.parse(data.content) 
             : data.content; // if already object
           
           if (!parsedData || typeof parsedData !== 'object' || !parsedData.courseName) parsedData = defaultOutline; // fallback
        } catch(e) { }
        
        let finalData = typeof parsedData === 'object' && parsedData !== null && !Array.isArray(parsedData) 
          ? { ...defaultOutline, ...parsedData } 
          : defaultOutline;
        reset(finalData);
        setLastSaved(data.lastUpdated);
      } else {
        // Create initial document
        setDoc(docRef, { content: defaultOutline, lastUpdated: Date.now() }).catch(console.error);
        reset(defaultOutline); // Also set the default outline initially
      }
      setIsInitializing(false);
    }).catch((err) => {
      console.error('Fetch error:', err);
      reset(defaultOutline);
      setIsInitializing(false);
      setUserId('local-only');
    });
    
  }, [userId, reset]);

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

  // Auto-save logic
  useEffect(() => {
    if (isInitializing || !userId) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      
      if (userId === 'local-only') {
        localStorage.setItem('course-outline', JSON.stringify(value));
        setLastSaved(Date.now());
        setIsSaving(false);
        return;
      }

      try {
        const docRef = doc(db, 'notes', userId);
        await setDoc(docRef, {
          content: value,
          lastUpdated: Date.now()
        }, { merge: true });
        
        setLastSaved(Date.now());
      } catch (err) {
        console.error("Save error:", err);
      } finally {
        setIsSaving(false);
      }
    }, 1000); // Save to cloud 1s after last stroke
    
    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [value, isInitializing, userId]);

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
    <div className="w-full flex-1 flex flex-col bg-[var(--bg-workspace)] text-[var(--text-primary)] font-sans min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 h-14 bg-[var(--brand-nav)] border-b border-[var(--brand-nav-border)] flex items-center justify-between px-6 shrink-0 transition-colors">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded p-1">
            <svg className="w-6 h-6 text-[var(--brand-nav)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight uppercase">Course Outline Generator <span className="font-light opacity-60">Pro</span></h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex border-r border-[var(--brand-nav-border)] pr-3 mr-3 transition-colors">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="p-2 hover:bg-[var(--brand-hover)] rounded text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              title="Undo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5"></path></svg>
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="p-2 hover:bg-[var(--brand-hover)] rounded text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              title="Redo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10h-10a8 8 0 00-8 8v2m18-10l-5 5m5-5l-5-5"></path></svg>
            </button>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-1.5 bg-white text-[var(--brand-nav)] rounded font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            EXPORT
          </button>
        </div>
      </nav>

      {/* Main Workspace Area */}
      <div className="flex-1 flex">
        {/* Sidebar Explorer */}
        <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 bg-[var(--bg-panel)] border-r border-[var(--border-panel)] flex flex-col shrink-0 hidden md:flex transition-colors">
          <div className="p-4 border-b border-[var(--border-panel)] transition-colors">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Workspace</div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--brand-nav-border)] border-l-2 border-[var(--brand-hover)] text-white rounded-r transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9l-7-7z"></path></svg>
              <span className="text-sm font-medium">Outline.json</span>
            </div>
          </div>
          <div className="p-4 border-t border-[var(--border-panel)] bg-black/10 space-y-4 transition-colors">
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
        <main className="flex-1 flex flex-col bg-[var(--bg-editor)] transition-colors">
          <div className="sticky top-14 z-40 flex bg-[var(--bg-panel)] px-4 py-2 border-b border-[var(--border-panel)] items-center gap-4 transition-colors shrink-0">
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
                onClick={() => window.print()}
                className="px-3 py-1 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                Print to PDF
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
          
          <div className="w-full relative">
            {viewMode === 'form' ? (
              <CourseOutlineForm data={value} onChange={updateValue} />
            ) : (
              <div className="p-4 md:p-8">
                <CourseOutlinePreview data={value} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-7 bg-[#050505] border-t border-[var(--border-panel)] flex items-center justify-between px-4 shrink-0 text-[11px] font-medium hidden sm:flex">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-[var(--brand-hover)]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
            <span className="text-zinc-500">Main Branch</span>
          </div>
          <div className="h-3 w-px bg-zinc-800"></div>
          <div className="text-emerald-500 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Auto-Sync Active
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-zinc-500">Topics: {value?.weeklySchedule?.length || 0}</div>
          <div className="text-zinc-500">UTF-8</div>
          <div className="bg-[var(--brand-nav)] px-3 h-full flex items-center text-white transition-colors">
            Last saved: {lastSaved ? new Date(lastSaved).toLocaleTimeString() : '...'}
          </div>
        </div>
      </footer>
    </div>
  );
}
