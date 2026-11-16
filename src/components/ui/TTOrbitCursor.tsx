import React, { useEffect, useRef, useState } from 'react'

export const TTOrbitCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isSpecial, setIsSpecial] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const trailRef = useRef<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    document.body.classList.add('cursor-none')

    let animFrame: number
    let targetX = -100
    let targetY = -100
    let currentX = -100
    let currentY = -100

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      setPos({ x: e.clientX, y: e.clientY })

      // Update dual-thread motion trail
      trailRef.current.unshift({ x: e.clientX, y: e.clientY })
      if (trailRef.current.length > 8) {
        trailRef.current.pop()
      }
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      setRingPos({ x: currentX, y: currentY })
      animFrame = requestAnimationFrame(animate)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = Boolean(
        target.closest('a, button, [role="button"], input, textarea, select, .interactive-item')
      )
      const isSpecialCTA = Boolean(target.closest('[data-cursor="special"], .btn-primary, .hero-cta'))
      const isCanvas = Boolean(target.closest('canvas, .canvas-container'))

      setIsHovering(isInteractive)
      setIsSpecial(isSpecialCTA)
      setIsDragging(isCanvas)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    animFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(animFrame)
      document.body.classList.remove('cursor-none')
    }
  }, [])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      {/* Precision Core / Arrow Pointer */}
      <div
        className="fixed pointer-events-none z-[99999] transition-transform duration-75"
        style={{
          left: pos.x,
          top: pos.y,
          transform: isDragging
            ? 'translate(-50%, -50%) scale(1.2)'
            : 'translate(-50%, -50%)',
        }}
      >
        {isDragging ? (
          // Precision 3D Crosshair
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-spin-slow">
            <circle cx="12" cy="12" r="8" stroke="#FF5400" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="12" y1="2" x2="12" y2="7" stroke="#FF5400" strokeWidth="1.5" />
            <line x1="12" y1="17" x2="12" y2="22" stroke="#FF5400" strokeWidth="1.5" />
            <line x1="2" y1="12" x2="7" y2="12" stroke="#8824FF" strokeWidth="1.5" />
            <line x1="17" y1="12" x2="22" y2="12" stroke="#8824FF" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2" fill="#FF5400" />
          </svg>
        ) : (
          // Neon Arrow / Dot with dual core
          <div
            className="rounded-full"
            style={{
              width: isHovering ? 10 : 6,
              height: isHovering ? 10 : 6,
              background: 'linear-gradient(135deg, #FF5400, #8824FF)',
              boxShadow: '0 0 12px #FF5400, 0 0 24px rgba(136,36,255,0.8)',
              transition: 'width 0.2s, height 0.2s',
            }}
          />
        )}
      </div>

      {/* Trailing Orbital Ring with Neon Orange/Purple Halo */}
      <div
        className="fixed pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          left: ringPos.x,
          top: ringPos.y,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? (isSpecial ? 54 : 44) : 32,
          height: isHovering ? (isSpecial ? 54 : 44) : 32,
          borderRadius: '50%',
          border: isSpecial
            ? '1.5px solid #FF5400'
            : isHovering
            ? '1.5px solid rgba(255, 84, 0, 0.85)'
            : '1px solid rgba(136, 36, 255, 0.45)',
          background: isHovering ? 'rgba(255, 84, 0, 0.04)' : 'transparent',
          boxShadow: isHovering
            ? '0 0 24px rgba(255, 84, 0, 0.45), inset 0 0 12px rgba(136, 36, 255, 0.3)'
            : '0 0 10px rgba(136, 36, 255, 0.2)',
          transition: 'width 0.25s, height 0.25s, border-color 0.25s, box-shadow 0.25s',
        }}
      >
        {/* TT Monogram inside orbital ring on special CTA elements */}
        {isSpecial && (
          <span
            className="font-playfair text-[10px] font-bold italic tracking-tighter"
            style={{
              color: '#FF5400',
              textShadow: '0 0 8px rgba(255,84,0,0.8)',
            }}
          >
            TT
          </span>
        )}
      </div>
    </>
  )
}
