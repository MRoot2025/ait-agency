import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        background: '#0B0B0B',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'Geist, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(5,210,171,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 540 }}>

        {/* Logo */}
        <div style={{ marginBottom: 48 }}>
          <Link href="/" aria-label="Go to home page">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#05D2AB',
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L2 8v14h7v-7h6v7h7V8L12 2z" fill="#05D2AB" />
              </svg>
              Intelligent IT
            </span>
          </Link>
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(5,210,171,0.08)',
            border: '1px solid rgba(5,210,171,0.25)',
            borderRadius: 20,
            padding: '5px 16px',
            marginBottom: 24,
            color: '#05D2AB',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            fontFamily: 'Geist Mono, monospace',
          }}
        >
          Error 404
        </div>

        {/* Big 404 */}
        <p
          aria-hidden="true"
          style={{
            fontSize: 'clamp(5rem, 20vw, 9rem)',
            fontWeight: 800,
            lineHeight: 1,
            color: '#05D2AB',
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
          }}
        >
          404
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 14px',
          }}
        >
          This page isn&apos;t available
        </h1>

        {/* Body */}
        <p
          style={{
            fontSize: 16,
            color: '#888',
            lineHeight: 1.7,
            margin: '0 0 40px',
          }}
        >
          The link may be broken, or the page may have been moved.
          Let&apos;s get you back to somewhere useful.
        </p>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            flexWrap: 'wrap' as const,
            marginBottom: 40,
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#05D2AB',
              color: '#0B0B0B',
              fontWeight: 700,
              fontSize: 15,
              padding: '13px 28px',
              borderRadius: 50,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M6 15V9h4v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Go to Home Page
          </Link>

          <a
            href="https://intelligentit.io/book/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: '#ccc',
              fontWeight: 600,
              fontSize: 15,
              padding: '13px 28px',
              borderRadius: 50,
              border: '1px solid rgba(255,255,255,0.12)',
              textDecoration: 'none',
            }}
          >
            Book a Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H6M11 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.08)', margin: '0 auto 24px' }}
        />

        {/* Helpful links */}
        <nav aria-label="Helpful links">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap' as const,
              gap: '8px 20px',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'AI Workers', href: 'https://intelligentit.io/pages/ai-agency.html' },
              { label: 'Products', href: 'https://intelligentit.io/pages/products.html' },
              { label: 'Managed IT', href: 'https://intelligentit.io/pages/fully-managed-it.html' },
              { label: 'Contact', href: 'https://intelligentit.io/pages/contact.html' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#555', fontSize: 14, textDecoration: 'none' }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Footer note */}
        <p style={{ color: '#333', fontSize: 13, marginTop: 48 }}>
          &copy; {new Date().getFullYear()} Intelligent IT &middot;{' '}
          <a href="https://intelligentit.io" style={{ color: '#444', textDecoration: 'none' }}>
            intelligentit.io
          </a>
        </p>

      </div>
    </main>
  )
}
