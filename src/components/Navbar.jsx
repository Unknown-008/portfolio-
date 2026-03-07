import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive]         = useState('')
  const [scrollPct, setScrollPct]   = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)

      // Scroll progress
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (y / total) * 100 : 0)

      // Active section
      const ids = navLinks.map(l => l.href.slice(1))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && y >= el.offsetTop - 160) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = href => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 z-[110] h-[2px] origin-left"
        style={{
          width: `${scrollPct}%`,
          background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
          boxShadow: '0 0 8px rgba(6,182,212,0.7)',
        }}
        transition={{ ease: 'linear' }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={scrolled ? {
          background: 'rgba(10,15,30,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 0',
        } : { padding: '20px 0' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                boxShadow: '0 0 20px rgba(6,182,212,0.35)',
              }}
            >
              <span className="font-mono font-black text-white text-base">K</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-mono text-slate-200 text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                Krishna Garg
              </div>
              <div className="font-mono text-slate-600 text-[10px] tracking-wider">Software Developer</div>
            </div>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }, i) => (
              <NavLink
                key={href}
                label={label}
                href={href}
                index={i}
                active={active === href.slice(1)}
                onClick={() => scrollTo(href)}
              />
            ))}

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Krishna_Garg_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="ml-4 px-5 py-2 rounded-xl font-mono text-xs text-cyan-400 transition-all duration-200 flex items-center gap-1.5"
              style={{
                border: '1px solid rgba(6,182,212,0.35)',
                background: 'rgba(6,182,212,0.05)',
                boxShadow: '0 0 15px rgba(6,182,212,0.08)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.12)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(6,182,212,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.05)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(6,182,212,0.08)' }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              My Resume
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}  className="block h-[1.5px] bg-current rounded origin-center transition-all" />
              <motion.span animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block h-[1.5px] bg-current rounded" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-[1.5px] bg-current rounded origin-center transition-all" />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[98]"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-[99] w-72 flex flex-col pt-24 pb-8 px-6"
              style={{
                background: 'rgba(10,15,30,0.97)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(6,182,212,0.1)',
              }}
            >
              <div className="flex flex-col gap-1 mb-8">
                {navLinks.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(href)}
                    className={`text-left py-3 px-4 rounded-xl font-mono text-sm transition-all ${
                      active === href.slice(1)
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="text-cyan-700 mr-2 text-xs">{String(i + 1).padStart(2, '0')}.</span>
                    {label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Krishna_Garg_Resume.pdf"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm text-cyan-400 transition-all"
                  style={{ border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  My Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Individual nav link with magnetic micro-interaction
function NavLink({ label, href, index, active, onClick }) {
  const ref = useRef(null)

  const handleMouseMove = e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const handleMouseLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-4 py-2 font-mono text-sm rounded-lg transition-colors duration-200 ${
        active ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-200'
      }`}
      style={{ transition: 'transform 0.2s ease, color 0.2s ease' }}
    >
      <span className="text-[10px] text-cyan-700 mr-1">{String(index + 1).padStart(2, '0')}.</span>
      {label}
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'rgba(6,182,212,0.07)',
            border: '1px solid rgba(6,182,212,0.18)',
          }}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
        />
      )}
    </button>
  )
}
