import { useEffect, useRef, useCallback } from 'react'

/**
 * Full-screen canvas background with floating hearts, stars, and glowing dots.
 * Respects prefers-reduced-motion — renders nothing when motion is reduced.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ── Particle factory ──────────────────────────────────────── */
  const createParticle = useCallback((w, h) => {
    const types = ['heart', 'heart', 'star', 'dot', 'dot', 'dot']
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3.5 + 1,
      vy: -(Math.random() * 0.25 + 0.08),
      vx: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.08,
      type: types[Math.floor(Math.random() * types.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.015 + 0.004,
    }
  }, [])

  /* ── Heart shape ───────────────────────────────────────────── */
  const drawHeart = useCallback((ctx, cx, cy, s) => {
    const r = s * 1.4
    ctx.beginPath()
    ctx.moveTo(cx, cy + r * 0.3)
    ctx.bezierCurveTo(cx, cy, cx - r / 2, cy, cx - r / 2, cy + r * 0.3)
    ctx.bezierCurveTo(cx - r / 2, cy + r * 0.65, cx, cy + r * 0.8, cx, cy + r)
    ctx.bezierCurveTo(cx, cy + r * 0.8, cx + r / 2, cy + r * 0.65, cx + r / 2, cy + r * 0.3)
    ctx.bezierCurveTo(cx + r / 2, cy, cx, cy, cx, cy + r * 0.3)
    ctx.closePath()
    ctx.fill()
  }, [])

  /* ── 4-pointed star ────────────────────────────────────────── */
  const drawStar = useCallback((ctx, cx, cy, s) => {
    const outer = s * 1.5
    const inner = s * 0.6
    ctx.beginPath()
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? outer : inner
      const angle = (Math.PI / 4) * i - Math.PI / 2
      const method = i === 0 ? 'moveTo' : 'lineTo'
      ctx[method](cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
    }
    ctx.closePath()
    ctx.fill()
  }, [])

  /* ── Animation loop ────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(55, Math.floor(window.innerWidth / 25))
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height)
    )

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particlesRef.current) {
        p.wobble += p.wobbleSpeed
        p.x += p.vx + Math.sin(p.wobble) * 0.25
        p.y += p.vy

        if (p.y < -15) {
          p.y = canvas.height + 15
          p.x = Math.random() * canvas.width
        }
        if (p.x < -15) p.x = canvas.width + 15
        if (p.x > canvas.width + 15) p.x = -15

        ctx.globalAlpha = p.opacity
        if (p.type === 'heart') {
          ctx.fillStyle = '#b76e79'
          drawHeart(ctx, p.x, p.y, p.size * 2.5)
        } else if (p.type === 'star') {
          ctx.fillStyle = '#d4a0a7'
          drawStar(ctx, p.x, p.y, p.size * 1.3)
        } else {
          ctx.fillStyle = '#fef0e4'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [createParticle, drawHeart, drawStar, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  )
}

export default ParticleBackground

