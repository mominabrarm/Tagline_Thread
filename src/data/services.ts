export interface Service {
  id: string
  index: string
  title: string
  description: string
  tagline: string
  accentColor: 'orange' | 'purple'
}

export const SERVICES: Service[] = [
  {
    id: 'websites',
    index: '// 01',
    title: 'Websites',
    description: 'Your ideas deserve more than just a link. We build websites that look sharp, work smoothly and turn visitors into customers.',
    tagline: 'Full-Stack Modern Development',
    accentColor: 'orange',
  },
  {
    id: 'social-management',
    index: '// 02',
    title: 'Social Media Management',
    description: 'Stay seen, stay relevant. We plan, create and manage your content so your brand never misses a beat.',
    tagline: 'Editorial Strategy & Production',
    accentColor: 'purple',
  },
  {
    id: 'branding',
    index: '// 03',
    title: 'Branding & Identity',
    description: "More than just a logo. We shape your brand's personality through visuals people recognize and remember.",
    tagline: 'Logos, Guidelines, Typography & Tone',
    accentColor: 'orange',
  },
  {
    id: 'social-marketing',
    index: '// 04',
    title: 'Social Media Marketing',
    description: 'Great content deserves the right audience. We create campaigns that expand your reach and put your brand in the spotlight.',
    tagline: 'Performance Ads, Audiences & Analytics',
    accentColor: 'purple',
  },
]

