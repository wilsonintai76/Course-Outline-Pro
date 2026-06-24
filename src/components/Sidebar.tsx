import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, User, LogOut, Building2, Settings, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar({ user }: { user: any }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const hasPerm = (perm: string) => user?.is_superuser || user?.permissions?.includes(perm);

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen shrink-0 text-zinc-300">
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
        <div className="bg-amber-500 rounded p-1.5 text-black">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">CMS <span className="font-light text-zinc-500">Pro</span></h1>
      </div>
      
      <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
            isActive ? "bg-amber-500/10 text-amber-500" : "hover:bg-zinc-900 hover:text-zinc-100"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        
        {hasPerm('can_manage_departments') && (
          <NavLink 
            to="/departments"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
              isActive ? "bg-amber-500/10 text-amber-500" : "hover:bg-zinc-900 hover:text-zinc-100"
            )}
          >
            <Building2 className="w-5 h-5" />
            Departments
          </NavLink>
        )}

        <NavLink 
          to="/programmes"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
            isActive ? "bg-amber-500/10 text-amber-500" : "hover:bg-zinc-900 hover:text-zinc-100"
          )}
        >
          <GraduationCap className="w-5 h-5" />
          Programmes & Courses
        </NavLink>

        <div className="my-2 border-t border-zinc-800/50" />

        <NavLink 
          to="/profile"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
            isActive ? "bg-amber-500/10 text-amber-500" : "hover:bg-zinc-900 hover:text-zinc-100"
          )}
        >
          <User className="w-5 h-5" />
          Profile
        </NavLink>

        {user?.is_superuser && (
          <>
            <NavLink 
              to="/settings"
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                isActive ? "bg-amber-500/10 text-amber-500" : "hover:bg-zinc-900 hover:text-zinc-100"
              )}
            >
              <Settings className="w-5 h-5" />
              System Settings
            </NavLink>

            <NavLink 
              to="/users"
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                isActive ? "bg-amber-500/10 text-amber-500" : "hover:bg-zinc-900 hover:text-zinc-100"
              )}
            >
              <Users className="w-5 h-5" />
              User Management
            </NavLink>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="mb-4 px-4 flex flex-col">
          <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Logged in as</span>
          <span className="text-sm font-medium text-zinc-300">{user?.username}</span>
          <span className="text-xs text-amber-500">{user?.is_superuser ? 'Administrator' : 'User'}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
