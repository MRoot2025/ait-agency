'use client'

import { useState } from 'react'

const revenueRanges = [
  'Under $500K/year',
  '$500K – $2M/year',
  '$2M – $10M/year',
  '$10M – $50M/year',
  '$50M+/year',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#161616',
  border: '1px solid #2a2a2a',
  borderRadius: 8,
  padding: '12px 14px',
  color: '#fff',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  color: '#888',
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
    <main style={{ background: '#0B0B0B', minHeight: '100vh', color: '#fff', fontFamily: 'Geist, sans-serif' }}>
      {/* Hero */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 48px' }}>
        <div style={{ display: 'inline-block', background: '#05D2AB22', border: '1px solid #05D2AB44', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
          <span style={{ color: '#05D2AB', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>AI WORKERS · INTELLIGENTIT.IO</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
          We Build{' '}
          <span style={{ color: '#05D2AB' }}>AI Employees</span>
          <br />for Your Business
        </h1>
        <p style={{ fontSize: 18, color: '#aaa', lineHeight: 1.7, marginBottom: 28 }}>
          Custom AI workers that handle repetitive tasks 24/7 — intake, scheduling, research, reporting, and more.
          We blueprint, build, and manage them for you.
        </p>
        <a
          href="https://intelligentit.io/pages/ai-agency.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#05D2AB', color: '#0B0B0B', fontWeight: 700,
            padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontSize: 15,
          }}
        >
          See Full Offer at intelligentit.io ↗
        </a>
      </section>

      {/* Redirect notice */}
      <section style={{ maxWidth: 760, margin: '0 auto 48px', padding: '0 24px' }}>
        <div style={{ background: '#05D2AB11', border: '1px solid #05D2AB33', borderRadius: 10, padding: '14px 20px', color: '#05D2AB', fontSize: 14 }}>
          Full service details, pricing, and case studies live at{' '}
          <a href="https://intelligentit.io/pages/ai-agency.html" style={{ color: '#05D2AB', fontWeight: 700 }}>
            intelligentit.io/pages/ai-agency.html
          </a>
        </div>
      </section>

      {/* Intake form */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Book a Free AI Readiness Assessment</h2>
        <p style={{ color: '#888', marginBottom: 32, fontSize: 15 }}>
          Tell us about your business and the process you want to automate. We&apos;ll reach out within 24 hours.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="Jane Smith" />
            </div>
            <div>
              <label style={labelStyle}>Work Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="jane@company.com" />
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Company *</label>
              <input name="company" value={form.company} onChange={handleChange} required style={inputStyle} placeholder="Acme Corp" />
            </div>
            <div>
              <label style={labelStyle}>Your Role</label>
              <input name="role" value={form.role} onChange={handleChange} style={inputStyle} placeholder="COO, Operations Director..." />
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label style={labelStyle}>Process You Want to Automate</label>
            <textarea
              name="processToAutomate"
              value={form.processToAutomate}
              onChange={handleChange}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="e.g. We manually process 200 invoices/month and route them to approvers..."
            />
          </div>

          {/* Row 4 */}
          <div>
            <label style={labelStyle}>Annual Revenue Range</label>
            <select name="monthlyRevenue" value={form.monthlyRevenue} onChange={handleChange} style={inputStyle}>
              <option value="">Select range...</option>
              {revenueRanges.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: status === 'loading' ? '#05D2AB88' : '#05D2AB',
                color: '#0B0B0B', fontWeight: 700, padding: '14px 32px',
                borderRadius: 8, border: 'none', fontSize: 16, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                width: '100%',
              }}
            >
              {status === 'loading' ? 'Submitting...' : 'Request Free Assessment'}
            </button>
          </div>

          {/* Feedback */}
          {status === 'success' && (
            <div style={{ background: '#05D2AB22', border: '1px solid #05D2AB', borderRadius: 8, padding: '14px 20px', color: '#05D2AB', fontWeight: 600 }}>
              {message}
            </div>
          )}
          {status === 'error' && (
            <div style={{ background: '#ff444422', border: '1px solid #ff4444', borderRadius: 8, padding: '14px 20px', color: '#ff6666' }}>
              {message}
            </div>
          )}
        </form>

        <p style={{ color: '#555', fontSize: 13, marginTop: 20, textAlign: 'center' }}>
          Prefer to talk now?{' '}
          <a href="https://intelligentit.io/book/" style={{ color: '#05D2AB' }} target="_blank" rel="noopener noreferrer">
            Schedule a call directly
          </a>
        </p>
      </section>
    </main>
  )
}
