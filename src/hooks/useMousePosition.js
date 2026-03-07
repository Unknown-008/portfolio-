import { useEffect, useRef, useState } from 'react'

/**
 * Tracks mouse position with optional smoothing
 */
export function useMousePosition({ smooth = false } = {}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rawPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      rawPos.current = { x: e.clientX, y: e.clientY }
      if (!smooth) setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', onMove)

    if (smooth) {
      const lerp = (a, b, t) => a + (b - a) * t
      let cx = 0, cy = 0
      const animate = () => {
        cx = lerp(cx, rawPos.current.x, 0.1)
        cy = lerp(cy, rawPos.current.y, 0.1)
        setPosition({ x: cx, y: cy })
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [smooth])

  return position
}

/**
 * Returns normalized mouse position (-1 to 1) relative to an element
 */
export function useElementMousePosition(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      setPos({ x, y })
    }

    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [ref])

  return pos
}
