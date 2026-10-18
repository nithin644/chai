import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { config } from '../config'

/**
 * Displays the main romantic quote with a word-by-word reveal animation.
 * The name "Chaitra" is highlighted with a glowing rose-gold gradient.
 */
const LoveQuote = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const quote = `${config.name}, if I could choose a thousand times, I would still choose you. Not because every day will be perfect, but because even ordinary days become beautiful when I imagine sharing them with you. You are the smile I look for, the peace I never knew I needed, and the little thought that makes my busiest days softer. I don't need a perfect love story—I just want a real one, with you, one beautiful moment at a time.`

  const words = quote.split(' ')
  const nameToken = `${config.name},`

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Opening quote mark */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-rose-gold/30 text-6xl sm:text-7xl font-script select-none">
            &ldquo;
          </span>
        </motion.div>

        {/* Quote — word-by-word reveal */}
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-relaxed text-center font-serif font-light">
          {words.map((word, i) => {
            const isName = word === nameToken || word === config.name
            return (
              <motion.span
                key={i}
                className={`inline-block mr-[0.3em] ${
                  isName
                    ? 'rose-gold-text font-semibold glow-text'
                    : 'text-cream/80'
                }`}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.35,
                  delay: 0.4 + i * 0.055,
                  ease: 'easeOut',
                }}
              >
                {word}
              </motion.span>
            )
          })}
          {/* Trailing heart emoji */}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.4 + words.length * 0.055 + 0.3,
            }}
          >
            ❤️
          </motion.span>
        </p>

        {/* Closing quote mark */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4 + words.length * 0.055 + 0.5,
          }}
        >
          <span className="text-rose-gold/30 text-6xl sm:text-7xl font-script select-none">
            &rdquo;
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default LoveQuote

