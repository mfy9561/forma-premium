import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

// Lightweight FadeIn — no spring physics, simple tween
export default function FadeIn({ children, delay = 0, y = 24, style = {}, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
