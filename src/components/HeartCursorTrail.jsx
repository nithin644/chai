import { useEffect, useState, useCallback } from 'react'

/**
 * Renders a subtle trail of tiny hearts that follow the cursor (or touch point).
 * Hearts fade and float upward before being removed from the DOM.
 * Respects prefers-reduced-motion.
 */
const HeartCursorTrail = () => {
  const [hearts, setHearts] = useState([])
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const spawnHeart = useCallback((x, y) => {
    const id = Date.now() + Math.random()
    setHearts((prev) => [
      ...prev.slice(-18),
      {
        id,
        x,
        y,
        size: Math.random() * 8 + 8,
        drift: (Math.random() - 0.5) * 14,
      },
    ])
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), 900)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    let last = 0
    const THROTTLE = 70

    const onMove = (e) => {
      const now = Date.now()
      if (now - last < THROTTLE) return
      last = now
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0
      spawnHeart(x, y)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [spawnHeart, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: h.x - h.size / 2,
            top: h.y - h.size / 2,
            fontSize: h.size,
            color: '#b76e79',
            animation: `cursorHeartFade 0.9s ease-out forwards`,
            '--drift': `${h.drift}px`,
          }}
        >
          ♥
        </span>
      ))}

      <style>{`
        @keyframes cursorHeartFade {
          0%   { opacity: .75; transform: translateY(0) translateX(0) scale(1); }
          100% { opacity: 0;   transform: translateY(-32px) translateX(var(--drift)) scale(.4); }
        }
      `}</style>
    </div>
  )
}

export default HeartCursorTrail

