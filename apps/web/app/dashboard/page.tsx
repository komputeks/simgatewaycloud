'use client';

import { useEffect, useState } from 'react';
import { Smartphone, Send, CheckCircle2, Clock, Battery, Signal, Activity } from 'lucide-react';
import { createClient } from './lib/supabase';

export default function Dashboard() {
  const [devices, setDevices] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchData();
    const channel = supabase.channel('dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'simgatewaycloud_sms_jobs' }, fetchJobs)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'simgatewaycloud_devices' }, fetchDevices)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchDevices(), fetchCampaigns(), fetchJobs()]);
  };

  const fetchDevices = async () => {
    const res = await fetch('/api/devices');
    setDevices(await res.json());
  };

  const fetchCampaigns = async () => {
    const res = await fetch('/api/campaigns');
    setCampaigns(await res.json());
  };

  const fetchJobs = async () => {
    const res = await fetch('/api/sms-jobs?limit=20');
    setJobs(await res.json());
  };

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const totalSent = jobs.filter(j => ['sent','delivered'].includes(j.status)).length;
  const delivered = jobs.filter(j => j.status === 'delivered').length;
  const deliveryRate = jobs.length ? Math.round((delivered / jobs.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0e14]">
      <div className="border-b border-zinc-800/50 backdrop-blur-xl sticky top-0 z-40 bg-[#0a0e14]/80">
        <div className="max-w-[1440px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">SIM Gateway Cloud</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-zinc-500">{onlineDevices} online</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Sent', value: totalSent.toLocaleString(), icon: Send },
            { label: 'Delivery Rate', value: `${deliveryRate}%`, icon: CheckCircle2 },
            { label: 'Active Devices', value: onlineDevices, icon: Smartphone },
            { label: 'Queue', value: jobs.filter(j => j.status === 'queued').length, icon: Clock },
          ].map(m => (
            <div key={m.label} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 grid place-items-center">
                  <m.icon className="w-4.5 h-4.5 text-violet-400" />
                </div>
              </div>
              <div className="text-[26px] font-semibold font-mono">{m.value}</div>
              <div className="text-[12px] text-zinc-500">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold">Live Activity</h3>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500"><div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />REALTIME</div>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-auto">
              {jobs.map(job => (
                <div key={job.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-900/50">
                  <div className={`w-7 h-7 rounded-lg grid place-items-center ${job.status === 'delivered' ? 'bg-emerald-500/10' : job.status === 'sent' ? 'bg-blue-500/10' : 'bg-zinc-800'}`}>
                    {job.status === 'delivered' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : job.status === 'sent' ? <Send className="w-3.5 h-3.5 text-blue-400" /> : <Clock className="w-3.5 h-3.5 text-zinc-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-mono">{job.phone_number}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${job.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-400'}`}>{job.status}</span>
                    </div>
                    <div className="text-[11px] text-zinc-600 truncate">{job.message?.substring(0, 50)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="text-[14px] font-semibold mb-4">Devices</h3>
            <div className="space-y-3">
              {devices.map(d => (
                <div key={d.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${d.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                      <span className="text-[12px] font-medium">{d.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-600">
                    <span className="flex items-center gap-1"><Battery className="w-3 h-3" />{d.battery_level}%</span>
                    <span className="flex items-center gap-1"><Signal className="w-3 h-3" />{d.signal_strength}dBm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}