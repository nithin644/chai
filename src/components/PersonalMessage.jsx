import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PenLine } from 'lucide-react'
import { config } from '../config'

/**
 * Elegant glassmorphism card displaying the editable personal message
 * from config.js with a scroll-triggered entrance animation.
 */
const PersonalMessage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="px-6 py-20 relative" ref={ref}>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="glass rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative corner gradient */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-rose-gold/8 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-burgundy/10 to-transparent rounded-tr-full pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-2.5 mb-6 relative z-10">
            <PenLine className="text-rose-gold/55" size={18} />
            <h3 className="font-script text-2xl sm:text-3xl glow-text">
              A Note For You
            </h3>
          </div>

          {/* Message body */}
          <motion.p
            className="text-cream/75 leading-relaxed text-base sm:text-lg relative z-10 font-serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {config.personalMessage}
          </motion.p>

          {/* Sign-off */}
          <motion.div
            className="mt-8 text-right relative z-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="font-script text-xl sm:text-2xl text-rose-gold/65">
              With all my love ♥
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default PersonalMessage

