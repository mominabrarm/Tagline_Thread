import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

export interface OrbitStackItem {
  id: string
  num: string
  title: string
  category: string
  tagline: string
  description: string
  accent: string
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  capabilities: { title: string; desc: string }[]
  metrics?: { label: string; value: string }
}

export interface OrbitCardStackProps {
  items: OrbitStackItem[]
  defaultActiveIndex?: number
  controlledIndex?: number | null
  spread?: number
  lift?: number
  onActiveChange?: (item: OrbitStackItem, index: number) => void
  onCardClick?: (item: OrbitStackItem, index: number) => void
  className?: string
}

export const OrbitCardStack: React.FC<OrbitCardStackProps> = ({
  items,
  defaultActiveIndex = 2,
  controlledIndex,
  spread = 150,
  lift = 36,
  onActiveChange,
  onCardClick,
  className = '',
}) => {
  const centerIndex = Math.floor(items.length / 2)
  const [activeIndex, setActiveIndex] = useState<number>(
    controlledIndex !== undefined && controlledIndex !== null
      ? controlledIndex
      : defaultActiveIndex ?? centerIndex
  )
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isContainerHovered, setIsContainerHovered] = useState<boolean>(false)
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync with controlledIndex from parent
  useEffect(() => {
    if (controlledIndex !== undefined && controlledIndex !== null) {
      setActiveIndex(controlledIndex)
    }
  }, [controlledIndex])

  // Detect touch device to tailor interaction
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      )
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Responsive spread based on viewport width
  const [responsiveSpread, setResponsiveSpread] = useState<number>(spread)

  useEffect(() => {
    const updateSpread = () => {
      if (typeof window === 'undefined') return
      const width = window.innerWidth
      if (width < 640) {
        setResponsiveSpread(Math.min(spread, 52))
      } else if (width < 1024) {
        setResponsiveSpread(Math.min(spread, 95))
      } else {
        setResponsiveSpread(spread)
      }
    }
    updateSpread()
    window.addEventListener('resize', updateSpread)
    return () => window.removeEventListener('resize', updateSpread)
  }, [spread])

  const handleSelectCard = (index: number) => {
    setActiveIndex(index)
    if (onActiveChange && items[index]) {
      onActiveChange(items[index], index)
    }
    if (onCardClick && items[index]) {
      onCardClick(items[index], index)
    }
  }

  const handleCardHover = (index: number) => {
    if (isTouchDevice) return
    setHoveredIndex(index)
    setActiveIndex(index)
    if (onActiveChange && items[index]) {
      onActiveChange(items[index], index)
    }
  }

  const handleCardLeave = () => {
    if (isTouchDevice) return
    setHoveredIndex(null)
    setActiveIndex(centerIndex)
    if (onActiveChange && items[centerIndex]) {
      onActiveChange(items[centerIndex], centerIndex)
    }
  }

  // When container is not hovered, focus strictly reverts to center card
  const currentFocusedIndex =
    isContainerHovered || isTouchDevice
      ? hoveredIndex !== null
        ? hoveredIndex
        : activeIndex
      : (controlledIndex !== undefined && controlledIndex !== null ? controlledIndex : centerIndex)

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => {
        if (!isTouchDevice) setIsContainerHovered(true)
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) {
          setIsContainerHovered(false)
          setHoveredIndex(null)
          setActiveIndex(centerIndex)
        }
      }}
      role="region"
      aria-label="Interactive services card stack"
    >
      {/* ── Outer Stage for Card Deck ── */}
      <div className="relative w-full h-[280px] sm:h-[300px] flex items-center justify-center overflow-visible">
        {/* Soft Radial Ambient Backlight */}
        <div
          className="absolute inset-0 max-w-xl mx-auto rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, ${items[currentFocusedIndex]?.accent || '#FB5607'}33 0%, transparent 70%)`,
          }}
        />

        {/* The Card Deck */}
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {items.map((item, index) => {
            const isCurrentActive = index === currentFocusedIndex
            const isFanned = isContainerHovered || isTouchDevice

            // Offset calculation relative to center card
            const offsetFromCenter = index - centerIndex
            // Offset calculation relative to active item for depth stacking
            const offsetFromActive = index - currentFocusedIndex

            // Horizontal position:
            // Collapsed: strictly gathers around center card (offsetFromCenter * 24)
            // Fanned: full spread across the orbital arc
            const collapsedX = offsetFromCenter * 24
            const fannedX = offsetFromCenter * responsiveSpread
            const targetX = isFanned ? fannedX : collapsedX

            // Vertical position (lift active card up, slight orbital curve for edge cards)
            const arcY = Math.abs(offsetFromCenter) * 6
            const liftY = isFanned && isCurrentActive ? -lift : 0
            const targetY = isFanned
              ? liftY + arcY
              : Math.abs(offsetFromCenter) * 3

            // Rotation angle: fanned has slight rotational spread
            const collapsedRot = offsetFromCenter * 2.2
            const fannedRot = offsetFromCenter * 2.8
            const targetRot = isFanned ? fannedRot : collapsedRot

            // Z-Index: active card sits at front (50), neighbors lower
            const zIndex = isCurrentActive
              ? 50
              : 40 - Math.abs(offsetFromActive)

            // Scale: active card lifts and grows slightly
            const targetScale = isCurrentActive ? 1.04 : 0.96

            const IconComponent = item.icon
            const accentColor = item.accent

            return (
              <motion.div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-selected={isCurrentActive}
                aria-label={`${item.title} - ${item.category}`}
                onClick={() => handleSelectCard(index)}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelectCard(index)
                  }
                }}
                className="absolute cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FB5607] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c0d] rounded-2xl"
                initial={false}
                animate={{
                  x: targetX,
                  y: targetY,
                  rotate: targetRot,
                  scale: targetScale,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 340,
                  damping: 26,
                  mass: 0.8,
                }}
                style={{
                  transformOrigin: '50% 100%',
                }}
              >
                {/* ── The Physical Glass Card ── */}
                <div
                  className={`w-[220px] sm:w-[260px] md:w-[275px] h-[310px] sm:h-[340px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isCurrentActive
                      ? 'shadow-[0_20px_45px_rgba(0,0,0,0.65)]'
                      : 'shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.55)]'
                  }`}
                  style={{
                    background: isCurrentActive
                      ? 'linear-gradient(145deg, rgba(22, 26, 32, 0.95) 0%, rgba(14, 16, 20, 0.98) 100%)'
                      : 'linear-gradient(145deg, rgba(18, 21, 26, 0.88) 0%, rgba(11, 13, 16, 0.92) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isCurrentActive
                      ? '2px solid #FB5607'
                      : '1px solid rgba(255, 255, 255, 0.10)',
                    boxShadow: isCurrentActive
                      ? '0 0 35px -2px rgba(251,86,7,0.45), 0 20px 45px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.20)'
                      : '0 12px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Glowing Top Lip Highlight */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #FB5607, transparent)',
                      opacity: isCurrentActive ? 1 : 0.4,
                    }}
                  />

                  {/* Card Header: Index (Image 3 reference style) */}
                  <div className="flex items-center justify-between">
                    <span className="font-grotesk text-xs sm:text-sm font-semibold tracking-wider text-[#8E959E]">
                      {item.num}
                    </span>
                  </div>

                  {/* Card Center: 3D Dimensional Graphic */}
                  <div className="flex flex-col items-center justify-center my-auto py-2 relative">
                    {/* Soft ambient radial bloom behind the 3D graphic */}
                    <div
                      className="absolute w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
                      style={{
                        background: isCurrentActive
                          ? 'radial-gradient(circle, rgba(251,86,7,0.4) 0%, transparent 70%)'
                          : `radial-gradient(circle, ${accentColor}35 0%, transparent 70%)`,
                        opacity: isCurrentActive ? 0.9 : 0.4,
                      }}
                    />

                    <div
                      className="relative z-10 transition-transform duration-300 flex items-center justify-center"
                      style={{
                        transform: isCurrentActive ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                      }}
                    >
                      <IconComponent
                        size={84}
                        className="transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Card Footer: Title (matching Image 3) */}
                  <div className="space-y-1 pt-3 border-t border-white/[0.08] text-center">
                    <h3
                      className="font-manrope text-sm sm:text-[15px] font-bold tracking-tight text-[#EAECEE] leading-snug"
                      style={{
                        color: isCurrentActive ? '#FFFFFF' : '#EAECEE',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Desktop & Tablet Hint Pill ── */}
      <div className="flex items-center gap-2 mt-1 mb-2 text-[#8E959E] text-xs font-grotesk tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FB5607] animate-pulse" />
        <span>
          {isTouchDevice ? 'TAP A CARD TO VIEW DETAILS' : 'HOVER TO FAN DECK • CLICK CARD FOR DETAILS'}
        </span>
      </div>
    </div>
  )
}
