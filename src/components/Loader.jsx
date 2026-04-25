import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [show, setShow] = useState(true)
  const [pct,  setPct]  = useState(0)

  useEffect(() => {
    let n = 0
    const iv = setInterval(() => {
      n += Math.random() * 5 + 2
      if (n >= 100) {
        n = 100; clearInterval(iv)
        setTimeout(() => setShow(false), 500)
      }
      setPct(Math.floor(n))
    }, 38)
    return () => clearInterval(iv)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#0d0b09',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 0,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px,5vw,44px)',
              fontWeight: 300, letterSpacing: '0.25em',
              color: '#f5f0e8', marginBottom: 16,
            }}
          >
            FORMA
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, fontStyle: 'italic',
              color: 'rgba(245,240,232,0.28)',
              letterSpacing: '0.08em', marginBottom: 40,
            }}
          >
            Architecture · Interiority · Material
          </motion.p>

          <div style={{ width: 200, height: 1, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: pct + '%' }}
              style={{ height: '100%', background: '#b8976a' }}
            />
          </div>

          <p style={{
            marginTop: 14, fontSize: 11, fontWeight: 300,
            color: 'rgba(140,130,120,0.7)', letterSpacing: '0.2em',
          }}>
            {pct}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
