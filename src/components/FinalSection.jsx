import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import { config } from '../config'

/**
 * The grand finale — a scroll-triggered reveal of the final love message
 * with the name displayed in large, glowing script.
 */
const FinalSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-6 py-24 relative"
      ref={ref}
    >
      {/* Radial glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-80 h-80 sm:w-96 sm:h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(128,0,32,0.12) 0%, transparent 70%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Heart icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Heart
            className="text-rose-gold/25 mx-auto mb-8"
            size={42}
            fill="currentColor"
          />
        </motion.div>

        {/* Line 1 */}
        <motion.p
          className="text-lg sm:text-2xl md:text-3xl leading-relaxed text-cream/75 font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          If I had to write my favourite name in every love story,
        </motion.p>

        {/* Line 2 */}
        <motion.p
          className="text-lg sm:text-2xl md:text-3xl leading-relaxed text-cream/75 mb-8 font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          it would always be yours:
        </motion.p>

        {/* Name — grand reveal */}
        <motion.h2
          className="font-script text-5xl sm:text-6xl md:text-8xl rose-gold-text glow-text leading-tight"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {config.name}
        </motion.h2>

        {/* Heart emoji */}
        <motion.span
          className="inline-block text-3xl sm:text-4xl mt-5"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: 2.2,
            type: 'spring',
            stiffness: 200,
          }}
        >
          ❤️
        </motion.span>

        {/* Footer */}
        <motion.p
          className="text-cream/20 text-xs sm:text-sm mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.8 }}
        >
          Made with love, just for you ♥
        </motion.p>
      </div>
    </section>
  )
}

export default FinalSection

