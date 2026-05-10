'use client'

import { useState } from 'react'

const T = {
  teal: '#05D2AB',
  bg: '#0B0B0B',
  ink: '#101010',
  card: '#141414',
  border: '#1e1e1e',
  text: '#fff',
  muted: '#888',
  dim: '#555',
}

const s = {
  section: { maxWidth: 1200, margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  badge: {
    display: 'inline-block',
    background: '#05D2AB18',
    border: `1px solid #05D2AB40`,
    borderRadius: 20,
    padding: '5px 16px',
    color: T.teal,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.5,
    marginBottom: 20,
  } as React.CSSProperties,
  card: {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: 16,
    padding: '28px 24px',
  } as React.CSSProperties,
}

const workers = [
  {
    icon: '🏥',
    title: 'Clinical Documentation AI',
    vertical: 'Healthcare / Behavioral Health',
    desc: 'Therapists narrate or type session notes — the AI drafts DAP, SOAP, or BIRP format notes in seconds. Clinician reviews and approves. HIPAA-compliant audit trail.',
    metrics: ['82% reduction in documentation time', '1,200+ sessions processed', 'BAA-ready, HIPAA audit log'],
    tag: 'HIPAA COMPLIANT',
    tagColor: '#10B981',
  },
  {
    icon: '📞',
    title: 'Sales Outreach AI',
    vertical: 'B2B Services / MSPs / Agencies',
    desc: 'Researches prospects, drafts personalized email sequences, logs touches to your CRM, and flags warm replies for human follow-up. Your SDR that never sleeps.',
    metrics: ['3× more outreach volume', 'Integrates with HubSpot / Pipedrive', 'Warm-reply escalation to human'],
    tag: 'MOST POPULAR',
    tagColor: T.teal,
  },
  {
    icon: '📄',
    title: 'Document Processing AI',
    vertical: 'Finance / Legal / Operations',
    desc: 'Ingests invoices, contracts, and forms — extracts key fields, routes to approvers, flags exceptions. Replaces manual data entry across AP, compliance, and admin.',
    metrics: ['200+ docs/month automated', 'ERP and QuickBooks integration', 'Exception escalation workflow'],
    tag: 'FAST ROI',
    tagColor: '#F59E0B',
  },
  {
    icon: '⚙️',
    title: 'Custom AI Worker',
    vertical: 'Any Industry',
    desc: "If your team is doing it manually on a schedule, an AI can probably do it better. We blueprint any repetitive knowledge-work process into an AI worker in 30–90 days.",
    metrics: ['Free discovery call', 'Blueprint in 2 weeks', 'Fully managed post-launch'],
    tag: 'CUSTOM BUILD',
    tagColor: '#8B5CF6',
  },
]

const steps = [
  {
    num: '01',
    title: 'Free AI Readiness Assessment',
    desc: "30-minute call. We review your top 3 repetitive processes, identify automation potential, and tell you honestly whether AI can help — and by how much.",
    time: 'Free · 30 min',
  },
  {
    num: '02',
    title: 'Blueprint',
    desc: 'We document the process end-to-end, map data sources and integrations, define success metrics, and deliver a build spec with timeline and budget.',
    time: '$5,000 – $15,000',
  },
  {
    num: '03',
    title: 'Build',
    desc: "Custom AI worker built on our production-grade stack (Clerk auth, Supabase, Next.js, LiteLLM gateway). We handle compliance, security, and integrations.",
    time: '$25,000 – $75,000',
  },
  {
    num: '04',
    title: 'Managed & Maintained',
    desc: "We monitor the AI worker, retrain on your feedback, handle model upgrades, and guarantee SLAs. You focus on the output — we own the engine.",
    time: '$2,500 – $10,000 / mo',
  },
]

const stack = [
  { name: 'AI Gateway', desc: 'Multi-model routing, rate limiting, cost controls', icon: '🔀' },
  { name: 'Clerk Auth', desc: 'SSO, RBAC, multi-tenant identity', icon: '🔐' },
  { name: 'Supabase', desc: 'Postgres database, row-level security, audit logs', icon: '🗄️' },
  { name: 'LiteLLM', desc: 'Model abstraction — GPT-4, Claude, Gemini, local', icon: '🤖' },
  { name: 'SOC Sentinel', desc: 'Security monitoring and compliance alerting', icon: '🛡️' },
  { name: 'Voice Concierge', desc: 'Phone + voice AI for intake and scheduling', icon: '📞' },
]

const whyNot = [
  {
    them: 'Relevance AI / Make / n8n',
    issue: 'Great for simple workflows. Breaks on edge cases, compliance requirements, or anything needing custom model behavior. No one to call when it breaks.',
    us: 'We build on production infra, own the SLA, and handle edge cases. You get a human team.',
  },
  {
    them: 'Zapier AI',
    issue: 'Connects apps well. Not designed for AI workers that make decisions, handle ambiguity, or require HIPAA compliance and audit trails.',
    us: 'We design for decision-making AI, not just automation triggers. Compliance built in.',
  },
  {
    them: 'Hiring an AI engineer',
    issue: '$150K+ salary, 3-month ramp, no guarantee they can build what you need, and you own the maintenance forever.',
    us: '$75K to build + $5K/mo managed. Done in 60 days. We own the risk, not you.',
  },
]

const revenueRanges = [
  'Under $500K/year',
  '$500K – $2M/year',
  '$2M – $10M/year',
  '$10M – $50M/year',
  '$50M+/year',
]

const inputCss: React.CSSProperties = {
  width: '100%',
  background: '#181818',
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  padding: '12px 14px',
  color: T.text,
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const labelCss: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  color: T.muted,
  marginBottom: 6,
  fontWeight: 500,
}

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    processToAutomate: '',
    monthlyRevenue: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setForm({ name: '', email: '', company: '', role: '', processToAutomate: '', monthlyRevenue: '' })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <main style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: 'var(--font-geist), sans-serif' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(11,11,11,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ ...s.section, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>
                AiT<span style={{ color: T.teal }}>Agency</span>
              </span>
              <a
                href="https://intelligentit.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 11, color: T.muted, textDecoration: 'none', marginTop: 3, letterSpacing: 0.2 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#bbb')}
                onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
              >
                By Intelligent Group
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="#how-it-works" style={{ color: T.muted, fontSize: 14, textDecoration: 'none' }}>How It Works</a>
            <a href="#workers" style={{ color: T.muted, fontSize: 14, textDecoration: 'none' }}>AI Workers</a>
            <a href="#pricing" style={{ color: T.muted, fontSize: 14, textDecoration: 'none' }}>Pricing</a>
            <a
              href="#assessment"
              style={{
                background: T.teal, color: T.bg, fontWeight: 700, fontSize: 14,
                padding: '9px 20px', borderRadius: 8, textDecoration: 'none',
              }}
            >
              Free Assessment
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ ...s.section, paddingTop: 100, paddingBottom: 80, textAlign: 'center' }}>
        <div style={s.badge}>AI WORKERS FOR BUSINESS · INTELLIGENTIT.IO</div>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
          We Build <span style={{ color: T.teal }}>AI Employees</span>
          <br />for Your Business
        </h1>
        <p style={{ fontSize: 20, color: T.muted, lineHeight: 1.7, maxWidth: 620, margin: '0 auto 40px' }}>
          Custom AI workers that handle intake, scheduling, documentation, outreach, and data processing —
          24/7, without hiring. We blueprint, build, and manage them for you.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#assessment"
            style={{
              background: T.teal, color: T.bg, fontWeight: 700,
              padding: '16px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 17,
            }}
          >
            Book Free Assessment →
          </a>
          <a
            href="#workers"
            style={{
              background: 'transparent', color: T.text, fontWeight: 600,
              padding: '16px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 17,
              border: `1px solid ${T.border}`,
            }}
          >
            See AI Workers
          </a>
        </div>

        {/* Social proof bar */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap' }}>
          {[
            { stat: '82%', label: 'Avg documentation time reduction' },
            { stat: '60 days', label: 'Typical time to first AI worker live' },
            { stat: '$0', label: 'Cost for initial readiness assessment' },
          ].map(({ stat, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: T.teal, letterSpacing: -1 }}>{stat}</div>
              <div style={{ fontSize: 14, color: T.muted, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDY BANNER ── */}
      <section style={{ background: '#05D2AB0D', borderTop: `1px solid #05D2AB22`, borderBottom: `1px solid #05D2AB22`, padding: '32px 24px' }}>
        <div style={{ ...s.section, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ background: '#05D2AB22', borderRadius: 12, padding: '12px 16px', fontSize: 28 }}>🏥</div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 12, color: T.teal, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>LIVE DEPLOYMENT · BEHAVIORAL HEALTH</div>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
              Colorado behavioral health group cut therapy note documentation from 45 min to 8 min per session.
            </p>
            <p style={{ fontSize: 14, color: T.muted }}>
              AI drafts DAP/SOAP/BIRP notes from session recordings. Clinician reviews, edits, approves. HIPAA audit log for every touch.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {['82% time saved', '1,200+ sessions', 'HIPAA compliant'].map(m => (
              <div key={m} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.teal }}>{m}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ ...s.section, paddingTop: 96, paddingBottom: 80 }}>
        <div style={s.badge}>HOW IT WORKS</div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
          From First Call to AI Worker Live in 60 Days
        </h2>
        <p style={{ fontSize: 17, color: T.muted, marginBottom: 60, maxWidth: 560 }}>
          We handle every step — discovery, design, build, and ongoing management. You get results, not software to maintain.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ ...s.card, position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#05D2AB18', position: 'absolute', top: 12, right: 16, lineHeight: 1 }}>
                {step.num}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.teal, marginBottom: 10 }}>{step.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7, marginBottom: 16 }}>{step.desc}</p>
              <div style={{
                display: 'inline-block', background: '#05D2AB14', border: '1px solid #05D2AB30',
                borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700, color: T.teal,
              }}>
                {step.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI WORKERS ── */}
      <section id="workers" style={{ background: T.ink, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: '80px 24px' }}>
        <div style={s.section}>
          <div style={s.badge}>AI WORKERS</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
            Proven AI Workers Ready to Deploy
          </h2>
          <p style={{ fontSize: 17, color: T.muted, marginBottom: 60, maxWidth: 560 }}>
            Start with a proven template, customized for your workflows, tools, and compliance requirements.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {workers.map((w, i) => (
              <div key={i} style={{ ...s.card, background: T.card, border: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 32 }}>{w.icon}</span>
                  <span style={{
                    background: w.tagColor + '22', border: `1px solid ${w.tagColor}44`,
                    color: w.tagColor, fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    padding: '3px 10px', borderRadius: 20,
                  }}>
                    {w.tag}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>
                  {w.vertical}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{w.title}</h3>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{w.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {w.metrics.map(m => (
                    <li key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#ccc' }}>
                      <span style={{ color: T.teal, fontWeight: 700 }}>✓</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ ...s.section, paddingTop: 96, paddingBottom: 80 }}>
        <div style={s.badge}>BUILT ON AiT PLATFORM</div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
          Enterprise Infrastructure Behind Every AI Worker
        </h2>
        <p style={{ fontSize: 17, color: T.muted, marginBottom: 56, maxWidth: 560 }}>
          We don’t use generic no-code tools. Every AI worker runs on our production-grade stack — built for security, compliance, and scale.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {stack.map((item, i) => (
            <div key={i} style={{ ...s.card, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, lineHeight: 1 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / TRUST (Endorsed Brand) ── */}
      <section style={{ background: '#05D2AB08', borderTop: `1px solid #05D2AB18`, borderBottom: `1px solid #05D2AB18`, padding: '72px 24px' }}>
        <div style={{ ...s.section, maxWidth: 860 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
            <div style={{ ...s.badge, marginBottom: 0 }}>ABOUT US</div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, marginBottom: 20, letterSpacing: -0.5 }}>
            AI Specialists. Full-Stack Backing.
          </h2>
          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.8, marginBottom: 24, maxWidth: 740 }}>
            AiT Agency is built by the team at{' '}
            <a href="https://intelligentit.io" target="_blank" rel="noopener noreferrer" style={{ color: T.teal, textDecoration: 'none' }}>
              Intelligent Group
            </a>
            {' '}— a full-service managed IT and security provider serving professional services firms.
            When you work with AiT Agency, you get AI specialists backed by full IT infrastructure, security operations,
            and managed services depth. We don’t just build your AI worker and hand you the keys — we keep it running inside
            a production-grade platform we control end-to-end.
          </p>
          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.8, marginBottom: 28, maxWidth: 740 }}>
            Need full IT management alongside your AI stack?{' '}
            <a href="https://intelligentit.io" target="_blank" rel="noopener noreferrer" style={{ color: T.teal, fontWeight: 600, textDecoration: 'none' }}>
              intelligentit.io →
            </a>
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { icon: '🛡️', label: 'SOC Sentinel security operations' },
              { icon: '🖥️', label: 'Managed IT & Microsoft 365' },
              { icon: '📋', label: 'Compliance & audit readiness' },
              { icon: '🔐', label: 'Identity & access management' },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: 8, padding: '8px 14px', fontSize: 13, color: '#ccc',
              }}>
                <span>{icon}</span> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: T.ink, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: '80px 24px' }}>
        <div style={s.section}>
          <div style={s.badge}>PRICING</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
            Transparent, Fixed-Scope Pricing
          </h2>
          <p style={{ fontSize: 17, color: T.muted, marginBottom: 56, maxWidth: 500 }}>
            No hourly billing. No scope creep surprises. Fixed price for Blueprint and Build — managed monthly thereafter.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              {
                name: 'Blueprint',
                price: '$5K – $15K',
                note: 'One-time · 2 weeks',
                features: ['Process mapping and documentation', 'Integration architecture', 'Data flow diagrams', 'Build spec + timeline', 'Risk and compliance review'],
                cta: 'Start with Blueprint',
                highlight: false,
              },
              {
                name: 'Build',
                price: '$25K – $75K',
                note: 'One-time · 30–60 days',
                features: ['Full AI worker development', 'Integrations to your existing tools', 'Compliance and security controls', 'Testing + UAT + go-live', '90-day post-launch support'],
                cta: 'Get a Build Quote',
                highlight: true,
              },
              {
                name: 'Managed',
                price: '$2.5K – $10K',
                note: 'Per month · Ongoing',
                features: ['24/7 uptime monitoring', 'Model upgrades and retraining', 'Bug fixes and performance tuning', 'Monthly usage reports', 'Dedicated Slack channel'],
                cta: 'Add Managed Support',
                highlight: false,
              },
            ].map((plan) => (
              <div key={plan.name} style={{
                ...s.card,
                border: plan.highlight ? `1px solid ${T.teal}` : `1px solid ${T.border}`,
                background: plan.highlight ? '#05D2AB09' : T.card,
                display: 'flex', flexDirection: 'column',
              }}>
                {plan.highlight && (
                  <div style={{ color: T.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>MOST COMMON PATH</div>
                )}
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{plan.name}</div>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, color: T.teal, marginBottom: 4 }}>{plan.price}</div>
                <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>{plan.note}</div>
                <ul style={{ flex: 1, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 8, fontSize: 14, color: '#ccc' }}>
                      <span style={{ color: T.teal }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#assessment" style={{
                  display: 'block', textAlign: 'center',
                  background: plan.highlight ? T.teal : 'transparent',
                  color: plan.highlight ? T.bg : T.text,
                  border: plan.highlight ? 'none' : `1px solid ${T.border}`,
                  fontWeight: 700, padding: '12px', borderRadius: 8, textDecoration: 'none', fontSize: 14,
                }}>
                  {plan.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NOT ALTERNATIVES ── */}
      <section style={{ ...s.section, paddingTop: 96, paddingBottom: 80 }}>
        <div style={s.badge}>WHY NOT JUST USE...</div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
          The Honest Comparison
        </h2>
        <p style={{ fontSize: 17, color: T.muted, marginBottom: 56, maxWidth: 520 }}>
          No-code tools and AI platforms are great — for simple workflows. Here’s why clients choose us for anything with real stakes.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {whyNot.map((item, i) => (
            <div key={i} style={{ ...s.card, display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 32, alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 6 }}>INSTEAD OF</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{item.them}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#F59E0B', fontWeight: 700, marginBottom: 6 }}>THE PROBLEM</div>
                <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>{item.issue}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: T.teal, fontWeight: 700, marginBottom: 6 }}>WITH AiT AGENCY</div>
                <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6 }}>{item.us}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEED MORE THAN AI? ── */}
      <section style={{ ...s.section, paddingTop: 96, paddingBottom: 80 }}>
        <div style={{ maxWidth: 860 }}>
          <div style={s.badge}>NEED MORE THAN AI?</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: 20, letterSpacing: -0.5 }}>
            One Relationship. The Full Stack.
          </h2>
          <p style={{ fontSize: 17, color: T.muted, lineHeight: 1.8, marginBottom: 32, maxWidth: 680 }}>
            AiT Agency clients have access to the full{' '}
            <a href="https://intelligentit.io" target="_blank" rel="noopener noreferrer" style={{ color: T.teal, textDecoration: 'none' }}>
              Intelligent Group
            </a>
            {' '}suite — managed IT, Microsoft 365, security operations, and compliance.
            Whether you need your AI worker connected to your existing infrastructure, an MDR overlay for your new
            AI data flows, or a single vendor to cover your entire technology stack, we have you covered.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
            {[
              {
                icon: '🖥️',
                title: 'Managed IT & M365',
                desc: 'Full IT support, Microsoft 365 admin, device management, and helpdesk for your whole team.',
              },
              {
                icon: '🛡️',
                title: 'Security Operations',
                desc: 'SOC monitoring, MDR, SentinelOne EDR, identity protection, and compliance reporting.',
              },
              {
                icon: '🔗',
                title: 'Infrastructure Integration',
                desc: 'Your AI workers connect to your existing stack — we own the integration, security, and uptime.',
              },
            ].map((item, i) => (
              <div key={i} style={{ ...s.card, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://intelligentit.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent', color: T.teal,
              border: `1px solid ${T.teal}40`, borderRadius: 8,
              padding: '12px 24px', fontWeight: 700, fontSize: 15, textDecoration: 'none',
            }}
          >
            See all services at intelligentit.io →
          </a>
        </div>
      </section>

      {/* ── INTAKE FORM ── */}
      <section id="assessment" style={{ background: T.ink, borderTop: `1px solid ${T.border}`, padding: '80px 24px 100px' }}>
        <div style={{ ...s.section, maxWidth: 720 }}>
          <div style={s.badge}>BOOK YOUR ASSESSMENT</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
            Free AI Readiness Assessment
          </h2>
          <p style={{ fontSize: 17, color: T.muted, marginBottom: 40 }}>
            Tell us about your business and the process you want to automate. We&apos;ll reach out within 24 hours — no pitch, just honest analysis.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelCss}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required style={inputCss} placeholder="Jane Smith" />
              </div>
              <div>
                <label style={labelCss}>Work Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputCss} placeholder="jane@company.com" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelCss}>Company *</label>
                <input name="company" value={form.company} onChange={handleChange} required style={inputCss} placeholder="Acme Corp" />
              </div>
              <div>
                <label style={labelCss}>Your Role</label>
                <input name="role" value={form.role} onChange={handleChange} style={inputCss} placeholder="COO, Ops Director, CEO..." />
              </div>
            </div>
            <div>
              <label style={labelCss}>Process You Want to Automate *</label>
              <textarea
                name="processToAutomate"
                value={form.processToAutomate}
                onChange={handleChange}
                required
                rows={4}
                style={{ ...inputCss, resize: 'vertical' }}
                placeholder="e.g. We manually process 200 therapy session notes/month. Therapists spend 45 min per note..."
              />
            </div>
            <div>
              <label style={labelCss}>Annual Revenue Range</label>
              <select name="monthlyRevenue" value={form.monthlyRevenue} onChange={handleChange} style={inputCss}>
                <option value="">Select range...</option>
                {revenueRanges.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: status === 'loading' ? '#05D2AB88' : T.teal,
                  color: T.bg, fontWeight: 700, padding: '16px',
                  borderRadius: 10, border: 'none', fontSize: 17,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  width: '100%', fontFamily: 'inherit',
                }}
              >
                {status === 'loading' ? 'Submitting...' : 'Request Free Assessment →'}
              </button>
            </div>
            {status === 'success' && (
              <div style={{ background: '#05D2AB18', border: `1px solid ${T.teal}`, borderRadius: 10, padding: '16px 20px', color: T.teal, fontWeight: 600 }}>
                {message}
              </div>
            )}
            {status === 'error' && (
              <div style={{ background: '#ff444418', border: '1px solid #ff4444', borderRadius: 10, padding: '16px 20px', color: '#ff6666' }}>
                {message}
              </div>
            )}
          </form>

          <p style={{ color: T.dim, fontSize: 13, marginTop: 20, textAlign: 'center' }}>
            Prefer to call now?{' '}
            <a href="https://intelligentit.io/book/" style={{ color: T.teal }} target="_blank" rel="noopener noreferrer">
              Book directly at intelligentit.io/book
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: '48px 24px 36px' }}>
        <div style={{ ...s.section }}>
          {/* Cross-reference row */}
          <div style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: '20px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16, marginBottom: 36,
          }}>
            <div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 4 }}>
                AiT Agency is the AI practice of{' '}
                <a href="https://intelligentit.io" target="_blank" rel="noopener noreferrer" style={{ color: T.teal, textDecoration: 'none', fontWeight: 600 }}>
                  Intelligent Group
                </a>
                . Full IT management, security, and Microsoft 365.
              </div>
              <div style={{ fontSize: 12, color: T.dim }}>
                Need the complete stack? Everything at{' '}
                <a href="https://intelligentit.io" target="_blank" rel="noopener noreferrer" style={{ color: T.teal, textDecoration: 'none' }}>
                  intelligentit.io
                </a>
              </div>
            </div>
            <a
              href="https://intelligentit.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent', color: T.teal,
                border: `1px solid ${T.teal}40`, borderRadius: 6,
                padding: '8px 18px', fontWeight: 700, fontSize: 13, textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              intelligentit.io →
            </a>
          </div>

          {/* Bottom nav + copyright */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 800 }}>AiT<span style={{ color: T.teal }}>Agency</span></span>
                <span style={{ color: T.dim, fontSize: 12 }}>an Intelligent Group practice</span>
              </div>
              <div style={{ fontSize: 12, color: T.dim }}>
                © 2026 Intelligent Group. AiT Agency is an Intelligent Group practice.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a href="https://intelligentit.io" target="_blank" rel="noopener noreferrer" style={{ color: T.muted, fontSize: 13, textDecoration: 'none' }}>Intelligent Group</a>
              <a href="https://intelligentit.io/pages/ai-agency.html" style={{ color: T.muted, fontSize: 13, textDecoration: 'none' }}>Full Offer</a>
              <a href="https://intelligentit.io/book/" style={{ color: T.muted, fontSize: 13, textDecoration: 'none' }}>Book a Call</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
