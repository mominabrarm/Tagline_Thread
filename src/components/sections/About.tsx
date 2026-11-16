import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lightbulb, Layers, Users, Sprout } from 'lucide-react'
import { WorkspaceScene } from '../three/WorkspaceScene'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const PRINCIPLES = [
  {
    num: '01',
    title: 'Intentional Creativity',
    desc: 'Ideas with a purpose, not just for the sake of being different.',
    accent: 'orange' as const,
    Icon: Lightbulb,
  },
  {
    num: '02',
    title: 'Meaningful Design',
    desc: 'Visuals and experiences that communicate, connect and build trust.',
    accent: 'purple' as const,
    Icon: Layers,
  },
  {
    num: '03',
    title: 'People Over Process',
    desc: 'Real conversations, shared ideas and a collaborative approach.',
    accent: 'orange' as const,
    Icon: Users,
  },
  {
    num: '04',
    title: 'Built to Last',
    desc: 'Digital foundations that can grow and adapt with your brand.',
    accent: 'purple' as const,
    Icon: Sprout,
  },
]

export const About: React.FC = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const workspaceRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [workspaceVisible, setWorkspaceVisible] = useState(false)

  // Lazy-mount Workspace 3D scene when scrolled near to preserve initial page load performance
  useEffect(() => {
    if (!workspaceRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWorkspaceVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(workspaceRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Left column fade in
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Right column principles staggered reveal
      gsap.fromTo(
        '.philosophy-item',
        { opacity: 0, x: 36 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Scroll progress tracking for 3D camera
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => setScrollProgress(self.progress),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 sm:py-32 px-6 lg:px-16 bg-brand-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left Column (6 cols): Editorial Heading & 3D Workspace Scene (Ref: Image 2) ── */}
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col gap-6">
            {/* Top Label with Gradient Line (Ref: Image 2) */}
            <div className="flex items-center gap-3">
              <span className="section-label text-muted">
                02 / OUR PHILOSOPHY
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-brand-orange to-brand-purple rounded-full shadow-[0_0_8px_#FF5400]" />
            </div>

            {/* Headline (Ref: Image 2) */}
            <h2 className="heading-section text-brand-ash">
              The Beliefs That
              <br />
              Shape{' '}
              <span className="text-brand-orange neon-text-orange italic font-normal" style={{ fontStyle: 'italic' }}>
                Our
              </span>{' '}
              <span className="text-brand-purple neon-text-purple italic font-normal" style={{ fontStyle: 'italic' }}>
                Work.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-body text-muted max-w-lg">
              A few core beliefs that guide every idea we create, every project we build and every brand we work with.
            </p>

            {/* Gradient accent line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-brand-orange to-brand-purple rounded-full opacity-60" />

            {/* 3D Workspace Scene Viewport (Ref: Image 2) */}
            <div
              ref={workspaceRef}
              className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden mt-2"
              style={{
                background: 'linear-gradient(135deg, rgba(12,14,16,0.9) 0%, rgba(9,10,12,0.95) 100%)',
                border: '1px solid rgba(233,236,239,0.1)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {workspaceVisible ? (
                <Canvas
                  camera={{ position: [0.1, 1.4, 2.8], fov: 48 }}
                  gl={{ antialias: true, alpha: true }}
                  style={{ background: 'transparent' }}
                  dpr={[1, 1.5]}
                >
                  <Suspense fallback={null}>
                    <WorkspaceScene scrollProgress={scrollProgress} />
                  </Suspense>
                </Canvas>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-brand-orange/10 blur-xl animate-pulse" />
                </div>
              )}

              {/* Viewport badge */}
              <div className="absolute bottom-3 left-4 flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                <span className="font-grotesk text-[9px] uppercase tracking-widest text-muted">
                  Interactive Studio Desk // WebGL
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Column (6 cols): Four Philosophy Principles (Ref: Image 2) ── */}
          <div ref={cardsRef} className="lg:col-span-6 flex flex-col justify-between h-full pt-4 lg:pt-8">
            <div className="divide-y divide-brand-ash/[0.08]">
              {PRINCIPLES.map((p) => {
                const isOrange = p.accent === 'orange'
                const accentHex = isOrange ? '#FF5400' : '#8824FF'
                const IconComponent = p.Icon

                return (
                  <div
                    key={p.num}
                    className="philosophy-item group py-6 sm:py-7 flex items-start gap-5 transition-all duration-300"
                  >
                    {/* Glowing Rounded Glass Icon Badge (Ref: Image 2) */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: isOrange
                          ? 'linear-gradient(135deg, rgba(255,84,0,0.15), rgba(24,27,31,0.6))'
                          : 'linear-gradient(135deg, rgba(136,36,255,0.15), rgba(24,27,31,0.6))',
                        backdropFilter: 'blur(16px)',
                        border: `1px solid ${accentHex}40`,
                        boxShadow: `0 0 20px -5px ${accentHex}35, inset 0 1px 0 rgba(255,255,255,0.08)`,
                      }}
                    >
                      <IconComponent
                        size={24}
                        style={{
                          color: accentHex,
                          filter: `drop-shadow(0 0 8px ${accentHex}90)`,
                        }}
                      />
                    </div>

                    {/* Content Block */}
                    <div className="flex-1 flex flex-col gap-1.5 pt-0.5">
                      <div className="flex items-center gap-3">
                        <span className="font-grotesk text-xs text-muted font-semibold tracking-wider">
                          {p.num}
                        </span>
                        <div
                          className="w-[2px] h-3.5 rounded-full"
                          style={{
                            background: accentHex,
                            boxShadow: `0 0 6px ${accentHex}`,
                          }}
                        />
                        <h3 className="card-heading text-brand-ash tracking-tight group-hover:text-brand-ash transition-colors">
                          {p.title}
                        </h3>
                      </div>
                      <p className="card-desc text-muted pl-7">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Meta Tags (Ref: Image 2) */}
            <div className="pt-8 border-t border-brand-ash/[0.08] flex items-center justify-between text-muted font-grotesk text-xs tracking-[0.14em] uppercase">
              <span>STRATEGY</span>
              <span>/</span>
              <span>DESIGN</span>
              <span>/</span>
              <span>TECHNOLOGY</span>
              <span>/</span>
              <span>TOGETHER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
