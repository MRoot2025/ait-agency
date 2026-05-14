export interface Lead {
  name: string
  email: string
  company: string
  role?: string
  processToAutomate?: string
  monthlyRevenue?: string
}

export async function notifyNewLead(lead: Lead): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not configured, skipping Slack notification')
    return
  }

  try {
    const response = await fetch(webhookUrl, {
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
              { type: 'mrkdwn', text: `*Name:*\n${lead.name}` },
              { type: 'mrkdwn', text: `*Email:*\n${lead.email}` },
              { type: 'mrkdwn', text: `*Company:*\n${lead.company}` },
              { type: 'mrkdwn', text: `*Role:*\n${lead.role ?? '—'}` },
              { type: 'mrkdwn', text: `*Process to automate:*\n${lead.processToAutomate ?? '—'}` },
              { type: 'mrkdwn', text: `*Annual revenue:*\n${lead.monthlyRevenue ?? '—'}` },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Slack API returned ${response.status}`)
    }
    console.log(`Slack notification sent for lead: ${lead.name}`)
  } catch (error) {
    console.error('Failed to send Slack notification:', error)
    // Non-fatal: don't throw, just log
  }
}
