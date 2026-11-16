import React, { useState } from 'react'
import { ArrowUpRight, CheckCircle2, TrendingUp, Sparkles, ExternalLink } from 'lucide-react'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  onOpenDetails: (project: Project) => void
  layoutMode?: 'featured' | 'standard'
}

/* ─── Mockup 1: Apex Fitness Smartphone UI ───────────────────────────── */
export const SmartphoneMockup: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div
      className="relative w-52 h-76 sm:w-56 sm:h-84 mx-auto transition-transform duration-700 ease-out flex items-center justify-center select-none"
      style={{
        transform: isHovered ? 'scale(1.05) translateY(-6px)' : 'scale(1)',
      }}
    >
      {/* Outer Phone Shell */}
      <div
        className="w-full h-full rounded-[38px] p-2.5 relative shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #181B1F 0%, #0C0E10 100%)',
          border: '2px solid rgba(255, 84, 0, 0.45)',
          boxShadow: '0 0 35px -5px rgba(255, 84, 0, 0.4), 0 20px 40px rgba(0,0,0,0.7)',
        }}
      >
        {/* Screen Glass */}
        <div className="w-full h-full rounded-[30px] bg-[#121417] p-3.5 flex flex-col justify-between overflow-hidden relative border border-white/05">
          {/* Dynamic Island Notch */}
          <div className="w-20 h-4 bg-black rounded-full mx-auto flex items-center justify-end px-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5400]/90 animate-pulse" />
          </div>

          {/* App Header */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="font-grotesk text-[8px] uppercase tracking-widest text-[#FF5400] font-bold">
                Apex System
              </span>
              <h5 className="font-manrope text-[11px] font-bold text-white leading-tight">
                Daily Performance
              </h5>
            </div>
            <div className="w-5 h-5 rounded-full bg-[#FF5400]/20 border border-[#FF5400]/40 flex items-center justify-center text-[8px] text-[#FF5400] font-bold">
              ⚡
            </div>
          </div>

          {/* Central Circular Progress Metric */}
          <div className="relative w-26 h-26 mx-auto my-1 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#181B1F]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#FF5400] drop-shadow-[0_0_8px_#FF5400]"
                strokeDasharray="78, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-grotesk text-xs font-bold text-white">78%</span>
                <span className="font-grotesk text-[7px] text-[#E9ECEF]/60">TARGET</span>
              </div>
            </svg>
          </div>

          {/* Metrics Pill Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-1.5 rounded-lg bg-[#181B1F]/60 border border-white/05 flex flex-col">
              <span className="font-grotesk text-[7px] text-[#E9ECEF]/60">CALORIES</span>
              <span className="font-grotesk text-[10px] font-bold text-[#FF5400]">1,840 kcal</span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#181B1F]/60 border border-white/05 flex flex-col">
              <span className="font-grotesk text-[7px] text-[#E9ECEF]/60">HEART RATE</span>
              <span className="font-grotesk text-[10px] font-bold text-white">142 bpm</span>
            </div>
          </div>

          {/* Mini Weekly Activity Bars */}
          <div className="pt-1 flex items-end justify-between h-8 px-1">
            {[35, 60, 45, 90, 75, 85, 95].map((val, idx) => (
              <div
                key={idx}
                className="w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: `${val}%`,
                  background: idx >= 4 ? '#FF5400' : '#181B1F',
                  boxShadow: idx >= 4 ? '0 0 6px #FF5400' : 'none',
                }}
              />
            ))}
          </div>

          {/* Home indicator bar */}
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-1" />
        </div>
      </div>
    </div>
  )
}

