import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Animates text word-by-word, clipping from below (theatre curtain style).
 */
export function RevealWords({ children, className = '', delay = 0, stagger = 0.07, once = true }) {
  const words = String(children).split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once }}
            transition={{ duration: 0.75, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/**
 * Animates text character-by-character.
 */
export function RevealChars({ children, className = '', delay = 0, stagger = 0.025, once = true }) {
  const chars = String(children).split('')
  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {chars.map((char, i) =>
        char === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '105%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once }}
              transition={{ duration: 0.5, delay: delay + i * stagger, ease: EASE }}
            >
              {char}
            </motion.span>
          </span>
        )
      )}
    </span>
  )
}

/**
 * Fades in lines of text with stagger (good for descriptions).
 */
export function RevealLines({ lines = [], className = '', delay = 0, stagger = 0.12, once = true }) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
