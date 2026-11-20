import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'Philosophy', href: '#about', id: 'about' },
  { label: 'Approach', href: '#the-engine', id: 'the-engine' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#our-work', id: 'our-work' },
  { label: 'Why Us', href: '#process', id: 'process' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [active, setActive] = useState('hero')
  const menuRef = useRef<HTMLElement>(null)
  const hoverTimeoutRef = useRef<number | null>(null)
  const isExpanded = !scrolled || isHovered || isFocused || isOpen
  const showDesktopToggle = scrolled && (!isExpanded || isOpen || isFocused)
  const isCollapsed = scrolled && !isExpanded

  const handleHoverStart = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleHoverEnd = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false)
      hoverTimeoutRef.current = null
    }, 250)
  }

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 80)

      const activeLine = window.innerHeight * 0.35
      let currentSection = NAV_LINKS[0].id
      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id)
        if (section && section.getBoundingClientRect().top <= activeLine) {
          currentSection = link.id
        }
      }
      setActive(currentSection)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

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

  useEffect(
    () => () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current)
      }
    },
    []
  )

  const handleNav = (href: string) => {
    setIsOpen(false)
    setIsHovered(false)
    setIsFocused(false)
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed z-50 pointer-events-none transition-all duration-300 ${
        isCollapsed
          ? 'top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex justify-start'
          : 'top-0 inset-x-0 flex justify-center px-4 md:px-8 pt-3 sm:pt-4'
      }`}
    >
      <nav
        ref={menuRef}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onFocus={(e) => {
          if (e.target === e.currentTarget.querySelector('button')) {
            setIsFocused(true)
          }
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsFocused(false)
            setIsHovered(false)
          }
        }}
        className={`relative z-10 pointer-events-auto overflow-hidden transition-[width,background-color,border-color,box-shadow] duration-300 ${
          isCollapsed
            ? 'w-12 rounded-2xl bg-[#181B1F]/70 backdrop-blur-xl border border-brand-ash/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            : `w-full max-w-7xl rounded-2xl ${
                scrolled
                  ? 'bg-[#181B1F]/70 backdrop-blur-xl border border-brand-ash/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
                  : 'bg-transparent border border-transparent shadow-none'
              }`
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isCollapsed
              ? 'h-12 px-1'
              : 'h-[45px] sm:h-[52px] px-3.5 sm:px-6'
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNav('#hero')
            }}
            className={`flex items-center gap-2 group flex-shrink-0 ${
              isCollapsed ? 'hidden' : ''
            }`}
            aria-label="Tagline-Thread — Home"
          >
            <span className="font-playfair font-bold text-[16px] italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple group-hover:scale-105 transition-transform">
              TT
            </span>
            <span className="font-playfair text-[14.5px] sm:text-[16px] font-semibold text-brand-ash tracking-tight group-hover:text-brand-ash/90 transition-colors">
              Tagline-Thread<sup className="text-[8px] font-normal text-muted ml-0.5 font-manrope">®</sup>
            </span>
          </a>

          <div
            className={`items-center gap-3 lg:gap-5 xl:gap-7 ${
              isExpanded ? 'hidden md:flex' : 'hidden'
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`nav-link text-[11px] lg:text-[12px] relative py-1 whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-brand-ash font-semibold'
                      : 'text-muted hover:text-brand-ash'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-orange rounded-full shadow-[0_0_8px_#FF5400]" />
                  )}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('#contact')
              }}
              data-cursor="special"
              className={`${
                isExpanded ? 'hidden sm:inline-flex' : 'hidden'
              } items-center gap-1.5 px-3.5 py-1 rounded-full btn-text text-[11.5px] font-manrope font-semibold
                         text-brand-ash border border-brand-orange/60 bg-brand-orange/10
                         hover:bg-brand-orange hover:text-[#0C0E10] hover:shadow-[0_0_24px_rgba(255,84,0,0.5)]
                         transition-all duration-300`}
            >
              Start a Project <ArrowUpRight size={11.5} />
            </a>

            <button
              className={`${
                showDesktopToggle ? 'md:flex' : 'md:hidden'
              } flex w-9 h-9 rounded-2xl items-center justify-center text-brand-ash hover:text-brand-orange transition-colors bg-surface-card/60 border border-brand-ash/10`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="navbar-section-links"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <div
          id="navbar-section-links"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen
              ? 'max-h-[28rem] opacity-100 border-t border-brand-ash/10'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3 space-y-2 bg-[#0a0c0d]/95 backdrop-blur-2xl rounded-2xl border border-brand-ash/10 mt-2">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block py-1 font-manrope text-[11.5px] ${
                    isActive
                      ? 'text-brand-orange font-semibold'
                      : 'text-muted hover:text-brand-ash'
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
      {scrolled && isHovered && !isOpen && (
        <div
          aria-hidden="true"
          className="fixed top-3 left-3 sm:top-4 sm:left-4 z-0 w-12 h-12 pointer-events-auto"
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        />
      )}
    </header>
  )
}
