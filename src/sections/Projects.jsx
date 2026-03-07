import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RevealWords } from '../components/SplitText'

const projects = [
  {
    id: 1,
    title: 'ERP Software — M21',
    category: 'Enterprise',
    description: 'A powerful ERP system rivaling Tally with advanced accounting, inventory, payroll, and GST billing for enterprises.',
    longDesc: 'Built a full-featured Enterprise Resource Planning system covering multi-entity accounting, GST billing, inventory management, payroll processing, and comprehensive financial reporting. Includes role-based access control and audit trails.',
    tech: ['.NET Core MVC', 'C#', 'SQL Server', 'JavaScript'],
    color: '#8b5cf6',
    icon: '🏢',
    number: '01',
    features: ['Multi-entity Accounting', 'GST Billing', 'Inventory Management', 'Role-Based Access'],
  },
  {
    id: 2,
    title: 'Bluetooth IoT Config App',
    category: 'Mobile / IoT',
    description: 'React Native app connecting to hardware via Bluetooth for WiFi, API endpoint, and sensor configuration.',
    longDesc: 'Cross-platform mobile app for iOS and Android that communicates with embedded devices over BLE. Field technicians can configure WiFi credentials, API endpoints, and sensor calibration without physical firmware access.',
    tech: ['React Native', 'Bluetooth LE', 'JavaScript', 'Firebase'],
    color: '#06b6d4',
    icon: '📡',
    number: '02',
    features: ['BLE Communication', 'WiFi Config', 'Sensor Calibration', 'Remote Update'],
  },
  {
    id: 3,
    title: 'Travel Booking Application',
    category: 'Web App',
    description: 'Full-stack travel management platform for searching, booking, and managing trips end-to-end.',
    longDesc: 'A complete travel system allowing users to search and book travel packages including flights, hotels, and itineraries. Features real-time availability, payment integration, and an admin dashboard for package management.',
    tech: ['React.js', 'JavaScript', '.NET Core', 'SQL'],
    color: '#f97316',
    icon: '✈',
    number: '03',
    features: ['Booking Engine', 'Payment Integration', 'Admin Dashboard', 'Real-time Updates'],
  },
  {
    id: 4,
    title: 'Dynamic PDF Builder',
    category: 'Tool',
    description: 'Drag-and-drop PDF template designer that binds to database fields and generates documents on demand.',
    longDesc: 'Built a sophisticated PDF template builder with a visual drag-and-drop interface. Templates bind to live database fields and auto-generate professional PDFs — invoices, reports, and certificates — at scale.',
    tech: ['React.js', 'JavaScript', '.NET Core', 'iTextSharp'],
    color: '#22d3ee',
    icon: '📄',
    number: '04',
    features: ['Drag & Drop Editor', 'DB Field Binding', 'Live Preview', 'Batch Generation'],
  },
  {
    id: 5,
    title: 'AIO India Marketplace',
    category: 'Mobile App',
    description: 'End-to-end marketplace app for buying and selling products with real-time chat and push notifications.',
    longDesc: 'A full marketplace mobile application with product listings, buyer-seller messaging, order management, and payment processing. Firebase powers real-time inventory and push notifications.',
    tech: ['React Native', 'Firebase', 'JavaScript', 'REST APIs'],
    color: '#f59e0b',
    icon: '🛒',
    number: '05',
    features: ['Product Listings', 'Real-time Chat', 'Order Tracking', 'Push Notifications'],
  },
]

// ─── Tilt + Magnetic card ─────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const cardRef = useRef(null)

  const onMouseMove = e => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
  }
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onClick={() => onClick(project)}
        className="glass cursor-pointer group relative overflow-hidden h-full"
        style={{
          border: `1px solid ${project.color}18`,
          transition: 'transform 0.22s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 28px 60px ${project.color}15, 0 0 0 1px ${project.color}20`
        }}
      >
        {/* Top accent line */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}20)` }} />

        {/* Large number watermark */}
        <div
          className="absolute top-4 right-5 font-black text-6xl leading-none pointer-events-none select-none transition-opacity duration-300 group-hover:opacity-40"
          style={{ color: `${project.color}12`, fontVariantNumeric: 'tabular-nums' }}
        >
          {project.number}
        </div>

        <div className="p-6">
          {/* Header row */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${project.color}12`, border: `1px solid ${project.color}25` }}
            >
              {project.icon}
            </div>
            <div>
              <span
                className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] mb-1"
                style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
              >
                {project.category}
              </span>
              <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors text-base leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{project.description}</p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.features.slice(0, 3).map(f => (
              <span
                key={f}
                className="px-2 py-0.5 rounded font-mono text-[10px] text-slate-600"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/50">
            {project.tech.map(t => (
              <span
                key={t}
                className="font-mono text-[10px] px-2.5 py-1 rounded-lg"
                style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}22` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow on hover */}
        <motion.div
          className="absolute bottom-5 right-5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: `${project.color}18`, border: `1px solid ${project.color}35` }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: project.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}05, transparent 65%)` }}
        />
      </div>
    </motion.div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(2,5,14,0.88)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 28 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative max-w-lg w-full glass overflow-hidden"
        style={{ border: `1px solid ${project.color}30`, boxShadow: `0 40px 80px ${project.color}10` }}
        onClick={e => e.stopPropagation()}
      >
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}30)` }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-slate-500 hover:text-white transition-colors text-xs"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          ESC
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ background: `${project.color}12`, border: `1px solid ${project.color}25` }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">{project.title}</h3>
              <span className="font-mono text-xs" style={{ color: project.color }}>{project.category}</span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">{project.longDesc}</p>

          <div className="mb-6">
            <h4 className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-3">Key Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                  <span className="text-slate-400 text-xs">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg"
                  style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}28` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="relative py-32 overflow-hidden" style={{ background: '#0c1220' }}>
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-3">/ 03 &nbsp;—&nbsp; work</p>
          <h2 className="section-title">
            <RevealWords delay={0.1}>Selected Projects</RevealWords>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="font-mono text-slate-600 text-xs mt-3"
          >
            // Click any card for full details
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
