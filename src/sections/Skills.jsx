import { useRef } from 'react'
import { motion } from 'framer-motion'
import MarqueeText from '../components/MarqueeText'
import { RevealWords } from '../components/SplitText'

const categories = [
  {
    title: 'Frontend',
    color: '#61dafb',
    icon: '⚛',
    skills: [
      { name: 'React Native', level: 92 },
      { name: 'React.js',     level: 88 },
      { name: 'JavaScript',   level: 90 },
      { name: 'Tailwind CSS', level: 84 },
      { name: 'HTML / CSS',   level: 86 },
    ],
  },
  {
    title: 'Backend',
    color: '#8b5cf6',
    icon: '⚙',
    skills: [
      { name: '.NET Core MVC', level: 88 },
      { name: 'C#',            level: 86 },
      { name: 'Node.js',       level: 78 },
      { name: 'REST APIs',     level: 90 },
    ],
  },
  {
    title: 'Tools & Infra',
    color: '#06b6d4',
    icon: '🛠',
    skills: [
      { name: 'Firebase', level: 82 },
      { name: 'SQL',      level: 80 },
      { name: 'Git',      level: 88 },
      { name: 'VS Code',  level: 95 },
    ],
  },
]

const marqueeRows = [
  ['React Native', 'React.js', 'JavaScript', '.NET Core MVC', 'C#', 'Node.js', 'REST APIs', 'Firebase', 'Git', 'SQL', 'Tailwind CSS', 'HTML5', 'CSS3'],
  ['TypeScript', 'Node.js', 'Redux', 'Entity Framework', 'Blazor', 'Expo', 'MobX', 'SignalR', 'Azure', 'PostgreSQL', 'SQLite', 'Postman'],
  ['VS Code', 'Figma', 'GitHub', 'Firebase Auth', 'FCM Push', 'Bluetooth LE', 'PDF Generation', 'ERP Systems', 'Agile', 'Clean Arch', 'MVVM', 'MVC'],
]

const VP = { once: true, amount: 0.05 }

function TiltCard({ children, className = '', style = {} }) {
  const ref = useRef(null)

  const onMouseMove = e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -18
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 0.25s ease', transformStyle: 'preserve-3d', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

function SkillBar({ name, level, color, delay }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-xs text-slate-300">{name}</span>
        <span className="font-mono text-xs text-slate-600">{level}%</span>
      </div>
      <div className="h-1 bg-slate-800/80 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}70)`, boxShadow: `0 0 8px ${color}50` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden" style={{ background: '#0f172a' }}>
      {/* Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-3">/ 02 &nbsp;—&nbsp; skills</p>
          <h2 className="section-title">
            <RevealWords delay={0.1}>Tech Stack</RevealWords>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ delay: 0.3 }}
            className="font-mono text-slate-600 text-xs mt-3"
          >
            // Technologies I work with daily
          </motion.p>
        </motion.div>

        {/* ── Marquee rows ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ delay: 0.2 }}
          className="mb-20 space-y-3 select-none"
        >
          {marqueeRows.map((row, ri) => (
            <MarqueeText
              key={ri}
              reverse={ri % 2 === 1}
              speed={ri === 1 ? 22 : 30}
              items={row.map(tech => (
                <span
                  key={tech}
                  className="skill-badge inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs"
                  style={{
                    background: ri === 0 ? 'rgba(6,182,212,0.06)' : ri === 1 ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${ri === 0 ? 'rgba(6,182,212,0.18)' : ri === 1 ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.07)'}`,
                    color: ri === 0 ? '#06b6d4' : ri === 1 ? '#8b5cf6' : '#64748b',
                  }}
                >
                  <span className="text-[8px] opacity-50">◆</span>
                  {tech}
                </span>
              ))}
            />
          ))}
        </motion.div>

        {/* ── Tilt skill cards ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map(({ title, color, icon, skills }, ci) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.65, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                className="glass glow-pulse h-full"
                style={{ border: `1px solid ${color}15` }}
              >
                <div className="h-[2px] w-full rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}30)` }} />

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/50">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-mono font-semibold text-slate-200 text-sm">{title}</h3>
                      <span className="font-mono text-xs text-slate-600">{skills.length} skills</span>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: ci * 0.5 }}
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                  </div>

                  {skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      {...skill}
                      color={color}
                      delay={ci * 0.1 + si * 0.07}
                    />
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
