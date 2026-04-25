import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PROJECTS, CATEGORIES } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import FadeIn from '../components/FadeIn'
import Footer from '../components/Footer'

export default function Projects() {
  const [active,   setActive]   = useState('All')
  const [filtered, setFiltered] = useState(PROJECTS)

  useEffect(() => {
    setFiltered(active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active))
  }, [active])

  return (
    <>
      <div style={{ height:80, background:'var(--cream)' }} />
      <section style={{ padding:'80px 52px 0' }}>
        <FadeIn>
          <p style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:16 }}>Portfolio</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(48px,6vw,80px)', fontWeight:300, lineHeight:0.95 }}>
            All<br/><em style={{ fontStyle:'italic', color:'#8c8278' }}>Projects</em>
          </h1>
        </FadeIn>
      </section>

      {/* Filters */}
      <div style={{ padding:'44px 52px 36px', display:'flex', gap:4, flexWrap:'wrap', alignItems:'center' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActive(cat)} data-cur
            style={{
              fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase',
              padding:'9px 26px', border:'1px solid',
              borderColor: active===cat ? '#0d0b09' : '#d6cfc2',
              background:  active===cat ? '#0d0b09' : 'none',
              color:       active===cat ? '#f5f0e8' : '#8c8278',
              transition:'all .25s',
            }}>
            {cat}
          </button>
        ))}
        <p style={{ fontSize:11, color:'#b8b0a2', marginLeft:'auto' }}>
          {filtered.length} project{filtered.length!==1?'s':''}
        </p>
      </div>

      {/* Masonry */}
      <div style={{ padding:'0 52px 100px', columns:3, gap:3, columnFill:'balance' }}>
        <AnimatePresence mode="wait">
          {filtered.map((p,i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </AnimatePresence>
      </div>

      <Footer />
    </>
  )
}
