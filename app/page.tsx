'use client';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      <nav className="relative border-b border-zinc-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="font-semibold">SIM Gateway Cloud</span>
          </div>
          <a href="/dashboard" className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium">Dashboard</a>
        </div>
      </nav>
      <div className="relative max-w-7xl mx-auto px-6 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-violet-300">PRODUCTION</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Turn Android phones<br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">into SMS gateways</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10">Production-grade platform for bulk SMS via physical SIM cards. Next.js 14 • React 18 • Supabase • Turborepo ready.</p>
          <div className="flex gap-3">
            <a href="/dashboard" className="px-6 py-3 bg-white text-black rounded-xl font-medium flex items-center gap-2">Open Dashboard <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/komputeks/simgatewaycloud" className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl font-medium">GitHub</a>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 mt-24">
          {[{icon: Smartphone, title: 'Device Mesh', desc: 'Unlimited Android phones, dual-SIM, auto-failover'}, {icon: Zap, title: 'Real-time', desc: 'WebSocket, delivery receipts, retry logic'}, {icon: Shield, title: 'Enterprise', desc: 'RBAC, audit logs, API keys, RLS'}].map((f,i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur">
              <f.icon className="w-5 h-5 text-violet-400 mb-3" />
              <div className="font-medium mb-1">{f.title}</div>
              <div className="text-sm text-zinc-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
