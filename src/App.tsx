import React from 'react'
import { Navbar }      from './components/layout/Navbar'
import { Footer }      from './components/layout/Footer'
import { Hero }        from './components/sections/Hero'
import { About }       from './components/sections/About'
import { ThreadEngine }from './components/sections/ThreadEngine'
import { Services }    from './components/sections/Services'
import { Portfolio }   from './components/sections/Portfolio'
import { HowWeWork }   from './components/sections/HowWeWork'
import { Contact }     from './components/sections/Contact'
import { WhatsAppButton } from './components/ui/WhatsAppButton'

const App: React.FC = () => {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Skip-to-main for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-orange focus:text-[#16181B] focus:font-bold"
        >
          Skip to main content
        </a>

        <Hero />
        <About />
        <ThreadEngine />
        <Services />
        <Portfolio />
        <HowWeWork />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />
    </>
  )
}

export default App

