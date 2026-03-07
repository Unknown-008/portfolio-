/**
 * Infinite horizontal marquee using pure CSS animation.
 * Renders items twice so the loop is seamless.
 *
 * @param {string[]} items    - Text or JSX items to scroll
 * @param {boolean}  reverse  - Scroll right-to-left (default) or left-to-right
 * @param {number}   speed    - Animation duration in seconds (lower = faster)
 * @param {string}   gap      - Gap between items (Tailwind class or CSS value)
 */
export default function MarqueeText({ items = [], reverse = false, speed = 28, className = '' }) {
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div
        className={reverse ? 'marquee-track-right' : 'marquee-track-left'}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-4">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
