import React, { useEffect, useRef, useState } from 'react'
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

gsap.registerPlugin(ScrollTrigger)

interface StepData {
  num: string
  title: string
  desc: string
  accent: 'orange' | 'purple'
  icon: LucideIcon
  elevate: number // pixel offset for ascending fan
  rotateZ: number
}

const STEPS: StepData[] = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understand your goals, audience and core requirements.',
    accent: 'orange',
    icon: Target,
    elevate: 40,
    rotateZ: -3,
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Shape the right strategy, creative direction and execution roadmap.',
    accent: 'purple',
    icon: Layers,
    elevate: 20,
    rotateZ: -1.5,
  },
  {
    num: '03',
    title: 'Create',
    desc: 'Design, develop and produce the required assets and experiences.',
    accent: 'orange',
    icon: Box,
    elevate: 0,
    rotateZ: 0,
  },
  {
    num: '04',
    title: 'Deliver',
    desc: 'Launch, publish and set everything live across the right platforms.',
    accent: 'purple',
    icon: Rocket,
    elevate: -20,
    rotateZ: 1.5,
  },
  {
    num: '05',
    title: 'Grow',
    desc: 'Track, optimize and scale for long-term compounding results.',
    accent: 'orange',
    icon: TrendingUp,
    elevate: -40,
    rotateZ: 3,
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

      // 5-card ascending fan stagger reveal
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
          scrollTrigger: {
            trigger: fanRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Thread spline path draw-in
      gsap.fromTo(
        '.approach-thread-line',
        { strokeDashoffset: 1200 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.out',
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
    <section
      ref={sectionRef}
      id="the-engine"
      className="relative w-full py-24 sm:py-32 px-6 lg:px-16 bg-[#101519] overflow-hidden"
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

          {/* Right Column: 5-Card Ascending Diagonal 3D Perspective Fan */}
          <div
            ref={fanRef}
            className="lg:col-span-7 relative pt-8 pb-12 overflow-visible"
            style={{ perspective: '1200px' }}
          >
            {/* Continuous Glowing Neon Thread Ribbon */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 650 380"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="fanRibbonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF5400" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#8824FF" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#FF5400" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E9ECEF" stopOpacity="0.7" />
                </linearGradient>
                <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Ambient Path */}
              <path
                d="M 20 280 C 130 320, 180 200, 270 210 S 420 130, 490 100 S 580 40, 630 60"
                stroke="url(#fanRibbonGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#ribbonGlow)"
                className="opacity-70"
              />

              {/* Crisp Center Kinetic Fiber */}
              <path
                d="M 20 280 C 130 320, 180 200, 270 210 S 420 130, 490 100 S 580 40, 630 60"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
                fill="none"
                className="approach-thread-line opacity-85"
                style={{ strokeDasharray: 1200 }}
              />
            </svg>

            {/* 5 Tall Glass Cards in Ascending Diagonal Fan */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-3 lg:gap-4 items-end relative z-10">
              {STEPS.map((step, idx) => {
                const isOrange = step.accent === 'orange'
                const accentColor = isOrange ? '#FF5400' : '#8824FF'
                const isHovered = activeCard === idx
                const IconComponent = step.icon

                return (
                  <div
                    key={step.num}
                    className="approach-fan-card group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-500 ease-out min-h-[300px] sm:min-h-[360px]"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(180deg, rgba(35,39,45,0.88) 0%, rgba(18,20,23,0.92) 100%)'
                        : 'linear-gradient(180deg, rgba(24,27,31,0.68) 0%, rgba(12,14,16,0.78) 100%)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: isHovered
                        ? `1px solid ${accentColor}90`
                        : '1px solid rgba(233,236,239,0.11)',
                      boxShadow: isHovered
                        ? `0 0 35px -5px ${accentColor}55, 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.18)`
                        : '0 12px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
                      transform: isHovered
                        ? `translateY(${step.elevate - 14}px) rotateZ(0deg) scale(1.05)`
                        : `translateY(${step.elevate}px) rotateZ(${step.rotateZ}deg) scale(1)`,
                      transformOrigin: 'bottom center',
                      zIndex: isHovered ? 30 : idx + 1,
                    }}
                    onMouseEnter={() => setActiveCard(idx)}
                    onMouseLeave={() => setActiveCard(null)}
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
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 20%, ${accentColor}18 0%, transparent 70%)`,
                      }}
                    />

                    {/* Card Content Top: 3D-styled luminous Icon badge */}
                    <div className="relative z-10 flex flex-col items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}25 0%, rgba(28,32,36,0.6) 100%)`,
                          border: `1px solid ${accentColor}50`,
                          boxShadow: `0 0 20px -3px ${accentColor}40, inset 0 1px 0 rgba(255,255,255,0.15)`,
                        }}
                      >
                        <IconComponent
                          size={22}
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
                    <div className="relative z-10 flex flex-col gap-2 pt-6">
                      <h3 className="card-heading text-[#E9ECEF] group-hover:text-white transition-colors">
                        {step.title}
                      </h3>
                      <p className="card-desc text-[#E9ECEF]/70 leading-relaxed group-hover:text-[#E9ECEF]/90 transition-colors">
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
  )
}
