import React, { useState } from 'react'
import { X } from 'lucide-react'
import { getWhatsAppUrl } from '../../data/contact'

export const WhatsAppButton: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [dismissed, setDismissed]           = useState(false)

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {/* Tooltip */}
      <div
        className={`pointer-events-none transition-all duration-300 ${
          tooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        <div
          className="max-w-[230px] p-3.5 rounded-xl text-brand-ash font-manrope text-xs leading-relaxed relative"
          style={{
            background: 'rgba(12, 14, 16, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(233, 236, 239, 0.12)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          Hi Tagline-Thread! I'm interested in your services.
          <div
            className="absolute bottom-[-5px] right-6 w-2.5 h-2.5 rotate-45"
            style={{
              background: 'rgba(12, 14, 16, 0.88)',
              borderRight: '1px solid rgba(233, 236, 239, 0.12)',
              borderBottom: '1px solid rgba(233, 236, 239, 0.12)',
            }}
          />
        </div>
      </div>

      {/* Button row */}
      <div className="flex items-center gap-2">
        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-muted hover:text-brand-ash transition-colors"
          aria-label="Dismiss WhatsApp button"
          style={{
            background: 'rgba(24, 27, 31, 0.70)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(233, 236, 239, 0.10)',
            opacity: tooltipVisible ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          <X size={12} />
        </button>

        {/* WhatsApp */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp conversation with Tagline-Thread"
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 38, 42, 0.95) 0%, rgba(18, 20, 22, 0.95) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(37, 211, 102, 0.4)',
            boxShadow: '0 0 28px rgba(136, 36, 255, 0.35), 0 0 16px rgba(37, 211, 102, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

