export interface ProjectDeliverable {
  title: string
  desc: string
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  title: string
  client: string
  category: string
  subtitle: string
  tags: string[]
  description: string
  fullStory: string
  metrics: ProjectMetric[]
  deliverables: string[]
  accentColor: 'orange' | 'purple'
  year: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'mistwood-resorts',
    title: 'Mistwood Resorts',
    client: 'Mistwood Luxury Hospitality Group',
    category: 'Website Design & Development',
    subtitle: 'A Serene Hill Retreat Flagship',
    tags: ['Websites', 'Development', 'All Work'],
    description: 'A premium hospitality digital flagship that immerses visitors in natural luxury, engineered with cinematic motion and conversion-focused booking architecture.',
    fullStory: 'Mistwood Resorts required an uncompromising digital presence to reflect their prestigious mountain sanctuaries. We engineered a blazing-fast React and Three.js experience featuring ambient particle fog, interactive 3D suite previews, and a frictionless booking workflow that elevated direct reservation revenues by +185%.',
    metrics: [
      { value: '+185%', label: 'Direct Bookings' },
      { value: '0.8s', label: 'Average Load Time' },
      { value: '4.98', label: 'Guest Rating' },
    ],
    deliverables: [
      'Bespoke React & Three.js Digital Flagship',
      'Interactive 3D Room & Chalet Previews',
      'Frictionless Mobile-First Booking Engine',
      'Comprehensive Luxury Photography Direction',
    ],
    accentColor: 'purple',
    year: '2025',
    featured: true,
  },
  {
    id: 'apex-fitness',
    title: 'Apex Fitness',
    client: 'Apex Performance Labs',
    category: 'Social Media Management & Growth',
    subtitle: 'High-Performance Athlete Ecosystem',
    tags: ['Social Media', 'Marketing', 'All Work'],
    description: 'A high-octane fitness brand presence featuring athletic motion sequences, weekly challenges, and conversion-optimized telemetry graphics.',
    fullStory: 'Apex Fitness needed to transition from a regional gym chain into an authoritative lifestyle movement. Tagline-Thread developed a high-contrast volcanic orange aesthetic, viral short-form motion templates, and targeted ad funnels that scaled active community memberships to over 50,000.',
    metrics: [
      { value: '50k+', label: 'Active Members' },
      { value: '3.4M', label: 'Organic Impressions' },
      { value: '+210%', label: 'Trial Signups' },
    ],
    deliverables: [
      'Daily Content Rhythms & Aesthetic Feed Curation',
      'Short-Form Motion Graphics & Reels Sequences',
      'Granular Paid Retargeting Ad Campaigns',
      'Interactive Member Challenge Telemetry',
    ],
    accentColor: 'orange',
    year: '2024',
    featured: false,
  },
  {
    id: 'vexor-tech',
    title: 'Vexor Tech',
    client: 'Vexor Autonomous Systems',
    category: 'Brand Identity & Digital Presence',
    subtitle: 'Enterprise AI & Autonomous Robotics',
    tags: ['Branding', 'Identity', 'All Work'],
    description: 'An authoritative enterprise technology identity system featuring geometric typography, physical stationery, and digital brand architecture.',
    fullStory: 'Vexor Tech developed breakthrough autonomous robotics for industrial automation. We established a timeless brand system anchored by a glowing geometric V emblem, custom Space Grotesk type pairings, and architectural collateral that helped secure $18M in Series A funding.',
    metrics: [
      { value: '$18M', label: 'Series A Secured' },
      { value: '100%', label: 'Brand Consistency' },
      { value: '40+', label: 'System Assets' },
    ],
    deliverables: [
      'Comprehensive Visual Identity & Monogram System',
      'Complete Brand Guidelines & Scalable Design Tokens',
      'Physical Stationery & Executive Collateral Suite',
      'Investor Deck & Digital Flagship Architecture',
    ],
    accentColor: 'purple',
    year: '2024',
    featured: false,
  },
]
