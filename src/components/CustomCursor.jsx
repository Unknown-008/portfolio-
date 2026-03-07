import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 7

export default function CustomCursor() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const trailRefs = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ current: null })))

  const mouse  = useRef({ x: -200, y: -200 })
  const ring   = useRef({ x: -200, y: -200 })
  const trail  = useRef(Array(TRAIL_LENGTH).fill({ x: -200, y: -200 }))
  const rafRef = useRef(null)

  const [state, setState] = useState('default') // 'default' | 'hover' | 'click'

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        // tip of arrow SVG is at top-left; no centering offset needed
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const onDown = () => setState('click')
    const onUp   = () => setState(s => s === 'click' ? 'default' : s)

    const onOver = e => {
      const t = e.target
      if (
        t.tagName === 'BUTTON' || t.tagName === 'A' ||
        t.closest('button') || t.closest('a') ||
        t.dataset.cursor === 'hover'
      ) setState('hover')
    }
    const onOut = e => {
      const t = e.relatedTarget
      if (!t || (t.tagName !== 'BUTTON' && t.tagName !== 'A' && !t.closest('button') && !t.closest('a'))) {
        setState(s => s === 'hover' ? 'default' : s)
      }
    }

    const animate = () => {
      // Ring lags behind mouse
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1)

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      }

      // Trail: each dot follows the one ahead
      trail.current[0] = {
        x: lerp(trail.current[0].x, mouse.current.x, 0.22),
        y: lerp(trail.current[0].y, mouse.current.y, 0.22),
      }
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail.current[i] = {
          x: lerp(trail.current[i].x, trail.current[i - 1].x, 0.45),
          y: lerp(trail.current[i].y, trail.current[i - 1].y, 0.45),
        }
      }
      trailRefs.current.forEach((ref, i) => {
        if (ref.current) {
          const size = 4 - i * 0.4
          ref.current.style.transform = `translate(${trail.current[i].x - size / 2}px, ${trail.current[i].y - size / 2}px)`
          ref.current.style.width  = `${Math.max(1.5, size)}px`
          ref.current.style.height = `${Math.max(1.5, size)}px`
          ref.current.style.opacity = `${(1 - i / TRAIL_LENGTH) * 0.45}`
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Arrow pointer — tip at top-left corner of SVG */}
      <div ref={dotRef} className="cursor-dot">
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1L1 17L5 13L8 20.5L11 19.2L8 11.8L14 11.8L1 1Z"
            fill="#0a0f1e"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${state === 'hover' ? 'state-hover' : ''} ${state === 'click' ? 'state-click' : ''}`}
      />

      {/* Trail */}
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = { current: el } }}
          className="cursor-trail"
          style={{ background: i < 3 ? 'rgba(6,182,212,0.5)' : 'rgba(139,92,246,0.4)' }}
        />
      ))}
    </>
  )
}
