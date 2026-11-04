/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_WHATSAPP_MESSAGE?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_EMAIL_SUBJECT?: string
  readonly VITE_PHONE_DISPLAY?: string
  readonly VITE_PHONE_VALUE?: string
  readonly VITE_SOCIAL_INSTAGRAM?: string
  readonly VITE_SOCIAL_LINKEDIN?: string
  readonly VITE_SOCIAL_TWITTER?: string
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

