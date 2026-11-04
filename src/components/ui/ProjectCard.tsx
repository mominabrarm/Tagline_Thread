import React from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
}

// Gradient placeholder visuals for each project
const PlaceholderVisual: React.FC<{ project: Project; className?: string }> = ({ project, className = '' }) => {
  const gradients: Record<string, string> = {
    'aura-cybernetics':  'from-[#1a0a00] via-[#2d1200] to-[#1a0a00]',
    'solaris-cognition': 'from-[#0d0020] via-[#1a0040] to-[#0d0020]',
    'vortex-audio':      'from-[#1a0800] via-[#2a1a00] to-[#160600]',
    'chrono-studio':     'from-[#100020] via-[#1a0030] to-[#100020]',
  }

  const threadColors: Record<string, [string, string]> = {
    'aura-cybernetics':  ['#FB5607', '#8338EC'],
    'solaris-cognition': ['#8338EC', '#FB5607'],
    'vortex-audio':      ['#FB5607', '#FFA000'],
    'chrono-studio':     ['#8338EC', '#FB5607'],
  }

  const [c1, c2] = threadColors[project.id] || ['#FB5607', '#8338EC']

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradients[project.id] || 'from-surface-base to-surface-card'} ${className}`}>
      {/* Atmospheric glow */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 30% 50%, ${c1}22 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, ${c2}18 0%, transparent 55%)`
      }} />

      {/* SVG thread lines */}
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" fill="none">
        <path
          d={`M-20 150 C 80 ${80 + Math.sin(1) * 40}, 160 ${180 + Math.sin(2) * 40}, 240 150 S 360 ${80 + Math.sin(3) * 40}, 420 150`}
          stroke={c1} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8"
        />
        <path
          d="M-20 100 C 100 200, 200 50, 320 150 S 380 220, 420 100"
          stroke={c2} strokeWidth="1" strokeDasharray="4 6" opacity="0.6"
        />
        <path
          d="M-20 200 C 60 100, 160 280, 260 180 S 360 80, 420 200"
          stroke={c1} strokeWidth="0.8" strokeDasharray="3 8" opacity="0.4"
        />
        {/* Nodes */}
        <circle cx="120" cy="130" r="4" fill={c1} opacity="0.9" />
        <circle cx="240" cy="150" r="6" fill={c2} opacity="0.8" />
        <circle cx="320" cy="110" r="3" fill={c1} opacity="0.7" />
        <circle cx="80"  cy="170" r="2.5" fill={c2} opacity="0.6" />
        {/* Geometric shapes */}
        <rect x="180" y="80" width="40" height="40" rx="4" stroke={c1} strokeWidth="1" opacity="0.3" fill="none"
          transform="rotate(15 200 100)" />
        <polygon points="300,60 320,100 280,100" stroke={c2} strokeWidth="1" opacity="0.3" fill="none" />
      </svg>

      {/* Project label overlay */}
      <div className="absolute bottom-4 left-4">
        <span className="font-grotesk text-[10px] uppercase tracking-widest text-brand-ash/50">
          PLACEHOLDER · Replace with actual project image
        </span>
      </div>
    </div>
  )
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const accentText = project.accentColor === 'orange' ? 'text-brand-orange' : 'text-brand-purple'
  const isHero = project.size === 'hero'
  const isWide = project.size === 'wide'

  if (isWide) {
    return (
      <div className="group p-6 lg:p-8 rounded-2xl bg-surface-card/60 hover:bg-surface-card/90 transition-all duration-300
                      grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xl hairline">
        <div className="md:col-span-5 relative h-56 rounded-xl overflow-hidden">
          <PlaceholderVisual project={project} className="w-full h-full" />
        </div>
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded bg-surface-high/60 font-grotesk text-[11px] font-bold uppercase tracking-wider ${accentText}`}>
              {project.category}
            </span>
            {project.tags.slice(1).map(tag => (
              <span key={tag} className="font-grotesk text-[11px] uppercase text-muted">{tag}</span>
            ))}
          </div>
          <h3 className={`font-syne text-2xl font-bold text-brand-ash group-hover:${accentText} transition-colors`}>
            {project.title}
          </h3>
          <p className="font-geist text-base text-muted leading-relaxed">{project.description}</p>
          <div className="pt-2 flex items-center gap-2">
            <span className={`font-grotesk text-xs font-bold uppercase tracking-wider ${accentText}`}>View Project</span>
            <ArrowRight size={14} className={accentText} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`group rounded-2xl bg-surface-card/60 overflow-hidden relative shadow-xl flex flex-col hairline
                     hover:shadow-card-hover transition-all duration-300 ${isHero ? 'h-full' : ''}`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${isHero ? 'h-80 md:h-96' : 'h-48'}`}>
        <PlaceholderVisual project={project} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-card/80 via-transparent to-transparent" />

        {isHero && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-surface-base/80 backdrop-blur-md text-brand-orange font-grotesk text-[11px] font-bold uppercase">
              Featured Showcase
            </span>
            {project.tags[1] && (
              <span className="px-3 py-1 rounded-full bg-surface-base/80 backdrop-blur-md text-brand-ash font-grotesk text-[11px] uppercase">
                {project.tags[1]}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${isHero ? 'p-6' : 'p-4'} flex flex-col justify-between flex-1`}>
        <div>
          <div className="flex flex-wrap items-center gap-1.5 text-muted font-grotesk text-[11px] uppercase pb-1">
            {project.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && <span>•</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>
          <h3 className={`font-syne ${isHero ? 'text-xl' : 'text-base'} font-bold text-brand-ash group-hover:${accentText} transition-colors pt-1`}>
            {project.title}
          </h3>
          {isHero && (
            <p className="font-geist text-sm text-muted pt-2 leading-relaxed">{project.description}</p>
          )}
          {!isHero && (
            <p className="font-geist text-xs text-muted pt-1.5 leading-relaxed line-clamp-2">{project.description}</p>
          )}
        </div>

        <div className={`${isHero ? 'pt-4' : 'pt-3'} flex items-center justify-between`}>
          <span className={`font-grotesk text-[11px] font-bold uppercase tracking-wider ${accentText}`}>
            {isHero ? 'View Project' : 'Explore'}
          </span>
          <span className={`w-9 h-9 rounded-full bg-surface-high/60 flex items-center justify-center
                           group-hover:bg-brand-orange/20 transition-colors`}>
            <ArrowUpRight size={16} className={accentText} />
          </span>
        </div>
      </div>
    </div>
  )
}

