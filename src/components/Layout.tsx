import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { api } from '../api';

export function Layout() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.getProfile().then(data => {
      if (data) setUser(data);
    });
  }, []);

  if (!user) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">Loading...</div>;

  return (
    <div className="flex w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto bg-zinc-900">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}
