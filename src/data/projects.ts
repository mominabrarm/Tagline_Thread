export interface Project {
  id: string
  title: string
  category: string
  tags: string[]
  description: string
  placeholder: boolean  // true = placeholder, replace with real project later
  accentColor: 'orange' | 'purple'
  size: 'hero' | 'compact' | 'wide'
}

export const PROJECTS: Project[] = [
  {
    id: 'aura-cybernetics',
    title: 'AURA CYBERNETICS — Immersive 3D Web Experience & Identity',
    category: 'Flagship Website',
    tags: ['Websites', '3D WebGL', 'Rebrand'],
    description: 'A full repositioning campaign and interactive flagship delivering a premium digital experience through real-time thread shaders and responsive 3D composition.',
    placeholder: true,
    accentColor: 'orange',
    size: 'hero',
  },
  {
    id: 'solaris-cognition',
    title: 'SOLARIS COGNITION',
    category: 'Brand Strategy & Social',
    tags: ['Branding', 'Social Media'],
    description: 'Comprehensive identity design system and executive content suite for a forward-thinking tech consultancy.',
    placeholder: true,
    accentColor: 'purple',
    size: 'compact',
  },
  {
    id: 'vortex-audio',
    title: 'VORTEX AUDIO LABS',
    category: 'E-Commerce & High-Converting Funnel',
    tags: ['Websites', 'E-Commerce'],
    description: 'Next-generation sound hardware portal paired with automated nurturing flows and conversion-focused UX.',
    placeholder: true,
    accentColor: 'orange',
    size: 'compact',
  },
  {
    id: 'chrono-studio',
    title: 'CHRONO STUDIO — Global Social Media Motion & Marketing Campaign',
    category: 'Motion & Social Rollout',
    tags: ['Social Media Marketing', 'Motion Design'],
    description: 'A multi-platform dynamic motion kit and algorithmic ad sequence that drove a sold-out product launch in record time.',
    placeholder: true,
    accentColor: 'purple',
    size: 'wide',
  },
]

