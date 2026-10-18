import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground'
import HeartCursorTrail from './components/HeartCursorTrail'
import OpeningScreen from './components/OpeningScreen'
import LoveQuote from './components/LoveQuote'
import ReasonsCards from './components/ReasonsCards'
import SurpriseMessage from './components/SurpriseMessage'
import LoveCounter from './components/LoveCounter'
import PersonalMessage from './components/PersonalMessage'
import MusicToggle from './components/MusicToggle'
import FinalSection from './components/FinalSection'

/**
 * Root application component.
 * Renders the opening screen first; once the user clicks "Open My Heart",
 * transitions into the main scrollable love-letter experience.
 */
function App() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen">
      {/* Ambient background — always visible */}
      <ParticleBackground />
      <HeartCursorTrail />

      {/* ─── Opening screen ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!entered && (
          <OpeningScreen key="opening" onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {/* ─── Main content ────────────────────────────────────── */}
      {entered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative z-10"
        >
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none z-20" />

          <div className="pt-8">
            {/* Main romantic quote */}
            <LoveQuote />

            <Divider icon="♥" />

            {/* Reasons I adore you */}
            <ReasonsCards />

            <Divider icon="✦" />

            {/* Relationship counter (auto-hidden if no date) */}
            <LoveCounter />

            {/* Personal note */}
            <PersonalMessage />

            <Divider icon="♥" />

            {/* Surprise reveal */}
            <SurpriseMessage />

            <Divider icon="✦" />

            {/* Grand finale */}
            <FinalSection />
          </div>

          {/* Music toggle (auto-hidden if no audio) */}
          <MusicToggle />
        </motion.main>
      )}
    </div>
  )
}

/* ─── Decorative section divider ──────────────────────────────── */
function Divider({ icon = '♥' }) {
  return (
    <div className="flex items-center justify-center gap-4 py-4 select-none">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-gold/25" />
      <span className="text-rose-gold/25 text-sm">{icon}</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-gold/25" />
    </div>
  )
}

export default App

