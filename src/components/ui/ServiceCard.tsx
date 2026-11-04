import React, { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
  index: number
}

// Mini visual for each service card
const WebsiteVisual: React.FC = () => (
  <div className="mt-5 p-4 rounded-xl bg-surface-base/80 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-brand-orange/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-brand-purple/70" />
      </div>
      <span className="font-mono text-[10px] text-muted">https://your-brand.com</span>
      <span className="px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange font-grotesk text-[10px] font-bold uppercase">100 Perf</span>
    </div>
    <div className="h-16 w-full rounded-lg bg-surface-card flex items-center justify-around px-3">
      <div className="h-7 px-3 rounded bg-surface-high flex items-center font-grotesk text-[10px] text-brand-ash">3D WebGL</div>
      <div className="h-7 px-3 rounded bg-brand-orange/15 text-brand-orange flex items-center font-grotesk text-[10px] font-bold">Smooth UX</div>
      <div className="h-7 px-3 rounded bg-surface-high flex items-center font-grotesk text-[10px] text-brand-ash">Mobile</div>
    </div>
  </div>
)

const SocialMgmtVisual: React.FC = () => (
  <div className="mt-5 p-4 rounded-xl bg-surface-base/80 space-y-3">
    <div className="flex items-center justify-between">
      <span className="font-grotesk text-[10px] text-brand-purple font-bold uppercase">Content Calendar</span>
      <span className="font-grotesk text-[10px] text-muted">30-Day Schedule</span>
    </div>
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className={`h-5 rounded-sm ${
            [2, 5, 9, 12, 16, 19, 23, 26].includes(i)
              ? 'bg-brand-purple/60'
              : [0, 7, 14, 21].includes(i)
              ? 'bg-brand-orange/50'
              : 'bg-surface-card'
          }`}
        />
      ))}
    </div>
  </div>
)

const BrandingVisual: React.FC = () => (
  <div className="mt-5 p-4 rounded-xl bg-surface-base/80 space-y-3">
    <div className="flex items-center justify-between">
      <span className="font-grotesk text-[10px] text-brand-orange font-bold uppercase">Visual System</span>
      <span className="font-grotesk text-[10px] text-muted">Design Tokens</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-lg bg-brand-orange flex items-center justify-center font-mono text-[9px] font-bold text-[#16181B]">#FB56</div>
      <div className="w-9 h-9 rounded-lg bg-brand-purple flex items-center justify-center font-mono text-[9px] font-bold text-brand-ash">#8338</div>
      <div className="w-9 h-9 rounded-lg bg-surface-high flex items-center justify-center font-mono text-[9px] font-bold text-brand-ash">#2A2E</div>
      <div className="flex-1 px-3 py-2 rounded-lg bg-surface-card text-right">
        <span className="font-syne text-sm font-bold text-brand-ash block">Syne / Geist</span>
      </div>
    </div>
  </div>
)

const MarketingVisual: React.FC = () => (
  <div className="mt-5 p-4 rounded-xl bg-surface-base/80 space-y-3">
    <div className="flex items-center justify-between">
      <span className="font-grotesk text-[10px] text-brand-purple font-bold uppercase">Campaign Reach</span>
      <span className="font-grotesk text-[10px] text-brand-orange font-bold">+312% Growth</span>
    </div>
    <div className="w-full bg-surface-card rounded-full h-2.5 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-purple to-brand-orange h-full rounded-full w-4/5 transition-all duration-1000" />
    </div>
    <div className="flex justify-between font-grotesk text-[10px] text-muted">
      <span>Reach: 2.4M</span>
      <span>CTR: 5.8%</span>
      <span>ROAS: 4.6x</span>
    </div>
  </div>
)

const visuals: Record<string, React.FC> = {
  websites:         WebsiteVisual,
  'social-management': SocialMgmtVisual,
  branding:         BrandingVisual,
  'social-marketing': MarketingVisual,
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const accent = service.accentColor === 'orange' ? '#FB5607' : '#8338EC'
  const Visual = visuals[service.id]

  // Conic gradient border on mouse move
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mouse-x', `${x}%`)
      card.style.setProperty('--mouse-y', `${y}%`)
    }

    card.addEventListener('mousemove', handleMove)
    return () => card.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className="service-card group relative p-7 rounded-2xl bg-surface-card/60 hover:bg-surface-card/90 
                 flex flex-col justify-between shadow-xl overflow-hidden
                 transition-all duration-300 hover:shadow-card-hover"
      style={{
        border: '1px solid rgba(233,236,239,0.08)',
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accent}22 0%, transparent 60%)`,
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
          style={{ background: `${accent}22`, border: `1px solid ${accent}33` }}
        >
          {service.accentColor === 'orange' ? (
            service.id === 'websites' ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="14" rx="2" />
                <path d="M8 20h8M12 18v2" />
                <path d="M2 7h20" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            )
          ) : (
            service.id === 'social-management' ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
                <path d="M9 6h6M9 10h6M9 14h4" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
              </svg>
            )
          )}
        </div>
        <span
          className="font-mono text-xs font-bold tracking-widest"
          style={{ color: accent }}
        >
          {service.index}
        </span>
      </div>

      {/* Content */}
      <div className="mt-5 relative z-10">
        <h3 className="font-syne text-2xl font-bold text-brand-ash">{service.title}</h3>
        <p className="mt-3 font-geist text-base text-muted leading-relaxed">{service.description}</p>
      </div>

      {/* Visual */}
      <div className="relative z-10">
        {Visual && <Visual />}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between relative z-10">
        <span className="font-grotesk text-[11px] uppercase tracking-widest text-muted">{service.tagline}</span>
        <ArrowUpRight
          size={18}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          style={{ color: accent }}
        />
      </div>
    </div>
  )
}

