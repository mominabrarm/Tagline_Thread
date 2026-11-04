import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../ui/SectionHeading'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const NODES = [
  {
    num:   '01',
    phase: '// Discovery',
    label: 'NODE 01',
    title: 'The Spark',
    desc:  'Deconstructing industry noise to isolate unassailable market positioning and high-conviction creative hypotheses.',
    accent: 'orange',
  },
  {
    num:   '02',
    phase: '// Identity',
    label: 'NODE 02',
    title: 'The Form',
    desc:  'Sculpting tactile visual vernaculars, expressive custom typography, and dynamic generative color spectra that command memory.',
    accent: 'purple',
  },
  {
    num:   '03',
    phase: '// Flagship',
    label: 'NODE 03',
    title: 'The Medium',
    desc:  'Synthesizing ultra-responsive web experiences, smooth animations, and frictionless transactional conduits.',
    accent: 'orange',
  },
  {
    num:   '04',
    phase: '// Expansion',
    label: 'NODE 04',
    title: 'The Velocity',
    desc:  'Deploying algorithmic growth vectors, magnetic social motion assets, and persistent community engagement loops.',
    accent: 'purple',
  },
]

export const About: React.FC = () => {
  const reduced    = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.about-header',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-header', start: 'top 85%', once: true },
        }
      )

      gsap.fromTo('.about-node',
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 px-6 lg:px-24 bg-surface-base"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="about-header flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <SectionHeading
              label="01 // Strategic Continuum"
              title="Creativity connects everything."
              subtitle="Tagline-Thread dissolves the boundary between high-concept imagination, precision engineering, and customer acquisition. A single luminous fiber runs through every touchpoint."
            />
          </div>

          <div
            className="p-5 rounded-2xl bg-surface-card/80 max-w-xs"
            style={{ border: '1px solid rgba(131,56,236,0.2)' }}
          >
            <span className="font-grotesk text-[11px] uppercase tracking-widest text-brand-purple font-bold block mb-2">
              Studio Doctrine
            </span>
            <blockquote className="font-geist text-sm text-brand-ash leading-relaxed">
              "Identity is not what you shout; it is the kinetic memory left behind in the mind of the viewer."
            </blockquote>
          </div>
        </div>

        {/* 4-node grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {NODES.map((node) => {
            const isOrange = node.accent === 'orange'
            const accentColor = isOrange ? '#FB5607' : '#8338EC'
            const accentClass = isOrange ? 'text-brand-orange' : 'text-brand-purple'

            return (
              <div
                key={node.num}
                className="about-node group p-6 rounded-2xl bg-surface-card/60 hover:bg-surface-card/90 transition-all duration-300 relative overflow-hidden"
                style={{ border: '1px solid rgba(233,236,239,0.06)' }}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${accentColor}12, transparent 65%)` }}
                />

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
                >
                  <span className={`font-grotesk text-sm font-bold ${accentClass}`}>{node.num}</span>
                </div>

                <div className={`mt-4 font-grotesk text-[11px] font-bold uppercase tracking-widest ${accentClass}`}>
                  {node.label}
                </div>

                <h3 className="mt-1 font-syne text-lg font-bold text-brand-ash">{node.title}</h3>

                <p className="mt-2 font-geist text-sm text-muted leading-relaxed">{node.desc}</p>

                <div className="mt-5 pt-4 border-t border-brand-ash/[0.06] flex items-center gap-2">
                  <span className="font-geist text-xs text-muted uppercase">Phase Index</span>
                  <span className={`font-grotesk text-[11px] font-bold ${accentClass}`}>{node.phase}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tagline footer */}
        <div className="text-center pt-4">
          <p className="font-syne text-2xl md:text-3xl font-bold text-brand-ash/30 tracking-tight">
            "Where ideas are woven into identity"
          </p>
        </div>
      </div>
    </section>
  )
}

