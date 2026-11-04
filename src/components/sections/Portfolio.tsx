import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'
import { PROJECTS } from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export const Portfolio: React.FC = () => {
  const reduced    = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: '.portfolio-header', start: 'top 85%', once: true } }
      )

      gsap.fromTo('.portfolio-card',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
          scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%', once: true } }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  const heroProject    = PROJECTS.find(p => p.size === 'hero')!
  const compactProjects = PROJECTS.filter(p => p.size === 'compact')
  const wideProject    = PROJECTS.find(p => p.size === 'wide')!

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="relative w-full py-24 px-6 lg:px-24 bg-brand-bg"
    >
      {/* Background glow */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-purple/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="portfolio-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            label="04 // Curated Index"
            title="Selected Work."
            subtitle="Creative ideas brought to life through design, digital experiences, and strategy."
          />
          <div className="flex items-center gap-2">
            <span className="font-grotesk text-xs text-muted uppercase tracking-wider">
              Case Studies 2024–2025
            </span>
          </div>
        </div>

        {/* NOTE: All project cards below use placeholder visuals.
            Replace placeholder images with actual project screenshots/assets. */}

        {/* Asymmetric editorial grid */}
        <div className="portfolio-grid space-y-6">
          {/* Top row: 8-col hero + 4-col stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Hero card */}
            <div className="portfolio-card lg:col-span-8">
              <ProjectCard project={heroProject} />
            </div>

            {/* Compact stack */}
            <div className="portfolio-card lg:col-span-4 flex flex-col gap-6">
              {compactProjects.map(project => (
                <div key={project.id} className="flex-1">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* Wide banner card */}
          <div className="portfolio-card">
            <ProjectCard project={wideProject} />
          </div>
        </div>

        {/* Placeholder notice */}
        <div
          className="p-4 rounded-xl bg-brand-purple/10 text-muted font-geist text-sm text-center"
          style={{ border: '1px solid rgba(131,56,236,0.2)' }}
        >
          <span className="text-brand-purple font-bold">Note:</span>{' '}
          All project visuals are placeholders. Replace with actual client work images and descriptions before launch.
        </div>
      </div>
    </section>
  )
}

