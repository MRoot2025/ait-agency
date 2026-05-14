import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { sendLeadConfirmation } from '@/app/lib/notifications/email'
import { notifyNewLead } from '@/app/lib/notifications/slack'

const IntakeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address').max(320),
  company: z.string().min(1, 'Company is required').max(200),
  role: z.string().max(200).optional(),
  processToAutomate: z.string().max(5000).optional(),
  monthlyRevenue: z.string().max(100).optional(),
})

type ErrorResponse = { error: string; code: string; details?: unknown }

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
  await sendLeadConfirmation({
    name,
    email,
    company,
    role: role ?? undefined,
    processToAutomate: processToAutomate ?? undefined,
    monthlyRevenue: monthlyRevenue ?? undefined,
  })

  // Notify Slack (non-fatal)
  await notifyNewLead({
    name,
    email,
    company,
    role: role ?? undefined,
    processToAutomate: processToAutomate ?? undefined,
    monthlyRevenue: monthlyRevenue ?? undefined,
  })

  return NextResponse.json({
    success: true,
    message: "Assessment request received. We'll reach out within 24 hours.",
  })
}
