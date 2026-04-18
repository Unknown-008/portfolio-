import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { RevealWords } from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'

// ── EmailJS credentials — fill these in after setup ──────────────────────────
const EMAILJS_SERVICE_ID  = 'service_mcnvvwr'
const EMAILJS_TEMPLATE_ID = 'template_jtni3fe'
const EMAILJS_PUBLIC_KEY  = 'rqdhxaWXexhwAv46T'
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
  {
    label: 'Email',
    value: 'krishnagarg683@gmail.com',
    href:  'mailto:krishnagarg683@gmail.com',
    desc:  'Best for professional inquiries',
    color: '#06b6d4',
    Icon: props => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/krishnagarg',
    href:  'https://github.com/krishnagarg',
    desc:  'Check out my code',
    color: '#e2e8f0',
    Icon: props => (
      <svg {...props} fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/krishnagarg',
    href:  'https://linkedin.com/in/krishnagarg',
    desc:  'Connect professionally',
    color: '#0a66c2',
    Icon: props => (
      <svg {...props} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setSt] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const formRef         = useRef(null)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setSt('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setSt('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSt('idle'), 4500)
    } catch {
      setSt('error')
      setTimeout(() => setSt('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: '#0c1220' }}>
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-3">/ 05 &nbsp;—&nbsp; contact</p>
          <h2 className="section-title">
            <RevealWords delay={0.1}>Get In Touch</RevealWords>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 mt-3 text-sm max-w-md mx-auto"
          >
            Open to freelance projects, full-time roles, and interesting collaborations.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* ── Left col (2/5) ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <p className="text-slate-400 leading-relaxed mb-8 text-sm">
              Whether you have a project in mind, want to collaborate, or just want to say hi —
              I&apos;ll get back to you as soon as possible.
            </p>

            {/* Social / contact cards */}
            <div className="space-y-3 mb-8">
              {socials.map(({ label, value, href, desc, color, Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                >
                  <MagneticButton strength={0.2}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 glass p-4 glass-hover group block"
                      style={{ border: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[10px] text-slate-600 mb-0.5">{label}</div>
                        <div className="text-slate-300 text-xs truncate group-hover:text-cyan-400 transition-colors">{value}</div>
                        <div className="text-slate-600 text-[10px]">{desc}</div>
                      </div>
                      <svg className="w-3.5 h-3.5 text-slate-700 group-hover:text-cyan-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </MagneticButton>
                </motion.div>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}
            >
              <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </div>
              <span className="font-mono text-xs text-green-400">Available for freelance & full-time</span>
            </motion.div>
          </motion.div>

          {/* ── Right col (3/5) — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div
              className="glass overflow-hidden"
              style={{ border: '1px solid rgba(6,182,212,0.1)' }}
            >
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)' }} />
              <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"   />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-slate-600 text-xs ml-2">message.send()</span>
              </div>

              <div className="p-7">
                {status === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-slate-200 mb-2">Failed to send</h3>
                    <p className="text-slate-500 text-sm">Something went wrong. Try emailing me directly.</p>
                  </motion.div>
                ) : status === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="font-bold text-xl text-slate-200 mb-2">Message sent!</h3>
                    <p className="text-slate-500 text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Name"    name="name"    value={form.name}    onChange={onChange} placeholder="John Doe"         required />
                      <Field label="Email"   name="email"   value={form.email}   onChange={onChange} placeholder="john@email.com"   required type="email" />
                    </div>
                    <Field     label="Subject" name="subject" value={form.subject} onChange={onChange} placeholder="Project inquiry…" required />
                    <Textarea  label="Message" name="message" value={form.message} onChange={onChange} placeholder="Tell me about your project…" required />

                    <MagneticButton strength={0.12} className="w-full">
                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl font-mono font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all"
                        style={{
                          background: status === 'sending'
                            ? 'rgba(6,182,212,0.25)'
                            : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                          boxShadow: '0 0 30px rgba(6,182,212,0.2)',
                        }}
                      >
                        {status === 'sending' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full"
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </MagneticButton>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Input helpers ────────────────────────────────────────────────────────────
const inputCls = `
  w-full px-4 py-3 rounded-xl font-mono text-sm text-slate-200 outline-none
  placeholder:text-slate-700 transition-all duration-200
`
const inputStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
}
const focusOn  = e => { e.target.style.borderColor = 'rgba(6,182,212,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.06)' }
const focusOff = e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.boxShadow = 'none' }

function Field({ label, name, value, onChange, placeholder, required, type = 'text' }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-1.5">
        {label}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className={inputCls} style={inputStyle}
        onFocus={focusOn} onBlur={focusOff}
      />
    </div>
  )
}

function Textarea({ label, name, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-1.5">
        {label}
      </label>
      <textarea
        name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        rows={5} className={`${inputCls} resize-none`} style={inputStyle}
        onFocus={focusOn} onBlur={focusOff}
      />
    </div>
  )
}
