import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num:    '01',
    title:  'DISCOVER',
    desc:   'We understand the business, audience, goals, and core challenges.',
    phase:  'PHASE 1',
    accent: 'orange',
  },
  {
    num:    '02',
    title:  'DESIGN',
    desc:   'We develop the visual identity, creative direction, and digital experience.',
    phase:  'PHASE 2',
    accent: 'purple',
  },
  {
    num:    '03',
    title:  'DEVELOP',
    desc:   'We build the website and implement all interactive functionality.',
    phase:  'PHASE 3',
    accent: 'orange',
  },
  {
    num:    '04',
    title:  'LAUNCH',
    desc:   'We rigorously test, refine, and deploy the project to the live world.',
    phase:  'PHASE 4',
    accent: 'purple',
  },
  {
    num:    '05',
    title:  'GROW',
    desc:   'We support ongoing marketing, social content, and continuous improvements.',
    phase:  'PERSISTENT',
    accent: 'orange',
  },
]

export const HowWeWork: React.FC = () => {
  const reduced    = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.process-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: '.process-header', start: 'top 85%', once: true } }
      )

      gsap.fromTo('.process-step',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-grid', start: 'top 80%', once: true } }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full py-24 px-6 lg:px-24 bg-surface-base"
    >
      {/* Connecting line decoration */}
      <div className="absolute top-1/2 left-24 right-24 h-px hidden lg:block" style={{
        background: 'linear-gradient(90deg, transparent, rgba(251,86,7,0.2) 20%, rgba(131,56,236,0.3) 50%, rgba(251,86,7,0.2) 80%, transparent)',
      }} />

      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="process-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="section-label text-brand-purple">
              <span className="w-1 h-1 rounded-full bg-current inline-block" />
              05 // Workflow Protocol
            </div>
            <h2 className="font-syne text-4xl md:text-5xl font-bold text-brand-ash tracking-tight">
              From Idea to Impact.
            </h2>
            <p className="font-geist text-lg text-muted max-w-lg leading-relaxed">
              A linear, accountable 5-stage journey designed to eliminate guesswork and deliver uncompromising craft.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-card/80"
               style={{ border: '1px solid rgba(233,236,239,0.06)' }}>
            <span className="font-mono text-xs text-brand-orange block">Zero Ambiguity</span>
            <span className="font-mono text-xs text-brand-purple block mt-0.5">Fixed Milestones</span>
          </div>
        </div>

        {/* 5-step grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative">
          {STEPS.map((step, i) => {
            const isOrange = step.accent === 'orange'
            const accentColor = isOrange ? '#FB5607' : '#8338EC'
            const accentClass = isOrange ? 'text-brand-orange' : 'text-brand-purple'
            const isLast = i === STEPS.length - 1

            return (
              <div
                key={step.num}
                className="process-step group relative z-10 p-5 rounded-2xl bg-surface-card/60 hover:bg-surface-card/90 transition-all duration-300 flex flex-col justify-between"
                style={{ border: '1px solid rgba(233,236,239,0.06)' }}
              >
                {/* Number node */}
                <div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-grotesk text-sm font-bold mb-5 group-hover:scale-110 transition-transform"
                    style={{
                      background: accentColor,
                      color: '#16181B',
                      boxShadow: `0 0 20px -4px ${accentColor}60`,
                    }}
                  >
                    {step.num}
                  </div>

                  <h3 className="font-syne text-base font-bold text-brand-ash">{step.title}</h3>
                  <p className="mt-2 font-geist text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>

                {/* Phase label */}
                <div className={`mt-4 font-mono text-[11px] font-bold ${accentClass} ${isLast ? 'flex items-center gap-1' : ''}`}>
                  {step.phase}
                  {isLast && (
                    <span className="ml-1 w-1.5 h-1.5 rounded-full bg-brand-orange inline-block animate-ping" />
                  )}
                </div>

                {/* Connecting arrow for desktop */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8h8M9 5l3 3-3 3" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

