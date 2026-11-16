import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Zap,
  Layers,
  Target,
  Users2,
  Infinity as InfinityIcon,
  ArrowUpRight,
  Move3d,
  GripHorizontal,
} from 'lucide-react'
import { WhyScene, type LogoReactionState } from '../three/WhyScene'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface PillarData {
  id: string
  icon: typeof Zap
  title: string
  desc: string
  accent: 'orange' | 'purple'
}

const RAW_PILLARS: PillarData[] = [
  {
    id: 'creative',
    icon: Zap,
    title: 'Creative Thinking',
    desc: 'Ideas that stand out and feel genuinely on-brand.',
    accent: 'orange',
  },
  {
    id: 'unified',
    icon: Layers,
    title: 'Unified Approach',
    desc: 'Design, content, marketing and web — aligned together.',
    accent: 'purple',
  },
  {
    id: 'business',
    icon: Target,
    title: 'Business Focus',
    desc: 'Creative work that directly supports real commercial goals.',
    accent: 'orange',
  },
  {
    id: 'collaborative',
    icon: Users2,
    title: 'Collaborative & Agile',
    desc: 'A close, transparent and flexible working style.',
    accent: 'purple',
  },
  {
    id: 'evolve',
    icon: InfinityIcon,
    title: 'Built to Evolve',
    desc: 'Future-proof solutions engineered to grow with your brand.',
    accent: 'orange',
  },
]

interface FlankLayout {
  leftCards: PillarData[]
  rightCards: PillarData[]
  leftOffsets: { jitterX: number; jitterY: number }[]
  rightOffsets: { jitterX: number; jitterY: number }[]
}

// Generate organic randomized left & right flank distribution on every reload
function generateFlankLayout(): FlankLayout {
  // Shuffle cards randomly
  const shuffled = [...RAW_PILLARS].sort(() => Math.random() - 0.5)

  // Randomly assign: 3 left & 2 right, OR 2 left & 3 right
  const leftCount = Math.random() > 0.5 ? 3 : 2
  const leftCards = shuffled.slice(0, leftCount)
  const rightCards = shuffled.slice(leftCount)

  // Subtle organic horizontal and vertical indents within safe margins
  const leftOffsets = leftCards.map(() => ({
    jitterX: Math.floor(Math.random() * 12),
    jitterY: Math.floor((Math.random() - 0.5) * 8),
  }))

  const rightOffsets = rightCards.map(() => ({
    jitterX: Math.floor(Math.random() * 12),
    jitterY: Math.floor((Math.random() - 0.5) * 8),
  }))

  return { leftCards, rightCards, leftOffsets, rightOffsets }
}

