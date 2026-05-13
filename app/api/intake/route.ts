import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { z } from 'zod'

const IntakeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address').max(320),
  company: z.string().min(1, 'Company is required').max(200),
  role: z.string().max(200).optional(),
  processToAutomate: z.string().max(5000).optional(),
  monthlyRevenue: z.string().max(100).optional(),
})

type ErrorResponse = { error: string; code: string; details?: unknown }

function buildConfirmationEmail(name: string, company: string, processToAutomate?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>We received your assessment request</title>
</head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:Helvetica,Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0B0B0B;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                AiT<span style="color:#05D2AB;">Agency</span>
              </span>
              <span style="font-size:12px;color:#555555;margin-left:8px;">an Intelligent Group practice</span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#141414;border:1px solid #1e1e1e;border-radius:12px;padding:40px;">

              <p style="font-size:13px;color:#05D2AB;font-weight:700;letter-spacing:1.5px;margin:0 0 20px;">ASSESSMENT REQUEST RECEIVED</p>

              <h1 style="font-size:26px;font-weight:800;margin:0 0 16px;line-height:1.2;">
                Thanks, ${name}. We&apos;ll be in touch within 24 hours.
              </h1>

              <p style="font-size:15px;color:#888888;line-height:1.7;margin:0 0 28px;">
                We received your AI Readiness Assessment request for <strong style="color:#ffffff;">${company}</strong>.
                A member of our team will review your use case and reach out within one business day.
              </p>

              ${processToAutomate ? `
              <div style="background:#181818;border-left:3px solid #05D2AB;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
                <p style="font-size:12px;color:#05D2AB;font-weight:700;letter-spacing:1px;margin:0 0 8px;">PROCESS YOU WANT TO AUTOMATE</p>
                <p style="font-size:14px;color:#cccccc;line-height:1.6;margin:0;">${processToAutomate}</p>
              </div>
              ` : ''}

              <p style="font-size:14px;color:#888888;line-height:1.7;margin:0 0 28px;">
                While you wait, you can learn more about what AI workers we&apos;ve already built for businesses like yours.
              </p>

              <a href="https://intelligentit.io/book/"
                style="display:inline-block;background:#05D2AB;color:#0B0B0B;font-weight:700;font-size:15px;
                       padding:14px 28px;border-radius:8px;text-decoration:none;">
                Book a call now →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;">
              <p style="font-size:12px;color:#555555;line-height:1.6;margin:0;">
                AiT Agency &bull; an <a href="https://intelligentit.io" style="color:#05D2AB;text-decoration:none;">Intelligent Group</a> practice<br />
                You received this because you submitted an assessment request at aitagency.ai.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Parse and validate input
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json<ErrorResponse>(
      { error: 'Invalid JSON body', code: 'INVALID_JSON' },
      { status: 400 }
    )
  }

  const parsed = IntakeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json<ErrorResponse>(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { name, email, company, role, processToAutomate, monthlyRevenue } = parsed.data

  // Lazy-init Supabase client inside handler (avoids build-time crash when env not available)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase env vars not configured')
    return NextResponse.json<ErrorResponse>(
      { error: 'Server configuration error', code: 'CONFIG_ERROR' },
      { status: 500 }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

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
    return NextResponse.json<ErrorResponse>(
      { error: 'Failed to save lead', code: 'DB_ERROR' },
      { status: 500 }
    )
  }

  // Send prospect confirmation email (non-fatal)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'AiT Agency <hello@intelligentit.io>',
        to: email,
        replyTo: 'mruiz@intelligentit.io',
        subject: `We received your AI assessment request, ${name}`,
        html: buildConfirmationEmail(name, company, processToAutomate),
      })
    } catch (emailErr) {
      console.error('Confirmation email error (non-fatal):', emailErr)
    }
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
                { type: 'mrkdwn', text: `*Annual revenue:*\n${monthlyRevenue ?? '—'}` },
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
