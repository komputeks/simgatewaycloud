'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Send, BarChart3, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e14] relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <nav className="relative z-10 border-b border-zinc-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold tracking-tight">SIM Gateway Cloud</div>
              <div className="text-[10px] text-zinc-500 -mt-1 font-mono">v2.1.0 • PRODUCTION</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <a href="/dashboard" className="px-5 h-10 rounded-xl bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors flex items-center">Dashboard</a>
            ) : (
              <>
                <a href="/login" className="px-4 h-9 rounded-lg hover:bg-zinc-900 text-sm font-medium transition-colors">Sign in</a>
                <a href="/signup" className="px-5 h-9 rounded-lg bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors flex items-center">Start free</a>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-medium text-violet-300 tracking-wide">ENTERPRISE SMS INFRASTRUCTURE</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[64px] leading-[1.05] font-semibold tracking-[-0.02em] mb-6">
            Turn Android phones
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">into SMS gateways</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[18px] leading-relaxed text-zinc-400 mb-10 max-w-xl">
            Production-grade platform for bulk SMS via physical SIM cards. Connect Android devices, manage campaigns, track delivery in real-time. No telecom contracts. Full control.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3">
            <a href="/signup" className="h-12 px-6 rounded-xl bg-white text-black font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors">
              Start building <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/download" className="h-12 px-6 rounded-xl glass hover:bg-zinc-800/60 transition-colors font-medium flex items-center gap-2">
              Download APK
            </a>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 mt-20 pt-10 border-t border-zinc-800/50">
            {[{ label: 'Uptime SLA', value: '99.95%' },{ label: 'Avg delivery', value: '<3s' },{ label: 'Devices', value: 'Unlimited' }].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-semibold font-mono">{stat.value}</div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-4">
          {[
            { icon: Smartphone, title: 'Device mesh', desc: 'Connect unlimited Android phones. Dual-SIM support. Automatic failover.' },
            { icon: Zap, title: 'Real-time queue', desc: 'WebSocket streaming. Delivery receipts. Retry logic. Dead letter queue.' },
            { icon: Shield, title: 'Enterprise security', desc: 'RBAC, audit logs, API keys, RLS, encrypted traffic, abuse detection.' }
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6">
              <f.icon className="w-5 h-5 text-violet-400 mb-3" />
              <div className="font-medium mb-1">{f.title}</div>
              <div className="text-sm text-zinc-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-24 glass rounded-3xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Built for scale</h2>
              <p className="text-zinc-400 mb-6">Production architecture used by fintechs and logistics companies across Africa.</p>
              <div className="space-y-3">
                {['Queue with retries & DLQ','Real-time delivery webhooks','Lipia payments integration','SOC 2 ready audit logs'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6 font-mono text-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-zinc-600">live-logs</span>
              </div>
              <div className="space-y-1.5 text-zinc-500">
                <div><span className="text-zinc-600">10:28:15</span> <span className="text-emerald-400">DELIVERED</span> +254700111222 via Pixel-8</div>
                <div><span className="text-zinc-600">10:28:18</span> <span className="text-emerald-400">DELIVERED</span> +254700333444 via Pixel-8</div>
                <div><span className="text-zinc-600">10:29:01</span> <span className="text-blue-400">SENT</span> +254700555666 via S23</div>
                <div><span className="text-zinc-600">10:29:03</span> <span className="text-amber-400">QUEUED</span> +254700777888 pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}