import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50');
  const { data, error } = await supabase.from('simgatewaycloud_sms_jobs').select('*, simgatewaycloud_devices(name)').order('created_at', { ascending: false }).limit(limit);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { device_id } = await req.json();
  const { data: job } = await supabase.from('simgatewaycloud_sms_jobs').select('*').eq('status', 'queued').eq('device_id', device_id).order('priority', { ascending: false }).limit(1).single();
  if (job) await supabase.from('simgatewaycloud_sms_jobs').update({ status: 'sending', sent_at: new Date().toISOString() }).eq('id', job.id);
  return NextResponse.json({ job: job || null });
}

export async function PUT(req: NextRequest) {
  const { id, status, error_message } = await req.json();
  const updates: any = { status };
  if (status === 'sent') updates.sent_at = new Date().toISOString();
  if (status === 'delivered') updates.delivered_at = new Date().toISOString();
  if (status === 'failed') { updates.failed_at = new Date().toISOString(); updates.error_message = error_message; }
  const { data, error } = await supabase.from('simgatewaycloud_sms_jobs').update(updates).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}