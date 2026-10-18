import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smile, Heart, Sparkles, Sun, Star, Coffee } from 'lucide-react'
import { config } from '../config'

const reasons = [
  {
    icon: Smile,
    title: 'Your Smile',
    text: "The way your smile lights up an entire room and makes everything feel warm and right \u2014 it\u2019s the most beautiful thing I\u2019ve ever seen.",
  },
  {
    icon: Heart,
    title: 'Your Kindness',
    text: 'The gentle way you care about everyone around you, with so much love and patience \u2014 it makes me fall for you all over again.',
  },
  {
    icon: Sparkles,
    title: 'Your Laugh',
    text: "That beautiful laugh of yours that I could listen to forever \u2014 it\u2019s my favourite sound in the entire world.",
  },
  {
    icon: Sun,
    title: 'Your Energy',
    text: 'The brightness you bring into every single moment. Even on cloudy days, you are my sunshine, my warmth.',
  },
  {
    icon: Star,
    title: 'Your Strength',
    text: "The quiet strength you carry with such grace and beauty. You inspire me more than you\u2019ll ever know.",
  },
  {
    icon: Coffee,
    title: 'Ordinary Moments',
    text: "The way you make ordinary moments feel magical \u2014 just being with you turns the simplest day into something I\u2019ll treasure.",
  },
]

/* ─── Individual card ─────────────────────────────────────────── */
const ReasonCard = ({ reason, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = reason.icon

  return (
    <motion.div
      ref={ref}
      className="glass glass-hover glow-border rounded-2xl p-6 sm:p-8 cursor-default"
      initial={{ opacity: 0, y: 45, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-full bg-rose-gold/10 border border-rose-gold/20">
          <Icon className="text-rose-gold" size={20} />
        </div>
        <h3 className="font-script text-2xl text-rose-gold">{reason.title}</h3>
      </div>
      <p className="text-cream/65 leading-relaxed text-sm sm:text-base">
        {reason.text}
      </p>
    </motion.div>
  )
}

/* ─── Section ─────────────────────────────────────────────────── */
const ReasonsCards = () => {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="px-6 py-20 relative">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headerRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl glow-text mb-4">
            Reasons I Adore You
          </h2>
          <p className="text-cream/45 text-sm sm:text-base italic font-serif">
            Just a few of the countless things I love about you, {config.name}
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReasonsCards
