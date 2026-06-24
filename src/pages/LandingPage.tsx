import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Sparkles, ArrowRight, Layers, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8000/api/auth/login/', {
          username,
          password
        });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:8000/api/auth/register/', {
          username,
          password
        });
        setIsLogin(true);
        setError('Registration successful. Please log in.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || err.response?.data?.username?.[0] || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Left Side: Marketing / Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 lg:p-20 border-r border-zinc-800/50 bg-zinc-900/20">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg shadow-lg shadow-amber-500/20">
              <BookOpen className="w-6 h-6 text-zinc-950" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">CMS<span className="font-light text-zinc-400">Pro</span></span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">The Modern Curriculum OS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
          >
            Elevate Your Academic Curriculum
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-lg mb-12"
          >
            A unified workspace for educators to design, manage, and instantly generate professional Course Outlines, CQI, and JSU documents.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="bg-zinc-900 w-10 h-10 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-500" />
            </div>
            <span>Hierarchical Department & Programme Management</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="bg-zinc-900 w-10 h-10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-500" />
            </div>
            <span>Dynamic PDF Engine with Real-time Previews</span>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-zinc-950" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">CMS<span className="font-light text-zinc-400">Pro</span></span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }} 
          className="max-w-md w-full relative z-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-zinc-400">Sign in to your workspace.</p>
          </div>
          
          <div className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-700/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full"></div>
            
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3.5 text-zinc-100 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-700"
                  placeholder="admin"
                  required 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3.5 text-zinc-100 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-700"
                  placeholder="••••••••"
                  required 
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-4 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:bg-amber-500 shadow-xl shadow-amber-500/20"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? 'Sign In to Workspace' : 'Create Account'}
                    <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center text-sm text-zinc-500 relative z-10">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); setUsername(''); setPassword(''); }} 
                className="text-white hover:text-amber-400 focus:outline-none font-semibold transition-colors border-b border-transparent hover:border-amber-400 pb-0.5 ml-1"
              >
                {isLogin ? 'Register now' : 'Sign in instead'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
