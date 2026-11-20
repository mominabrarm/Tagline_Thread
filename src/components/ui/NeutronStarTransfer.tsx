import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface NeutronStarTransferProps {
  onActivationChange: (activatedCount: number, ignitingIndex: number) => void
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

export const NeutronStarTransfer: React.FC<NeutronStarTransferProps> = ({
  onActivationChange,
}) => {
  const reducedMotion = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const sourcePulseRef = useRef<SVGCircleElement>(null)
  const junctionRef = useRef<SVGCircleElement>(null)
  const mainGlowRef = useRef<SVGPathElement>(null)
  const mainBodyRef = useRef<SVGPathElement>(null)
  const mainCoreRef = useRef<SVGPathElement>(null)
  const mainParticleRefs = useRef<Array<SVGCircleElement | null>>([])
  const branchGlowRefs = useRef<Array<SVGPathElement | null>>([])
  const branchBodyRefs = useRef<Array<SVGPathElement | null>>([])
  const branchCoreRefs = useRef<Array<SVGPathElement | null>>([])
  const branchPulseRefs = useRef<Array<SVGCircleElement | null>>([])

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('#hero')
    const approach = document.querySelector<HTMLElement>('#the-engine')
    const source = document.querySelector<HTMLElement>('[data-neutron-star-source]')
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-approach-card]'),
    )
    const svg = svgRef.current

    if (!hero || !approach || !source || !svg || cards.length !== 5) {
      console.error(
        'NeutronStarTransfer requires the Hero source and all five Approach cards.',
      )
      return
    }

    let activatedCount = 0
    const pendingActivationTimers = new Set<number>()
    let lastSourceDocumentY =
      window.scrollY +
      hero.getBoundingClientRect().top +
      Math.min(window.innerHeight, hero.getBoundingClientRect().height) / 2
    let latestProgress = 0
    const handleResize = () => ScrollTrigger.refresh()

    const setPath = (
      path: SVGPathElement | null,
      d: string,
      visibleLength: number,
      opacity: number,
    ) => {
      if (!path) return
      path.setAttribute('d', d)
      path.setAttribute('stroke-dasharray', `${clamp(visibleLength)} 1`)
      path.setAttribute('stroke-dashoffset', '0')
      path.setAttribute('opacity', String(opacity))
      path.setAttribute('visibility', opacity > 0 ? 'visible' : 'hidden')
    }

    const setCircle = (
      circle: SVGCircleElement | null,
      point: { x: number; y: number },
      radius: number,
      opacity: number,
    ) => {
      if (!circle) return
      circle.setAttribute('cx', String(point.x))
      circle.setAttribute('cy', String(point.y))
      circle.setAttribute('r', String(radius))
      circle.setAttribute('opacity', String(opacity))
      circle.setAttribute('visibility', opacity > 0 ? 'visible' : 'hidden')
    }

    const draw = (rawProgress: number) => {
      const progress = clamp(rawProgress)
      latestProgress = progress

      const width = window.innerWidth
      const height = window.innerHeight
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

      const sourceBounds = source.getBoundingClientRect()
      const sourceVisible = sourceBounds.width > 0 && sourceBounds.height > 0
      const sourceX = sourceVisible
        ? sourceBounds.left + sourceBounds.width / 2
        : width / 2
      const sourceY = sourceVisible
        ? sourceBounds.top + sourceBounds.height / 2
        : lastSourceDocumentY - window.scrollY

      if (sourceVisible) {
        lastSourceDocumentY = window.scrollY + sourceY
      }

      source.dataset.energyCharge = String(
        reducedMotion
          ? 0
          : clamp(progress / 0.12) * (1 - clamp((progress - 0.22) / 0.12)),
      )

      const targets = cards.map((card) => {
        const bounds = card.getBoundingClientRect()
        return {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + 2,
        }
      })
      const distributionProgress = clamp(
        (height * 1.1 - Math.min(...targets.map((point) => point.y))) /
          (height * 0.65),
      )
      const junction = {
        x: targets.reduce((sum, point) => sum + point.x, 0) / targets.length,
        y:
          Math.min(...targets.map((point) => point.y)) -
          Math.min(58, height * 0.08),
      }
      const horizontalDelta = junction.x - sourceX
      const verticalDelta = junction.y - sourceY
      const mainPath = [
        `M ${sourceX} ${sourceY}`,
        `C ${sourceX + horizontalDelta * 0.16} ${sourceY + verticalDelta * 0.34}`,
        `${junction.x - horizontalDelta * 0.16} ${junction.y - verticalDelta * 0.3}`,
        `${junction.x} ${junction.y}`,
      ].join(' ')
      const mainProgress = reducedMotion
        ? (distributionProgress >= 0.35 ? 1 : 0)
        : clamp((progress - 0.02) / 0.54)

      setPath(mainGlowRef.current, mainPath, mainProgress, mainProgress > 0 ? 0.72 : 0)
      setPath(mainBodyRef.current, mainPath, mainProgress, mainProgress > 0 ? 0.9 : 0)
      setPath(mainCoreRef.current, mainPath, mainProgress, mainProgress > 0 ? 0.96 : 0)

      const mainPathElement = mainCoreRef.current
      if (mainPathElement && mainProgress > 0) {
        const totalLength = mainPathElement.getTotalLength()
        mainParticleRefs.current.forEach((particle, index) => {
          const along = mainProgress * (0.38 + index * 0.25)
          const point = mainPathElement.getPointAtLength(totalLength * along)
          setCircle(particle, point, index === 1 ? 2.4 : 1.7, 0.82)
        })
      } else {
        mainParticleRefs.current.forEach((particle) => {
          if (particle) particle.setAttribute('visibility', 'hidden')
        })
      }

      const releaseCharge = reducedMotion
        ? 0
        : clamp(progress / 0.12) * (1 - clamp((progress - 0.2) / 0.16))
      setCircle(
        sourcePulseRef.current,
        { x: sourceX, y: sourceY },
        18 + releaseCharge * 32,
        releaseCharge * 0.82,
      )
      setCircle(
        junctionRef.current,
        junction,
        3.5 + (reducedMotion ? 0 : progress * 3),
        distributionProgress >= 0.18 ? (reducedMotion ? 0.28 : 0.85) : 0,
      )

      const branchProgresses = targets.map((target, index) => {
        const deltaX = target.x - junction.x
        const deltaY = target.y - junction.y
        const branchPath = [
          `M ${junction.x} ${junction.y}`,
          `C ${junction.x + deltaX * 0.24} ${junction.y + deltaY * 0.18}`,
          `${target.x - deltaX * 0.18} ${target.y - deltaY * 0.32}`,
          `${target.x} ${target.y}`,
        ].join(' ')
        const cardArrivalProgress = clamp(
          (height * 1.1 - target.y) / (height * 0.65),
        )
        const branchProgress = reducedMotion
          ? (distributionProgress >= 0.35 ? 1 : 0)
          : clamp((cardArrivalProgress - index * 0.1) / 0.35)
        const settledOpacity = reducedMotion ? 0.22 : 0.3
        const branchOpacity =
          branchProgress <= 0
            ? 0
            : branchProgress < 1
              ? 0.92
              : settledOpacity

        setPath(
          branchGlowRefs.current[index],
          branchPath,
          branchProgress,
          branchOpacity * 0.8,
        )
        setPath(
          branchBodyRefs.current[index],
          branchPath,
          branchProgress,
          branchOpacity,
        )
        setPath(
          branchCoreRefs.current[index],
          branchPath,
          branchProgress,
          branchOpacity * (reducedMotion ? 0.58 : 0.86),
        )

        const pulse = branchPulseRefs.current[index]
        const corePath = branchCoreRefs.current[index]
        if (pulse && corePath && branchProgress > 0 && branchProgress < 1) {
          const point = corePath.getPointAtLength(
            corePath.getTotalLength() * branchProgress,
          )
          setCircle(pulse, point, 3.2, reducedMotion ? 0 : 0.96)
        } else if (pulse) {
          pulse.setAttribute('visibility', 'hidden')
        }

        return branchProgress
      })

      const nextActivatedCount = reducedMotion
        ? distributionProgress >= 0.35 ? cards.length : 0
        : branchProgresses.filter((branchProgress) => branchProgress >= 1).length

      if (nextActivatedCount < activatedCount) {
        pendingActivationTimers.forEach((timer) => window.clearTimeout(timer))
        pendingActivationTimers.clear()
        activatedCount = nextActivatedCount
        onActivationChange(activatedCount, -1)
      } else if (nextActivatedCount > activatedCount) {
        const previousCount = activatedCount
        activatedCount = nextActivatedCount

        for (let count = previousCount + 1; count <= nextActivatedCount; count += 1) {
          const ignitingIndex = reducedMotion ? -1 : count - 1
          const timer = window.setTimeout(() => {
            pendingActivationTimers.delete(timer)
            onActivationChange(count, ignitingIndex)
          }, reducedMotion ? 0 : (count - previousCount - 1) * 140)
          pendingActivationTimers.add(timer)
        }
      }
    }

    const handleLayoutChange = () => draw(latestProgress)
    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      endTrigger: cards[cards.length - 1],
      end: 'top 55%',
      scrub: reducedMotion ? true : 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => draw(self.progress),
      onRefresh: (self) => draw(self.progress),
    })

    draw(trigger.progress)

    const resizeObserver = new ResizeObserver(() => draw(latestProgress))
    resizeObserver.observe(approach)
    cards.forEach((card) => resizeObserver.observe(card))
    resizeObserver.observe(source)
    window.addEventListener('resize', handleResize)
    window.addEventListener('neutron-star-transfer-layout', handleLayoutChange)

    return () => {
      trigger.kill()
      resizeObserver.disconnect()
      pendingActivationTimers.forEach((timer) => window.clearTimeout(timer))
      pendingActivationTimers.clear()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('neutron-star-transfer-layout', handleLayoutChange)
      source.dataset.energyCharge = '0'
      onActivationChange(0, -1)
    }
  }, [onActivationChange, reducedMotion])

  const overlay = (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[30] h-screen w-screen overflow-visible"
      fill="none"
      preserveAspectRatio="none"
      style={{ mixBlendMode: 'screen' }}
    >
      <defs>
        <linearGradient id="neutron-beam-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8338EC" />
          <stop offset="55%" stopColor="#E9ECEF" />
          <stop offset="100%" stopColor="#8338EC" />
        </linearGradient>
        <radialGradient id="neutron-release">
          <stop offset="0%" stopColor="#E9ECEF" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#8338EC" stopOpacity="0.52" />
          <stop offset="100%" stopColor="#8338EC" stopOpacity="0" />
        </radialGradient>
        <filter
          id="neutron-beam-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle ref={sourcePulseRef} fill="url(#neutron-release)" visibility="hidden" />

      <path
        ref={mainGlowRef}
        pathLength="1"
        stroke="#8338EC"
        strokeWidth="18"
        strokeLinecap="round"
        filter="url(#neutron-beam-glow)"
        visibility="hidden"
      />
      <path
        ref={mainBodyRef}
        pathLength="1"
        stroke="#8338EC"
        strokeWidth="5.5"
        strokeLinecap="round"
        visibility="hidden"
      />
      <path
        ref={mainCoreRef}
        pathLength="1"
        stroke="url(#neutron-beam-core)"
        strokeWidth="1.8"
        strokeLinecap="round"
        visibility="hidden"
      />

      {Array.from({ length: 3 }, (_, index) => (
        <circle
          key={`main-particle-${index}`}
          ref={(element) => {
            mainParticleRefs.current[index] = element
          }}
          r={index === 1 ? 2.4 : 1.7}
          fill="#E9ECEF"
          filter="url(#neutron-beam-glow)"
          visibility="hidden"
        />
      ))}

      {Array.from({ length: 5 }, (_, index) => (
        <g key={`branch-${index}`}>
          <path
            ref={(element) => {
              branchGlowRefs.current[index] = element
            }}
            pathLength="1"
            stroke="#8338EC"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#neutron-beam-glow)"
            visibility="hidden"
          />
          <path
            ref={(element) => {
              branchBodyRefs.current[index] = element
            }}
            pathLength="1"
            stroke="#8338EC"
            strokeWidth="3.2"
            strokeLinecap="round"
            visibility="hidden"
          />
          <path
            ref={(element) => {
              branchCoreRefs.current[index] = element
            }}
            pathLength="1"
            stroke="#E9ECEF"
            strokeWidth="1.1"
            strokeLinecap="round"
            visibility="hidden"
          />
          <circle
            ref={(element) => {
              branchPulseRefs.current[index] = element
            }}
            r="3.2"
            fill="#E9ECEF"
            filter="url(#neutron-beam-glow)"
            visibility="hidden"
          />
        </g>
      ))}

      <circle
        ref={junctionRef}
        fill="#E9ECEF"
        filter="url(#neutron-beam-glow)"
        visibility="hidden"
      />
    </svg>
  )

  return typeof document === 'undefined' ? null : createPortal(overlay, document.body)
}
