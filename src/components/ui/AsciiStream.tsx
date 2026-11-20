import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AsciiStreamProps {
  className?: string
  active?: boolean
}

const GLYPHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const PURPLE = '131, 56, 236'
const PURPLE_HEX = '#8338EC'
const ORANGE = '250, 86, 8'
const ORANGE_HEX = '#fa5608'
const SOFT_WHITE = '233, 236, 239'
const WHITE_HEX = '#E9ECEF'
const TRAIL_COUNT = 70
const TRAIL_OFFSETS = Array.from(
  { length: TRAIL_COUNT },
  (_, index) => 0.02 + 0.95 * ((index + 1) / TRAIL_COUNT) ** 1.35,
)

interface LaneColorConfig {
  startRgb: string
  midRgb: string
  endRgb: string
  startHex: string
  midHex: string
  endHex: string
  glowHex: string
}

// Randomly combine both colors (#fa5608 and #8338EC) across distinct lanes
const LANE_CONFIGS: LaneColorConfig[] = Array.from({ length: TRAIL_COUNT }, (_, lane) => {
  // Deterministic pseudo-random seed per lane for consistent 60fps rendering without frame jitter
  const r1 = Math.abs(Math.sin((lane + 1) * 12.9898 + (lane % 5) * 78.233)) % 1
  const r2 = Math.abs(Math.cos((lane + 1) * 37.719 + lane * 19.317)) % 1

  // Accent highlights (soft white glow) on select distinct lanes
  if (lane === 11 || (r1 > 0.94 && lane % 7 === 0)) {
    return {
      startRgb: SOFT_WHITE,
      midRgb: SOFT_WHITE,
      endRgb: SOFT_WHITE,
      startHex: WHITE_HEX,
      midHex: WHITE_HEX,
      endHex: WHITE_HEX,
      glowHex: WHITE_HEX,
    }
  }

  // Dual-color hybrid lanes: Orange (#fa5608) blending into Purple (#8338EC)
  if (r1 < 0.28) {
    return {
      startRgb: ORANGE,
      midRgb: r2 > 0.5 ? ORANGE : PURPLE,
      endRgb: PURPLE,
      startHex: ORANGE_HEX,
      midHex: r2 > 0.5 ? ORANGE_HEX : PURPLE_HEX,
      endHex: PURPLE_HEX,
      glowHex: ORANGE_HEX,
    }
  }

  // Dual-color hybrid lanes: Purple (#8338EC) blending into Orange (#fa5608)
  if (r1 < 0.52) {
    return {
      startRgb: PURPLE,
      midRgb: r2 > 0.5 ? PURPLE : ORANGE,
      endRgb: ORANGE,
      startHex: PURPLE_HEX,
      midHex: r2 > 0.5 ? PURPLE_HEX : ORANGE_HEX,
      endHex: ORANGE_HEX,
      glowHex: PURPLE_HEX,
    }
  }

  // Distinct Pure Orange lanes (#fa5608)
  if (r1 < 0.78) {
    return {
      startRgb: ORANGE,
      midRgb: ORANGE,
      endRgb: ORANGE,
      startHex: ORANGE_HEX,
      midHex: ORANGE_HEX,
      endHex: ORANGE_HEX,
      glowHex: ORANGE_HEX,
    }
  }

  // Distinct Pure Purple lanes (#8338EC)
  return {
    startRgb: PURPLE,
    midRgb: PURPLE,
    endRgb: PURPLE,
    startHex: PURPLE_HEX,
    midHex: PURPLE_HEX,
    endHex: PURPLE_HEX,
    glowHex: PURPLE_HEX,
  }
})

