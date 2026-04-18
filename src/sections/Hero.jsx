import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// ─── Mouse Camera Controller ─────────────────────────────────────────────────
function MouseCamera() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = e => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useEffect(() => {
    camera.position.set(0, 1.5, 9)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.03
    camera.position.y += (mouse.current.y * 0.7 + 1.5 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Central Artifact ────────────────────────────────────────────────────────
function CentralArtifact() {
  const coreRef  = useRef()
  const cage1Ref = useRef()
  const cage2Ref = useRef()
  const cage3Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (coreRef.current)  { coreRef.current.rotation.y  = t * 0.12; coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 }
    if (cage1Ref.current) { cage1Ref.current.rotation.y = t * 0.18; cage1Ref.current.rotation.z = t * 0.08 }
    if (cage2Ref.current) { cage2Ref.current.rotation.x = t * 0.14; cage2Ref.current.rotation.y = -t * 0.1 }
    if (cage3Ref.current) { cage3Ref.current.rotation.y = -t * 0.22; cage3Ref.current.rotation.x = t * 0.06 }
  })

  return (
    <group position={[1.5, 0, 0]}>
      {/* Outer octahedron cage */}
      <mesh ref={cage3Ref}>
        <octahedronGeometry args={[2.6, 0]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.1} toneMapped={false} />
      </mesh>

      {/* Mid icosahedron cage */}
      <mesh ref={cage2Ref}>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.18} toneMapped={false} />
      </mesh>

      {/* Inner icosahedron cage */}
      <mesh ref={cage1Ref}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} toneMapped={false} />
      </mesh>

      {/* Glowing core */}
      <Sphere ref={coreRef} args={[0.85, 16, 16]}>
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0e7490"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.9}
          toneMapped={false}
        />
      </Sphere>

      {/* Soft glow halos */}
      <Sphere args={[1.05, 16, 16]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.2, 16, 16]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.015} side={THREE.BackSide} />
      </Sphere>

      <pointLight color="#06b6d4" intensity={8} distance={12} />
      <pointLight color="#8b5cf6" intensity={3} distance={8} position={[2, 2, 0]} />
    </group>
  )
}

// ─── Orbit Ring (particle-based) ─────────────────────────────────────────────
function OrbitRing({ radius, speed, count = 60, color, rotation }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      arr[i * 3]     = Math.cos(a) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.08
      arr[i * 3 + 2] = Math.sin(a) * radius
    }
    return arr
  }, [radius, count])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed
  })

  return (
    <group position={[1.5, 0, 0]} rotation={rotation}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.028} color={color} transparent opacity={0.75} sizeAttenuation toneMapped={false} />
      </points>
    </group>
  )
}

// ─── Floating Tech Orb ───────────────────────────────────────────────────────
function TechOrb({ offset, speed, orbitR, color, yBias = 0 }) {
  const groupRef = useRef()
  const meshRef  = useRef()
  const t = useRef(offset)

  useFrame((_, delta) => {
    t.current += delta * speed
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t.current) * orbitR + 1.5
      groupRef.current.position.z = Math.cos(t.current) * orbitR
      groupRef.current.position.y = Math.sin(t.current * 0.6) * 1.2 + yBias
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6
      meshRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.19, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe toneMapped={false} />
      </mesh>
      <Sphere args={[0.26, 6, 6]}>
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </Sphere>
    </group>
  )
}

// ─── Ambient Particle Cloud ───────────────────────────────────────────────────
function ParticleCloud() {
  const ref = useRef()
  const count = 700

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const cCyan   = new THREE.Color('#06b6d4')
    const cPurple = new THREE.Color('#8b5cf6')

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 6 + Math.random() * 8
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = Math.random() > 0.55 ? cCyan : cPurple
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.008
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.004) * 0.08
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

