import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RevealWords } from '../components/SplitText'

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 1800 }) {
  const [value, setValue] = useState(0)
  const [ref, inView]     = useInView({ triggerOnce: true, threshold: 0.5 })
  const started           = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    const tick  = now => {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref}>{value}{suffix}</span>
}

const stats = [
  { value: 2,   suffix: '+', label: 'Years Experience', icon: '⚡' },
  { value: 10,  suffix: '+', label: 'Projects Shipped',  icon: '🚀' },
  { value: 5,   suffix: '+', label: 'Tech Stacks',        icon: '🛠' },
  { value: 100, suffix: '%', label: 'Dedication',          icon: '🎯' },
]

const highlights = [
  { label: 'Mobile Development',  desc: 'Cross-platform iOS & Android with React Native', color: '#61dafb' },
  { label: 'Backend Engineering', desc: '.NET Core APIs, services & databases',           color: '#8b5cf6' },
  { label: 'Enterprise Systems',  desc: 'ERP, billing & management platforms',            color: '#06b6d4' },
  { label: 'IoT Integration',     desc: 'Bluetooth device configuration & firmware',      color: '#f97316' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden"
      style={{ background: '#0c1220' }}
    >
      {/* Grid + glow */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-3">/ 01 &nbsp;—&nbsp; about</p>
          <h2 className="section-title">
            <RevealWords delay={0.1}>About Me</RevealWords>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Terminal code block */}
            <div
              className="glass mb-8 overflow-hidden"
              style={{ border: '1px solid rgba(6,182,212,0.1)' }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"   />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"/>
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-slate-600 text-xs ml-2">about.js</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-1.5">
                <div><span className="text-purple-400">const</span> <span className="text-cyan-400">me</span> <span className="text-slate-500">=</span> {'{'}</div>
                {[
                  ['name',       '"Krishna Garg"'],
                  ['role',       '"Software Developer"'],
                  ['experience', '"2+ years"'],
                  ['location',   '"India 🇮🇳"'],
                  ['status',     '"Open to Work ✓"'],
                ].map(([key, val]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + ['name','role','experience','location','status'].indexOf(key) * 0.08 }}
                    className="pl-5"
                  >
                    <span className="text-slate-500">{key}</span>
                    <span className="text-slate-600">: </span>
                    <span className="text-green-400">{val}</span>
                    <span className="text-slate-600">,</span>
                  </motion.div>
                ))}
                <div><span className="text-slate-500">{'}'}</span></div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 text-slate-400 leading-relaxed mb-8">
              {[
                "I'm a passionate Software Developer with 2+ years of hands-on experience building production-grade applications across mobile, web, and enterprise domains.",
                'I specialize in React Native for cross-platform mobile development and .NET Core MVC for robust backend services. I\'ve shipped everything from ERP systems and IoT tools to travel platforms and dynamic PDF builders.',
                'My philosophy: clean architecture + pragmatic problem-solving. I care about maintainable code that delivers real value.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              Let&apos;s Work Together
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>

          {/* ── Right ── */}
          <div className="space-y-5">
            {/* Animated stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, suffix, label, icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="glass p-5 text-center gradient-border-wrap glass-hover"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="text-2xl mb-1.5">{icon}</div>
                  <div className="font-black text-3xl text-gradient">
                    <Counter to={value} suffix={suffix} />
                  </div>
                  <div className="font-mono text-slate-500 text-xs mt-1">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Expertise rows */}
            <div className="space-y-2.5">
              {highlights.map(({ label, desc, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 glass p-4 glass-hover group"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* Color accent */}
                  <div
                    className="w-1 h-10 rounded-full flex-shrink-0 transition-all duration-300 group-hover:h-12"
                    style={{ background: color, boxShadow: `0 0 12px ${color}50` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-semibold text-slate-200">{label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
