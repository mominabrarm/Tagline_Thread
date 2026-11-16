import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, MessageCircle, Mail, Copy, Check, AlertCircle, Loader } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { CONTACT_CONFIG, getWhatsAppUrl, getMailtoUrl } from '../../data/contact'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type FormState = 'idle' | 'loading' | 'success' | 'error'

const SERVICES = [
  'Websites',
  'Social Media Management',
  'Branding & Identity',
  'Social Media Marketing',
]

interface FormData {
  name:        string
  email:       string
  brand:       string
  services:    string[]
  message:     string
}

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const Contact: React.FC = () => {
  const reduced    = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied]       = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({})

  const [form, setForm] = useState<FormData>({
    name: '', email: '', brand: '', services: [], message: '',
  })

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: '.contact-header', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.contact-grid',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const toggleService = (s: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter(x => x !== s)
        : [...f.services, s],
    }))
    setErrors(e => ({ ...e, services: undefined }))
  }

  const validate = (): boolean => {
    const errs: typeof errors = {}
    if (!form.name.trim())      errs.name    = 'Name is required'
    if (!form.email.trim())     errs.email   = 'Email is required'
    else if (!validateEmail(form.email)) errs.email = 'Enter a valid email address'
    if (!form.message.trim())   errs.message = 'Tell us about your project'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setFormState('loading')

    // Simulate async (replace with real API / EmailJS / Formspree integration)
    await new Promise(r => setTimeout(r, 1200))

    // ⚠️  No real backend is configured.
    // The form will NOT actually send an email until you add an integration.
    // Options: Formspree, EmailJS, Netlify Forms, or a custom backend endpoint.
    setFormState('error')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_CONFIG.email.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const isLoading = formState === 'loading'

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-16 sm:py-20 px-6 lg:px-16 bg-brand-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="contact-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            label="06 // Connection Node"
            title="Have an Idea? Let's bring it to life."
            subtitle="Drop your project parameters below. We respond with a bespoke strategic roadmap within 24 hours."
          />
        </div>

        {/* Grid */}
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Form — 7 cols */}
          <div
            className="lg:col-span-7 p-5 sm:p-7 rounded-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(35,39,45,0.72) 0%, rgba(24,27,31,0.58) 100%)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(233,236,239,0.11)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                  <Check size={24} className="text-brand-orange" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-brand-ash">Inquiry Received!</h3>
                <p className="font-manrope text-sm text-muted max-w-sm">
                  We'll review your project parameters and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setFormState('idle'); setForm({ name: '', email: '', brand: '', services: [], message: '' }) }}
                  className="mt-3 px-5 py-2 rounded-full bg-surface-high text-brand-ash font-grotesk text-xs uppercase tracking-wider hover:bg-surface-high/80 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Service pills */}
                <div className="space-y-1.5">
                  <label className="font-grotesk text-[10px] uppercase tracking-wider text-muted font-bold">
                    Select Core Disciplines
                  </label>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {SERVICES.map(s => {
                      const selected = form.services.includes(s)
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`px-3 py-1.5 rounded-full font-grotesk text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                            selected
                              ? 'bg-brand-orange text-[#0C0E10] shadow-orange-glow'
                              : 'text-muted hover:text-brand-ash'
                          }`}
                          style={!selected ? {
                            background: 'rgba(24,27,31,0.65)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(233,236,239,0.10)',
                          } : {}}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label htmlFor="name" className="font-grotesk text-[10px] uppercase tracking-wider text-muted">
                      Your Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      disabled={isLoading}
                      value={form.name}
                      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(x => ({ ...x, name: undefined })) }}
                      placeholder="Alex Rivera"
                      className={`input-field font-manrope ${errors.name ? 'border-red-500/60' : ''}`}
                    />
                    {errors.name && <p className="font-manrope text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="font-grotesk text-[10px] uppercase tracking-wider text-muted">
                      Email Address <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      disabled={isLoading}
                      value={form.email}
                      onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(x => ({ ...x, email: undefined })) }}
                      placeholder="alex@yourbrand.com"
                      className={`input-field font-manrope ${errors.email ? 'border-red-500/60' : ''}`}
                    />
                    {errors.email && <p className="font-manrope text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Brand */}
                <div className="space-y-1">
                  <label htmlFor="brand" className="font-grotesk text-[10px] uppercase tracking-wider text-muted">
                    Business / Brand Name
                  </label>
                  <input
                    id="brand"
                    type="text"
                    disabled={isLoading}
                    value={form.brand}
                    onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                    placeholder="Apex Horizon Inc."
                    className="input-field font-manrope"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="font-grotesk text-[10px] uppercase tracking-wider text-muted">
                      Project Brief <span className="text-brand-orange">*</span>
                    </label>
                    <span className="font-manrope text-[10px] text-muted/60">{charCount} / 500</span>
                  </div>
                  <textarea
                    id="message"
                    rows={3}
                    required
                    disabled={isLoading}
                    maxLength={500}
                    value={form.message}
                    onChange={e => {
                      setForm(f => ({ ...f, message: e.target.value }))
                      setCharCount(e.target.value.length)
                      setErrors(x => ({ ...x, message: undefined }))
                    }}
                    placeholder="Brief us on your timeline, current obstacles, and desired finish line..."
                    className={`input-field font-manrope resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                  />
                  {errors.message && <p className="font-manrope text-xs text-red-400">{errors.message}</p>}
                </div>

                {/* Error banner */}
                {formState === 'error' && (
                  <div
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-brand-orange/10"
                    style={{ border: '1px solid rgba(255,84,0,0.3)' }}
                  >
                    <AlertCircle size={15} className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-manrope text-xs text-brand-ash font-semibold">Form not configured</p>
                      <p className="font-manrope text-[11px] text-muted mt-0.5">
                        No backend integration is set up yet. Please reach out via{' '}
                        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-brand-orange underline">WhatsApp</a>{' '}
                        or{' '}
                        <a href={getMailtoUrl()} className="text-brand-orange underline">email</a>{' '}
                        directly.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-text w-full py-3 rounded-full bg-brand-orange text-[#0C0E10]
                             font-manrope font-semibold
                             shadow-orange-glow hover:shadow-orange-glow-lg active:scale-[0.99]
                             transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <><Loader size={15} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={15} /> Initiate Strategic Dispatch</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side panel — 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* WhatsApp */}
            <div
              className="p-5 rounded-xl relative overflow-hidden group"
              style={{
                background: 'rgba(24,27,31,0.60)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,84,0,0.22)',
                boxShadow: '0 0 40px -12px rgba(255,84,0,0.18), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/25 to-transparent pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                   style={{ background: 'radial-gradient(circle at 80% 20%, rgba(37,211,102,0.08), transparent 60%)' }} />

              <div className="flex items-center justify-between pb-2">
                <div className="w-10 h-10 rounded-lg bg-surface-high flex items-center justify-center">
                  <MessageCircle size={20} className="text-brand-orange" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/15 text-brand-orange font-grotesk text-[10px] font-bold uppercase">
                  Avg. Response &lt; 15 min
                </span>
              </div>

              <h3 className="font-playfair text-lg font-semibold text-brand-ash mt-1">WhatsApp Direct Wire</h3>
              <p className="font-manrope text-xs text-muted mt-1 leading-relaxed">
                Prefer instant communication? Skip the form and open a direct dialogue with our principal creative partner.
              </p>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-5 rounded-full
                           bg-surface-high hover:bg-surface-high/80 text-brand-ash font-manrope font-semibold
                           transition-colors border border-brand-ash/10"
                aria-label="Open WhatsApp conversation with Tagline-Thread"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Open Instant WhatsApp
              </a>
            </div>

            {/* Direct contact */}
            <div
              className="p-5 rounded-xl space-y-4 relative overflow-hidden"
              style={{
                background: 'rgba(24,27,31,0.60)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(136,36,255,0.22)',
                boxShadow: '0 0 40px -12px rgba(136,36,255,0.18), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/25 to-transparent pointer-events-none" />
              <div>
                <span className="font-grotesk text-[10px] uppercase tracking-wider text-brand-purple font-bold block">
                  Direct Communications
                </span>
                <h4 className="font-playfair text-base font-semibold text-brand-ash mt-0.5">Studio Headquarters</h4>
              </div>

              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'rgba(24,27,31,0.60)', border: '1px solid rgba(233,236,239,0.08)', backdropFilter: 'blur(10px)' }}>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-muted" />
                    <span className="font-manrope text-sm text-brand-ash truncate">
                      {CONTACT_CONFIG.email.address}
                    </span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1 text-brand-orange hover:text-brand-ash font-grotesk text-[11px] uppercase font-bold transition-colors"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'rgba(24,27,31,0.60)', border: '1px solid rgba(233,236,239,0.08)', backdropFilter: 'blur(10px)' }}>
                  <div className="flex items-center gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 11.11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.07 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <span className="font-manrope text-sm text-brand-ash">{CONTACT_CONFIG.phone.display}</span>
                  </div>
                  <span className="font-grotesk text-[11px] text-muted uppercase">Mon–Fri</span>
                </div>
              </div>

              {/* Confidentiality */}
              <div className="p-3 rounded-xl bg-surface-base text-muted font-manrope text-xs leading-relaxed">
                <span className="text-brand-orange font-semibold">Confidentiality Assured:</span>{' '}
                Every inquiry is handled with complete discretion and professionalism.
              </div>

              {/* Quick email link */}
              <a
                href={getMailtoUrl()}
                className="btn-text w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full
                           border border-brand-ash/10 text-brand-ash font-manrope font-semibold
                           hover:border-brand-orange/40 hover:text-brand-orange transition-colors"
              >
                <Mail size={14} /> Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

