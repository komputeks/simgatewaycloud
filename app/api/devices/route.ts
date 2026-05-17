import { NextResponse } from 'next/server';
export async function GET() {
  const devices = [
    {id:1,name:'Pixel 8 Pro - Nairobi',device_id:'dev_001',status:'online',model:'Pixel 8 Pro',android_version:'14',battery_level:87,signal_strength:-65,last_heartbeat:new Date().toISOString(),simgatewaycloud_sim_cards:[{carrier:'Safaricom',phone_number:'+254712345678'},{carrier:'Airtel',phone_number:'+254733456789'}]},
    {id:2,name:'Galaxy S23 - Mombasa',device_id:'dev_002',status:'online',model:'Galaxy S23',android_version:'14',battery_level:92,signal_strength:-58,last_heartbeat:new Date().toISOString(),simgatewaycloud_sim_cards:[{carrier:'Safaricom',phone_number:'+254722111222'}]}
  ];
  return NextResponse.json(devices);
}
