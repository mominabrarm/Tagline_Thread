import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroAboutExperience } from './components/sections/HeroAboutExperience'
import { ThreadEngine } from './components/sections/ThreadEngine'
import { Services } from './components/sections/Services'
import { Portfolio } from './components/sections/Portfolio'
import { HowWeWork } from './components/sections/HowWeWork'
import { Contact } from './components/sections/Contact'
import { WhatsAppButton } from './components/ui/WhatsAppButton'

const App: React.FC = () => {
  return (
    <>
      {/* Floating Navigation Dock */}
      <Navbar />

      <main id="main-content">
        {/* Skip-to-main for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-orange focus:text-[#0C0E10] focus:font-bold"
        >
          Skip to main content
        </a>

        {/* 01 & 02 // HERO & ABOUT (Continuous Spline 3D Experience) */}
        <HeroAboutExperience />

        {/* 03 // OUR APPROACH */}
        <ThreadEngine />

        {/* 04 // OUR SERVICES */}
        <Services />

        {/* 05 // OUR WORK */}
        <Portfolio />

        {/* 06 // WHY TAGLINE-THREAD */}
        <HowWeWork />

        {/* CONTACT & INQUIRY */}
        <Contact />
      </main>

      {/* 07 // FOOTER */}
      <Footer />

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />
    </>
  )
}

export default App
