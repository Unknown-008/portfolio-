import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RevealWords } from '../components/SplitText'

const milestones = [
  { year: '2022',  title: 'Started Professional Journey',  desc: 'Joined as a Software Developer — first enterprise project in .NET Core',       icon: '🚀', color: '#06b6d4' },
  { year: '2022',  title: 'First Mobile App Shipped',       desc: 'React Native app launched on App Store & Google Play',                          icon: '📱', color: '#61dafb' },
  { year: '2023',  title: 'ERP System — M21',               desc: 'Led development of a full-featured ERP platform rivaling commercial tools',      icon: '🏢', color: '#8b5cf6' },
  { year: '2023',  title: 'IoT Bluetooth App',               desc: 'Built hardware configuration tool — Bluetooth LE to cloud pipeline',            icon: '📡', color: '#f97316' },
  { year: '2024',  title: 'Dynamic PDF Builder',             desc: 'Drag-and-drop template engine with live database binding',                       icon: '📄', color: '#22d3ee' },
  { year: '2024',  title: 'AIO India Marketplace',           desc: 'E-commerce marketplace with real-time chat, orders & push notifications',        icon: '🛒', color: '#f59e0b' },
  { year: '2025+', title: 'Expanding Horizons',              desc: 'Deepening expertise in cloud architecture, advanced React patterns & open source', icon: '⭐', color: '#a855f7' },
]

const responsibilities = [
  'Developed cross-platform mobile apps using React Native for iOS and Android',
  'Built RESTful API services with .NET Core MVC and C# for production systems',
  'Designed and implemented the M21 ERP with accounting, inventory, and payroll',
  'Created a Bluetooth IoT configuration app for field-level hardware setup',
  'Built a dynamic PDF template system with drag-and-drop editor and DB binding',
  'Integrated Firebase for real-time sync, auth, and push notifications',
  'Collaborated via Git with code reviews and feature branches',
  'Maintained SQL databases with complex queries for reporting and analytics',
]

const techUsed = ['React Native', '.NET Core', 'C#', 'JavaScript', 'Firebase', 'SQL', 'REST APIs', 'Git']

function TimelineItem({ milestone, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10"
    >
      {/* Dot */}
      <div
        className="timeline-dot"
        style={{ top: 10, borderColor: milestone.color, boxShadow: `0 0 12px ${milestone.color}60` }}
      />

      <div
        className="glass p-4 glass-hover"
        style={{ border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-start gap-3">
          <span className="text-lg flex-shrink-0">{milestone.icon}</span>
          <div>
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{ background: `${milestone.color}15`, color: milestone.color }}>
                {milestone.year}
              </span>
              <h4 className="font-semibold text-slate-200 text-sm">{milestone.title}</h4>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">{milestone.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="relative py-32 overflow-hidden" style={{ background: '#0f172a' }}>
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-3">/ 04 &nbsp;—&nbsp; experience</p>
          <h2 className="section-title">
            <RevealWords delay={0.1}>Experience</RevealWords>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Main card ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="glass overflow-hidden"
              style={{ border: '1px solid rgba(6,182,212,0.15)' }}
            >
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)' }} />

              <div className="p-8">
                {/* Role header */}
                <div className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-slate-800/50">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-400"
                        style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
                      />
                      <span
                        className="font-mono text-[10px] px-2.5 py-0.5 rounded-full text-cyan-400"
                        style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
                      >
                        Full-time
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Software Developer</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-slate-500 text-sm">2022 – Present</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-black text-4xl text-gradient">2+</div>
                    <div className="font-mono text-slate-600 text-xs">years exp.</div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4">What I Do</h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {responsibilities.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="flex items-start gap-2.5 text-xs"
                      >
                        <div className="w-1 h-1 rounded-full bg-cyan-600 mt-1.5 flex-shrink-0" />
                        <span className="text-slate-400 leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech */}
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-3">Tech Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {techUsed.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + i * 0.05 }}
                        className="font-mono text-xs px-3 py-1.5 rounded-lg text-cyan-400"
                        style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Timeline ── */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-6"
            >
              // Career timeline
            </motion.p>

            <div className="relative">
              <div className="timeline-line" />
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <TimelineItem key={i} milestone={m} index={i} inView={inView} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
