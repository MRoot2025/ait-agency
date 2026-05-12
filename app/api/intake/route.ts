import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, role, processToAutomate, monthlyRevenue } = body

  // Validate required fields
  if (!name || !email || !company) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Lazy-init Supabase client inside handler (avoids build-time crash when env not available)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase env vars not configured')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  // Insert lead into Supabase
  const { error: dbError } = await supabase
    .from('agency_leads')
    .insert({
      name,
      email,
      company,
      role: role ?? null,
      process_to_automate: processToAutomate ?? null,
      monthly_revenue: monthlyRevenue ?? null,
    })

  if (dbError) {
    console.error('agency_leads insert error:', dbError)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }

  // Notify Slack (non-fatal)
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blocks: [
            {
              type: 'header',
              text: { type: 'plain_text', text: 'New AiT Agency Lead', emoji: true },
            },
            {
              type: 'section',
              fields: [
                { type: 'mrkdwn', text: `*Name:*\n${name}` },
                { type: 'mrkdwn', text: `*Email:*\n${email}` },
                { type: 'mrkdwn', text: `*Company:*\n${company}` },
                { type: 'mrkdwn', text: `*Role:*\n${role ?? '—'}` },
                { type: 'mrkdwn', text: `*Process to automate:*\n${processToAutomate ?? '—'}` },
                { type: 'mrkdwn', text: `*Monthly revenue:*\n${monthlyRevenue ?? '—'}` },
              ],
            },
          ],
        }),
      })
    } catch (slackErr) {
      console.error('Slack notify error (non-fatal):', slackErr)
    }
  }

  return NextResponse.json({
    success: true,
    message: "Assessment request received. We'll reach out within 24 hours.",
  })
}
