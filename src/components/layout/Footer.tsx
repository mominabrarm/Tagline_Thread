import React, { useState } from 'react'
import {
  ArrowUp,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
  ArrowRight,
  Check,
} from 'lucide-react'
import { FooterWave } from '../ui/FooterWave'
import { CONTACT_CONFIG, getWhatsAppUrl } from '../../data/contact'

const EXPLORE_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'The Engine', href: '#the-engine' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#our-work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_LINKS = [
  { label: 'Websites & WebGL', href: '#services' },
  { label: 'Social Media Management', href: '#services' },
  { label: 'Branding & Identity', href: '#services' },
  { label: 'Social Media Marketing', href: '#services' },
  { label: 'Hosting & Support', href: '#services' },
]

const COMPANY_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Careers', href: '#contact' },
  { label: 'Contact Studio', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNav = (href: string) => {
    if (href === '#') return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 3000)
  }

  return (
    <footer
      className="relative w-full pt-20 pb-10 bg-brand-bg text-[#E9ECEF] border-t border-[#E9ECEF]/08 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-16 relative z-10">
        {/* ── Main Multi-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#E9ECEF]/08">
          {/* Column 1: Brand & Identity (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            {/* Logo Emblem */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Tagline-Thread Logo"
                className="w-8 h-8 object-contain rounded-md drop-shadow-[0_0_12px_rgba(255,84,0,0.45)]"
              />
              <span className="footer-brand text-[#E9ECEF]">
                TAGLINE-THREAD<span className="text-[#FF5400]">®</span>
              </span>
            </div>

            {/* Tagline with orange flourish underline */}
            <div className="relative pt-1 pb-1">
              <p className="font-playfair italic text-lg sm:text-xl text-[#E9ECEF] leading-snug">
                Where ideas are woven into identity.
              </p>
              {/* Curved orange flourish path */}
              <svg className="w-48 h-3 mt-1 text-[#FF5400]" viewBox="0 0 180 10" fill="none">
                <path
                  d="M2 7 C 50 1, 130 9, 178 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Short Narrative */}
            <p className="font-manrope text-xs sm:text-sm text-[#E9ECEF]/65 leading-relaxed max-w-sm">
              A modern digital studio blending strategy, design and technology to build brands
              that lead with undeniable gravity.
            </p>

            {/* 4 Round Glass Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={CONTACT_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#181B1F]/60 hover:bg-[#FF5400] text-[#E9ECEF] hover:text-[#0C0E10] border border-[#E9ECEF]/10 hover:border-[#FF5400] shadow-sm hover:shadow-[0_0_15px_rgba(255,84,0,0.5)] transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href={CONTACT_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#181B1F]/60 hover:bg-[#8824FF] text-[#E9ECEF] hover:text-white border border-[#E9ECEF]/10 hover:border-[#8824FF] shadow-sm hover:shadow-[0_0_15px_rgba(136,36,255,0.5)] transition-all duration-300"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#181B1F]/60 hover:bg-[#FF5400] text-[#E9ECEF] hover:text-[#0C0E10] border border-[#E9ECEF]/10 hover:border-[#FF5400] shadow-sm hover:shadow-[0_0_15px_rgba(255,84,0,0.5)] transition-all duration-300"
              >
                <Youtube size={16} />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#181B1F]/60 hover:bg-[#25D366] text-[#E9ECEF] hover:text-[#0C0E10] border border-[#E9ECEF]/10 hover:border-[#25D366] shadow-sm hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-grotesk text-xs font-semibold uppercase tracking-[0.14em] text-[#FF5400]">
              Explore
            </span>
            <div className="flex flex-col gap-2 pt-1">
              {EXPLORE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  className="footer-link text-[#E9ECEF]/65 hover:text-[#FF5400] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Services (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-grotesk text-xs font-semibold uppercase tracking-[0.14em] text-[#8824FF]">
              Services
            </span>
            <div className="flex flex-col gap-2 pt-1">
              {SERVICES_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  className="footer-link text-[#E9ECEF]/65 hover:text-[#8824FF] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter — Stay in the Loop (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-[#E9ECEF] leading-snug">
                Stay in the{' '}
                <span className="italic text-[#FF5400] font-normal" style={{ fontStyle: 'italic' }}>
                  Loop.
                </span>
              </h3>
              <p className="mt-1 font-manrope text-xs text-[#E9ECEF]/65 leading-relaxed">
                Get our monthly insights on design, digital culture and building enduring brands.
              </p>
            </div>

            {/* Newsletter Pill Input Capsule */}
            <form onSubmit={handleSubscribe} className="relative w-full">
              <div
                className="flex items-center rounded-full p-1.5 pl-4 bg-[#121417] border border-[#E9ECEF]/12 focus-within:border-[#FF5400] transition-colors duration-300"
                style={{
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)',
                }}
              >
                <Mail size={15} className="text-[#E9ECEF]/40 flex-shrink-0 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-transparent border-none text-xs font-manrope text-[#E9ECEF] placeholder-[#E9ECEF]/35 focus:outline-none w-full"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[#0C0E10] bg-gradient-to-r from-[#FF5400] to-[#FFA000] hover:scale-105 transition-transform duration-200 shadow-[0_0_12px_rgba(255,84,0,0.4)]"
                >
                  {subscribed ? <Check size={14} /> : <ArrowRight size={14} strokeWidth={2.5} />}
                </button>
              </div>
              {subscribed && (
                <span className="absolute -bottom-5 left-4 font-manrope text-[10px] text-[#FF5400]">
                  ✓ Subscribed! Welcome to the loop.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* ── Continuous Glowing Double-Sine Dotted Wave ── */}
        <FooterWave />

        {/* ── Bottom Legal Strip ── */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-manrope text-xs text-[#E9ECEF]/55">
          <span>&copy; 2026 Tagline-Thread. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#E9ECEF] transition-colors">
              Privacy Policy
            </a>
            <span>/</span>
            <a href="#" className="hover:text-[#E9ECEF] transition-colors">
              Terms of Service
            </a>
            <span>/</span>
            <a href="#" className="hover:text-[#E9ECEF] transition-colors">
              Refund Policy
            </a>
          </div>

          {/* Back to Top Pill */}
          <button
            type="button"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-grotesk text-[11px] uppercase tracking-wider font-semibold text-[#E9ECEF] hover:text-[#FF5400] bg-[#181B1F]/50 hover:bg-[#181B1F] border border-[#E9ECEF]/10 hover:border-[#FF5400]/40 transition-all duration-300 group"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
