import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThreadScene } from '../three/ThreadScene'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    index: '// STAGE 01',
    title: 'Branding & Identity',
    desc:  'Geometrical marks, typography signatures & emotional retention.',
    log:   '// LOG: Generating cohesive geometric tokens and high-impact identity signatures.',
    accent: 'orange' as const,
  },
  {
    index: '// STAGE 02',
    title: 'Websites & Flagships',
    desc:  'Living responsive viewports, frictionless conversion, tactile UX.',
    log:   '// LOG: Compiling 60fps canvas viewport, responsive DOM tree, and instant checkout pathways.',
    accent: 'purple' as const,
  },
  {
    index: '// STAGE 03',
    title: 'Social Media Management',
    desc:  'Curated feeds, continuous cultural cadence, editorial calendars.',
    log:   '// LOG: Scheduling 30-day algorithmic video narrative assets across short-form platforms.',
    accent: 'purple' as const,
  },
  {
    index: '// STAGE 04',
    title: 'Social Media Marketing',
    desc:  'Dynamic hyper-targeted particle nets generating verified ROAS.',
    log:   '// LOG: Tracking real-time pixel telemetry, high-intent cohorts, and conversion funnel margins.',
    accent: 'orange' as const,
  },
  {
    index: '// SYNTHESIS',
    title: 'Unified Ecosystem',
    desc:  'All channels interconnected into a perpetual enterprise growth loop.',
    log:   '// LOG: Complete synchronization achieved. All 4 conduits feeding 360-degree brand authority.',
    accent: 'orange' as const,
  },
]

// SVG fallback for the thread engine visual area
const ThreadFallback: React.FC<{ stage: number }> = ({ stage }) => {
  const colors = ['#FB5607', '#8338EC', '#8338EC', '#FB5607', '#FB5607']
  const c = colors[stage]
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 300" fill="none" className="w-full max-w-sm opacity-70">
        <path d="M20 150 C100 60, 180 240, 260 150 S 360 60, 400 150" stroke={c} strokeWidth="2" strokeDasharray="8 4" />
        <path d="M20 150 C80 240, 180 60, 260 150 S 360 240, 400 150" stroke="#8338EC" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.6" />
        <circle cx="200" cy="150" r="12" fill={c} opacity="0.9" />
        <circle cx="200" cy="150" r="22" stroke={c} strokeWidth="1" fill="none" opacity="0.4" />
        <circle cx="100" cy="90" r="6" fill="#8338EC" opacity="0.7" />
        <circle cx="300" cy="210" r="6" fill={c} opacity="0.7" />
        <text x="200" y="260" textAnchor="middle" fill="#E9ECEF" fontFamily="Space Grotesk" fontSize="11" opacity="0.5">
          STAGE {String(stage + 1).padStart(2, '0')} // ACTIVE
        </text>
      </svg>
    </div>
  )
}