export const AsciiStream: React.FC<AsciiStreamProps> = ({
  className = '',
  active = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || !active) return

    let width = 0
    let height = 0
    let pixelRatio = 1
    let animationFrame = 0
    let isVisible = false
    let lastFrameTime = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const draw = (time: number) => {
      if (!reducedMotion && time - lastFrameTime < 32) {
        animationFrame = window.requestAnimationFrame(draw)
        return
      }

      lastFrameTime = time
      if (!width || !height) {
        if (!reducedMotion && isVisible) {
          animationFrame = window.requestAnimationFrame(draw)
        }
        return
      }

      context.clearRect(0, 0, width, height)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      const phase = reducedMotion ? 0 : time * 0.001
      const flow = reducedMotion ? 0 : time * 0.00013
      const energyCharge = Math.max(
        0,
        Math.min(1, Number(canvas.parentElement?.dataset.energyCharge ?? 0)),
      )
      const centerX = width / 2
      const centerY = height / 2 + Math.sin(phase * 0.7) * 0.6
      const corridorRadius = Math.min(height * 0.46, width * 0.5)

      for (let lane = 0; lane < TRAIL_OFFSETS.length; lane += 1) {
        const offsetScale = TRAIL_OFFSETS[lane]
        const laneCfg = LANE_CONFIGS[lane]
        const offset = corridorRadius * offsetScale
        const wideLane = lane % 5 === 2 || lane % 5 === 4
        const wideWidth = wideLane
          ? [5, 7.5, 10][(Math.floor(lane / 5) + (lane % 5 === 4 ? 1 : 0)) % 3]
          : 0

        for (const polarity of [-1, 1] as const) {
          for (const side of [-1, 1] as const) {
            const startX = side < 0 ? 0 : width
            const startWave =
              Math.sin(phase * 0.65 + lane * 0.78 + polarity * side) *
              Math.min(5, height * 0.006)
            const endY = centerY + Math.sin(phase + lane) * 1.1
            const startY = centerY + polarity * offset + startWave
            const control1X = startX + (centerX - startX) * 0.34
            const control2X = startX + (centerX - startX) * 0.82
            const control1Y = centerY + polarity * offset * 0.92 + startWave * 0.72
            const control2Y = centerY + polarity * offset * 0.1 - startWave * 0.16

            const pointAt = (progress: number) => {
              const inverse = 1 - progress
              return {
                x:
                  inverse ** 3 * startX +
                  3 * inverse ** 2 * progress * control1X +
                  3 * inverse * progress ** 2 * control2X +
                  progress ** 3 * centerX,
                y:
                  inverse ** 3 * startY +
                  3 * inverse ** 2 * progress * control1Y +
                  3 * inverse * progress ** 2 * control2Y +
                  progress ** 3 * endY,
              }
            }

            const pulse = 0.88 + 0.12 * Math.sin(phase * 1.4 + lane * 0.9 + side)
            const trailAlpha =
              (offsetScale >= 0.76 ? 0.16 : offsetScale >= 0.38 ? 0.11 : 0.075) *
              pulse *
              (wideLane ? 0.26 : 1)
            const isGlowTrail =
              (wideLane && lane % 10 === 4) ||
              (!wideLane && (lane % 9 === 2 || offsetScale >= 0.94))
            const drawFullTrail = () => {
              context.beginPath()
              context.moveTo(startX, startY)
              context.bezierCurveTo(
                control1X,
                control1Y,
                control2X,
                control2Y,
                centerX,
                endY,
              )
            }

            if (isGlowTrail) {
              drawFullTrail()
              context.strokeStyle = `rgba(${laneCfg.startRgb}, ${trailAlpha * 0.34})`
              context.lineWidth = wideLane ? wideWidth + 2 : offsetScale >= 0.9 ? 7 : 5
              context.shadowBlur = wideLane ? wideWidth * 1.35 : offsetScale >= 0.9 ? 16 : 10
              context.shadowColor = laneCfg.glowHex
              context.stroke()
              context.shadowBlur = 0
            }

            const trailGradient = context.createLinearGradient(
              startX,
              startY,
              centerX,
              endY,
            )
            trailGradient.addColorStop(0, `rgba(${laneCfg.startRgb}, ${trailAlpha * 1.7})`)
            trailGradient.addColorStop(0.5, `rgba(${laneCfg.midRgb}, ${trailAlpha * 1.15})`)
            trailGradient.addColorStop(1, `rgba(${laneCfg.endRgb}, ${trailAlpha * 0.38})`)
            drawFullTrail()
            context.strokeStyle = trailGradient
            context.lineWidth =
              wideLane
                ? wideWidth
                : offsetScale >= 0.76
                  ? 1.55
                  : offsetScale >= 0.38
                    ? 1.1
                    : 0.75
            context.stroke()

            if (lane % 4 === 0 || (wideLane && lane % 10 === 4)) {
              const streakLength = offsetScale >= 0.76 ? 0.19 : 0.15
              const phaseOffset = lane * 0.087 + (polarity > 0 ? 0.29 : 0) + (side > 0 ? 0.47 : 0)
              const streakStart = ((flow + phaseOffset) % 1) * (1 - streakLength)
              const streakEnd = streakStart + streakLength
              const streakFrom = pointAt(streakStart)
              const streakTo = pointAt(streakEnd)
              const streakGradient = context.createLinearGradient(
                streakFrom.x,
                streakFrom.y,
                streakTo.x,
                streakTo.y,
              )
              streakGradient.addColorStop(0, `rgba(${laneCfg.startRgb}, 0)`)
              streakGradient.addColorStop(0.55, `rgba(${laneCfg.midRgb}, 0.32)`)
              streakGradient.addColorStop(0.9, `rgba(${laneCfg.endRgb}, 0.88)`)
              streakGradient.addColorStop(1, `rgba(${laneCfg.endRgb}, 0.96)`)

              context.beginPath()
              context.moveTo(streakFrom.x, streakFrom.y)
              for (let step = 1; step <= 10; step += 1) {
                const point = pointAt(streakStart + (streakLength * step) / 10)
                context.lineTo(point.x, point.y)
              }
              context.strokeStyle = streakGradient
              context.lineWidth = wideLane ? wideWidth * 0.85 : isGlowTrail ? 2.2 : 1.45
              context.shadowBlur = wideLane ? wideWidth * 0.7 : isGlowTrail ? 10 : 5
              context.shadowColor = laneCfg.glowHex
              context.stroke()
              context.shadowBlur = 0
            }

            if (lane % 7 === 0) {
              const particle = pointAt((flow * 0.8 + lane * 0.19 + side * 0.13) % 1)
              context.beginPath()
              context.arc(particle.x, particle.y, 1.1, 0, Math.PI * 2)
              context.fillStyle = laneCfg.glowHex
              context.globalAlpha = 0.36
              context.shadowBlur = 6
              context.shadowColor = laneCfg.glowHex
              context.fill()
              context.shadowBlur = 0
              context.globalAlpha = 1
            }

            if (lane % 14 === 2) {
              context.font = '8px "Space Grotesk", monospace'
              context.textBaseline = 'middle'
              context.textAlign = 'center'

              for (let glyph = 0; glyph < 8; glyph += 1) {
                const glyphProgress =
                  (flow * 0.75 +
                    lane * 0.11 +
                    glyph * 0.105 +
                    (polarity > 0 ? 0.31 : 0) +
                    (side > 0 ? 0.43 : 0)) %
                  1
                const point = pointAt(glyphProgress)
                const before = pointAt(Math.max(0, glyphProgress - 0.004))
                const after = pointAt(Math.min(1, glyphProgress + 0.004))
                let angle = Math.atan2(after.y - before.y, after.x - before.x)
                if (angle > Math.PI / 2) angle -= Math.PI
                else if (angle < -Math.PI / 2) angle += Math.PI

                context.save()
                context.translate(point.x, point.y)
                context.rotate(angle)
                context.globalAlpha = 0.14 + 0.06 * Math.sin(phase + glyph + lane)
                context.fillStyle = `rgba(${laneCfg.midRgb}, 0.9)`
                context.fillText(
                  GLYPHS[(lane * 11 + glyph * 7) % GLYPHS.length],
                  0,
                  0,
                )
                context.restore()
              }
            }
          }
        }
      }

      const bandPulse = 0.9 + Math.sin(phase * 0.8) * 0.1
      const bandGradient = context.createLinearGradient(0, 0, width, 0)
      bandGradient.addColorStop(0, `rgba(${PURPLE}, 0.72)`)
      bandGradient.addColorStop(0.035, `rgba(${ORANGE}, 0.55)`)
      bandGradient.addColorStop(0.1, `rgba(${PURPLE}, 0.4)`)
      bandGradient.addColorStop(0.36, `rgba(${PURPLE}, 0.2)`)
      bandGradient.addColorStop(0.5, `rgba(${SOFT_WHITE}, 0.62)`)
      bandGradient.addColorStop(0.64, `rgba(${PURPLE}, 0.2)`)
      bandGradient.addColorStop(0.9, `rgba(${PURPLE}, 0.4)`)
      bandGradient.addColorStop(0.965, `rgba(${ORANGE}, 0.55)`)
      bandGradient.addColorStop(1, `rgba(${PURPLE}, 0.72)`)

      context.beginPath()
      context.moveTo(0, centerY)
      context.lineTo(width, centerY)
      context.strokeStyle = bandGradient
      context.lineWidth = 9
      context.globalAlpha = 0.42 * bandPulse
      context.shadowBlur = 26
      context.shadowColor = '#8338EC'
      context.stroke()

      context.beginPath()
      context.moveTo(0, centerY)
      context.lineTo(width, centerY)
      context.strokeStyle = bandGradient
      context.lineWidth = 2.4
      context.globalAlpha = 0.94 * bandPulse
      context.shadowBlur = 10
      context.stroke()

      const coreGradient = context.createLinearGradient(0, 0, width, 0)
      coreGradient.addColorStop(0, `rgba(${PURPLE}, 0.58)`)
      coreGradient.addColorStop(0.055, `rgba(${SOFT_WHITE}, 0.42)`)
      coreGradient.addColorStop(0.5, `rgba(${SOFT_WHITE}, 0.58)`)
      coreGradient.addColorStop(0.945, `rgba(${SOFT_WHITE}, 0.42)`)
      coreGradient.addColorStop(1, `rgba(${PURPLE}, 0.58)`)
      context.beginPath()
      context.moveTo(0, centerY)
      context.lineTo(width, centerY)
      context.strokeStyle = coreGradient
      context.lineWidth = 0.9
      context.globalAlpha = bandPulse
      context.shadowBlur = 6
      context.shadowColor = '#E9ECEF'
      context.stroke()
      context.shadowBlur = 0
      context.globalAlpha = 1

      const ballRadius =
        Math.max(14, Math.min(width * 0.1, height * 0.14, 94)) *
        (1 + energyCharge * 0.025)
      const ballPulse = 0.94 + Math.sin(phase * 1.25) * 0.06 + energyCharge * 0.1
      context.save()
      context.globalCompositeOperation = 'screen'

      const auraGradient = context.createRadialGradient(
        centerX,
        centerY,
        ballRadius * 0.12,
        centerX,
        centerY,
        ballRadius * 2.15,
      )
      auraGradient.addColorStop(
        0,
        `rgba(${SOFT_WHITE}, ${(0.34 + energyCharge * 0.2) * ballPulse})`,
      )
      auraGradient.addColorStop(
        0.28,
        `rgba(${PURPLE}, ${(0.28 + energyCharge * 0.2) * ballPulse})`,
      )
      auraGradient.addColorStop(
        0.62,
        `rgba(${PURPLE}, ${(0.1 + energyCharge * 0.08) * ballPulse})`,
      )
      auraGradient.addColorStop(1, `rgba(${PURPLE}, 0)`)
      context.beginPath()
      context.arc(centerX, centerY, ballRadius * 2.15, 0, Math.PI * 2)
      context.fillStyle = auraGradient
      context.fill()

      for (const side of [-1, 1] as const) {
        for (let strand = 0; strand < 5; strand += 1) {
          const verticalOffset = (strand - 2) * ballRadius * 0.34
          const startX = centerX + side * ballRadius * 3.2
          const startY = centerY + verticalOffset * 1.45
          const endX = centerX + side * ballRadius * 0.76
          const endY = centerY + verticalOffset * 0.3
          const strandAlpha =
            (0.18 + 0.08 * Math.sin(phase * 1.1 + strand + side)) * ballPulse
          const strandGradient = context.createLinearGradient(startX, startY, endX, endY)
          strandGradient.addColorStop(0, `rgba(${PURPLE}, 0)`)
          strandGradient.addColorStop(0.48, `rgba(${PURPLE}, ${strandAlpha})`)
          strandGradient.addColorStop(1, `rgba(${SOFT_WHITE}, ${strandAlpha * 1.5})`)

          context.beginPath()
          context.moveTo(startX, startY)
          context.bezierCurveTo(
            centerX + side * ballRadius * 2.1,
            centerY + verticalOffset * 1.2,
            centerX + side * ballRadius * 1.2,
            centerY + verticalOffset * 0.62,
            endX,
            endY,
          )
          context.strokeStyle = strandGradient
          context.lineWidth = strand % 2 === 0 ? 1.5 : 0.9
          context.shadowBlur = 8
          context.shadowColor = '#8338EC'
          context.stroke()
        }
      }

      context.shadowBlur = 0
      for (let ring = 0; ring < 6; ring += 1) {
        const rotation =
          (ring * Math.PI) / 6 +
          phase * (0.08 + energyCharge * 0.18) * (ring % 2 === 0 ? 1 : -1)
        context.beginPath()
        context.ellipse(
          centerX,
          centerY,
          ballRadius * (1.03 + (ring % 2) * 0.12),
          ballRadius * (0.36 + (ring % 3) * 0.08),
          rotation,
          0,
          Math.PI * 2,
        )
        context.strokeStyle =
          ring % 3 === 0
            ? `rgba(${SOFT_WHITE}, ${0.25 * ballPulse})`
            : `rgba(${PURPLE}, ${0.36 * ballPulse})`
        context.lineWidth = ring % 2 === 0 ? 1 : 0.7
        context.stroke()
      }

      const ballGradient = context.createRadialGradient(
        centerX - ballRadius * 0.24,
        centerY - ballRadius * 0.28,
        ballRadius * 0.025,
        centerX,
        centerY,
        ballRadius,
      )
      ballGradient.addColorStop(0, `rgba(${SOFT_WHITE}, ${0.96 * ballPulse})`)
      ballGradient.addColorStop(0.18, `rgba(${SOFT_WHITE}, ${0.82 * ballPulse})`)
      ballGradient.addColorStop(0.45, `rgba(${PURPLE}, ${0.78 * ballPulse})`)
      ballGradient.addColorStop(0.78, `rgba(${PURPLE}, ${0.44 * ballPulse})`)
      ballGradient.addColorStop(1, `rgba(${PURPLE}, ${0.08 * ballPulse})`)
      context.beginPath()
      context.arc(centerX, centerY, ballRadius, 0, Math.PI * 2)
      context.fillStyle = ballGradient
      context.shadowBlur = ballRadius * (0.45 + energyCharge * 0.25)
      context.shadowColor = '#8338EC'
      context.fill()
      context.shadowBlur = 0

      context.save()
      context.beginPath()
      context.arc(centerX, centerY, ballRadius * 0.86, 0, Math.PI * 2)
      context.clip()
      for (let filament = 0; filament < 9; filament += 1) {
        const rotation =
          (filament * Math.PI) / 9 + phase * (0.11 + energyCharge * 0.2)
        context.beginPath()
        context.ellipse(
          centerX,
          centerY,
          ballRadius * 0.82,
          ballRadius * (0.24 + (filament % 3) * 0.09),
          rotation,
          0,
          Math.PI * 2,
        )
        context.strokeStyle =
          filament % 3 === 0
            ? `rgba(${SOFT_WHITE}, ${0.2 * ballPulse})`
            : `rgba(${PURPLE}, ${0.48 * ballPulse})`
        context.lineWidth = filament % 2 === 0 ? 0.9 : 0.6
        context.stroke()
      }
      context.restore()

      const coreGlow = context.createRadialGradient(
        centerX - ballRadius * 0.18,
        centerY - ballRadius * 0.2,
        0,
        centerX,
        centerY,
        ballRadius * 0.68,
      )
      coreGlow.addColorStop(0, `rgba(${SOFT_WHITE}, ${0.4 * ballPulse})`)
      coreGlow.addColorStop(1, `rgba(${SOFT_WHITE}, 0)`)
      context.beginPath()
      context.arc(centerX, centerY, ballRadius * 0.68, 0, Math.PI * 2)
      context.fillStyle = coreGlow
      context.fill()
      context.restore()

      if (!reducedMotion && isVisible) {
        animationFrame = window.requestAnimationFrame(draw)
      }
    }

    const handleResize = () => {
      resize()
      if (reducedMotion && isVisible) draw(0)
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (!isVisible) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      } else if (reducedMotion) {
        draw(0)
      } else if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(draw)
      }
    })

    resize()
    observer.observe(canvas)
    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [active, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
