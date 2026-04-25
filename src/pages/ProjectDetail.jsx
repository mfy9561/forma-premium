import { useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data/projects'
import FadeIn from '../components/FadeIn'
import Footer from '../components/Footer'

export default function ProjectDetail() {
  const { slug }     = useParams()
  const navigate     = useNavigate()
  const heroRef      = useRef(null)
  const [lb, setLb]  = useState(null)

  const project = PROJECTS.find(p => p.slug === slug)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start','end start'] })
  const heroY  = useTransform(scrollYProgress, [0,1],    ['0%','26%'])
  const heroOp = useTransform(scrollYProgress, [0,0.7],  [1,0])

  if (!project) return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:24 }}>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32 }}>Project not found</p>
      <Link to="/projects">← Back to Projects</Link>
    </div>
  )

  const idx  = PROJECTS.findIndex(p => p.slug === slug)
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} style={{ height:'94vh', position:'relative', overflow:'hidden' }}>
        <motion.img style={{ y:heroY, position:'absolute', inset:0, width:'100%', height:'115%', objectFit:'cover' }}
          src={project.hero} alt={project.title} />
        <div style={{ position:'absolute', inset:0, background:'rgba(13,11,9,.4)' }} />

        <motion.button
          initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }}
          onClick={() => navigate(-1)} data-cur
          style={{ position:'absolute', top:96, left:52, zIndex:10, display:'flex', alignItems:'center', gap:10, fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(245,240,232,.8)', background:'none', border:'none' }}
        >
          ← Back
        </motion.button>

        <motion.div style={{ opacity:heroOp, position:'absolute', bottom:56, left:52, zIndex:10 }}
          initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.9 }}>
          <p style={{ fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#b8976a', marginBottom:14 }}>{project.category}</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(38px,6vw,84px)', fontWeight:300, color:'#f5f0e8', lineHeight:0.92 }}>
            {project.title}
          </h1>
        </motion.div>
      </section>

      {/* Meta bar */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid #ede8dd' }}>
        {[['Location',project.location],['Year',project.year],['Area',project.area],['Client',project.client]].map(([l,v],i) => (
          <FadeIn key={l} delay={i*0.08}>
            <div style={{ padding:'36px 40px', borderRight: i<3 ? '1px solid #ede8dd' : 'none' }}>
              <p style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:10 }}>{l}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:300 }}>{v}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Body */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.8fr', gap:80, padding:'80px 52px' }}>
        <FadeIn style={{ position:'sticky', top:120, alignSelf:'start' }}>
          <p style={{ fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:24 }}>Project Brief</p>
          {project.desc.map((para,i) => (
            <p key={i} style={{ fontSize:14, fontWeight:300, lineHeight:1.95, color:'#5c5248', marginBottom: i < project.desc.length-1 ? 22 : 0 }}>
              {para}
            </p>
          ))}
        </FadeIn>

        {/* Gallery */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3 }}>
          {project.gallery.map((img,i) => (
            <FadeIn key={img} delay={i*0.1} style={{ gridColumn: i===0 ? '1/-1' : 'auto' }}>
              <div onClick={() => setLb(img)} data-cur style={{ overflow:'hidden', cursor:'zoom-in' }}>
                <motion.img src={img} alt="" style={{ width:'100%', height: i===0 ? 500 : 280, objectFit:'cover', display:'block' }}
                  whileHover={{ scale:1.04 }} transition={{ duration:0.7 }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Next project */}
      <Link to={`/projects/${next.slug}`} data-cur
        style={{ display:'block', position:'relative', overflow:'hidden', height:360 }}>
        <motion.img src={next.thumb} alt={next.title}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(.42)' }}
          whileHover={{ scale:1.04 }} transition={{ duration:0.8 }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
          <p style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(245,240,232,.4)', marginBottom:14 }}>Next Project</p>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,3.5vw,52px)', fontWeight:300, color:'#f5f0e8' }}>{next.title}</h3>
          <p style={{ fontSize:12, color:'rgba(245,240,232,.5)', marginTop:8 }}>{next.location} · {next.year}</p>
        </div>
      </Link>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLb(null)}
            style={{ position:'fixed', inset:0, background:'rgba(13,11,9,.94)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:40 }}>
            <img src={lb} alt="" style={{ maxWidth:'90vw', maxHeight:'88vh', objectFit:'contain' }} />
            <button onClick={() => setLb(null)} data-cur
              style={{ position:'fixed', top:32, right:40, color:'rgba(245,240,232,.6)', fontSize:22, background:'none', border:'1px solid rgba(255,255,255,.2)', width:44, height:44, borderRadius:'50%' }}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
