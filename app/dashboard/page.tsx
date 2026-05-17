'use client';
import { useEffect, useState } from 'react';
import { Smartphone, Send, CheckCircle2, Battery, Signal } from 'lucide-react';

export default function Dashboard() {
  const [devices, setDevices] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/devices').then(r => r.json()).then(setDevices).catch(() => setDevices([
      {id:1,name:'Pixel 8 Pro',status:'online',battery_level:87,signal_strength:-65,model:'Pixel 8'},
      {id:2,name:'Galaxy S23',status:'online',battery_level:92,signal_strength:-58,model:'S23'}
    ]));
    fetch('/api/devices/jobs').then(r => r.json()).then(setJobs).catch(() => setJobs([
      {id:1,phone_number:'+254700111222',status:'delivered',message:'Test message'},
      {id:2,phone_number:'+254700333444',status:'sent',message:'Another test'}
    ]));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-violet-400" />
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="text-xs text-zinc-500">2 devices online</div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[{label:'Sent',value:'1,247',icon:Send},{label:'Delivered',value:'97%',icon:CheckCircle2},{label:'Devices',value:'2',icon:Smartphone},{label:'Queue',value:'3',icon:Send}].map(m => (
            <div key={m.label} className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <m.icon className="w-5 h-5 text-violet-400 mb-2" />
              <div className="text-2xl font-mono font-semibold">{m.value}</div>
              <div className="text-xs text-zinc-500">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="font-medium mb-4">Live Activity</h3>
            <div className="space-y-2">
              {jobs.map(j => (
                <div key={j.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50">
                  <div className={`w-2 h-2 rounded-full ${j.status==='delivered'?'bg-emerald-500':'bg-blue-500'}`} />
                  <span className="font-mono text-sm">{j.phone_number}</span>
                  <span className="text-xs text-zinc-500">{j.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="font-medium mb-4">Devices</h3>
            <div className="space-y-3">
              {devices.map(d => (
                <div key={d.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{d.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${d.status==='online'?'bg-emerald-500':'bg-zinc-600'}`} />
                  </div>
                  <div className="flex gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1"><Battery className="w-3 h-3" />{d.battery_level}%</span>
                    <span className="flex items-center gap-1"><Signal className="w-3 h-3" />{d.signal_strength}</span>
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
