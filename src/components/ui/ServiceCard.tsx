import React from 'react'
import {
  Sparkles,
  MessageCircle,
  Megaphone,
  Code2,
  Server,
  ArrowUpRight,
} from 'lucide-react'
import type { Service } from '../../data/services'

interface ServiceSideCardProps {
  service: Service
  isActive: boolean
  tiltAngle: number
  onSelect: () => void
}

export const ServiceSideCard: React.FC<ServiceSideCardProps> = ({
  service,
  isActive,
  tiltAngle,
  onSelect,
}) => {
  const isOrange = service.accentColor === 'orange'
  const accentColor = isOrange ? '#FF5400' : '#8824FF'

  // Icon mapping
  const renderIcon = () => {
    switch (service.id) {
      case 'brand-identity':
        return <Sparkles size={22} color={accentColor} />
      case 'social-management':
        return <MessageCircle size={22} color={accentColor} />
      case 'social-marketing':
        return <Megaphone size={22} color={accentColor} />
      case 'websites':
        return <Code2 size={22} color={accentColor} />
      case 'hosting-management':
        return <Server size={22} color={accentColor} />
      default:
        return <Sparkles size={22} color={accentColor} />
    }
  }

  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out min-w-[200px] sm:min-w-[220px] max-w-[240px] h-[340px] select-none ${
        isActive ? 'ring-2 ring-offset-2 ring-offset-[#101519]' : 'opacity-85 hover:opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, rgba(24, 27, 31, 0.72) 0%, rgba(12, 14, 16, 0.88) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: isActive ? `1.5px solid ${accentColor}` : '1px solid rgba(233, 236, 239, 0.12)',
        boxShadow: isActive
          ? `0 0 35px -5px ${accentColor}60, 0 16px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)`
          : '0 10px 28px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        transform: `perspective(1000px) rotateY(${tiltAngle}deg) scale(${isActive ? 1.03 : 0.96})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top subtle neon sheen line */}
      <div
        className="absolute top-0 left-4 right-4 h-0.5 rounded-full transition-opacity duration-300 opacity-50 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 10px ${accentColor}`,
        }}
      />

      {/* Top row: Icon + Index */}
      <div>
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${accentColor}25 0%, rgba(28,32,36,0.6) 100%)`,
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 0 16px -3px ${accentColor}35`,
            }}
          >
            {renderIcon()}
          </div>
          <span
            className="font-grotesk text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
            style={{ color: accentColor, background: `${accentColor}15` }}
          >
            {service.index}
          </span>
        </div>

        {/* Category Pill */}
        <div className="mt-4">
          <span className="font-grotesk text-[10px] uppercase tracking-[0.15em] text-[#E9ECEF]/60">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2 card-heading text-lg font-bold text-[#E9ECEF] leading-snug group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Short tagline */}
        <p className="mt-2 card-desc text-xs text-[#E9ECEF]/65 leading-relaxed">
          {service.tagline}
        </p>
      </div>

      {/* Bottom view trigger */}
      <div className="pt-4 border-t border-[#E9ECEF]/08 flex items-center justify-between text-xs btn-text font-semibold text-[#E9ECEF]/70 group-hover:text-[#FF5400] transition-colors">
        <span>View Details</span>
        <div className="w-6 h-6 rounded-full bg-[#E9ECEF]/05 group-hover:bg-[#FF5400]/20 flex items-center justify-center transition-colors">
          <ArrowUpRight size={12} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}
