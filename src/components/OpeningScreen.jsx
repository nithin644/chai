import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { config } from '../config'

/**
 * Full-screen landing scene with animated title, subtitle, envelope,
 * and a glowing "Open My Heart" button that triggers the transition.
 */
const OpeningScreen = ({ onEnter }) => {
  const [opening, setOpening] = useState(false)

  const handleClick = () => {
    setOpening(true)
    setTimeout(onEnter, 1400)
  }

  return (
    <AnimatePresence>
      {!opening ? (
        /* ─── Idle landing ─────────────────────────────────────── */
        <motion.div
          key="landing"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6 select-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, #1a0008 0%, #0f0004 45%, #0a0a0a 100%)',
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Envelope icon */}
          <motion.div
            className="relative mb-10"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
          >
            <div className="w-28 h-20 sm:w-36 sm:h-24 relative">
              {/* body */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-gold/25 to-burgundy/30 border border-rose-gold/25 backdrop-blur-sm" />
              {/* flap */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2"
                style={{
                  background:
                    'linear-gradient(to bottom right, rgba(183,110,121,0.35), rgba(128,0,32,0.25))',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  borderRadius: '12px 12px 0 0',
                }}
              />
              {/* heart seal */}
              <Heart
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-rose-gold/50"
                size={20}
                fill="currentColor"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-script text-4xl sm:text-5xl md:text-7xl text-center mb-5 glow-text leading-snug"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            For My Beautiful{' '}
            <span className="rose-gold-text">{config.name}</span>{' '}
            <span className="inline-block animate-float">❤️</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-cream/55 text-sm sm:text-base md:text-lg text-center max-w-md mb-14 font-light italic font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            &ldquo;Some people enter your life and quietly become your favourite
            part of it.&rdquo;
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={handleClick}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-burgundy to-rose-gold/80 text-cream font-medium text-base sm:text-lg pulse-glow border border-rose-gold/30 cursor-pointer active:scale-95 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            Open My Heart 💌
          </motion.button>
        </motion.div>
      ) : (
        /* ─── Envelope-opening transition ──────────────────────── */
        <motion.div
          key="transition"
          className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, #1a0008 0%, #0a0a0a 100%)',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          {/* Envelope zoom */}
          <motion.div
            className="relative"
            initial={{ scale: 1 }}
            animate={{ scale: 3.5, y: -120, opacity: 0 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          >
            <div className="w-36 h-24 relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-gold/25 to-burgundy/30 border border-rose-gold/25" />
              {/* Flap opening */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1/2"
                style={{
                  background:
                    'linear-gradient(to bottom right, rgba(183,110,121,0.35), rgba(128,0,32,0.25))',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  borderRadius: '12px 12px 0 0',
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 180 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
              {/* Letter rising */}
              <motion.div
                className="absolute -top-1 left-3 right-3 h-14 rounded-lg bg-cream/15 border border-cream/15"
                initial={{ y: 0 }}
                animate={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* Burst of hearts */}
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2
            return (
              <motion.span
                key={i}
                className="absolute text-rose-gold pointer-events-none"
                style={{ fontSize: Math.random() * 14 + 12 }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * (150 + Math.random() * 80),
                  y: Math.sin(angle) * (150 + Math.random() * 80),
                  opacity: 0,
                  scale: 1.3,
                }}
                transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
              >
                ♥
              </motion.span>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OpeningScreen

