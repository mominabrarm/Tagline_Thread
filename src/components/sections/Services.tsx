import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'
import { SERVICES } from '../../data/services'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export const Services: React.FC = () => {
  const reduced    = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.services-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-header', start: 'top 85%', once: true } }
      )

      gsap.fromTo('.service-card',
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%', once: true } }
      )

      gsap.fromTo('.services-banner',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: '.services-banner', start: 'top 85%', once: true } }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 px-6 lg:px-24 bg-surface-base"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="services-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            label="03 // Core Capabilities"
            title="What We Bring to the Table."
            subtitle="Four ways to turn your ideas into a brand that stands out. Designed with surgical care and engineered to scale seamlessly."
          />
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-high/80 hover:bg-surface-high text-brand-ash
                       font-grotesk text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Inquire All Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2v7" stroke="#E9ECEF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        {/* 2×2 grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="services-banner p-8 lg:p-10 rounded-2xl bg-gradient-to-r from-surface-card to-surface-high flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
          style={{ border: '1px solid rgba(233,236,239,0.06)' }}
        >
          <div>
            <span className="font-grotesk text-[11px] uppercase tracking-widest text-brand-orange font-bold block">
              Accelerate Execution
            </span>
            <h4 className="font-syne text-2xl md:text-3xl font-bold text-brand-ash mt-1">
              Let's make your brand impossible to ignore.
            </h4>
          </div>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex-shrink-0 px-8 py-4 rounded-full bg-brand-orange text-[#16181B]
                       font-grotesk text-sm font-bold uppercase tracking-widest
                       shadow-orange-glow hover:shadow-orange-glow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  )
}

