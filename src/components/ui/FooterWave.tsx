import React, { useEffect, useRef } from 'react'

export const FooterWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    const resize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth || window.innerWidth
      canvas.height = 90
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const drawWave = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.floor(canvas.width / 14)
      const rows = 5

      for (let col = 0; col < cols; col++) {
        const x = col * 14 + 7
        const colRatio = cols > 0 ? col / cols : 0

        for (let row = 0; row < rows; row++) {
          // Double sine wave equations for interference effect
          const wave1 = Math.sin(col * 0.22 + time * 1.2 + row * 0.4) * 16
          const wave2 = Math.cos(col * 0.14 - time * 0.9 + row * 0.6) * 12
          const y = 35 + (row - 2) * 10 + wave1 + wave2

          // Interpolate between vibrant neon orange #FF5400 and electric purple #8824FF
          const orangeWeight = 1 - colRatio
          const r = Math.round(255 * orangeWeight + 136 * colRatio)
          const g = Math.round(84 * orangeWeight + 36 * colRatio)
          const b = Math.round(0 * orangeWeight + 255 * colRatio)

          const pulse = Math.sin(col * 0.3 + time * 2 + row) * 0.25 + 0.65
          const alpha = Math.max(0.1, Math.min(0.9, pulse * (1 - Math.abs(row - 2) * 0.18)))

          ctx.beginPath()
          ctx.arc(x, y, 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx.fill()
        }
      }

      time += 0.025
      animId = requestAnimationFrame(drawWave)
    }

    drawWave()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="w-full h-24 overflow-hidden pointer-events-none my-2">
      <canvas ref={canvasRef} className="w-full h-24 block" />
    </div>
  )
}
