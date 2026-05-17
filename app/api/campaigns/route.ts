import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    {id:1,name:'Black Friday',status:'completed',total_contacts:1250,sent_count:1247,delivered_count:1213},
    {id:2,name:'Payment Reminders',status:'sending',total_contacts:342,sent_count:187,delivered_count:179}
  ]);
}
