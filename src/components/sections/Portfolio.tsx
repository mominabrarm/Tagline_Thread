import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCard } from '../ui/ProjectCard'
import { CaseStudyModal } from '../ui/CaseStudyModal'
import { PROJECTS, type Project } from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const FILTER_TABS = [
  'All Work',
  'Websites',
  'Social Media',
  'Branding',
] as const

export const Portfolio: React.FC = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState<string>('All Work')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // GSAP scroll trigger entrance
  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-header-block',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-header-block',
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.portfolio-filter-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-filter-row',
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.portfolio-item-anim',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: '.portfolio-items-container',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  // Filter projects dynamically
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === 'All Work') return PROJECTS
    return PROJECTS.filter((p) => p.tags.includes(activeFilter))
  }, [activeFilter])

  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0]
  const secondaryProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id)

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="relative w-full py-24 sm:py-32 px-6 lg:px-16 bg-[#0a0c0d] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ── Top Header Row ── */}
        <div className="portfolio-header-block flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#E9ECEF]/06">
          <div className="space-y-4 max-w-2xl">
            {/* Top Label */}
            <div className="inline-flex items-center gap-3">
              <span className="section-label text-[#8824FF]">
                04 // OUR WORK
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-[#8824FF] to-transparent" />
            </div>

            {/* Headline */}
            <h2 className="heading-section text-[#E9ECEF]">
              Ideas we've woven
              <br />
              into{' '}
              <span className="text-[#FF5400] neon-text-orange italic font-normal" style={{ fontStyle: 'italic' }}>
                real impact.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-body text-[#E9ECEF]/70 max-w-xl">
              A glimpse of how we turn ideas into strong digital identities, engaging
              experiences and measurable growth for the brands we work with.
            </p>
          </div>

          {/* Right Action CTA Pill */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-text inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#E9ECEF] hover:text-[#FF5400] bg-[#181B1F]/50 hover:bg-[#181B1F] border border-[#E9ECEF]/15 hover:border-[#FF5400]/50 transition-all duration-300 font-semibold"
            >
              <span>View All Projects</span>
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="portfolio-filter-row flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`btn-text px-5 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF5400] text-[#0C0E10] shadow-[0_0_25px_rgba(255,84,0,0.45)]'
                    : 'bg-[#181B1F]/60 text-[#E9ECEF]/70 hover:text-white hover:bg-[#181B1F] border border-[#E9ECEF]/10'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* ── Restructured Editorial Portfolio Showcase ── */}
        <div className="portfolio-items-container space-y-8">
          {/* 1. Large Featured Showcase Card (Mistwood Resorts) */}
          {featuredProject && (
            <div className="portfolio-item-anim">
              <ProjectCard
                project={featuredProject}
                layoutMode="featured"
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            </div>
          )}

          {/* 2. Secondary 2-Column Staggered Grid (Apex Fitness & Vexor Tech) */}
          {secondaryProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {secondaryProjects.map((project) => (
                <div key={project.id} className="portfolio-item-anim flex flex-col">
                  <ProjectCard
                    project={project}
                    layoutMode="standard"
                    onOpenDetails={(p) => setSelectedProject(p)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom Information Strip ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E9ECEF]/06">
          <div className="font-grotesk text-xs text-[#E9ECEF]/60 tracking-wider">
            SHOWCASING 0{filteredProjects.length} CURATED CASE STUDIES
          </div>
          <div className="font-manrope text-xs text-[#E9ECEF]/50">
            Click any case study to explore deliverables, tech stack and impact.
          </div>
        </div>
      </div>

      {/* Interactive Case Study Modal Dialog */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
