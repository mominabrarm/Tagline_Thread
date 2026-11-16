import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Our Work', href: '#our-work', id: 'our-work' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -50% 0px' }
    )
    ids.forEach((id) => {
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pt-3 sm:pt-4 pointer-events-none">
      <nav
        ref={menuRef}
        className={`w-full max-w-7xl rounded-2xl transition-all duration-300 pointer-events-auto ${scrolled
          ? 'bg-transparent backdrop-blur-xl border border-brand-ash/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
          : 'bg-transparent border-transparent shadow-none'
          }`}
      >
        <div className="flex items-center justify-between h-[45px] sm:h-[52px] px-3.5 sm:px-6">
          {/* Brand Logo & Wordmark (Ref: Image 1) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNav('#hero')
            }}
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="Tagline-Thread — Home"
          >
            {/* TT emblem */}
            <div className="relative flex items-center justify-center">
              <span className="font-playfair font-bold text-[16px] italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple group-hover:scale-105 transition-transform">
                TT
              </span>
            </div>
            <span className="font-playfair text-[14.5px] sm:text-[16px] font-semibold text-brand-ash tracking-tight group-hover:text-brand-ash/90 transition-colors">
              Tagline-Thread<sup className="text-[8px] font-normal text-muted ml-0.5 font-manrope">®</sup>
            </span>
          </a>

          {/* Center Navigation Links (Ref: Image 1) */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  className={`nav-link text-[11.5px] lg:text-[12.5px] relative py-1 transition-colors duration-200 ${isActive ? 'text-brand-ash font-semibold' : 'text-muted hover:text-brand-ash'
                    }`}
                >
                  {link.label}
                  {/* Underline indicator for active item */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-orange rounded-full shadow-[0_0_8px_#FF5400]" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Right CTA Button & Mobile Trigger (Ref: Image 1) */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('#contact')
              }}
              data-cursor="special"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full btn-text text-[11.5px] font-manrope font-semibold
                         text-brand-ash border border-brand-orange/60 bg-brand-orange/10
                         hover:bg-brand-orange hover:text-[#0C0E10] hover:shadow-[0_0_24px_rgba(255,84,0,0.5)]
                         transition-all duration-300"
            >
              Start a Project <ArrowUpRight size={11.5} />
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-7 h-7 rounded-2xl flex items-center justify-center text-brand-ash hover:text-brand-orange transition-colors bg-surface-card/60 border border-brand-ash/10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 opacity-100 border-t border-brand-ash/10' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 py-3 space-y-2 bg-[#101519]/95 backdrop-blur-2xl rounded-2xl border border-brand-ash/10 mt-2">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  className={`block py-1 font-manrope text-[11.5px] ${isActive ? 'text-brand-orange font-semibold' : 'text-muted hover:text-brand-ash'
                    }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('#contact')
              }}
              className="inline-flex w-full items-center justify-center gap-2 mt-2 px-3.5 py-1.5 rounded-full font-manrope text-[10px] font-semibold bg-brand-orange text-[#0C0E10]"
            >
              Start a Project <ArrowUpRight size={11.5} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