export const HowWeWork: React.FC = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const logoCenterRef = useRef<HTMLDivElement>(null)

  // Randomized distribution generated once per page load (fresh & randomized on reload)
  const flankData = useMemo(() => generateFlankLayout(), [])

  // 3D Logo reaction state — active ONLY when a box moves physically over the 3D logo
  const [logoReaction, setLogoReaction] = useState<LogoReactionState>({
    active: false,
    tiltX: 0,
    tiltY: 0,
    proximity: 0,
  })

  // Lazy-load 3D stage when near viewport to eliminate heavy 51MB startup lag
  const [stageVisible, setStageVisible] = useState(false)

  useEffect(() => {
    if (!stageRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStageVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '350px' }
    )
    observer.observe(stageRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full py-20 sm:py-28 px-6 lg:px-12 xl:px-16 bg-[#101519] overflow-hidden select-none"
    >
      {/* Floating Gentle Levitation Keyframes */}
      <style>{`
        @keyframes floatGentle0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-0.3deg); }
        }
        @keyframes floatGentle1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(5px) rotate(0.3deg); }
        }
        @keyframes floatGentle2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.2deg); }
        }
        @keyframes floatGentle3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(4px) rotate(-0.3deg); }
        }
        @keyframes floatGentle4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(0.2deg); }
        }
        .float-anim-0 { animation: floatGentle0 5.2s ease-in-out infinite; }
        .float-anim-1 { animation: floatGentle1 6.4s ease-in-out infinite 1.2s; }
        .float-anim-2 { animation: floatGentle2 5.8s ease-in-out infinite 0.6s; }
        .float-anim-3 { animation: floatGentle3 6.0s ease-in-out infinite 1.8s; }
        .float-anim-4 { animation: floatGentle4 5.4s ease-in-out infinite 2.2s; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* ── Side-by-Side Responsive Grid: Text Left, Smaller 3D Scene Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Narrative Content & Value Highlights */}
          <div ref={headerRef} className="lg:col-span-5 space-y-6">
            {/* Top Label */}
            <div className="inline-flex items-center gap-3">
              <span className="section-label text-[#8824FF]">
                05 / WHY TAGLINE-THREAD
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-[#8824FF] to-transparent" />
            </div>

            {/* Headline */}
            <h2 className="heading-section text-[#E9ECEF]">
              Built Different
              <br />
              for{' '}
              <span className="text-[#FF5400] neon-text-orange italic font-normal" style={{ fontStyle: 'italic' }}>
                Bold Brands.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-body text-[#E9ECEF]/75">
              We're not a traditional agency. We're a tight-knit creative studio that blends
              strategy, design and technology into work that actually works.
            </p>

            {/* Key Value Differentiators */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5400] mt-1.5 flex-shrink-0 shadow-[0_0_6px_#FF5400]" />
                <p className="font-manrope text-xs text-[#E9ECEF]/80 leading-normal">
                  <strong className="text-[#E9ECEF] font-semibold">Direct Collaboration:</strong> You partner directly with the designers and engineers building your brand.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8824FF] mt-1.5 flex-shrink-0 shadow-[0_0_6px_#8824FF]" />
                <p className="font-manrope text-xs text-[#E9ECEF]/80 leading-normal">
                  <strong className="text-[#E9ECEF] font-semibold">Unified Studio:</strong> Brand identity, creative strategy, and custom web systems engineered together.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5400] mt-1.5 flex-shrink-0 shadow-[0_0_6px_#FF5400]" />
                <p className="font-manrope text-xs text-[#E9ECEF]/80 leading-normal">
                  <strong className="text-[#E9ECEF] font-semibold">Built to Evolve:</strong> High-performance architectures crafted to scale with commercial momentum.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#contact"
                className="btn-text inline-flex items-center gap-2 px-7 py-3 rounded-full text-[#0C0E10] bg-[#FF5400] shadow-[0_0_25px_rgba(255,84,0,0.5)] hover:shadow-[0_0_40px_rgba(255,84,0,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold"
              >
                <span>Let's Build Together</span>
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Right Column: Smaller, Compact 3D Scene with Floating Flanks */}
          <div className="lg:col-span-7">
            <div
              ref={stageRef}
              className="relative w-full rounded-3xl p-3 sm:p-4 h-[470px] sm:h-[490px] lg:h-[510px] flex items-center justify-center overflow-hidden"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(24,27,31,0.65) 0%, rgba(12,14,16,0.98) 85%)',
                border: '1px solid rgba(233,236,239,0.11)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Subtle Ambient Radial Glowing Core Behind Logo (clean light, no rings) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,84,0,0.2) 0%, rgba(136,36,255,0.16) 45%, transparent 70%)',
                }}
              />

              {/* Central 3D Canvas (Fills Stage, 3D Logo Centered, Lazy-loaded for zero page-startup lag) */}
              <div className="absolute inset-0 z-10 pointer-events-auto">
                {stageVisible ? (
                  <Canvas
                    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                    style={{ background: 'transparent' }}
                    dpr={[1, 1.5]}
                  >
                    <WhyScene reaction={logoReaction} />
                  </Canvas>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-brand-orange/15 blur-2xl animate-pulse" />
                  </div>
                )}
              </div>

              {/* Precision Collision Target in dead center of 3D Logo (Core 3D Logo Zone) */}
              <div
                ref={logoCenterRef}
                className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center z-10 pointer-events-none"
              >
                {/* Stage Prompt Bar */}
                <div className="absolute -bottom-14 sm:-bottom-16 px-3.5 py-1 rounded-full bg-[#0C0E10]/85 border border-[#E9ECEF]/15 backdrop-blur-md flex items-center gap-1.5 pointer-events-none shadow-lg whitespace-nowrap">
                  <Move3d size={12} className="text-[#FF5400] animate-pulse" />
                  <span className="font-grotesk text-[9px] sm:text-[10px] uppercase tracking-widest text-[#E9ECEF]/80 font-semibold">
                    Pull any Box Over the 3D Logo to Interact
                  </span>
                </div>
              </div>

              {/* ── Desktop Left Flank Column (Strictly Bounded Inside Stage, Smaller Cards) ── */}
              <div className="flank-container hidden sm:flex absolute left-2.5 sm:left-4 top-3.5 bottom-3.5 w-36 sm:w-40 flex-col justify-between pointer-events-none z-20">
                {flankData.leftCards.map((pillar, idx) => (
                  <div
                    key={pillar.id}
                    className="pointer-events-auto w-full"
                    style={{
                      transform: `translate3d(${flankData.leftOffsets[idx]?.jitterX || 0}px, ${flankData.leftOffsets[idx]?.jitterY || 0}px, 0)`,
                    }}
                  >
                    <ClampedDraggableCard
                      pillar={pillar}
                      floatIndex={idx}
                      stageRef={stageRef}
                      logoCenterRef={logoCenterRef}
                      onLogoReactionChange={setLogoReaction}
                    />
                  </div>
                ))}
              </div>

              {/* ── Desktop Right Flank Column (Strictly Bounded Inside Stage, Smaller Cards) ── */}
              <div className="flank-container hidden sm:flex absolute right-2.5 sm:right-4 top-3.5 bottom-3.5 w-36 sm:w-40 flex-col justify-between items-end pointer-events-none z-20">
                {flankData.rightCards.map((pillar, idx) => (
                  <div
                    key={pillar.id}
                    className="pointer-events-auto w-full"
                    style={{
                      transform: `translate3d(-${flankData.rightOffsets[idx]?.jitterX || 0}px, ${flankData.rightOffsets[idx]?.jitterY || 0}px, 0)`,
                    }}
                  >
                    <ClampedDraggableCard
                      pillar={pillar}
                      floatIndex={idx + 3}
                      stageRef={stageRef}
                      logoCenterRef={logoCenterRef}
                      onLogoReactionChange={setLogoReaction}
                    />
                  </div>
                ))}
              </div>

              {/* ── Mobile Layout (< sm screens: Organized Grid at Bottom of Scene) ── */}
              <div className="sm:hidden absolute bottom-2 left-2 right-2 grid grid-cols-2 gap-1.5 z-20 pointer-events-auto">
                {[...flankData.leftCards, ...flankData.rightCards].slice(0, 4).map((pillar, idx) => (
                  <div key={pillar.id} className="w-full">
                    <ClampedDraggableCard
                      pillar={pillar}
                      floatIndex={idx}
                      stageRef={stageRef}
                      logoCenterRef={logoCenterRef}
                      onLogoReactionChange={setLogoReaction}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Compact Clamped Draggable Floating Card with Spring Return ────── */
interface ClampedCardProps {
  pillar: PillarData
  floatIndex: number
  stageRef: React.RefObject<HTMLDivElement | null>
  logoCenterRef: React.RefObject<HTMLDivElement | null>
  onLogoReactionChange: (state: LogoReactionState) => void
}

const ClampedDraggableCard: React.FC<ClampedCardProps> = ({
  pillar,
  floatIndex,
  stageRef,
  logoCenterRef,
  onLogoReactionChange,
}) => {
  const isOrange = pillar.accent === 'orange'
  const accentColor = isOrange ? '#FF5400' : '#8824FF'
  const Icon = pillar.icon
  const floatAnimClass = `float-anim-${floatIndex % 5}`

  // Drag coordinates state
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isSnapping, setIsSnapping] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const originRectRef = useRef<{ left: number; top: number; right: number; bottom: number; width: number; height: number } | null>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if (!cardRef.current || !stageRef.current) return

    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    setIsSnapping(false)

    dragStartRef.current = { x: e.clientX, y: e.clientY }

    // Snapshot card's actual resting position on screen once at start of drag
    const rect = cardRef.current.getBoundingClientRect()
    originRectRef.current = {
      left: rect.left - dragOffset.x,
      right: rect.right - dragOffset.x,
      top: rect.top - dragOffset.y,
      bottom: rect.bottom - dragOffset.y,
      width: rect.width,
      height: rect.height,
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !cardRef.current || !stageRef.current || !originRectRef.current) return

    const rawDx = e.clientX - dragStartRef.current.x
    const rawDy = e.clientY - dragStartRef.current.y

    // Strict containment clamping against stage boundary (Card can NEVER leave the scene!)
    const stageRect = stageRef.current.getBoundingClientRect()
    const origin = originRectRef.current
    const padding = 8 // 8px margin from compact stage boundary

    const minDx = stageRect.left + padding - origin.left
    const maxDx = stageRect.right - padding - origin.right
    const minDy = stageRect.top + padding - origin.top
    const maxDy = stageRect.bottom - padding - origin.bottom

    const clampedDx = Math.max(minDx, Math.min(maxDx, rawDx))
    const clampedDy = Math.max(minDy, Math.min(maxDy, rawDy))

    setDragOffset({ x: clampedDx, y: clampedDy })

    // Precision collision detection with the central 3D logo (checks both card bounds and cursor position)
    if (logoCenterRef.current) {
      const logoRect = logoCenterRef.current.getBoundingClientRect()
      const logoCenterX = logoRect.left + logoRect.width / 2
      const logoCenterY = logoRect.top + logoRect.height / 2
      // Generous collision radius covering the 3D logo core zone
      const logoRadius = Math.max(logoRect.width, logoRect.height) * 0.75

      // Synchronous card bounding box calculation
      const cardLeft = origin.left + clampedDx
      const cardRight = origin.right + clampedDx
      const cardTop = origin.top + clampedDy
      const cardBottom = origin.bottom + clampedDy
      const cardCenterX = cardLeft + origin.width / 2
      const cardCenterY = cardTop + origin.height / 2

      // Check overlap between card bounds and 3D logo zone
      const isCardOverLogo = !(
        cardRight < (logoCenterX - logoRadius) ||
        cardLeft > (logoCenterX + logoRadius) ||
        cardBottom < (logoCenterY - logoRadius) ||
        cardTop > (logoCenterY + logoRadius)
      )

      // Also check if cursor pointer itself is over the 3D logo area
      const cursorDist = Math.hypot(e.clientX - logoCenterX, e.clientY - logoCenterY)
      const isCursorOverLogo = cursorDist < logoRadius

      if (isCardOverLogo || isCursorOverLogo) {
        const dx = cardCenterX - logoCenterX
        const dy = cardCenterY - logoCenterY
        const tiltX = Math.max(-1, Math.min(1, dy / logoRadius))
        const tiltY = Math.max(-1, Math.min(1, -dx / logoRadius))

        onLogoReactionChange({
          active: true,
          tiltX,
          tiltY,
          proximity: 1.0,
        })
      } else {
        // Not over the logo -> returns to natural cursor tracking
        onLogoReactionChange({
          active: false,
          tiltX: 0,
          tiltY: 0,
          proximity: 0,
        })
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // Safe fallback
      }
      setIsDragging(false)
      setIsSnapping(true)

      // Notify parent: logo returns to calm resting state immediately
      onLogoReactionChange({ active: false, tiltX: 0, tiltY: 0, proximity: 0 })

      // Elastic spring back to origin
      setDragOffset({ x: 0, y: 0 })

      // Settle spring back into floating cycle
      setTimeout(() => {
        setIsSnapping(false)
      }, 650)
    }
  }

  return (
    <div className="relative w-full">
      {/* Elastic Tension Thread SVG (visible while dragging away from home) */}
      {isDragging && (dragOffset.x !== 0 || dragOffset.y !== 0) && (
        <svg
          className="absolute pointer-events-none overflow-visible -z-10"
          style={{
            top: '50%',
            left: '50%',
            width: '1px',
            height: '1px',
          }}
        >
          <line
            x1={0}
            y1={0}
            x2={dragOffset.x}
            y2={dragOffset.y}
            stroke={accentColor}
            strokeWidth="1.2"
            strokeDasharray="3 2"
            opacity="0.75"
          />
          <circle cx={0} cy={0} r="2" fill={accentColor} opacity="0.85" />
          <circle cx={dragOffset.x} cy={dragOffset.y} r="2" fill="#FFFFFF" />
        </svg>
      )}

      {/* Floating Compact Card */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`group select-none ${
          !isDragging && !isSnapping ? floatAnimClass : ''
        }`}
        style={{
          transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
          touchAction: 'none',
          zIndex: isDragging ? 50 : 20,
          cursor: isDragging ? 'grabbing' : 'grab',
          // Elastic spring snap-back when released, instant tracking while dragging
          transition: isDragging
            ? 'none'
            : isSnapping
            ? 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease'
            : 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          className="relative p-2 sm:p-2.5 rounded-lg transition-all duration-300"
          style={{
            background: isDragging
              ? 'linear-gradient(145deg, rgba(35,39,45,0.96) 0%, rgba(12,14,16,0.98) 100%)'
              : 'linear-gradient(145deg, rgba(24,27,31,0.88) 0%, rgba(12,14,16,0.94) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isDragging
              ? `1.5px solid ${accentColor}`
              : isSnapping
              ? `1.5px solid ${accentColor}90`
              : '1px solid rgba(233,236,239,0.11)',
            boxShadow: isDragging
              ? `0 0 25px -4px ${accentColor}70, 0 10px 25px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.2)`
              : '0 6px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Top neon highlight line */}
          <div
            className="absolute top-0 left-2 right-2 h-[1px] rounded-full transition-opacity duration-300 opacity-60 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
          />

          {/* Top Row: Icon + Title + Grip Handle */}
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}25 0%, rgba(28,32,36,0.6) 100%)`,
                  border: `1px solid ${accentColor}50`,
                  boxShadow: `0 0 8px -2px ${accentColor}40`,
                }}
              >
                <Icon size={10} color={accentColor} />
              </div>
              <h4 className="font-manrope font-bold text-[10px] sm:text-[10.5px] text-[#E9ECEF] group-hover:text-white transition-colors truncate">
                {pillar.title}
              </h4>
            </div>

            {/* Drag Grip Handle */}
            <div
              className="w-3.5 h-3.5 rounded flex items-center justify-center text-[#E9ECEF]/30 group-hover:text-[#FF5400] transition-colors flex-shrink-0"
              title="Drag over 3D logo to interact"
            >
              <GripHorizontal size={9} />
            </div>
          </div>

          {/* Description */}
          <p className="font-manrope text-[8px] sm:text-[8.5px] text-[#E9ECEF]/70 leading-snug pl-5 sm:pl-6 group-hover:text-[#E9ECEF]/90 transition-colors line-clamp-2">
            {pillar.desc}
          </p>

          {/* Dynamic Drag State Feedback */}
          {isDragging && (
            <div
              className="mt-1 py-0.5 px-1 rounded font-grotesk text-[6.5px] uppercase tracking-wider text-center font-semibold"
              style={{
                background: `${accentColor}25`,
                color: accentColor,
              }}
            >
              ✦ Drag over 3D logo &bull; Snap back
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
