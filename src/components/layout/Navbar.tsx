import React, { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'The Engine', href: '#the-engine' },
  { label: 'Services',   href: '#services'   },
  { label: 'Work',       href: '#our-work'   },
  { label: 'Process',    href: '#process'    },
  { label: 'Contact',    href: '#contact'    },
]

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('hero')
  const menuRef                   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const handleNav = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pt-4">
      <nav
        ref={menuRef}
        className={`w-full max-w-7xl rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-surface-base/80 backdrop-blur-2xl shadow-[0_1px_12px_rgba(0,0,0,0.5)]'
            : 'bg-surface-base/60 backdrop-blur-xl'
        }`}
        style={{ border: '1px solid rgba(233,236,239,0.1)' }}
      >
        <div className="flex items-center justify-between h-14 px-4 md:px-6">
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); handleNav('#hero') }}
            className="flex items-center gap-2.5 group"
            aria-label="Tagline-Thread — Home"
          >
            {/* Wordmark logo with thread accent */}
            <div className="relative flex items-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
                <rect width="28" height="28" rx="7" fill="#FB5607" fillOpacity="0.15" />
                <path d="M5 14 C9 7, 12 21, 14 14 S 19 7, 23 14" stroke="#FB5607" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M5 18 C9 11, 12 25, 14 18 S 19 11, 23 18" stroke="#8338EC" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
              </svg>
              <span className="ml-2 font-syne text-sm font-bold uppercase tracking-wider text-brand-ash group-hover:text-brand-orange transition-colors">
                Tagline<span className="text-brand-orange">-</span>Thread
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const id = link.href.replace('#', '')
              const isActive = active === id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNav(link.href) }}
                  className={`px-3.5 py-1.5 rounded-full font-grotesk text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? 'bg-surface-high text-brand-ash'
                      : 'text-muted hover:text-brand-ash hover:bg-surface-card/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand-orange text-[#16181B]
                         font-grotesk text-xs font-bold uppercase tracking-widest
                         shadow-orange-glow hover:shadow-orange-glow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Start a Project
            </a>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden w-9 h-9 rounded-full bg-surface-card/80 flex items-center justify-center text-brand-ash hover:bg-surface-high transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 pt-2 space-y-1">
            {NAV_LINKS.map(link => {
              const id = link.href.replace('#', '')
              const isActive = active === id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNav(link.href) }}
                  className={`block px-4 py-2.5 rounded-xl font-grotesk text-xs font-semibold uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'bg-surface-card text-brand-orange'
                      : 'text-muted hover:text-brand-ash hover:bg-surface-card/60'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-orange text-[#16181B]
                         font-grotesk text-xs font-bold uppercase tracking-widest shadow-orange-glow"
            >
              Start a Project
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

