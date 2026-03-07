import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Wraps any child in a magnetic pull effect.
 * The element gently moves toward the cursor when hovered nearby.
 *
 * @param {number} strength  - How far the element moves (0–1). Default 0.35
 * @param {string} className - Class names for the wrapper
 */
export default function MagneticButton({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  const handleMouseMove = e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el._targetX = dx
    el._targetY = dy
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
  }

  const handleMouseEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.2s ease'
  }

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </span>
  )
}
