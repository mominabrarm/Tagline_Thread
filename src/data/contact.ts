// ============================================================
// CONTACT CONFIGURATION
// Replace placeholders with real contact details before launch
// ============================================================

export const CONTACT_CONFIG = {
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '18008439328',
    message: import.meta.env.VITE_WHATSAPP_MESSAGE || "Hi Tagline-Thread! I'm interested in your services and would like to discuss a project.",
  },
  email: {
    address: import.meta.env.VITE_CONTACT_EMAIL || 'studio@taglinethread.com',
    subject: import.meta.env.VITE_EMAIL_SUBJECT || 'Project Inquiry — Tagline-Thread',
  },
  phone: {
    display: import.meta.env.VITE_PHONE_DISPLAY || '+1 (800) 843-9328',
    value: import.meta.env.VITE_PHONE_VALUE || '+18008439328',
  },
  social: {
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com/taglinethread',
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com/company/taglinethread',
    twitter: import.meta.env.VITE_SOCIAL_TWITTER || 'https://x.com/taglinethread',
  },
}

/** Generates a wa.me URL with pre-filled message */
export function getWhatsAppUrl(): string {
  const { number, message } = CONTACT_CONFIG.whatsapp
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/** Generates a mailto link */
export function getMailtoUrl(body?: string): string {
  const { address, subject } = CONTACT_CONFIG.email
  let url = `mailto:${address}?subject=${encodeURIComponent(subject)}`
  if (body) url += `&body=${encodeURIComponent(body)}`
  return url
}

