import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  X,
} from 'lucide-react'
import {
  BrandPlatesIcon,
  SocialChatHeartIcon,
  Megaphone3DIcon,
  WebCodeWindowIcon,
  ServerCloudIcon,
} from '../ui/service-3d-icons'
import { OrbitCardStack, type OrbitStackItem } from '../ui/orbit-card-stack'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// ─── 5 Core Services (Arranged in 4, 2, 1, 3, 5 order around center Card 1) ───
const SERVICES_DATA: OrbitStackItem[] = [
  {
    id: 'website-design-development',
    num: '04',
    title: 'Website Design & Development',
    category: 'Development',
    tagline: 'Bespoke React/Next.js websites, 3D & WebGL',
    description:
      'Bespoke, blazing-fast digital flagships built with modern React and Three.js. Engineered with fluid 3D interactions, surgical responsiveness, and conversion architecture at their core.',
    accent: '#FB5607',
    icon: WebCodeWindowIcon,
    capabilities: [
      {
        title: 'UI/UX Architecture',
        desc: 'Intuitive user journeys, luxury editorial wireframes, and design system fidelity.',
      },
      {
        title: '3D & Motion WebGL',
        desc: 'Interactive three-dimensional products and smooth 60fps micro-interactions.',
      },
      {
        title: 'Modern React Architecture',
        desc: 'Clean, accessible, component-driven frontend engineered for long-term scalability.',
      },
      {
        title: 'SEO & Speed Mastery',
        desc: 'Sub-second loads, 95+ Lighthouse scores, and semantic search optimization.',
      },
    ],
    metrics: { label: 'Quality', value: '95+ Lighthouse Score' },
  },
  {
    id: 'social-media-management',
    num: '02',
    title: 'Social Media Management',
    category: 'Management',
    tagline: 'Content planning, scheduling, engagement',
    description:
      'Stay visible, relevant, and unforgettable across channels. We curate high-converting content rhythms, aesthetic feed curation, and consistent community engagement so your brand authority continuously expands.',
    accent: '#8338EC',
    icon: SocialChatHeartIcon,
    capabilities: [
      {
        title: 'Content Calendars',
        desc: 'Strategic weekly content rhythms tailored to active audience timeframes.',
      },
      {
        title: 'Aesthetic Feed Curation',
        desc: 'High-end editorial layouts and cohesive visual narratives that elevate prestige.',
      },
      {
        title: 'Publishing & Scheduling',
        desc: 'Multi-channel distribution at high-engagement algorithmic peak windows.',
      },
      {
        title: 'Community Building',
        desc: 'Active follower conversation management, comment responses, and brand loyalty.',
      },
    ],
    metrics: { label: 'Execution', value: 'Weekly Active Cadence' },
  },
  {
    id: 'brand-digital-presence',
    num: '01',
    title: 'Brand & Digital Presence',
    category: 'Branding',
    tagline: 'Brand strategy, logo, identity systems',
    description:
      'Your brand is more than a logo — it is the personality, visual DNA, and credibility that sets you apart. We build cohesive brand identity systems designed to endure across physical and digital touchpoints.',
    accent: '#FB5607',
    icon: BrandPlatesIcon,
    capabilities: [
      {
        title: 'Brand Strategy',
        desc: 'Core positioning, tone of voice, and competitive market differentiation.',
      },
      {
        title: 'Visual Identity',
        desc: 'Distinctive logos, typography suites, and cohesive luxury color palettes.',
      },
      {
        title: 'Design Systems',
        desc: 'Scalable component libraries, brand guidelines, and vector design tokens.',
      },
      {
        title: 'Digital Touchpoints',
        desc: 'Unified aesthetic continuity from mobile screens to flagship experiences.',
      },
    ],
    metrics: { label: 'Deliverable', value: 'Complete Brand Suite' },
  },
  {
    id: 'social-media-marketing',
    num: '03',
    title: 'Social Media Marketing',
    category: 'Growth',
    tagline: 'Paid campaigns, targeting, analytics',
    description:
      'Targeted social media campaigns engineered to reach high-value audiences, spark meaningful conversations, and deliver measurable ROI through surgical targeting and performance creative.',
    accent: '#FB5607',
    icon: Megaphone3DIcon,
    capabilities: [
      {
        title: 'Campaign Strategy',
        desc: 'Data-driven acquisition roadmaps tailored for maximum direct conversions.',
      },
      {
        title: 'Audience Targeting',
        desc: 'Precision demographic, behavioral, lookalike, and retargeting segments.',
      },
      {
        title: 'Ad Creation & Copy',
        desc: 'High-performing motion graphics, short-form video ads, and persuasive copy.',
      },
      {
        title: 'Performance Telemetry',
        desc: 'Real-time conversion tracking, transparent ROI attribution, and continuous optimization.',
      },
    ],
    metrics: { label: 'Targeting', value: 'Conversion-Engineered' },
  },
  {
    id: 'hosting-website-management',
    num: '05',
    title: 'Hosting & Website Management',
    category: 'Support',
    tagline: 'Zero downtime, continuous updates, 24/7 security',
    description:
      'Zero downtime and peak performance guaranteed. From high-availability global edge hosting to automated backups, security patches, and ongoing technical refinements, we keep you running flawlessly.',
    accent: '#FB5607',
    icon: ServerCloudIcon,
    capabilities: [
      {
        title: 'Edge Infrastructure',
        desc: 'Global edge CDN deployment with 99.99% uptime guarantees and instant caching.',
      },
      {
        title: '24/7 Security & SSL',
        desc: 'DDoS mitigation, automatic vulnerability patches, and strict HTTPS certificates.',
      },
      {
        title: 'Continuous Optimization',
        desc: 'Routine asset compression, dependency upgrades, and database tuning.',
      },
      {
        title: 'Priority Support',
        desc: 'Fast developer turnarounds for ongoing feature additions and content updates.',
      },
    ],
    metrics: { label: 'Availability', value: '99.99% Uptime Guarantee' },
  },
]

