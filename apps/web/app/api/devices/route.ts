import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET() {
  const { data, error } = await supabase.from('simgatewaycloud_devices').select('*, simgatewaycloud_sim_cards(*)').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pairing_code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const { data, error } = await supabase.from('simgatewaycloud_devices').insert({ ...body, pairing_code, status: 'pending', last_heartbeat: new Date().toISOString() }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase.from('simgatewaycloud_devices').update({ ...body, last_heartbeat: new Date().toISOString() }).eq('id', body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}