import React from 'react'

interface SectionHeadingProps {
  label:    string
  labelColor?: 'orange' | 'purple'
  title:    React.ReactNode
  subtitle?: string
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  labelColor = 'orange',
  title,
  subtitle,
  className = '',
}) => {
  const accent = labelColor === 'orange' ? 'text-brand-orange' : 'text-brand-purple'

  return (
    <div className={`space-y-3 ${className}`}>
      <div className={`section-label ${accent}`}>
        <span className="w-1 h-1 rounded-full bg-current inline-block" />
        {label}
      </div>
      <h2 className="section-title text-brand-ash">{title}</h2>
      {subtitle && (
        <p className="section-body max-w-xl">{subtitle}</p>
      )}
    </div>
  )
}

