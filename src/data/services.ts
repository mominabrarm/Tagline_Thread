export interface ServiceCapability {
  title: string
  desc: string
}

export interface Service {
  id: string
  index: string
  num: string
  title: string
  category: string
  tagline: string
  description: string
  accentColor: 'orange' | 'purple'
  icon: string
  capabilities: ServiceCapability[]
}

export const SERVICES: Service[] = [
  {
    id: 'brand-identity',
    index: '// 01',
    num: '01',
    title: 'Brand & Digital Presence',
    category: 'Branding',
    tagline: 'Brand strategy, logo, identity systems',
    description: 'Your brand is more than a logo — it is the personality, visual DNA, and credibility that sets you apart. We build cohesive brand identity systems designed to endure.',
    accentColor: 'orange',
    icon: '✦',
    capabilities: [
      { title: 'Brand Strategy', desc: 'Core positioning, tone of voice, and competitive differentiation.' },
      { title: 'Visual Identity', desc: 'Distinctive logos, typography suites, and cohesive color palettes.' },
      { title: 'Design Systems', desc: 'Scalable component libraries and cross-platform brand guidelines.' },
      { title: 'Digital Presence', desc: 'Unified aesthetic across touchpoints from mobile to flagships.' },
    ],
  },
  {
    id: 'social-management',
    index: '// 02',
    num: '02',
    title: 'Social Media Management',
    category: 'Management',
    tagline: 'Content planning, scheduling, engagement',
    description: 'Stay visible and unforgettable across channels. We curate high-converting content rhythms, aesthetic grids, and consistent community engagement so your brand never sleeps.',
    accentColor: 'purple',
    icon: '◈',
    capabilities: [
      { title: 'Content Calendars', desc: 'Strategic weekly content rhythms tailored to active audiences.' },
      { title: 'Aesthetic Feed Curation', desc: 'High-end visual layouts that elevate brand authority.' },
      { title: 'Publishing & Scheduling', desc: 'Multi-channel distribution at high-engagement time windows.' },
      { title: 'Community Engagement', desc: 'Active conversation management and follower loyalty building.' },
    ],
  },
  {
    id: 'social-marketing',
    index: '// 03',
    num: '03',
    title: 'Social Media Marketing',
    category: 'Growth',
    tagline: 'Paid campaigns, targeting, analytics',
    description: 'Targeted social media campaigns designed to reach the right people, drive real engagement and deliver measurable ROI for your business.',
    accentColor: 'orange',
    icon: '⬡',
    capabilities: [
      { title: 'Campaign Strategy', desc: 'Data-driven roadmaps engineered for direct conversions.' },
      { title: 'Audience Targeting', desc: 'Precision demographic, behavioural and retargeting segments.' },
      { title: 'Ad Creation & Management', desc: 'High-performing motion graphics, video ads and copy.' },
      { title: 'Performance Tracking', desc: 'Real-time telemetry, clear ROI attribution and ongoing optimization.' },
    ],
  },
  {
    id: 'websites',
    index: '// 04',
    num: '04',
    title: 'Website Design & Development',
    category: 'Development',
    tagline: 'React/Next.js websites, e-commerce',
    description: 'Bespoke, blazing-fast digital flagships built with React and Three.js. Engineered with fluid 3D interactions, surgical responsiveness, and conversion architecture at their core.',
    accentColor: 'purple',
    icon: '▣',
    capabilities: [
      { title: 'UI/UX Architecture', desc: 'Intuitive user journeys and editorial aesthetic wireframes.' },
      { title: '3D & Motion WebGL', desc: 'Interactive three-dimensional models and seamless transitions.' },
      { title: 'Modern React Codebase', desc: 'Componentized, accessible, and hyper-optimized engineering.' },
      { title: 'SEO & Speed Mastery', desc: 'Sub-second loads, 95+ Lighthouse scores and metadata polish.' },
    ],
  },
  {
    id: 'hosting-management',
    index: '// 05',
    num: '05',
    title: 'Hosting & Website Management',
    category: 'Support',
    tagline: 'Maintenance, updates, support',
    description: 'Zero downtime and peak performance guaranteed. From high-availability cloud hosting to automated backups and ongoing technical refinements, we keep you running flawlessly.',
    accentColor: 'orange',
    icon: '⬢',
    capabilities: [
      { title: 'Cloud Infrastructure', desc: 'Global edge CDN deployment with 99.99% uptime guarantees.' },
      { title: '24/7 Security & SSL', desc: 'DDoS mitigation, automatic security patches, and HTTPS.' },
      { title: 'Automated Daily Backups', desc: 'Redundant offsite snapshots for instant disaster recovery.' },
      { title: 'Continuous Refinements', desc: 'Regular performance tuning, dependency updates, and priority fixes.' },
    ],
  },
]
