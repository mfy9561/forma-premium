import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div style={{ height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0d0b09', gap:24, textAlign:'center', padding:40 }}>
      <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#5c5248' }}>
        404 — Page Not Found
      </motion.p>
      <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
        style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(48px,8vw,96px)', fontWeight:300, color:'#f5f0e8', lineHeight:0.95 }}>
        Lost in<br/><em style={{ fontStyle:'italic', color:'#b8976a' }}>Space</em>
      </motion.h1>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}>
        <Link to="/" data-cur style={{ fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'#f5f0e8', display:'inline-flex', alignItems:'center', gap:14, marginTop:16 }}>
          ← Return Home
        </Link>
      </motion.div>
    </div>
  )
}
