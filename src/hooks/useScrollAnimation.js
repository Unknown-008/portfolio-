import { useEffect, useRef, useState } from 'react'

/**
 * Returns { ref, inView, progress } where:
 * - ref: attach to your element
 * - inView: boolean, true when element is visible
 * - progress: 0–1 scroll progress through the element
 */
export function useScrollAnimation({ threshold = 0.1, triggerOnce = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  useEffect(() => {
    if (!inView) return
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight))
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [inView])

  return { ref, inView, progress }
}

/**
 * Returns the current scroll Y position and direction
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [direction, setDirection] = useState('down')
  const prevScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setDirection(y > prevScrollY.current ? 'down' : 'up')
      prevScrollY.current = y
      setScrollY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollY, direction }
}
