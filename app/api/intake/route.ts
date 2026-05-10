import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, role, processToAutomate, monthlyRevenue } = body

  // Validate required fields
  if (!name || !email || !company) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

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

  // Notify Slack
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (webhookUrl) {
    const slackBody = {
      text: '*New AiT Agency Lead*',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*New AI Agency Lead*',
          },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Name:*\n${name}` },
            { type: 'mrkdwn', text: `*Email:*\n${email}` },
            { type: 'mrkdwn', text: `*Company:*\n${company}` },
            { type: 'mrkdwn', text: `*Role:*\n${role ?? '—'}` },
            { type: 'mrkdwn', text: `*Process to Automate:*\n${processToAutomate ?? '—'}` },
            { type: 'mrkdwn', text: `*Monthly Revenue:*\n${monthlyRevenue ?? '—'}` },
          ],
        },
      ],
    }

    try {
      const slackRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackBody),
      })
      if (!slackRes.ok) {
        console.error('Slack notify failed:', slackRes.status, await slackRes.text())
      }
    } catch (slackErr) {
      // Non-fatal — lead is already saved; log and continue
      console.error('Slack notify error:', slackErr)
    }
  } else {
    // TODO: set SLACK_WEBHOOK_URL env var (GSM: slack__claude__status-webhook or a dedicated #ait-agency-leads webhook)
    console.warn('SLACK_WEBHOOK_URL not set — skipping Slack notification')
  }

  return NextResponse.json({
    success: true,
    message: "Assessment request received. We'll reach out within 24 hours.",
  })
}
