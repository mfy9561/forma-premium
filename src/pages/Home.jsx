import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PROJECTS, STATS } from '../data/projects'
import FadeIn from '../components/FadeIn'
import Footer from '../components/Footer'
import Building3D from '../components/Building3D'

const EY = { fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:16 }
const TI = { fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(38px,4.5vw,60px)', fontWeight:300, lineHeight:1.02 }

/* ── Hero ── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const imgY  = useTransform(scrollYProgress, [0,1], ['0%','25%'])
  const fadeO = useTransform(scrollYProgress, [0,0.6], [1,0])

  return (
    <section ref={ref} style={{ height:'100vh', position:'relative', overflow:'hidden', background:'#0d0b09' }}>
      <motion.img
        style={{ y:imgY, position:'absolute', inset:0, width:'100%', height:'115%', objectFit:'cover', opacity:0.6, willChange:'transform' }}
        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80"
        alt="FORMA"
        loading="eager"
      />
      <div style={{ position:'absolute', inset:0, zIndex:1, opacity:0.03,
        backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundSize:'200px' }} />

      <motion.div style={{ opacity:fadeO, position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 52px 72px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2, duration:0.7, ease:'easeOut' }}
          style={{ display:'flex', alignItems:'center', gap:20, marginBottom:24 }}>
          <span style={{ width:36, height:1, background:'#b8976a', display:'block' }} />
          <span style={{ fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'#b8976a' }}>Milan · 45°27′N 9°11′E</span>
        </motion.div>

        <motion.h1
          initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:1.4, duration:0.9, ease:'easeOut' }}
          style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(54px,8.5vw,108px)', fontWeight:300, color:'#f5f0e8', lineHeight:0.92, marginBottom:36 }}
        >
          Where Stone<br/>Learns to<br/><em style={{ fontStyle:'italic', color:'#d4aa7d' }}>Breathe</em>
        </motion.h1>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.7, duration:0.7, ease:'easeOut' }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:24 }}>
          <p style={{ fontSize:13, fontWeight:300, color:'rgba(245,240,232,.6)', maxWidth:310, lineHeight:1.9 }}>
            We craft environments where architecture becomes a lived experience — form, light, and material converging into the extraordinary.
          </p>
          <Link to="/projects" data-cur className="hero-cta-link"
            style={{ display:'inline-flex', alignItems:'center', gap:14, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#f5f0e8' }}>
            Explore Work
            <span style={{ position:'relative', display:'flex', alignItems:'center' }}>
              <span style={{ width:44, height:1, background:'#b8976a', display:'block', transition:'width .35s ease' }} className="cta-arrow-line" />
              <span style={{ position:'absolute', right:-1, top:-3, width:6, height:6, borderRight:'1px solid #b8976a', borderTop:'1px solid #b8976a', transform:'rotate(45deg)' }} />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <div style={{ position:'absolute', right:52, bottom:72, zIndex:3, writingMode:'vertical-rl', fontSize:10, letterSpacing:'0.2em', color:'rgba(245,240,232,.25)', textTransform:'uppercase', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <span style={{ width:1, height:52, background:'rgba(245,240,232,.12)', display:'block' }} />
        Scroll
      </div>

      <style>{`
        .hero-cta-link:hover .cta-arrow-line { width: 68px; }
      `}</style>
    </section>
  )
}

/* ── Marquee — CSS animation only ── */
function Marquee() {
  const words = ['Architecture','Interiority','Material','Light','Threshold','Nature','Craft','Permanence','Silence','Form']
  const all   = [...words, ...words]
  return (
    <div style={{ background:'#1a1714', padding:'18px 0', overflow:'hidden', borderTop:'1px solid rgba(255,255,255,.04)', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
      <div style={{ display:'flex', width:'max-content', animation:'marqueeScroll 30s linear infinite' }}>
        {all.map((w,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:28, padding:'0 28px', whiteSpace:'nowrap' }}>
            <span style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,240,232,.3)' }}>{w}</span>
            <span style={{ width:3, height:3, borderRadius:'50%', background:'#b8976a', opacity:0.55, flexShrink:0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Stats ── */
function Stats() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', background:'#ede8dd' }}>
      {STATS.map((s,i) => (
        <FadeIn key={s.label} delay={i*0.08}>
          <div style={{ padding:'48px 36px', borderRight: i<3 ? '1px solid #d6cfc2' : 'none', textAlign:'center' }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:50, fontWeight:300, color:'#b8976a', lineHeight:1, display:'block' }}>{s.n}</span>
            <span style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'#8c8278', marginTop:8, display:'block' }}>{s.label}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

/* ── Featured — CSS hover instead of Framer Motion ── */
function FeatCard({ p, tall }) {
  return (
    <Link to={`/projects/${p.slug}`} data-cur className="feat-link"
      style={{ display:'block', position:'relative', overflow:'hidden', background:'#ede8dd', height: tall ? '100%' : 300, minHeight: tall ? 580 : 'auto' }}>
      <img src={p.thumb} alt={p.title} loading="lazy" decoding="async"
        className="feat-img"
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.8s ease' }} />
      <div className="feat-ov" style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top,rgba(13,11,9,.7),rgba(13,11,9,.2) 55%,transparent)',
        padding:28, display:'flex', flexDirection:'column', justifyContent:'flex-end',
        opacity:0, transition:'opacity .35s ease',
      }}>
        <p style={{ fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#b8976a', marginBottom:6 }}>{p.category}</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:300, color:'#f5f0e8', marginBottom:4 }}>{p.title}</p>
        <p style={{ fontSize:11, color:'rgba(245,240,232,.65)' }}>{p.location} · {p.year}</p>
      </div>
    </Link>
  )
}

function Featured() {
  const feat = PROJECTS.filter(p => p.featured)
  return (
    <section>
      <div style={{ padding:'100px 52px 56px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <FadeIn><p style={EY}>Selected Works</p><h2 style={TI}>Featured<br/><em style={{ fontStyle:'italic', color:'#8c8278' }}>Projects</em></h2></FadeIn>
        <FadeIn delay={0.15}>
          <Link to="/projects" data-cur style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:12, color:'#0d0b09' }}>
            <span style={{ width:26, height:1, background:'#0d0b09', display:'block' }} /> View All
          </Link>
        </FadeIn>
      </div>
      <div style={{ padding:'0 52px 100px', display:'grid', gridTemplateColumns:'7fr 5fr', gridTemplateRows:'auto auto', gap:3 }}>
        <FadeIn style={{ gridRow:'1/3' }}><FeatCard p={feat[0]} tall /></FadeIn>
        <FadeIn delay={0.12}><FeatCard p={feat[1]} /></FadeIn>
        <FadeIn delay={0.2}><FeatCard p={feat[2]} /></FadeIn>
      </div>
      <style>{`
        .feat-link:hover .feat-img { transform: scale(1.055); }
        .feat-link:hover .feat-ov  { opacity: 1 !important; }
      `}</style>
    </section>
  )
}

/* ── Horizontal Scroll — CSS animation, pause on hover ── */
function HScroll() {
  const all = [...PROJECTS, ...PROJECTS]
  return (
    <section style={{ paddingBottom:100, overflow:'hidden' }}>
      <div style={{ padding:'80px 52px 48px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <FadeIn><p style={EY}>Recent Work</p><h2 style={TI}>All<br/><em style={{ fontStyle:'italic', color:'#8c8278' }}>Commissions</em></h2></FadeIn>
      </div>
      <div className="hscroll-outer" style={{ overflow:'hidden' }}>
        <div className="hscroll-inner"
          style={{ display:'flex', gap:3, paddingLeft:52, width:'max-content', animation:'hScroll 38s linear infinite' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState='paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState='running')}
        >
          {all.map((p,i) => (
            <Link key={i} to={`/projects/${p.slug}`} data-cur className="hs-card"
              style={{ width:300, height:410, flexShrink:0, position:'relative', overflow:'hidden', display:'block', background:'#ede8dd' }}>
              <img src={p.thumb} alt={p.title} loading="lazy" decoding="async" className="hs-img"
                style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.65s ease' }} />
              <div className="hs-ov" style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 18px',
                background:'linear-gradient(to top,rgba(13,11,9,.65),transparent)',
                opacity:0, transition:'opacity .3s ease' }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:'#f5f0e8', fontWeight:300 }}>{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .hs-card:hover .hs-img { transform: scale(1.05); }
        .hs-card:hover .hs-ov  { opacity: 1 !important; }
      `}</style>
    </section>
  )
}

/* ── Quote ── */
function Quote() {
  return (
    <FadeIn>
      <div style={{ background:'#5c5248', padding:'110px 52px', textAlign:'center' }}>
        <div style={{ width:1, height:52, background:'#b8976a', opacity:0.4, margin:'0 auto 36px' }} />
        <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3vw,38px)', fontWeight:300, fontStyle:'italic', color:'#f5f0e8', lineHeight:1.55, maxWidth:680, margin:'0 auto 24px' }}>
          "We do not design buildings. We design the quality of light that enters them — the silence between their walls."
        </blockquote>
        <p style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,240,232,.35)' }}>
          — Marco Elsinore, Principal Architect
        </p>
      </div>
    </FadeIn>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Featured />
      <Building3D />
      <HScroll />
      <Quote />
      <Footer />
    </>
  )
}