// ─── 5 Tab items matching Image 1 in order 01 to 05 ───
const TABS_CONFIG = [
  { id: 'brand-digital-presence', num: '01', title: 'Brand & Digital Presence', dataIndex: 2 },
  { id: 'social-media-management', num: '02', title: 'Social Media Management', dataIndex: 1 },
  { id: 'social-media-marketing', num: '03', title: 'Social Media Marketing', dataIndex: 3 },
  { id: 'website-design-development', num: '04', title: 'Website Design & Development', dataIndex: 0 },
  { id: 'hosting-website-management', num: '05', title: 'Hosting & Website Management', dataIndex: 4 },
]

export const Services: React.FC = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Minimal modal dialog state: only opens when a card is clicked
  const [modalService, setModalService] = useState<OrbitStackItem | null>(null)
  // Active card index synced with Pill Tabs and Card Stack (defaults to center card 01, dataIndex 2)
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(2)

  // Header GSAP reveal
  useEffect(() => {
    if (reduced || !headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  // ESC key and background scroll lock for the dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalService(null)
    }
    if (modalService) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [modalService])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-12 sm:py-16 lg:py-20 px-6 lg:px-16 bg-[#0a0c0d] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* ── Top Header Row (Image 2 reference layout) ── */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 pb-2"
        >
          {/* Left Column: Tag + Headline */}
          <div className="space-y-2 max-w-xl flex-1">
            {/* Top Label with Purple Bar */}
            <div className="inline-flex items-center gap-2.5">
              <span className="font-grotesk text-xs uppercase tracking-widest text-[#E9ECEF]/75 font-semibold">
                03 / OUR SERVICES
              </span>
              <span className="inline-block w-7 h-[3px] rounded-full bg-[#8338EC]" />
            </div>

            {/* Headline */}
            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-semibold text-[#E9ECEF] leading-[1.14] tracking-[-0.025em]">
              Everything you need
              <br />
              to{' '}
              <span
                className="text-[#FB5607] italic font-normal"
                style={{ fontStyle: 'italic' }}
              >
                grow online.
              </span>
            </h2>
          </div>

          {/* Thin Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-px self-stretch bg-[#E9ECEF]/[0.12] my-1" />

          {/* Right Column: Description + CTA Button */}
          <div className="max-w-md flex flex-col items-start gap-3.5 flex-1 lg:pl-4">
            <p className="font-manrope text-xs sm:text-sm text-[#E9ECEF]/70 leading-relaxed max-w-sm">
              A complete suite of digital services to build, manage and grow your brand’s presence across the digital world.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[#E9ECEF] hover:text-white bg-transparent hover:bg-[#FB5607]/10 border border-[#FB5607] shadow-none hover:shadow-[0_0_20px_rgba(251,86,7,0.35)] transition-all duration-300 text-xs sm:text-sm font-manrope font-medium"
            >
              <span>Explore All Services</span>
              <ArrowUpRight size={14} strokeWidth={2.2} />
            </a>
          </div>
        </div>

        {/* ── Pill Tabs Bar (Image 1 reference) ── */}
        <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2 px-1">
          <div className="inline-flex items-center gap-2 sm:gap-3 p-1 rounded-full">
            {TABS_CONFIG.map((tab) => {
              const isActive = selectedCardIndex === tab.dataIndex
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCardIndex(tab.dataIndex)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 font-manrope text-xs sm:text-sm select-none outline-none ${
                    isActive
                      ? 'bg-[#FB5607] text-[#0C0E10] font-bold shadow-[0_0_24px_rgba(251,86,7,0.55)] scale-[1.02]'
                      : 'bg-[#181C21]/60 hover:bg-[#1E232A] text-[#EAECEE] font-medium border border-white/[0.10] hover:border-white/[0.22]'
                  }`}
                >
                  <span
                    className={`font-grotesk text-xs tracking-wider ${
                      isActive ? 'text-[#0C0E10] font-bold' : 'text-[#8E959E]'
                    }`}
                  >
                    {tab.num}
                  </span>
                  <span>{tab.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── COMPONENTRY ORBIT CARD STACK (Image 3 reference) ── */}
        <div className="w-full relative mt-1 sm:mt-2">
          <OrbitCardStack
            items={SERVICES_DATA}
            defaultActiveIndex={2}
            controlledIndex={selectedCardIndex}
            spread={158}
            lift={38}
            onActiveChange={(_, index) => setSelectedCardIndex(index)}
            onCardClick={(item) => setModalService(item)}
          />
        </div>

        {/* ── Bottom Accelerate Execution Banner ── */}
        <div
          className="p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden mt-4 sm:mt-6"
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
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FB5607]/40 to-transparent pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left">
            <span className="font-grotesk text-xs uppercase tracking-widest text-[#FB5607] font-bold block">
              Accelerate Execution
            </span>
            <h4 className="font-playfair text-xl sm:text-2xl font-semibold text-[#EAECEE] mt-1">
              Let's make your brand impossible to ignore.
            </h4>
          </div>

          <a
            href="#contact"
            className="btn-text relative z-10 flex-shrink-0 px-7 py-3.5 rounded-full bg-[#FB5607] text-[#0C0E10] font-manrope font-semibold shadow-[0_0_25px_rgba(251,86,7,0.45)] hover:shadow-[0_0_40px_rgba(251,86,7,0.7)] hover:scale-[1.02] transition-all duration-300"
          >
            Start a Project &rarr;
          </a>
        </div>
      </div>

      {/* ── Minimal Service Modal Dialog (Opens when a card is clicked) ── */}
      <AnimatePresence>
        {modalService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
            onClick={() => setModalService(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-dialog-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl p-6 sm:p-7 overflow-hidden shadow-2xl"
              style={{
                background:
                  'linear-gradient(145deg, rgba(20, 24, 30, 0.97) 0%, rgba(12, 14, 18, 0.99) 100%)',
                border: `1.5px solid ${modalService.accent}70`,
                boxShadow: `0 0 50px -10px ${modalService.accent}35, 0 25px 60px rgba(0,0,0,0.8)`,
              }}
            >
              {/* Top Accent Light Beam */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${modalService.accent}, transparent)`,
                  boxShadow: `0 0 14px ${modalService.accent}`,
                }}
              />

              {/* Header: Tag + Close Button */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span
                    className="font-grotesk text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full"
                    style={{
                      background: `${modalService.accent}18`,
                      color: modalService.accent,
                      border: `1px solid ${modalService.accent}40`,
                    }}
                  >
                    {modalService.num} / {modalService.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setModalService(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.14] text-[#8E959E] hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3.5 pt-4 pb-2.5">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  {React.createElement(modalService.icon, {
                    size: 46,
                  })}
                </div>
                <div>
                  <h3
                    id="service-dialog-title"
                    className="font-manrope text-lg sm:text-xl font-bold text-[#EAECEE] tracking-tight leading-tight"
                  >
                    {modalService.title}
                  </h3>
                  <p className="font-manrope text-xs text-[#8E959E] mt-0.5">
                    {modalService.tagline}
                  </p>
                </div>
              </div>

              {/* Minimal Description */}
              <p className="font-manrope text-xs sm:text-sm text-[#EAECEE]/75 leading-relaxed pt-1 pb-4">
                {modalService.description}
              </p>

              {/* Minimal Highlights (Clean bullet tags, no giant boxes) */}
              <div className="space-y-2 pb-5 border-b border-white/[0.08]">
                <span className="font-grotesk text-[11px] uppercase tracking-wider text-[#8E959E] font-semibold block">
                  Key Focus Areas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalService.capabilities.map((cap) => (
                    <div
                      key={cap.title}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                    >
                      <CheckCircle2
                        size={13}
                        style={{ color: modalService.accent }}
                        className="flex-shrink-0"
                      />
                      <span className="font-manrope text-xs text-[#EAECEE] font-medium truncate">
                        {cap.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalService(null)}
                  className="px-4 py-2 rounded-full text-xs font-manrope text-[#8E959E] hover:text-white transition-colors"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setModalService(null)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-manrope text-xs sm:text-sm font-semibold text-[#0C0E10] shadow-[0_0_20px_rgba(251,86,7,0.45)] hover:shadow-[0_0_30px_rgba(251,86,7,0.7)] hover:scale-[1.02] transition-all duration-300"
                  style={{ background: '#FB5607' }}
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={14} strokeWidth={2.4} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