// ─── 3D Scene ────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <fog attach="fog" args={['#0a0f1e', 18, 38]} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 8, 5]}   color="#22d3ee" intensity={0.4} />
      <directionalLight position={[-5, -4, -5]} color="#a855f7" intensity={0.3} />

      <Stars radius={70} depth={40} count={500} factor={3.5} saturation={0} fade speed={0.4} />
      <ParticleCloud />

      {/* Grid floor */}
      <gridHelper args={[40, 40, '#06b6d4', '#1e293b']} position={[0, -3.2, 0]} />

      <CentralArtifact />

      {/* Three orbit rings at different tilts */}
      <OrbitRing radius={3.2} speed={0.28}  color="#06b6d4" rotation={[0.4, 0, 0]}           />
      <OrbitRing radius={4.0} speed={-0.18} color="#8b5cf6" rotation={[-0.5, 0.3, 0.2]}      />
      <OrbitRing radius={2.5} speed={0.38}  color="#22d3ee" rotation={[Math.PI / 2.5, 0.1, 0]} />

      {/* Floating tech orbs */}
      <TechOrb offset={0}           speed={0.35} orbitR={3.8} color="#61dafb" yBias={0.5}  />
      <TechOrb offset={Math.PI / 3} speed={0.5}  orbitR={3.0} color="#f7df1e" yBias={-0.5} />
      <TechOrb offset={Math.PI}     speed={0.28} orbitR={4.5} color="#a855f7" yBias={1.0}  />

      <MouseCamera />

      <EffectComposer disableNormalPass>
        <Bloom intensity={0.7} luminanceThreshold={0.55} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  )
}

// ─── Typing Role Animation ────────────────────────────────────────────────────
const ROLES = ['Software Developer', 'React Native Dev', '.NET Engineer', 'Full Stack Builder']

function TypedRole() {
  const [idx, setIdx]             = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const current = ROLES[idx]
    let t
    if (!deleting && displayed.length < current.length)      { t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75) }
    else if (!deleting && displayed.length === current.length) { t = setTimeout(() => setDeleting(true), 2200) }
    else if (deleting && displayed.length > 0)               { t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38) }
    else { setDeleting(false); setIdx(i => (i + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, idx])

  return (
    <span className="text-slate-200">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity }}
        className="text-cyan-400 ml-0.5"
      >|</motion.span>
    </span>
  )
}

// ─── Word reveal ──────────────────────────────────────────────────────────────
function RevealWords({ text, className, delay = 0, stagger = 0.1 }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.22em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef(null)
  const [frameloop, setFrameloop] = useState('always')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'demand'),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          frameloop={frameloop}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          camera={{ fov: 58, near: 0.1, far: 120 }}
          dpr={1}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Left gradient mask for text legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 85% at 18% 50%, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.55) 55%, transparent 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }}
      />

      {/* Scanline */}
      <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
        <div className="scanline" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-32">
        <div className="max-w-2xl">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full font-mono text-xs"
            style={{
              background: 'rgba(6,182,212,0.07)',
              border: '1px solid rgba(6,182,212,0.2)',
              boxShadow: '0 0 30px rgba(6,182,212,0.08)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-cyan-400">Available for opportunities</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-mono text-cyan-600 text-sm mb-4 tracking-widest uppercase"
          >
            &gt; Hello, World! — I&apos;m
          </motion.p>

          {/* Name with shimmer + word reveal */}
          <div
            className="font-black leading-[0.95] mb-5"
            style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}
          >
            <RevealWords text="Krishna" delay={0.3} stagger={0.12} className="shimmer-text block" />
            <RevealWords text="Garg" delay={0.55} stagger={0.12} className="shimmer-text block" />
          </div>

          {/* Typed role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-mono text-xl md:text-2xl mb-7 flex items-center gap-1"
            style={{ color: '#334155' }}
          >
            <span className="text-slate-700">&lt;</span>
            <TypedRole />
            <span className="text-slate-700 ml-1">/&gt;</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10"
          >
            Building scalable applications and solving real-world problems with code.
            2+ years crafting mobile apps, backend APIs, and enterprise software.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap gap-2"
          >
            {['React Native', 'React.js', '.NET Core', 'C#', 'Firebase', 'SQL', 'Git'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="px-3 py-1.5 rounded-lg font-mono text-xs text-slate-600"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-slate-700 text-[10px] tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-slate-800 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-600" />
        </motion.div>
      </motion.div>

      {/* Side decorative links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute left-6 bottom-1/3 z-10 hidden lg:flex flex-col items-center gap-5"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-slate-800" />
        {[
          { label: 'GH', href: 'https://github.com/krishnagarg' },
          { label: 'LI', href: 'https://linkedin.com/in/krishnagarg' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[10px] text-slate-700 hover:text-cyan-500 transition-colors tracking-widest">
            {label}
          </a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-slate-800 to-transparent" />
      </motion.div>
    </section>
  )
}
