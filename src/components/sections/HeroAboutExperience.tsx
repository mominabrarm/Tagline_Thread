import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  ChevronDown,
  Lightbulb,
  Layers,
  Users,
  Sprout,
} from 'lucide-react'
import { AsciiStream } from '../ui/AsciiStream'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const PHILOSOPHY_PRINCIPLES = [
  {
    num: '01',
    title: 'Intentional Creativity',
    desc: 'Ideas with a purpose, not just for the sake of being different.',
    accent: 'orange' as const,
    Icon: Lightbulb,
  },
  {
    num: '02',
    title: 'Meaningful Design',
    desc: 'Visuals and experiences that communicate, connect and build trust.',
    accent: 'purple' as const,
    Icon: Layers,
  },
  {
    num: '03',
    title: 'People Over Process',
    desc: 'Real conversations, shared ideas and a collaborative approach.',
    accent: 'orange' as const,
    Icon: Users,
  },
  {
    num: '04',
    title: 'Built to Last',
    desc: 'Digital foundations that can grow and adapt with your brand.',
    accent: 'purple' as const,
    Icon: Sprout,
  },
]

const HERO_PHILOSOPHY = [
  {
    num: '01',
    title: 'Ideas.',
    desc: 'Every great brand begins with a thought.',
    numberClass: 'text-[#FB5607] group-hover:drop-shadow-[0_0_8px_rgba(251,86,7,0.55)]',
  },
  {
    num: '02',
    title: 'Identity.',
    desc: 'Every thought deserves a distinctive voice.',
    numberClass: 'text-[#8338EC] group-hover:drop-shadow-[0_0_8px_rgba(131,56,236,0.6)]',
  },
  {
    num: '03',
    title: 'Impact.',
    desc: 'Every identity should leave a mark.',
    numberClass: 'text-[#E9ECEF] group-hover:drop-shadow-[0_0_8px_rgba(233,236,239,0.5)]',
  },
]

