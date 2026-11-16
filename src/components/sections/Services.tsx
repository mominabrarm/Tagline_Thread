import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Sparkles,
  Target,
  Users,
  Palette,
  BarChart3,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { SERVICES, type Service } from '../../data/services'
import { ServiceSideCard } from '../ui/ServiceCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Visual 3D Graphic for the Left Page of the Expanded Booklet
const Booklet3DGraphic: React.FC<{ serviceId: string; accentColor: string }> = ({
  serviceId,
  accentColor,
}) => {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-4">
      {/* Radial Backlight */}
      <div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)`,
        }}
      />

      {/* SVG 3D Holographic Rendering based on serviceId */}
      <svg
        className="w-full h-full relative z-10 drop-shadow-[0_0_20px_rgba(255,84,0,0.5)]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <defs>
          <linearGradient id="neonOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5400" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
          <linearGradient id="neonPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8824FF" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>

        {serviceId === 'social-marketing' ? (
          // 3D Megaphone emitting radial sonic light rays (exact from Image 4)
          <g>
            {/* Radial sonic soundwave arcs */}
            <path
              d="M 130 70 A 45 45 0 0 1 130 130"
              stroke="#FF5400"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 148 55 A 65 65 0 0 1 148 145"
              stroke="#FF5400"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M 166 40 A 85 85 0 0 1 166 160"
              stroke="#8824FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 6"
              opacity="0.45"
            />

            {/* Megaphone Cone */}
            <path
              d="M 70 85 L 115 65 L 115 135 L 70 115 Z"
              fill="url(#neonOrangeGrad)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Megaphone Back Base */}
            <ellipse
              cx="70"
              cy="100"
              rx="8"
              ry="15"
              fill="#D64200"
              stroke="#FF5400"
              strokeWidth="1.5"
            />
            {/* Front Aperture */}
            <ellipse
              cx="115"
              cy="100"
              rx="10"
              ry="35"
              fill="#181B1F"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <ellipse
              cx="115"
              cy="100"
              rx="6"
              ry="24"
              fill="#FF5400"
              opacity="0.8"
            />

            {/* Megaphone Handle */}
            <path
              d="M 75 115 L 70 145 L 82 145 L 85 115 Z"
              fill="#0C0E10"
              stroke="#FF5400"
              strokeWidth="1.5"
            />

            {/* Glowing Sound Emission Orb */}
            <circle cx="118" cy="100" r="5" fill="#FFFFFF" />
          </g>
        ) : serviceId === 'websites' ? (
          // 3D Glowing Wireframe Terminal / Laptop Mesh
          <g>
            <rect
              x="45"
              y="55"
              width="110"
              height="75"
              rx="8"
              fill="#0C0E10"
              stroke="#8824FF"
              strokeWidth="2"
            />
            <line x1="45" y1="75" x2="155" y2="75" stroke="#8824FF" strokeWidth="1" opacity="0.4" />
            <circle cx="58" cy="65" r="3" fill="#FF5400" />
            <circle cx="68" cy="65" r="3" fill="#8824FF" />
            <circle cx="78" cy="65" r="3" fill="#E9ECEF" />
            <text x="60" y="105" fill="#8824FF" fontSize="18" fontFamily="monospace" fontWeight="bold">
              &lt;/&gt;
            </text>
            <path
              d="M 30 145 L 170 145 L 155 130 L 45 130 Z"
              fill="#181B1F"
              stroke="#8824FF"
              strokeWidth="1.5"
            />
          </g>
        ) : serviceId === 'brand-identity' ? (
          // 3D Glowing Faceted Diamond / Hex Prism
          <g>
            <polygon
              points="100,35 155,75 155,135 100,170 45,135 45,75"
              fill="#0C0E10"
              stroke="#FF5400"
              strokeWidth="2.5"
            />
            <line x1="100" y1="35" x2="100" y2="170" stroke="#FF5400" strokeWidth="1.5" opacity="0.6" />
            <line x1="45" y1="75" x2="155" y2="135" stroke="#8824FF" strokeWidth="1.5" opacity="0.5" />
            <line x1="45" y1="135" x2="155" y2="75" stroke="#8824FF" strokeWidth="1.5" opacity="0.5" />
            <circle cx="100" cy="102" r="14" fill="#FF5400" opacity="0.8" />
          </g>
        ) : serviceId === 'social-management' ? (
          // 3D Heart Speech Bubble
          <g>
            <path
              d="M 50 60 C 50 45, 75 45, 100 45 C 135 45, 155 60, 155 90 C 155 120, 130 135, 100 135 L 75 155 L 80 135 C 60 135, 50 120, 50 90 Z"
              fill="#0C0E10"
              stroke="#8824FF"
              strokeWidth="2.5"
            />
            <path
              d="M 100 80 C 95 72, 85 72, 80 78 C 72 86, 75 96, 100 115 C 125 96, 128 86, 120 78 C 115 72, 105 72, 100 80 Z"
              fill="#FF5400"
            />
          </g>
        ) : (
          // 3D Cloud Server
          <g>
            <rect
              x="55"
              y="60"
              width="90"
              height="30"
              rx="6"
              fill="#0C0E10"
              stroke="#FF5400"
              strokeWidth="2"
            />
            <circle cx="70" cy="75" r="4" fill="#FF5400" />
            <rect
              x="55"
              y="100"
              width="90"
              height="30"
              rx="6"
              fill="#0C0E10"
              stroke="#8824FF"
              strokeWidth="2"
            />
            <circle cx="70" cy="115" r="4" fill="#8824FF" />
            <path
              d="M 100 45 L 100 25 M 92 33 L 100 25 L 108 33"
              stroke="#FF5400"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  )
}

export const Services: React.FC = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeServiceId, setActiveServiceId] = useState<string>('social-marketing')

  const activeIndex = SERVICES.findIndex((s) => s.id === activeServiceId)
  const activeService = SERVICES[activeIndex] || SERVICES[2]
  const isOrange = activeService.accentColor === 'orange'
  const accentColor = isOrange ? '#FF5400' : '#8824FF'

  // Animate on scroll
  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-header-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header-content',
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.services-stage-container',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-stage-container',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  // Capability icons helper
  const getCapabilityIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Target size={16} className="text-[#FF5400]" />
      case 1:
        return <Users size={16} className="text-[#8824FF]" />
      case 2:
        return <Palette size={16} className="text-[#FF5400]" />
      case 3:
        return <BarChart3 size={16} className="text-[#8824FF]" />
      default:
        return <CheckCircle2 size={16} className="text-[#FF5400]" />
    }
  }

  // Cycle handlers
  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? SERVICES.length - 1 : activeIndex - 1
    setActiveServiceId(SERVICES[nextIdx].id)
  }

  const handleNext = () => {
    const nextIdx = activeIndex === SERVICES.length - 1 ? 0 : activeIndex + 1
    setActiveServiceId(SERVICES[nextIdx].id)
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 sm:py-32 px-6 lg:px-16 bg-[#101519] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ── Top Header Row ── */}
        <div className="services-header-content flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#E9ECEF]/06">
          <div className="space-y-4 max-w-2xl">
            {/* Top Label */}
            <div className="inline-flex items-center gap-3">
              <span className="section-label text-[#8824FF]">
                03 / OUR SERVICES
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-[#8824FF] to-transparent" />
            </div>

            {/* Headline */}
            <h2 className="heading-section text-[#E9ECEF]">
              Everything you need
              <br />
              to{' '}
              <span className="text-[#FF5400] neon-text-orange italic font-normal" style={{ fontStyle: 'italic' }}>
                grow online.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-body text-[#E9ECEF]/70 max-w-xl">
              A complete suite of digital services to build, manage and grow
              your brand's presence across the digital world.
            </p>
          </div>

          {/* Right Action CTA Pill */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-text inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#FF5400] hover:text-[#0C0E10] bg-transparent hover:bg-[#FF5400] border border-[#FF5400]/40 hover:border-[#FF5400] shadow-none hover:shadow-[0_0_25px_rgba(255,84,0,0.5)] transition-all duration-300"
            >
              <span>Explore All Services</span>
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* ── 3D Arc Perspective Carousel Stage ── */}
        <div className="services-stage-container relative w-full pt-4 pb-12 overflow-visible">
          {/* Reflective Dark Floor with Concentric Luminous Rings */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-64 rounded-[100%] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 35% at 50% 65%, rgba(255,84,0,0.18) 0%, rgba(136,36,255,0.14) 40%, transparent 75%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Perspective Floor Concentric Rings */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[850px] h-[220px] rounded-[100%] pointer-events-none opacity-40"
            style={{
              border: '1.5px solid rgba(255,84,0,0.4)',
              boxShadow: '0 0 30px rgba(255,84,0,0.3)',
            }}
          />
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[1050px] h-[280px] rounded-[100%] pointer-events-none opacity-30"
            style={{
              border: '1px dashed rgba(136,36,255,0.5)',
            }}
          />

          {/* Arc Carousel Container */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Quick service selector pills */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 scrollbar-none">
              {SERVICES.map((s) => {
                const isSelected = s.id === activeServiceId
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveServiceId(s.id)}
                    className={`px-4 py-1.5 rounded-full font-grotesk text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#FF5400] text-[#0C0E10] shadow-[0_0_20px_rgba(255,84,0,0.5)]'
                        : 'bg-[#181B1F]/50 text-[#E9ECEF]/70 hover:text-white hover:bg-[#181B1F] border border-[#E9ECEF]/10'
                    }`}
                  >
                    {s.title}
                  </button>
                )
              })}
            </div>

            {/* Central Stage: Expanded 2-Page Open Booklet with Side Perspective Cards */}
            <div className="w-full flex items-center justify-center gap-6 lg:gap-8">
              {/* Left Side Tilted Card (Previous) */}
              <div className="hidden xl:block">
                {SERVICES[(activeIndex - 1 + SERVICES.length) % SERVICES.length] && (
                  <ServiceSideCard
                    service={SERVICES[(activeIndex - 1 + SERVICES.length) % SERVICES.length]}
                    isActive={false}
                    tiltAngle={14}
                    onSelect={handlePrev}
                  />
                )}
              </div>

              {/* ── EXPANDED 2-PAGE OPEN BOOKLET (Active Service) ── */}
              <div
                className="w-full max-w-4xl rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-500"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(24,27,31,0.85) 0%, rgba(12,14,16,0.92) 100%)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: `1.5px solid ${accentColor}70`,
                  boxShadow: `0 0 50px -10px ${accentColor}45, 0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.18)`,
                }}
              >
                {/* Glowing Top Edge Rail */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                    boxShadow: `0 0 18px ${accentColor}`,
                  }}
                />

                {/* 2-Page Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* ── Left Page: Big Index + 3D Holographic Model + Title + Category ── */}
                  <div className="md:col-span-5 flex flex-col items-center text-center p-4 rounded-2xl bg-[#0C0E10]/50 border border-[#E9ECEF]/06 relative overflow-hidden">
                    {/* Top Row: Index + Category */}
                    <div className="w-full flex items-center justify-between">
                      <span
                        className="font-grotesk text-3xl sm:text-4xl font-semibold tracking-tight"
                        style={{ color: accentColor }}
                      >
                        {activeService.num}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full font-grotesk text-[10px] uppercase font-semibold tracking-widest"
                        style={{
                          background: `${accentColor}18`,
                          color: accentColor,
                          border: `1px solid ${accentColor}40`,
                        }}
                      >
                        {activeService.category}
                      </span>
                    </div>

                    {/* 3D Visual Graphic */}
                    <Booklet3DGraphic
                      serviceId={activeService.id}
                      accentColor={accentColor}
                    />

                    {/* Service Title */}
                    <h3 className="card-heading text-xl sm:text-2xl font-bold text-[#E9ECEF] leading-tight mt-1">
                      {activeService.title}
                    </h3>
                  </div>

                  {/* ── Right Page: Details, 4 Capabilities & Action CTA ── */}
                  <div className="md:col-span-7 flex flex-col justify-between gap-6 pl-0 md:pl-4">
                    {/* Header line & toggle */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E9ECEF]/08">
                      <span className="font-grotesk text-xs uppercase tracking-widest text-[#E9ECEF]/60">
                        {activeService.tagline}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="w-8 h-8 rounded-full bg-[#0C0E10] hover:bg-[#181B1F] border border-[#E9ECEF]/10 flex items-center justify-center text-[#E9ECEF] hover:text-[#FF5400] transition-colors"
                          aria-label="Previous service"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-8 h-8 rounded-full bg-[#0C0E10] hover:bg-[#181B1F] border border-[#E9ECEF]/10 flex items-center justify-center text-[#E9ECEF] hover:text-[#FF5400] transition-colors"
                          aria-label="Next service"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Overview Paragraph */}
                    <p className="text-body text-sm text-[#E9ECEF]/80 leading-relaxed">
                      {activeService.description}
                    </p>

                    {/* 4 Capability Rows */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeService.capabilities.map((cap, i) => (
                        <div
                          key={cap.title}
                          className="p-3 rounded-xl bg-[#0C0E10]/40 hover:bg-[#0C0E10]/80 border border-[#E9ECEF]/06 hover:border-[#FF5400]/30 transition-all duration-200 flex items-start gap-2.5"
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {getCapabilityIcon(i)}
                          </div>
                          <div>
                            <h4 className="font-manrope text-xs font-bold text-[#E9ECEF]">
                              {cap.title}
                            </h4>
                            <p className="font-manrope text-[11px] text-[#E9ECEF]/65 leading-snug mt-0.5">
                              {cap.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <a
                        href="#contact"
                        className="btn-text inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[#0C0E10] bg-[#FF5400] shadow-[0_0_25px_rgba(255,84,0,0.45)] hover:shadow-[0_0_40px_rgba(255,84,0,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-fit font-semibold"
                      >
                        <span>Get Started</span>
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Tilted Card (Next) */}
              <div className="hidden xl:block">
                {SERVICES[(activeIndex + 1) % SERVICES.length] && (
                  <ServiceSideCard
                    service={SERVICES[(activeIndex + 1) % SERVICES.length]}
                    isActive={false}
                    tiltAngle={-14}
                    onSelect={handleNext}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Accelerate Execution Banner ── */}
        <div
          className="p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(35, 39, 45, 0.75) 0%, rgba(24, 27, 31, 0.60) 100%)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(233, 236, 239, 0.11)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5400]/40 to-transparent pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left">
            <span className="font-grotesk text-xs uppercase tracking-widest text-[#FF5400] font-bold block">
              Accelerate Execution
            </span>
            <h4 className="font-playfair text-xl sm:text-2xl font-semibold text-[#E9ECEF] mt-1">
              Let's make your brand impossible to ignore.
            </h4>
          </div>

          <a
            href="#contact"
            className="btn-text relative z-10 flex-shrink-0 px-7 py-3.5 rounded-full bg-[#FF5400] text-[#0C0E10] font-manrope font-semibold shadow-[0_0_25px_rgba(255,84,0,0.45)] hover:shadow-[0_0_40px_rgba(255,84,0,0.7)] hover:scale-[1.02] transition-all duration-300"
          >
            Start a Project &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
