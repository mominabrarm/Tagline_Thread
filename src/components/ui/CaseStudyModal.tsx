import React, { useEffect } from 'react'
import { X, CheckCircle2, ArrowUpRight, TrendingUp } from 'lucide-react'
import type { Project } from '../../data/projects'
import { SmartphoneMockup, LaptopMockup, StationeryMockup } from './ProjectCard'

interface CaseStudyModalProps {
  project: Project | null
  onClose: () => void
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const isOrange = project.accentColor === 'orange'
  const accentColor = isOrange ? '#FF5400' : '#8824FF'

  const handleStartProject = () => {
    onClose()
    const contactSection = document.querySelector('#contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark blur backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Dialog Window */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl p-6 sm:p-8 md:p-10 overflow-y-auto z-10 text-[#E9ECEF] border shadow-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(26,29,33,0.96) 0%, rgba(12,14,16,0.98) 100%)',
          backdropFilter: 'blur(36px)',
          border: `1.5px solid ${accentColor}70`,
          boxShadow: `0 0 60px -10px ${accentColor}50, 0 30px 80px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Top Accent Gradient Rail */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            boxShadow: `0 0 20px ${accentColor}`,
          }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E9ECEF]/10">
          <div className="flex items-center gap-3">
            <span
              className="px-3.5 py-1 rounded-full font-grotesk text-[10px] uppercase font-bold tracking-widest"
              style={{
                background: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}40`,
              }}
            >
              {project.category}
            </span>
            <span className="font-grotesk text-xs text-[#E9ECEF]/60">
              {project.client} &bull; {project.year}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#0C0E10] hover:bg-[#181B1F] border border-white/10 flex items-center justify-center text-[#E9ECEF] hover:text-[#FF5400] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6">
          {/* Visual Device Preview (md:col-span-6) */}
          <div className="md:col-span-6 flex items-center justify-center p-4 rounded-2xl bg-[#0C0E10]/60 border border-white/05 min-h-[300px]">
            {project.id === 'mistwood-resorts' && <LaptopMockup isHovered={true} />}
            {project.id === 'apex-fitness' && <SmartphoneMockup isHovered={true} />}
            {project.id === 'vexor-tech' && <StationeryMockup isHovered={true} />}
          </div>

          {/* Details & Case Narrative (md:col-span-6) */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-white leading-tight">
                {project.title}
              </h2>
              <p className="font-manrope text-sm text-[#FF5400] font-semibold mt-1">
                {project.subtitle}
              </p>
              <p className="font-manrope text-sm text-[#E9ECEF]/80 leading-relaxed mt-3">
                {project.fullStory}
              </p>
            </div>

            {/* Metrics Trio */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#0C0E10]/80 border border-white/08">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="font-grotesk text-lg font-bold text-[#FF5400]">{m.value}</div>
                  <div className="font-grotesk text-[9px] uppercase text-[#E9ECEF]/60 tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Deliverables */}
            <div className="space-y-2">
              <h4 className="font-grotesk text-xs uppercase tracking-wider font-bold text-[#E9ECEF]/75">
                Key Deliverables & Execution
              </h4>
              <div className="space-y-1.5">
                {project.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-manrope text-[#E9ECEF]/80">
                    <CheckCircle2 size={14} className="text-[#8824FF] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Trigger */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={handleStartProject}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-grotesk text-xs font-bold uppercase tracking-wider text-[#0C0E10] bg-[#FF5400] shadow-[0_0_25px_rgba(255,84,0,0.45)] hover:shadow-[0_0_35px_rgba(255,84,0,0.7)] hover:scale-[1.02] transition-all duration-300"
              >
                <span>Start a Project with This Stack</span>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
