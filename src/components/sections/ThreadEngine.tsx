import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Target,
  Layers,
  Box,
  Rocket,
  TrendingUp,
  Play,
  ArrowUpRight,
  Laptop,
  Megaphone,
  Users,
  Video,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { NeutronStarTransfer } from '../ui/NeutronStarTransfer'

gsap.registerPlugin(ScrollTrigger)

interface StepData {
  num: string
  title: string
  desc: string
  accent: 'orange' | 'purple'
  icon: LucideIcon
}

const STEPS: StepData[] = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understand your goals, audience and core requirements.',
    accent: 'orange',
    icon: Target,
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Shape the right strategy, creative direction and execution roadmap.',
    accent: 'purple',
    icon: Layers,
  },
  {
    num: '03',
    title: 'Create',
    desc: 'Design, develop and produce the required assets and experiences.',
    accent: 'orange',
    icon: Box,
  },
  {
    num: '04',
    title: 'Deliver',
    desc: 'Launch, publish and set everything live across the right platforms.',
    accent: 'purple',
    icon: Rocket,
  },
  {
    num: '05',
    title: 'Grow',
    desc: 'Track, optimize and scale for long-term compounding results.',
    accent: 'orange',
    icon: TrendingUp,
  },
]

const SERVICE_TAGS = [
  { label: 'Websites', icon: Laptop },
  { label: 'Marketing', icon: Megaphone },
  { label: 'Social Media', icon: Users },
  { label: 'Content', icon: Video },
  { label: 'And More', icon: Sparkles },
]

