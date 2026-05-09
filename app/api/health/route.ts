import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ait-agency', timestamp: new Date().toISOString() })
}