export const HeroAboutExperience: React.FC = () => {
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const [heroActive, setHeroActive] = useState(true)

  // Hero refs
  const tagRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)

  // About refs
  const aboutHeadingRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(([entry]) => {
      setHeroActive(entry.isIntersecting)
    })
    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  // ─── Hero Staggered GSAP Entrance Animation ───
  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(tagRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(h1Ref.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.85 }, 0.35)
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75 }, 0.6)
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.8)
        .fromTo(metricsRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.0)
        .fromTo(
          '.hero-philosophy-number',
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
          1.03,
        )
        .fromTo(
          '.hero-philosophy-divider',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out' },
          1.12,
        )
        .fromTo(
          '.hero-philosophy-title',
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.08, ease: 'power3.out' },
          1.3,
        )
        .fromTo(
          '.hero-philosophy-description',
          { autoAlpha: 0, y: 7 },
          { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.08, ease: 'power3.out' },
          1.42,
        )
        .fromTo(
          '.hero-philosophy-footer',
          { autoAlpha: 0, y: 6 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' },
          1.65,
        )
        .fromTo(bottomBarRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.2)
    }, heroRef)

    return () => ctx.revert()
  }, [reduced])

  // ─── About GSAP Scroll Reveal Animation ───
  useEffect(() => {
    if (reduced || !aboutRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(aboutHeadingRef.current, { autoAlpha: 0, x: -50 })
      gsap.set('.philosophy-principle-item', { autoAlpha: 0, x: 52 })
      gsap.set('.about-meta-tags', { autoAlpha: 0, x: 30 })
      gsap.set('.about-bottom-accent', { autoAlpha: 0 })

      gsap.to([heroContentRef.current, bottomBarRef.current], {
      autoAlpha: 0,
      y: -20,
      ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top bottom',
        end: 'top 44%',
          scrub: 0.6,
        },
      })

      const reveal = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 44%',
        end: 'top top',
        scrub: 0.6,
      },
      })

      reveal
      .to(aboutHeadingRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
        .fromTo(
          '.philosophy-principle-item',
          { autoAlpha: 0, x: 52 },
          {
            autoAlpha: 1,
            x: 0,
          duration: 0.45,
            ease: 'power3.out',
          stagger: 0.1,
          },
        0
        )
        .to(
        ['.about-meta-tags', '.about-bottom-accent'],
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.25,
            ease: 'power3.out',
          },
        '>-0.1'
        )
    }, aboutRef)

    return () => ctx.revert()
  }, [reduced])

  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      id="hero-about-experience"
      className="relative w-full"
    >
      <div
        data-neutron-star-source
        data-energy-charge="0"
        className="fixed inset-0 z-0 pointer-events-none bg-[#212529]"
        style={{ display: heroActive ? 'block' : 'none' }}
      >
        <AsciiStream active={heroActive} className="z-0" />
      </div>

      {/* ═══ Content Stream Layer (Hero + About) ═══ */}
      <div className="relative z-10">
        {/* ─── 01 // HERO SECTION ─── */}
        <section
          ref={heroRef}
          id="hero"
          className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-5 sm:pb-6"
        >
          {/* Main Hero Grid */}
          <div ref={heroContentRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Typography & Action CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-5 pt-2 lg:pt-0">
              {/* Category Tag */}
              <div ref={tagRef} className="flex items-center gap-2.5">
                <span className="section-label text-brand-ash/80">
                  CREATIVE DIGITAL STUDIO
                </span>
                <span className="w-8 h-[1.5px] bg-[#FB5607] rounded-full shadow-[0_0_8px_#FB5607]" />
              </div>

              {/* Headline */}
              <h1
                ref={h1Ref}
                className="heading-hero text-brand-ash"
              >
                Ideas deserve
                <br />
                an{' '}
                <span
                  className="text-[#FB5607] neon-text-orange italic font-normal"
                  style={{ fontStyle: 'italic' }}
                >
                  identity.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                ref={subRef}
                className="text-hero-desc text-muted max-w-lg"
              >
                Weaving creativity, strategy and technology into digital experiences that make brands unforgettable.
              </p>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav('#contact')
                  }}
                  data-cursor="special"
                  className="btn-text inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FB5607] text-[#0C0E10]
                             shadow-[0_0_20px_rgba(251,86,7,0.45)] hover:shadow-[0_0_30px_rgba(251,86,7,0.65)]
                             hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold"
                >
                  Start a Project <ArrowUpRight size={15} />
                </a>
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav('#portfolio')
                  }}
                  className="btn-text inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181B1F]/70 backdrop-blur-md text-brand-ash
                             border border-brand-ash/15 hover:border-[#8338EC]/50 hover:bg-[#23272D]/80 transition-all duration-300"
                >
                  Explore Our Work
                </a>
              </div>

              {/* Philosophy statement replaces the former metrics band */}
              <div
                ref={metricsRef}
                aria-labelledby="hero-philosophy-label"
                className="w-full max-w-md border-t border-brand-ash/10 pt-3.5 sm:pt-4"
              >
                <h2
                  id="hero-philosophy-label"
                  className="section-label mb-3 text-[9px] tracking-[0.16em] text-muted sm:mb-3.5"
                >
                  01 — OUR PHILOSOPHY
                </h2>

                <div className="grid grid-cols-1 min-[480px]:grid-cols-3">
                  {HERO_PHILOSOPHY.map((item, index) => (
                    <article
                      key={item.num}
                      className="group relative grid min-w-0 grid-cols-[2.35rem_minmax(0,1fr)] items-start gap-x-3 border-b border-brand-ash/10 py-2.5 last:border-b-0 min-[480px]:block min-[480px]:border-0 min-[480px]:px-3 min-[480px]:py-0"
                    >
                      {index > 0 && (
                        <span
                          aria-hidden="true"
                          className="hero-philosophy-divider absolute left-0 top-0 hidden h-full w-px bg-brand-ash/20 min-[480px]:block"
                        />
                      )}
                      <span
                        className={`hero-philosophy-number row-span-2 block font-playfair text-[1.75rem] font-light leading-none tracking-[-0.06em] transition-[filter,opacity] duration-300 group-hover:brightness-125 motion-reduce:transition-none min-[480px]:mb-1.5 min-[480px]:row-auto ${item.numberClass}`}
                      >
                        {item.num}
                      </span>
                      <h3 className="hero-philosophy-title col-start-2 font-playfair text-[1.2rem] font-medium leading-tight tracking-[-0.035em] text-brand-ash min-[480px]:mb-1 min-[480px]:col-auto">
                        {item.title}
                      </h3>
                      <p className="hero-philosophy-description col-start-2 pt-0.5 font-manrope text-[11px] font-normal leading-[1.45] text-muted min-[480px]:col-auto min-[480px]:pt-0">
                        {item.desc}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="hero-philosophy-footer mt-2.5 flex items-center justify-between gap-3 border-t border-brand-ash/[0.08] pt-2.5 font-grotesk text-[8px] uppercase tracking-[0.12em] text-muted sm:text-[9px]">
                  <span>THOUGHTFULLY CREATED.</span>
                  <span>INTENTIONALLY BUILT.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Open focal space for the ASCII light stream */}
            <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[440px] lg:h-[540px] pointer-events-none" />
          </div>

          {/* Bottom Status & Scroll Indicator Bar */}
          <div
            ref={bottomBarRef}
            className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between pt-4 border-t border-brand-ash/[0.06]"
          >
            <div className="hidden sm:block w-36" />
            <button
              onClick={() => handleNav('#about')}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              aria-label="Scroll to explore philosophy"
            >
              <div className="w-3.5 h-6 rounded-full border border-brand-ash/40 flex items-start justify-center p-0.5 group-hover:border-[#FB5607] transition-colors">
                <span className="w-0.5 h-1.5 bg-[#FB5607] rounded-full animate-bounce" />
              </div>
              <span className="font-manrope text-[11px] text-muted tracking-wider group-hover:text-brand-ash transition-colors">
                Scroll to Explore
              </span>
              <ChevronDown size={12} className="text-[#FB5607] animate-pulse" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-px bg-brand-ash/20" />
              <span className="font-grotesk text-[10px] tracking-[0.14em] text-muted uppercase">
                WHERE IDEAS ARE WOVEN INTO IDENTITY.
              </span>
            </div>
          </div>
        </section>

        {/* ─── 02 // ABOUT SECTION (OUR PHILOSOPHY) ─── */}
        <section
          ref={aboutRef}
          id="about"
          className="relative w-full py-12 sm:py-16 px-4 lg:px-8 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Heading */}
            <div ref={aboutHeadingRef} className="mb-8 max-w-2xl">              <div className="flex items-center gap-3 mb-4">                <span className="section-label text-muted">
                  02 / OUR PHILOSOPHY
                </span>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#FB5607] to-[#8338EC] rounded-full shadow-[0_0_8px_#FB5607]" />
              </div>
              <h2 className="heading-section text-[clamp(2.4rem,3.8vw,3.6rem)] leading-[1.06] text-brand-ash mb-4">
                The Beliefs That
                <br />
                Shape{' '}
                <span className="text-[#FB5607] neon-text-orange italic font-normal" style={{ fontStyle: 'italic' }}>
                  Our
                </span>{' '}
                <span className="text-[#8338EC] neon-text-purple italic font-normal" style={{ fontStyle: 'italic' }}>
                  Work.
                </span>
              </h2>
              <p className="text-body text-[clamp(0.9rem,1vw,1rem)] leading-[1.55] text-muted max-w-lg">
                A few core beliefs that guide every idea we create, every project we build and every brand we work with.
              </p>
            </div>

            {/* Two-column layout: visual breathing room on the left, principles on the right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Visual breathing room */}
              <div className="hidden lg:block lg:col-span-5 h-[300px] pointer-events-none" />

              {/* Right Column: Four Philosophy Principles */}
              <div ref={principlesRef} className="lg:col-span-7 flex flex-col justify-between h-full">
                <div className="divide-y divide-brand-ash/[0.08]">
                  {PHILOSOPHY_PRINCIPLES.map((p) => {
                    const isOrange = p.accent === 'orange'
                    const accentHex = isOrange ? '#FB5607' : '#8338EC'
                    const IconComponent = p.Icon

                    return (
                      <div
                        key={p.num}
                        className="philosophy-principle-item group py-3.5 sm:py-4 flex items-start gap-3 transition-all duration-300"
                      >
                        {/* Glowing Glass Icon Badge */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: isOrange
                              ? 'linear-gradient(135deg, rgba(251,86,7,0.18), rgba(24,27,31,0.7))'
                              : 'linear-gradient(135deg, rgba(131,56,236,0.18), rgba(24,27,31,0.7))',
                            backdropFilter: 'blur(16px)',
                            border: `1px solid ${accentHex}40`,
                            boxShadow: `0 0 20px -5px ${accentHex}35, inset 0 1px 0 rgba(255,255,255,0.08)`,
                          }}
                        >
                          <IconComponent
                            size={18}
                            style={{
                              color: accentHex,
                              filter: `drop-shadow(0 0 8px ${accentHex}90)`,
                            }}
                          />
                        </div>

                        {/* Content Block */}
                        <div className="flex-1 flex flex-col gap-0.5 pt-0.5">
                          <div className="flex items-center gap-3">
                            <span className="font-grotesk text-xs text-muted font-semibold tracking-wider">
                              {p.num}
                            </span>
                            <div
                              className="w-[2px] h-3.5 rounded-full"
                              style={{
                                background: accentHex,
                                boxShadow: `0 0 6px ${accentHex}`,
                              }}
                            />
                            <h3 className="card-heading text-[clamp(1rem,1.3vw,1.2rem)] leading-tight text-brand-ash tracking-tight group-hover:text-brand-ash transition-colors">
                              {p.title}
                            </h3>
                          </div>
                          <p className="card-desc text-[clamp(0.84rem,1vw,0.95rem)] leading-[1.5] text-muted pl-7">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Meta Tags */}
                <div className="about-meta-tags pt-4 border-t border-brand-ash/[0.08] flex items-center justify-between text-muted font-grotesk text-[10px] tracking-[0.12em] uppercase">
                  <span>STRATEGY</span>
                  <span>/</span>
                  <span>DESIGN</span>
                  <span>/</span>
                  <span>TECHNOLOGY</span>
                  <span>/</span>
                  <span>TOGETHER</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Accent Line */}
          <div className="about-bottom-accent max-w-7xl mx-auto mt-8">
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#FB5607] to-[#8338EC] rounded-full opacity-60" />
          </div>
        </section>
      </div>
    </div>
  )
}
