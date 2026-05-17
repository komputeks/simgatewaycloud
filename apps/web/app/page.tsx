'use client';
import { useEffect, useState } from 'react';
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="min-h-screen bg-[#0a0e14] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">SIM Gateway Cloud</h1>
        <p className="text-zinc-400">Turn Android phones into SMS gateways</p>
        <p className="text-sm text-zinc-600 mt-8">{mounted ? 'Ready' : 'Loading...'}</p>
      </div>
    </div>
  );
}