export const ThreadEngine: React.FC = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const fanRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [poweredCardCount, setPoweredCardCount] = useState(0)
  const [ignitingCardIndexes, setIgnitingCardIndexes] = useState<number[]>([])

  const handleEnergyActivationChange = useCallback(
    (count: number, ignitingIndex: number) => {
      setPoweredCardCount(count)
      setIgnitingCardIndexes((current) => {
        const stillPowered = current.filter((index) => index < count)
        return ignitingIndex >= 0 && !stillPowered.includes(ignitingIndex)
          ? [...stillPowered, ignitingIndex]
          : stillPowered
      })
    },
    [],
  )

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Left side text reveal
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      )

      // Stagger the Approach card reveal
      gsap.fromTo(
        '.approach-fan-card',
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          onComplete: () => {
            window.dispatchEvent(new Event('neutron-star-transfer-layout'))
          },
          scrollTrigger: {
            trigger: fanRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Bottom banner
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <>
      <NeutronStarTransfer onActivationChange={handleEnergyActivationChange} />
    <section
      ref={sectionRef}
      id="the-engine"
      className="relative w-full py-24 sm:py-32 px-6 lg:px-16 bg-[#0a0c0d] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ── Main Two-Column Stage ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Editorial Context */}
          <div ref={leftRef} className="lg:col-span-5 flex flex-col items-start gap-6">
            {/* Top Badge: 01 / OUR APPROACH */}
            <div className="inline-flex items-center gap-3">
              <span className="section-label text-[#8824FF]">
                01 / OUR APPROACH
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-[#8824FF] to-transparent" />
            </div>

            {/* Headline */}
            <h2 className="heading-section text-[#E9ECEF]">
              From the first idea
              <br />
              to a{' '}
              <span className="text-[#FF5400] neon-text-orange italic font-normal" style={{ fontStyle: 'italic' }}>
                lasting identity.
              </span>
            </h2>

            {/* Description */}
            <p className="text-body text-[#E9ECEF]/70 max-w-lg">
              A structured, creative and collaborative process that turns your goals into a
              complete digital experience, for any platform, any audience and any business need.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA */}
              <a
                href="#contact"
                className="btn-text inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[#0C0E10] bg-[#FF5400] shadow-[0_0_25px_rgba(255,84,0,0.45)] hover:shadow-[0_0_40px_rgba(255,84,0,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>See How We Work</span>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>

              {/* Play Video Trigger */}
              <button
                type="button"
                onClick={() => {
                  const target = document.querySelector('#services')
                  target?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-text inline-flex items-center gap-3 px-5 py-3 rounded-full text-[#E9ECEF] hover:text-[#FF5400] bg-[#181B1F]/60 hover:bg-[#181B1F] border border-[#E9ECEF]/10 hover:border-[#FF5400]/40 backdrop-blur-md transition-all duration-300 group"
              >
                <span className="w-7 h-7 rounded-full bg-[#FF5400]/15 group-hover:bg-[#FF5400] flex items-center justify-center text-[#FF5400] group-hover:text-[#0C0E10] transition-colors duration-300">
                  <Play size={12} className="ml-0.5 fill-current" />
                </span>
                <span>Our Process &bull; 1:24</span>
              </button>
            </div>
          </div>

          {/* Right Column: Responsive square Approach cards */}
          <div
            ref={fanRef}
            className="lg:col-span-7 relative pt-8 pb-12 overflow-visible"
          >
            <div className="grid grid-cols-1 min-[480px]:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 items-stretch relative z-[31]">
              {STEPS.map((step, idx) => {
                const isOrange = step.accent === 'orange'
                const accentColor = isOrange ? '#FF5400' : '#8824FF'
                const isHovered = activeCard === idx
                const isPowered = idx < poweredCardCount
                const isIgniting =
                  ignitingCardIndexes.includes(idx) && !reduced
                const energyColor = idx % 2 === 0 ? '#FB5607' : '#8338EC'
                const placementClass =
                  idx === 3
                    ? 'md:col-start-2'
                    : idx === 4
                      ? 'min-[480px]:col-start-2 md:col-start-4'
                      : ''
                const IconComponent = step.icon

                return (
                  <div
                    key={step.num}
                    data-approach-card={step.num}
                    className={`approach-fan-card group relative col-span-1 min-[480px]:col-span-2 flex aspect-square min-h-0 flex-col justify-between rounded-none p-3 sm:p-4 cursor-pointer transition-all duration-500 ease-out ${placementClass} ${isPowered ? 'approach-energy-powered' : ''} ${isIgniting ? 'approach-energy-ignition' : ''}`}
                    style={{
                      filter: isPowered
                        ? 'grayscale(0) brightness(1)'
                        : 'grayscale(1) brightness(0.72)',
                      background: isHovered
                        ? 'linear-gradient(180deg, rgba(35,39,45,0.88) 0%, rgba(18,20,23,0.92) 100%)'
                        : isPowered
                          ? `linear-gradient(180deg, ${energyColor}18 0%, rgba(24,27,31,0.78) 48%, rgba(12,14,16,0.82) 100%)`
                          : 'linear-gradient(180deg, rgba(24,27,31,0.68) 0%, rgba(12,14,16,0.78) 100%)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: isHovered
                        ? `1px solid ${accentColor}90`
                        : isPowered
                          ? `1px solid ${energyColor}90`
                          : '1px solid rgba(233,236,239,0.11)',
                      boxShadow: isHovered
                        ? `0 0 35px -5px ${accentColor}55, 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.18)`
                        : isPowered
                          ? `0 0 30px -14px ${energyColor}90, 0 12px 30px rgba(0,0,0,0.35), inset 0 0 24px ${energyColor}14, inset 0 1px 0 rgba(255,255,255,0.08)`
                          : '0 12px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
                      transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                      transformOrigin: 'center center',
                      zIndex: isHovered ? 30 : idx + 1,
                    }}
                    onMouseEnter={() => setActiveCard(idx)}
                    onMouseLeave={() => setActiveCard(null)}
                    onAnimationEnd={(event) => {
                      if (
                        event.target === event.currentTarget &&
                        event.animationName === 'neutron-card-ignition'
                      ) {
                        setIgnitingCardIndexes((current) =>
                          current.filter((index) => index !== idx),
                        )
                      }
                    }}
                    onTransitionEnd={(event) => {
                      if (event.propertyName === 'transform') {
                        window.dispatchEvent(
                          new Event('neutron-star-transfer-layout'),
                        )
                      }
                    }}
                  >
                    {/* Top Edge Neon Color Glow */}
                    <div
                      className="absolute top-0 left-4 right-4 h-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                        boxShadow: `0 0 12px ${accentColor}`,
                      }}
                    />

                    {/* Atmospheric internal radial glow on hover */}
                    <div
                      className={`absolute inset-0 rounded-none pointer-events-none transition-opacity duration-500 ${isPowered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{
                        background: `radial-gradient(circle at 50% 20%, ${isPowered ? `${energyColor}24` : `${accentColor}18`} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Card Content Top: 3D-styled luminous Icon badge */}
                    <div className="relative z-10 flex flex-col items-start gap-2 sm:gap-3">
                      <div
                        className={`approach-energy-icon flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 sm:h-10 sm:w-10 ${isPowered ? 'approach-energy-icon-powered' : ''}`}
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}25 0%, rgba(28,32,36,0.6) 100%)`,
                          border: `1px solid ${isPowered ? `${energyColor}90` : `${accentColor}50`}`,
                          boxShadow: isPowered
                            ? `0 0 22px -4px ${energyColor}90, inset 0 0 12px ${energyColor}18, inset 0 1px 0 rgba(255,255,255,0.15)`
                            : `0 0 20px -3px ${accentColor}40, inset 0 1px 0 rgba(255,255,255,0.15)`,
                        }}
                      >
                        <IconComponent
                          size={18}
                          color={accentColor}
                          className="transition-colors duration-300"
                        />
                      </div>

                      {/* Stage Index Pill */}
                      <span
                        className="font-grotesk text-xs font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded-md"
                        style={{
                          color: accentColor,
                          background: `${accentColor}15`,
                          border: `1px solid ${accentColor}30`,
                        }}
                      >
                        {step.num}
                      </span>
                    </div>

                    {/* Card Content Bottom: Title & Description */}
                    <div className="relative z-10 flex flex-col gap-1.5 pt-3 sm:pt-4">
                      <h3 className="card-heading text-[15px] text-[#E9ECEF] transition-colors group-hover:text-white sm:text-base">
                        {step.title}
                      </h3>
                      <p className="card-desc text-[11px] leading-snug text-[#E9ECEF]/70 transition-colors group-hover:text-[#E9ECEF]/90 sm:text-xs">
                        {step.desc}
                      </p>

                      {/* Active indicator bar */}
                      <div
                        className="w-full h-0.5 mt-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                        style={{ background: accentColor }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom Banner: [ A Flexible Process. For Every Service. ] ── */}
        <div
          ref={bannerRef}
          className="relative rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(24,27,31,0.7) 0%, rgba(12,14,16,0.85) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(233,236,239,0.12)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Subtle neon horizontal gradient rail */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5400]/40 to-transparent pointer-events-none" />

          {/* Left Title */}
          <div className="flex items-center gap-3">
            <span className="font-playfair text-base sm:text-lg font-semibold text-[#E9ECEF] tracking-tight">
              A Flexible Process. For Every Service.
            </span>
          </div>

          {/* Category Icons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {SERVICE_TAGS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C0E10]/60 hover:bg-[#181B1F] border border-[#E9ECEF]/10 hover:border-[#FF5400]/40 transition-all duration-200 group"
                >
                  <Icon size={14} className="text-[#FF5400] group-hover:scale-110 transition-transform" />
                  <span className="font-manrope text-xs text-[#E9ECEF]/80 group-hover:text-[#E9ECEF] font-medium">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
