import React, { useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { HeroScene } from '../three/HeroScene'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// WebGL fallback
const HeroFallback: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative w-full h-full overflow-hidden">
      {/* Static SVG thread art */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="og" cx="40%" cy="50%">
            <stop offset="0%" stopColor="#FB5607" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FB5607" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pg" cx="75%" cy="30%">
            <stop offset="0%" stopColor="#8338EC" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8338EC" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#og)" />
        <rect width="800" height="600" fill="url(#pg)" />
        {/* Thread lines */}
        <path d="M100 300 C200 150, 300 450, 400 300 S 600 150, 700 300" stroke="#FB5607" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.5" />
        <path d="M100 350 C180 200, 320 480, 420 320 S 580 180, 700 350" stroke="#8338EC" strokeWidth="1" strokeDasharray="5 7" opacity="0.4" />
        <path d="M100 250 C220 400, 340 100, 460 280 S 620 420, 720 250" stroke="#FB5607" strokeWidth="0.8" strokeDasharray="3 9" opacity="0.3" />
        {/* Nodes */}
        <circle cx="400" cy="300" r="8" fill="#FB5607" opacity="0.9" />
        <circle cx="240" cy="210" r="5" fill="#8338EC" opacity="0.8" />
        <circle cx="560" cy="390" r="4" fill="#FB5607" opacity="0.7" />
        <circle cx="160" cy="340" r="3" fill="#8338EC" opacity="0.6" />
        {/* Wireframe shapes */}
        <polygon points="400,220 430,280 370,280" stroke="#FB5607" strokeWidth="1" fill="none" opacity="0.4" />
        <rect x="520" y="250" width="50" height="50" stroke="#8338EC" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(20 545 275)" />
        <circle cx="240" cy="360" r="30" stroke="#8338EC" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>
    </div>
  </div>
)

// WebGL Canvas wrapper with error boundary behaviour
const HeroCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
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
  const reduced        = useReducedMotion()
  const contentRef     = useRef<HTMLDivElement>(null)
  const badgeRef       = useRef<HTMLDivElement>(null)
  const h1Ref          = useRef<HTMLHeadingElement>(null)
  const subRef         = useRef<HTMLParagraphElement>(null)
  const ctaRef         = useRef<HTMLDivElement>(null)
  const cardRef        = useRef<HTMLDivElement>(null)
  const scrollRef      = useRef<HTMLDivElement>(null)
  const [webGLFailed, setWebGLFailed] = React.useState(false)

  // Entrance animation
  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(badgeRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(h1Ref.current,    { opacity: 0, y: 24  }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        .fromTo(subRef.current,   { opacity: 0, y: 16  }, { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        .fromTo(ctaRef.current,   { opacity: 0, y: 12  }, { opacity: 1, y: 0, duration: 0.6 }, 1.0)
        .fromTo(cardRef.current,  { opacity: 0, x: 24  }, { opacity: 1, x: 0, duration: 0.8 }, 0.6)
        .fromTo(scrollRef.current,{ opacity: 0        }, { opacity: 1,       duration: 0.5 }, 1.3)
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
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-20 pb-8"
    >
      {/* Atmospheric background glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] rounded-full bg-brand-purple/15 blur-[150px] pointer-events-none" />

      {/* WebGL / Fallback canvas */}
      <div className="absolute inset-0 opacity-55 pointer-events-none">
        {webGLFailed ? <HeroFallback /> : <HeroCanvas />}
      </div>

      {/* Top badge row */}
      <div ref={badgeRef} className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-6 lg:px-24 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card/70 backdrop-blur-xl"
             style={{ border: '1px solid rgba(233,236,239,0.1)' }}>
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping absolute" />
          <span className="w-2 h-2 rounded-full bg-brand-orange relative" />
          <span className="font-grotesk text-[11px] uppercase tracking-[0.1em] text-brand-ash/80">
            Creative Digital Agency&nbsp;•&nbsp;Futuristic Studio
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="font-mono text-xs text-muted">// EST. 2024</span>
        </div>
      </div>

      {/* Main hero content */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-24 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-10 lg:pt-0">
        {/* Text column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="inline-block px-3 py-1 rounded-md bg-surface-card/80 text-brand-purple font-grotesk text-[11px] tracking-widest uppercase">
            00 // The Kinetic Thread Engine
          </div>

          <h1 ref={h1Ref} className="font-syne text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02] text-brand-ash">
            Where Ideas Are{' '}
            <br className="hidden sm:block" />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #FB5607 0%, #E9ECEF 50%, #8338EC 100%)' }}
            >
              Woven Into Identity.
            </span>
          </h1>

          <p ref={subRef} className="font-geist text-lg text-muted max-w-xl leading-relaxed">
            We engineer high-conversion digital experiences, tactile brand systems, and living social ecosystems — transforming ambitious visions into cultural gravity.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-orange text-[#16181B]
                         font-grotesk text-sm font-bold uppercase tracking-widest
                         shadow-orange-glow hover:shadow-orange-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Start a Project <ArrowRight size={16} />
            </a>
            <a
              href="#our-work"
              onClick={e => { e.preventDefault(); handleNav('#our-work') }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-surface-card/60 backdrop-blur-md text-brand-ash
                         font-grotesk text-sm font-bold uppercase tracking-widest
                         border border-brand-ash/10 hover:bg-surface-high/80 transition-all duration-200"
            >
              Explore Showcase
            </a>
          </div>
        </div>

        {/* Right info card */}
        <div ref={cardRef} className="lg:col-span-5 flex flex-col gap-4">
          <div
            className="p-6 rounded-2xl bg-surface-card/75 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
            style={{ border: '1px solid rgba(233,236,239,0.08)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/18 transition-all duration-500" />

            <div className="flex items-center justify-between pb-3">
              <span className="font-grotesk text-[11px] uppercase tracking-[0.12em] text-brand-orange font-bold">Active System Core</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
              </span>
            </div>

            <div className="font-syne text-2xl font-bold text-brand-ash">100% Operational</div>
            <p className="font-geist text-sm text-muted pt-1.5">
              Synthesizing brand architecture, WebGL experiences, and audience acquisition pipelines.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-3 rounded-xl bg-surface-high/60">
                <span className="font-grotesk text-[10px] uppercase tracking-wider text-muted block">Delivery Speed</span>
                <span className="font-syne text-lg font-bold text-brand-ash">On Time</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-high/60">
                <span className="font-grotesk text-[10px] uppercase tracking-wider text-muted block">Brand Impact</span>
                <span className="font-syne text-lg font-bold text-brand-purple">Maximum</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-3 rounded-xl bg-surface-base/80 backdrop-blur-md"
               style={{ border: '1px solid rgba(233,236,239,0.06)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/15 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8 C4 4, 6 12, 8 8 S 12 4, 14 8" stroke="#FB5607" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-grotesk text-xs uppercase tracking-widest text-brand-ash">Multi-Disciplinary Studio</span>
            </div>
            <span className="font-grotesk text-[11px] text-brand-purple font-bold">EST. 2024</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-24 flex items-center justify-between pt-6">
        <div className="flex items-center gap-3">
          <span className="font-grotesk text-[11px] uppercase tracking-[0.12em] text-muted">Scroll to Unravel</span>
          <div className="w-12 h-px bg-muted/30" />
        </div>
        <button
          onClick={() => handleNav('#about')}
          className="w-10 h-10 rounded-full bg-surface-card flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-[#16181B] transition-colors"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={18} className="animate-bounce" />
        </button>
        <div className="hidden sm:block font-grotesk text-[11px] uppercase text-muted tracking-widest">
          Paradigm // Digital Fabric
        </div>
      </div>
    </section>
  )
}

