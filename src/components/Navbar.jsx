import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'Home',     to: '/' },
  { label: 'Studio',   to: '/studio' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const [open,  setOpen]  = useState(false)
  const [time,  setTime]  = useState('')
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'Europe/Rome',
      }) + ' MET')
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])

  const active = location.pathname

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          padding: '26px 52px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(to bottom,rgba(13,11,9,.58),transparent)',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 20, fontWeight: 400,
          color: '#f5f0e8', letterSpacing: '0.15em',
        }} data-cur>FORMA</Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none',
          '@media(maxWidth:768px)': { display: 'none' }
        }} className="nav-desktop">
          {NAV.map(l => (
            <li key={l.to}>
              <Link to={l.to} data-cur style={{
                fontSize: 10, fontWeight: 400,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: active === l.to ? '#f5f0e8' : 'rgba(245,240,232,0.6)',
                transition: 'color .2s',
              }}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Clock */}
        <span style={{
          fontSize: 10, color: 'rgba(245,240,232,0.3)',
          letterSpacing: '0.1em', minWidth: 110, textAlign: 'right',
        }} className="nav-clock">{time}</span>

        {/* Hamburger */}
        <button
          className="nav-ham"
          onClick={() => setOpen(v => !v)}
          style={{ display: 'none', flexDirection: 'column', gap: 5,
            background: 'none', border: 'none', padding: 4 }}
          data-cur
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              width: 22, height: 1, background: '#f5f0e8', display: 'block',
              transition: 'transform .3s, opacity .2s',
              transform: open
                ? i===0 ? 'rotate(45deg) translateY(6px)'
                : i===2 ? 'rotate(-45deg) translateY(-6px)' : 'none'
                : 'none',
              opacity: open && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 490,
              background: '#0d0b09',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 40,
            }}
          >
            {NAV.map((l, i) => (
              <motion.div key={l.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={l.to} data-cur style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 42, fontWeight: 300,
                  color: '#f5f0e8', letterSpacing: '0.05em',
                }}>{l.label}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .nav-desktop{display:none!important}
          .nav-ham{display:flex!important}
          .nav-clock{display:none}
        }
      `}</style>
    </>
  )
}