/* ─── Mockup 2: Mistwood Resorts Luxury Laptop Website UI ────────────── */
export const LaptopMockup: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div
      className="relative w-full max-w-xl mx-auto transition-transform duration-700 ease-out flex flex-col items-center select-none"
      style={{
        transform: isHovered ? 'scale(1.03) translateY(-6px)' : 'scale(1)',
      }}
    >
      {/* Laptop Screen Bezel */}
      <div
        className="w-full rounded-t-2xl p-2.5 sm:p-3 relative shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #181B1F 0%, #0C0E10 100%)',
          border: '1.5px solid rgba(136, 36, 255, 0.45)',
          boxShadow: '0 0 40px -5px rgba(136, 36, 255, 0.4), 0 25px 50px rgba(0,0,0,0.8)',
        }}
      >
        {/* Top Center Camera Notch */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#8824FF] mx-auto mb-2 shadow-[0_0_6px_#8824FF]" />

        {/* Website Content Screen */}
        <div className="w-full h-56 sm:h-72 rounded-lg bg-[#0e0a1c] p-3 sm:p-5 flex flex-col justify-between relative overflow-hidden">
          {/* Background Mountain Aurora Scenery */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(136, 36, 255, 0.45) 0%, rgba(14, 10, 28, 0.8) 60%, #0e0a1c 100%)',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(#8824FF_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

          {/* Website Navbar */}
          <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
              <span className="font-grotesk text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase">
                MISTWOOD
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 font-grotesk text-[9px] uppercase tracking-wider text-[#E9ECEF]/70">
              <span>Suites</span>
              <span>Wellness</span>
              <span>Dining</span>
            </div>
            <span className="px-3 py-1 rounded-full font-grotesk text-[8px] sm:text-[9px] uppercase tracking-wider bg-[#8824FF] text-white font-bold">
              Reserve
            </span>
          </div>

          {/* Hero Content Section */}
          <div className="relative z-10 my-auto text-center space-y-1 sm:space-y-2">
            <span className="font-grotesk text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#FF5400] font-semibold block">
              Luxury Mountain Sanctuary
            </span>
            <h4 className="font-playfair italic text-xl sm:text-3xl font-normal text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.4)]">
              A Serene Hill Retreat.
            </h4>
            <p className="font-manrope text-[10px] sm:text-xs text-[#E9ECEF]/70 max-w-sm mx-auto leading-relaxed">
              Immerse in the pristine tranquility of whispering pine forests and celestial vistas.
            </p>
          </div>

          {/* Bottom booking badge strip */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-1">
              <span className="text-[#FF5400] text-xs">★★★★★</span>
              <span className="font-grotesk text-[9px] text-[#E9ECEF]/70">4.98 (320 Reviews)</span>
            </div>
            <span className="font-grotesk text-[9px] text-[#FF5400] font-semibold">
              Explore Available Stays &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Laptop Base / Keyboard deck */}
      <div
        className="w-[108%] h-3.5 sm:h-4 rounded-b-xl relative -mt-0.5"
        style={{
          background: 'linear-gradient(180deg, #23272D 0%, #121417 100%)',
          border: '1px solid rgba(233, 236, 239, 0.15)',
          boxShadow: '0 12px 25px rgba(0,0,0,0.6)',
        }}
      >
        <div className="w-14 h-1 bg-[#0C0E10] rounded-full mx-auto" />
      </div>
    </div>
  )
}

/* ─── Mockup 3: Vexor Tech Stationery & Brand Identity UI ─────────────── */
export const StationeryMockup: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div
      className="relative w-52 h-76 sm:w-56 sm:h-84 mx-auto transition-transform duration-700 ease-out flex items-center justify-center select-none"
      style={{
        transform: isHovered ? 'scale(1.05) translateY(-6px)' : 'scale(1)',
      }}
    >
      {/* Background Angle Collateral Sheet */}
      <div
        className="absolute w-48 h-64 rounded-2xl p-4 shadow-xl -rotate-6 translate-x-3"
        style={{
          background: 'linear-gradient(135deg, #1c152e 0%, #100b1d 100%)',
          border: '1px solid rgba(136, 36, 255, 0.3)',
        }}
      >
        <div className="font-grotesk text-[8px] uppercase tracking-widest text-[#8824FF]/70">
          Brand Book // 2025
        </div>
        <div className="w-full h-px bg-white/10 my-2" />
        <div className="space-y-1 opacity-50">
          <div className="w-24 h-1.5 bg-white/30 rounded" />
          <div className="w-32 h-1 bg-white/20 rounded" />
          <div className="w-20 h-1 bg-white/20 rounded" />
        </div>
      </div>

      {/* Foreground Business Card & Identity Plate */}
      <div
        className="w-48 h-68 rounded-2xl p-4 relative z-10 shadow-2xl flex flex-col justify-between rotate-3"
        style={{
          background: 'linear-gradient(145deg, #181B1F 0%, #0C0E10 100%)',
          border: '1.5px solid rgba(136, 36, 255, 0.45)',
          boxShadow: '0 0 35px -5px rgba(136, 36, 255, 0.35), 0 20px 40px rgba(0,0,0,0.7)',
        }}
      >
        {/* Top: Geometric V Logo */}
        <div>
          <div className="w-10 h-10 rounded-xl bg-[#8824FF]/20 border border-[#8824FF]/50 flex items-center justify-center shadow-[0_0_15px_rgba(136,36,255,0.4)]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4L12 20L20 4"
                stroke="#8824FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4L12 13L16 4"
                stroke="#FF5400"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h5 className="font-grotesk text-sm font-bold text-white tracking-wider mt-3">
            VEXOR TECH
          </h5>
          <span className="font-grotesk text-[8px] uppercase tracking-widest text-[#8824FF]">
            Autonomous Systems
          </span>
        </div>

        {/* Identity Specs Grid */}
        <div className="space-y-2 pt-2 border-t border-white/08">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#8824FF]" />
            <div className="w-3 h-3 rounded-full bg-[#FF5400]" />
            <div className="w-3 h-3 rounded-full bg-[#181B1F]" />
            <span className="font-grotesk text-[7px] text-[#E9ECEF]/60 ml-auto">
              Primary Palette
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#0C0E10] border border-white/05">
            <span className="font-grotesk text-[7px] text-[#E9ECEF]/50 block">TYPOGRAPHY</span>
            <span className="font-grotesk text-[9px] font-bold text-white">Playfair Display &bull; Manrope</span>
          </div>
        </div>

        {/* Card bottom seal */}
        <div className="flex items-center justify-between text-[7px] font-grotesk text-[#E9ECEF]/60">
          <span>IDENTITY SYSTEM</span>
          <span className="text-[#8824FF] font-bold">VERIFIED</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Project Card Component ─────────────────────────────────────── */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  layoutMode = 'standard',
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const isOrange = project.accentColor === 'orange'
  const accentColor = isOrange ? '#FF5400' : '#8824FF'
  const isFeatured = layoutMode === 'featured' || project.featured

  if (isFeatured) {
    // ── Restructured Large Featured Hero Case Study Card ──
    return (
      <div
        onClick={() => onOpenDetails(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full rounded-3xl p-6 sm:p-8 lg:p-10 cursor-pointer transition-all duration-500 ease-out overflow-hidden"
        style={{
          background: isHovered
            ? 'linear-gradient(145deg, rgba(35,39,45,0.92) 0%, rgba(12,14,16,0.95) 100%)'
            : 'linear-gradient(145deg, rgba(24,27,31,0.75) 0%, rgba(12,14,16,0.88) 100%)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: isHovered ? `1.5px solid ${accentColor}85` : '1px solid rgba(233,236,239,0.12)',
          boxShadow: isHovered
            ? `0 0 50px -8px ${accentColor}55, 0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)`
            : '0 16px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        {/* Top neon color beam */}
        <div
          className="absolute top-0 left-8 right-8 h-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            boxShadow: `0 0 16px ${accentColor}`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Rich Device Visual Mockup (lg:col-span-7) */}
          <div className="lg:col-span-7 relative flex items-center justify-center p-2 sm:p-4 rounded-2xl bg-[#0C0E10]/40 border border-white/05">
            <LaptopMockup isHovered={isHovered} />
          </div>

          {/* Right Column: Case Study Narrative & Metrics (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              {/* Category & Tags Pill Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded-full font-grotesk text-[10px] uppercase font-bold tracking-widest"
                  style={{
                    background: `${accentColor}20`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  Featured Showcase
                </span>
                <span className="font-grotesk text-xs text-[#E9ECEF]/50">
                  {project.client} &bull; {project.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="card-heading text-2xl sm:text-3xl font-bold text-[#E9ECEF] leading-tight group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="font-manrope text-sm text-[#FF5400] font-semibold mt-1">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="card-desc text-xs sm:text-sm text-[#E9ECEF]/75 leading-relaxed mt-3">
                {project.description}
              </p>
            </div>

            {/* Metrics Trio Strip */}
            <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-[#0C0E10]/70 border border-white/05">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="font-grotesk text-base sm:text-lg font-bold text-[#FF5400]">
                    {m.value}
                  </div>
                  <div className="font-grotesk text-[9px] uppercase text-[#E9ECEF]/60 tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables Bullet Tags */}
            <div className="space-y-1.5">
              {project.deliverables.slice(0, 3).map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-manrope text-[#E9ECEF]/70">
                  <CheckCircle2 size={13} className="text-[#8824FF] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Trigger Row */}
            <div className="pt-2 flex items-center justify-between">
              <span className="btn-text inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-wider text-[#FF5400] group-hover:translate-x-1 transition-transform">
                <span>Explore Full Case Study</span>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isHovered ? accentColor : 'rgba(233, 236, 239, 0.08)',
                  color: isHovered ? '#0C0E10' : '#E9ECEF',
                  boxShadow: isHovered ? `0 0 20px ${accentColor}` : 'none',
                }}
              >
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Restructured Secondary 2-Column Staggered Cards (Apex & Vexor) ──
  return (
    <div
      onClick={() => onOpenDetails(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden h-full"
      style={{
        background: isHovered
          ? 'linear-gradient(145deg, rgba(35,39,45,0.92) 0%, rgba(12,14,16,0.95) 100%)'
          : 'linear-gradient(145deg, rgba(24,27,31,0.72) 0%, rgba(12,14,16,0.86) 100%)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: isHovered ? `1.5px solid ${accentColor}80` : '1px solid rgba(233,236,239,0.12)',
        boxShadow: isHovered
          ? `0 0 45px -8px ${accentColor}50, 0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.18)`
          : '0 14px 36px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Top neon color line */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 14px ${accentColor}`,
        }}
      />

      {/* Header Info: Category + Title + Subtitle */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full font-grotesk text-[10px] uppercase font-bold tracking-widest"
              style={{
                background: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}40`,
              }}
            >
              {project.category}
            </span>
            <h3 className="card-heading text-xl sm:text-2xl font-bold text-[#E9ECEF] leading-snug mt-2.5 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="card-desc text-xs sm:text-sm text-[#E9ECEF]/70 mt-1">
              {project.subtitle}
            </p>
          </div>

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: isHovered ? accentColor : 'rgba(233, 236, 239, 0.08)',
              color: isHovered ? '#0C0E10' : '#E9ECEF',
              border: `1px solid ${isHovered ? accentColor : 'rgba(233, 236, 239, 0.15)'}`,
              boxShadow: isHovered ? `0 0 20px ${accentColor}` : 'none',
            }}
          >
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Center Dimensional Mockup Stage */}
      <div className="my-6 flex items-center justify-center py-2">
        {project.id === 'apex-fitness' && <SmartphoneMockup isHovered={isHovered} />}
        {project.id === 'vexor-tech' && <StationeryMockup isHovered={isHovered} />}
      </div>

      {/* Bottom Metrics & Action Strip */}
      <div className="space-y-4 pt-4 border-t border-[#E9ECEF]/08">
        <div className="grid grid-cols-3 gap-2 text-center p-2 rounded-lg bg-[#0C0E10]/60">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-grotesk text-sm font-bold text-[#FF5400]">{m.value}</div>
              <div className="font-grotesk text-[8px] uppercase text-[#E9ECEF]/60 tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs btn-text font-semibold uppercase tracking-wider text-[#FF5400]">
          <span>View Case Details</span>
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}
