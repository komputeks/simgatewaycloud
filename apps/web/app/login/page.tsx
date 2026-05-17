'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('demo@simgateway.cloud');
  const [password, setPassword] = useState('demo123456');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 mx-auto mb-4 flex items-center justify-center">
            <span className="text-xl">📱</span>
          </div>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-zinc-500 text-sm mt-1">Sign in to SIM Gateway Cloud</p>
        </div>
        <form onSubmit={handleLogin} className="glass rounded-2xl p-6 space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 outline-none" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 outline-none" required />
          <button disabled={loading} className="w-full h-11 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 disabled:opacity-50">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
}