export const ThreadEngine: React.FC = () => {
  const reduced      = useReducedMotion()
  const sectionRef   = useRef<HTMLElement>(null)
  const [stage, setStage] = useState(0)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const [webGLOk, setWebGLOk] = useState(true)

  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      if (!c.getContext('webgl') && !c.getContext('experimental-webgl')) setWebGLOk(false)
    } catch { setWebGLOk(false) }
  }, [])

  // Auto-cycle
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStage(s => (s + 1) % STAGES.length)
    }, 5500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  // Scroll entrance
  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.engine-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.engine-header', start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const handleTabClick = (idx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setStage(idx)
    intervalRef.current = setInterval(() => setStage(s => (s + 1) % STAGES.length), 5500)
  }

  const currentStage = STAGES[stage]
  const accentColor  = currentStage.accent === 'orange' ? '#FB5607' : '#8338EC'
  const accentClass  = currentStage.accent === 'orange' ? 'text-brand-orange' : 'text-brand-purple'

  return (
    <section
      ref={sectionRef}
      id="the-engine"
      className="relative w-full py-24 px-6 lg:px-24 bg-brand-bg overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -right-32 top-1/2 w-96 h-96 bg-brand-orange/8 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-brand-purple/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="engine-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="section-label text-brand-purple">
              <span className="w-1 h-1 rounded-full bg-current inline-block" />
              02 // Signature Apparatus
            </div>
            <h2 className="font-syne text-4xl md:text-5xl font-bold text-brand-ash tracking-tight">
              The Thread Engine
            </h2>
            <p className="font-geist text-lg text-muted max-w-lg leading-relaxed">
              Interactive visualization of our unified ecosystem. Explore how distinct disciplines bind into one cohesive power circuit.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-full bg-surface-card/80 backdrop-blur-md"
               style={{ border: '1px solid rgba(233,236,239,0.06)' }}>
            <span className="px-4 py-1.5 rounded-full font-grotesk text-[11px] uppercase bg-brand-orange text-[#16181B] font-bold">
              Live Telemetry
            </span>
            <span className="px-4 py-1.5 font-grotesk text-[11px] uppercase text-muted">
              Engine Rev 4.2
            </span>
          </div>
        </div>

        {/* Main workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Stage tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {STAGES.map((s, i) => {
              const isActive = stage === i
              const tabAccent = s.accent === 'orange' ? '#FB5607' : '#8338EC'
              return (
                <button
                  key={i}
                  onClick={() => handleTabClick(i)}
                  className={`text-left p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'bg-surface-card shadow-card-hover'
                      : 'bg-surface-card/40 hover:bg-surface-card/70'
                  }`}
                  style={{
                    border: isActive
                      ? `1px solid ${tabAccent}40`
                      : '1px solid rgba(233,236,239,0.06)',
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-grotesk text-[11px] uppercase font-bold tracking-wider"
                      style={{ color: isActive ? tabAccent : 'rgba(155,163,175,0.7)' }}
                    >
                      {s.index}
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className={`transition-transform duration-200 ${isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                    >
                      <path d="M4 8h8M9 5l3 3-3 3" stroke={isActive ? tabAccent : '#9BA3AF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="font-syne text-base font-bold text-brand-ash mt-1">{s.title}</div>
                  <p className="font-geist text-xs text-muted mt-1 leading-relaxed">{s.desc}</p>
                </button>
              )
            })}
          </div>

          {/* Canvas viewport */}
          <div
            className="lg:col-span-8 p-5 rounded-2xl bg-surface-card/60 backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[440px]"
            style={{ border: '1px solid rgba(233,236,239,0.08)' }}
          >
            {/* HUD bar */}
            <div className="flex items-center justify-between pb-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-orange" />
                <span className="w-3 h-3 rounded-full bg-brand-purple" />
                <span className="w-3 h-3 rounded-full bg-muted/50" />
                <span className="font-grotesk text-xs font-bold uppercase text-brand-ash pl-2">
                  {`STAGE ${String(stage + 1).padStart(2, '0')} // ${currentStage.title.toUpperCase()} MONITOR`}
                </span>
              </div>
              <span
                className="font-mono text-[10px] px-2 py-1 rounded"
                style={{ background: `${accentColor}18`, color: accentColor }}
              >
                STATUS: SYNCED
              </span>
            </div>

            {/* 3D scene or fallback */}
            <div className="flex-1 relative z-10">
              {webGLOk && !reduced ? (
                <Canvas
                  camera={{ position: [0, 0, 3.5], fov: 55 }}
                  gl={{ antialias: true, alpha: true }}
                  style={{ background: 'transparent', height: '280px' }}
                  dpr={[1, 1.5]}
                >
                  <Suspense fallback={null}>
                    <ThreadScene stage={stage} />
                  </Suspense>
                </Canvas>
              ) : (
                <div style={{ height: '280px' }}>
                  <ThreadFallback stage={stage} />
                </div>
              )}
            </div>

            {/* SVG thread conduit */}
            <div className="relative z-10 mt-2 p-4 rounded-xl bg-surface-base/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`font-grotesk text-[11px] font-bold uppercase tracking-wider ${accentClass}`}>
                  Active Thread Flow
                </span>
                <span className="font-grotesk text-[11px] text-brand-orange">Pulse: 120Hz</span>
              </div>
              <div className="w-full h-16 relative overflow-hidden rounded-lg bg-surface-high/30 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 60" fill="none">
                  <path
                    d="M10 30 C 90 5, 110 55, 190 30 S 290 5, 390 30"
                    stroke={accentColor} strokeDasharray="8 4" strokeWidth="2"
                    style={{ animation: 'none' }}
                    opacity="0.9"
                  />
                  <path
                    d="M10 30 C 70 55, 130 5, 200 30 S 330 55, 390 30"
                    stroke={currentStage.accent === 'orange' ? '#8338EC' : '#FB5607'} strokeDasharray="4 6" strokeWidth="1.2"
                    opacity="0.5"
                  />
                  <circle cx="190" cy="30" r="5" fill={accentColor} opacity="0.9" />
                  <circle cx="100" cy="17" r="3" fill="#8338EC" opacity="0.7" />
                  <circle cx="300" cy="43" r="3" fill={accentColor} opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Console log */}
            <div className="relative z-10 mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg bg-surface-base/40">
              <span className="font-mono text-xs text-muted">{currentStage.log}</span>
              <span className="font-grotesk text-[10px] uppercase text-brand-ash px-2 py-1 rounded bg-surface-high/60">
                Auto-Cycle: Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

