import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift } from 'lucide-react'
import { config } from '../config'

/**
 * "One More Thing" surprise: a glowing button that, when tapped,
 * reveals a hidden romantic message with a burst of hearts.
 */
const SurpriseMessage = () => {
  const [revealed, setRevealed] = useState(false)
  const [hearts, setHearts] = useState([])

  const handleReveal = () => {
    if (revealed) return
    setRevealed(true)

    setHearts(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 380,
        y: (Math.random() - 0.5) * 380,
        size: Math.random() * 18 + 10,
        delay: Math.random() * 0.45,
        rotate: Math.random() * 360,
      }))
    )
  }

  return (
    <section className="px-6 py-24 flex items-center justify-center min-h-[55vh] relative overflow-hidden">
      <div className="text-center relative">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="btn"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.45 }}
            >
              <motion.button
                onClick={handleReveal}
                className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-burgundy via-rose-gold/50 to-burgundy text-cream font-medium text-base sm:text-lg border border-rose-gold/25 pulse-glow cursor-pointer select-none"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <span className="flex items-center gap-3">
                  <Gift
                    size={22}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                  One More Thing, {config.name} 💖
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              className="glass rounded-3xl p-8 sm:p-12 max-w-lg mx-auto relative z-10"
              initial={{ opacity: 0, scale: 0.4, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.25 }}
            >
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-script glow-text leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                You are not just someone I love —{' '}
                <span className="rose-gold-text">
                  you are my favourite feeling
                </span>
                , my safest place, and the most beautiful chapter of my story. 💕
              </motion.p>

              <motion.p
                className="text-cream/40 mt-6 text-sm italic font-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                — written with all my heart, just for you
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heart burst */}
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.span
              key={h.id}
              className="absolute left-1/2 top-1/2 pointer-events-none select-none"
              style={{ fontSize: h.size, color: '#b76e79' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: h.x,
                y: h.y,
                opacity: 0,
                scale: 1,
                rotate: h.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, delay: h.delay, ease: 'easeOut' }}
            >
              ♥
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SurpriseMessage

