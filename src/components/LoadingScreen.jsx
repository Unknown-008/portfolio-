import { motion } from 'framer-motion'

const codeLines = [
  'import React from "react"',
  'import { Portfolio } from "./Krishna"',
  'const skills = ["React", ".NET", "Firebase"]',
  'const experience = "2+ years"',
  'initializing portfolio...',
  'loading assets...',
  'building 3D scene...',
  'ready to launch',
]

export default function LoadingScreen({ progress }) {
  const lineIndex = Math.floor((progress / 100) * codeLines.length)

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#020817' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Animated orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', boxShadow: '0 0 20px rgba(6,182,212,0.4)' }}>
              <span className="font-mono font-bold text-white text-lg">K</span>
            </div>
            <span className="font-mono text-slate-300 text-lg">Krishna Garg</span>
          </div>
          <p className="text-slate-500 font-mono text-xs">// initializing portfolio</p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 mb-8 font-mono text-xs"
          style={{ border: '1px solid rgba(6,182,212,0.2)' }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-slate-500 text-[10px]">bash — portfolio/src</span>
          </div>

          {/* Code lines */}
          <div className="space-y-1.5 min-h-[120px]">
            {codeLines.slice(0, lineIndex + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <span className="text-slate-600 select-none">{String(i + 1).padStart(2, '0')}</span>
                <span className={i < 4 ? 'text-cyan-400' : 'text-green-400'}>
                  {i < 4 ? '' : '> '}{line}
                </span>
                {i === lineIndex && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-cyan-400"
                  >█</motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-slate-500 font-mono text-xs mb-2">
            <span>Loading assets</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                boxShadow: '0 0 10px rgba(6,182,212,0.5)',
              }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Status dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
