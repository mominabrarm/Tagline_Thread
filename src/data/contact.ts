// ============================================================
// CONTACT CONFIGURATION
// Replace placeholders with real contact details before launch
// ============================================================

export const CONTACT_CONFIG = {
  whatsapp: {
    number: 'REPLACE_WITH_WHATSAPP_NUMBER', // e.g. "919876543210" (country code + number, no +)
    message: "Hi Tagline-Thread! I'm interested in your services and would like to discuss a project.",
  },
  email: {
    address: 'REPLACE_WITH_EMAIL@taglinethread.com', // e.g. studio@taglinethread.com
    subject: 'Project Inquiry — Tagline-Thread',
  },
  phone: {
    display: 'REPLACE_WITH_PHONE_NUMBER', // e.g. +91 98765 43210
    value: 'REPLACE_WITH_PHONE_NUMBER',
  },
  social: {
    instagram: '#', // Replace with actual URL
    linkedin: '#', // Replace with actual URL
    twitter: '#', // Replace with actual URL
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

