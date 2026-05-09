import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, role, processToAutomate, monthlyRevenue } = body

  // Validate required fields
  if (!name || !email || !company) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // TODO: Send to Slack + store in Supabase
  // For now: log and return success
  console.log('New AI Agency intake:', { name, email, company, role, processToAutomate, monthlyRevenue })

  return NextResponse.json({ success: true, message: 'Assessment request received. We\'ll reach out within 24 hours.' })
}
