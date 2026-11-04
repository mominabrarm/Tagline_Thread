import React from 'react'
import { ArrowUp, Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react'
import { CONTACT_CONFIG, getWhatsAppUrl, getMailtoUrl } from '../../data/contact'

const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'The Engine', href: '#the-engine' },
  { label: 'Work',       href: '#our-work'   },
  { label: 'Process',    href: '#process'    },
]

const SERVICES = [
  'Websites',
  'Social Media Management',
  'Branding & Identity',
  'Social Media Marketing',
]

export const Footer: React.FC = () => {
  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-surface-base pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        {/* Top CTA strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-brand-ash/[0.06]">
          <div className="max-w-xl">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="#FB5607" fillOpacity="0.15" />
                <path d="M5 14 C9 7, 12 21, 14 14 S 19 7, 23 14" stroke="#FB5607" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M5 18 C9 11, 12 25, 14 18 S 19 11, 23 18" stroke="#8338EC" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
              </svg>
              <span className="font-syne text-sm font-bold uppercase tracking-wider text-brand-ash">
                Tagline<span className="text-brand-orange">-</span>Thread
              </span>
            </div>
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-brand-ash leading-tight">
              Let's weave something<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FB5607, #8338EC)' }}>
                extraordinary.
              </span>
            </h2>
            <p className="mt-3 font-geist text-base text-muted leading-relaxed">
              Where ideas are woven into identity.
            </p>
          </div>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); handleNav('#contact') }}
            className="self-start md:self-auto px-8 py-4 rounded-full font-grotesk text-sm font-bold uppercase tracking-widest
                       bg-brand-orange text-[#16181B] shadow-orange-glow hover:shadow-orange-glow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Start a Project →
          </a>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.12em] text-brand-orange">Navigation</span>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNav(link.href) }}
                className="font-geist text-sm text-muted hover:text-brand-ash transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.12em] text-brand-purple">Core Services</span>
            {SERVICES.map(service => (
              <a
                key={service}
                href="#services"
                onClick={e => { e.preventDefault(); handleNav('#services') }}
                className="font-geist text-sm text-muted hover:text-brand-ash transition-colors"
              >
                {service}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.12em] text-brand-orange">Direct Contact</span>
            <a
              href={getMailtoUrl()}
              className="font-geist text-sm text-muted hover:text-brand-ash transition-colors break-all"
            >
              {CONTACT_CONFIG.email.address}
            </a>
            <span className="font-geist text-sm text-muted">
              {CONTACT_CONFIG.phone.display}
            </span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-geist text-sm text-brand-orange hover:text-brand-ash transition-colors"
            >
              WhatsApp Instant Dispatch →
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.12em] text-brand-purple">Signals</span>
            <a
              href={CONTACT_CONFIG.social.instagram}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-geist text-sm text-muted hover:text-brand-ash transition-colors"
            >
              <Instagram size={14} /> Instagram
            </a>
            <a
              href={CONTACT_CONFIG.social.linkedin}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-geist text-sm text-muted hover:text-brand-ash transition-colors"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-geist text-sm text-muted hover:text-brand-ash transition-colors"
            >
              <MessageCircle size={14} /> WhatsApp Direct
            </a>
            <a
              href={getMailtoUrl()}
              className="flex items-center gap-2 font-geist text-sm text-muted hover:text-brand-ash transition-colors"
            >
              <Mail size={14} /> Email Inquiries
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-brand-ash/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-geist text-xs text-muted text-center sm:text-left">
            © {new Date().getFullYear()} Tagline-Thread Creative Studio. Where Ideas Are Woven Into Identity.
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-muted hover:text-brand-ash transition-colors font-grotesk text-xs uppercase tracking-widest"
            aria-label="Back to top"
          >
            Back to Top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  )
}

