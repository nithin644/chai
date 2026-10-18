import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Heart } from 'lucide-react'
import { config } from '../config'

/**
 * Live relationship counter — days, hours, minutes, seconds.
 * Hidden entirely when config.relationshipStartDate is null or invalid.
 */
const LoveCounter = () => {
  const [elapsed, setElapsed] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!config.relationshipStartDate) return

    const start = new Date(config.relationshipStartDate)
    if (Number.isNaN(start.getTime())) return

    const tick = () => {
      const diff = Date.now() - start.getTime()
      if (diff < 0) return

      setElapsed({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* Hide if no valid date or no data yet */
  if (!config.relationshipStartDate || !elapsed) return null

  const units = [
    { label: 'Days', value: elapsed.days },
    { label: 'Hours', value: elapsed.hours },
    { label: 'Minutes', value: elapsed.minutes },
    { label: 'Seconds', value: elapsed.seconds },
  ]

  return (
    <section className="px-6 py-16 relative" ref={ref}>
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <Clock className="text-rose-gold/50" size={19} />
          <h3 className="font-script text-3xl sm:text-4xl glow-text">
            Falling For You Since
          </h3>
          <Heart
            className="text-rose-gold/50"
            size={16}
            fill="currentColor"
          />
        </div>

        {/* Counter grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-md mx-auto">
          {units.map((u, i) => (
            <motion.div
              key={u.label}
              className="glass rounded-xl p-3 sm:p-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold rose-gold-text tabular-nums">
                {u.label === 'Days'
                  ? u.value
                  : String(u.value).padStart(2, '0')}
              </div>
              <div className="text-cream/35 text-[11px] sm:text-sm mt-1 uppercase tracking-wider">
                {u.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-cream/30 text-xs sm:text-sm mt-6 italic font-serif"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          …and counting every beautiful moment ✨
        </motion.p>
      </motion.div>
    </section>
  )
}

export default LoveCounter

