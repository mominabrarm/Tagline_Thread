import React, { useEffect, useRef, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { HeroScene } from '../three/HeroScene'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// WebGL Fallback Artwork
const HeroFallback: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative w-full h-full overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="og" cx="40%" cy="50%">
            <stop offset="0%" stopColor="#FF5400" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF5400" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pg" cx="75%" cy="30%">
            <stop offset="0%" stopColor="#8824FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8824FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#og)" />
        <rect width="800" height="600" fill="url(#pg)" />
        <path d="M100 300 C200 150, 300 450, 400 300 S 600 150, 700 300" stroke="#FF5400" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.6" />
        <path d="M100 350 C180 200, 320 480, 420 320 S 580 180, 700 350" stroke="#8824FF" strokeWidth="1.2" strokeDasharray="5 7" opacity="0.5" />
      </svg>
    </div>
  </div>
)

// WebGL Canvas wrapper for 3D Laptop Model
const HeroCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 2.5], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  )
}

export const Hero: React.FC = () => {
  const reduced = useReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const [webGLFailed, setWebGLFailed] = useState(false)

  // Staggered Entrance animation
  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(tagRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(h1Ref.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.85 }, 0.35)
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75 }, 0.6)
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.8)
        .fromTo(metricsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo(bottomBarRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.2)
    })
    return () => ctx.revert()
  }, [reduced])

  // Detect WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebGLFailed(true)
    } catch {
      setWebGLFailed(true)
    }
  }, [])

  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-5 sm:pb-6 bg-[#101519]"
    >
      {/* Main Hero Layout: Two-Column Composition (Ref: Image 1) */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-0 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-15 items-center"
      >
        {/* Left Column (6 cols): Editorial Typography & Conversion CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-5 pt-2 lg:pt-0 relative lg:-left-12">
          {/* Label + Orange Line (Ref: Image 1) */}
          <div ref={tagRef} className="flex items-center gap-2.5">
            <span className="section-label text-brand-ash/80">
              CREATIVE DIGITAL STUDIO
            </span>
            <span className="w-8 h-[1.5px] bg-brand-orange rounded-full shadow-[0_0_6px_#FF5400]" />
          </div>

          {/* Headline (Ref: Image 1) */}
          <h1
            ref={h1Ref}
            className="heading-hero text-brand-ash"
          >
            Ideas deserve
            <br />
            an{' '}
            <span
              className="text-brand-orange neon-text-orange italic font-normal"
              style={{ fontStyle: 'italic' }}
            >
              identity.
            </span>
          </h1>

          {/* Subtitle (Ref: Image 1) */}
          <p
            ref={subRef}
            className="text-hero-desc text-muted max-w-lg"
          >
            Weaving creativity, strategy and technology into digital experiences that make brands unforgettable.
          </p>

          {/* CTA Buttons (Ref: Image 1) */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('#contact')
              }}
              data-cursor="special"
              className="btn-text inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange text-[#0C0E10]
                         shadow-[0_0_20px_rgba(255,84,0,0.45)] hover:shadow-[0_0_30px_rgba(255,84,0,0.65)]
                         hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Start a Project <ArrowUpRight size={15} />
            </a>
            <a
              href="#our-work"
              onClick={(e) => {
                e.preventDefault()
                handleNav('#our-work')
              }}
              className="btn-text inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181B1F]/70 backdrop-blur-md text-brand-ash
                         border border-brand-ash/15 hover:border-brand-purple/50 hover:bg-surface-high/80 transition-all duration-300"
            >
              Explore Our Work
            </a>
          </div>

          {/* Bottom Metrics Strip (Ref: Image 1) */}
          <div ref={metricsRef} className="flex items-center gap-7 sm:gap-10 pt-4 border-t border-brand-ash/10 w-full max-w-md">
            <div>
              <div className="font-grotesk text-2xl sm:text-3xl font-semibold text-brand-orange tracking-tight">
                5+
              </div>
              <div className="font-manrope text-xs text-muted pt-0.5 font-normal">
                Core Services
              </div>
            </div>
            <div className="w-px h-7 bg-brand-ash/10" />
            <div>
              <div className="font-grotesk text-2xl sm:text-3xl font-semibold text-brand-ash tracking-tight">
                50+
              </div>
              <div className="font-manrope text-xs text-muted pt-0.5 font-normal">
                Projects Delivered
              </div>
            </div>
            <div className="w-px h-7 bg-brand-ash/10" />
            <div>
              <div className="font-grotesk text-2xl sm:text-3xl font-semibold text-brand-purple tracking-tight">
                100%
              </div>
              <div className="font-manrope text-xs text-muted pt-0.5 font-normal">
                Client Focused
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): 3D Laptop on Volcanic Rock Platform (Ref: Image 1) */}
        <div className="lg:col-span-6 relative w-full h-[414px] sm:h-[483px] lg:h-[575px] flex items-center justify-center">
          <div className="absolute inset-y-0 -left-[15%] -right-[15%]">
            {webGLFailed ? <HeroFallback /> : <HeroCanvas />}
          </div>
        </div>
      </div>

      {/* Bottom Status & Scroll Indicator Bar (Ref: Image 1) */}
      <div
        ref={bottomBarRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between pt-4 border-t border-brand-ash/[0.06]"
      >
        {/* Empty left spacer */}
        <div className="hidden sm:block w-36" />

        {/* Center Scroll Indicator (Ref: Image 1) */}
        <button
          onClick={() => handleNav('#about')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="Scroll to explore philosophy"
        >
          {/* Vertical mouse pill with dot */}
          <div className="w-3.5 h-6 rounded-full border border-brand-ash/40 flex items-start justify-center p-0.5 group-hover:border-brand-orange transition-colors">
            <span className="w-0.5 h-1.5 bg-brand-orange rounded-full animate-bounce" />
          </div>
          <span className="font-manrope text-[11px] text-muted tracking-wider group-hover:text-brand-ash transition-colors">
            Scroll to Explore
          </span>
          <ChevronDown size={12} className="text-brand-orange animate-pulse" />
        </button>

        {/* Right Brand Declaration (Ref: Image 1) */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-px bg-brand-ash/20" />
          <span className="font-grotesk text-[10px] tracking-[0.14em] text-muted uppercase">
            WHERE IDEAS ARE WOVEN INTO IDENTITY.
          </span>
        </div>
      </div>
    </section>
  )
}
