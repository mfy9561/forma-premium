import { motion } from 'framer-motion'
import { AWARDS } from '../data/projects'
import FadeIn from '../components/FadeIn'
import Footer from '../components/Footer'

export default function Studio() {
  return (
    <>
      <div style={{ height:80, background:'var(--cream)' }} />

      {/* Intro */}
      <section style={{ padding:'80px 52px 0', display:'grid', gridTemplateColumns:'1fr 2fr', gap:80, alignItems:'start' }}>
        <FadeIn>
          <p style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:16 }}>About the Studio</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(40px,5vw,72px)', fontWeight:300, lineHeight:1 }}>
            FORMA<br/><em style={{ fontStyle:'italic', color:'#8c8278' }}>Studio</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.15} style={{ paddingTop:8 }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontStyle:'italic', lineHeight:1.9, color:'#5c5248', marginBottom:24, fontWeight:300 }}>
            Founded in Milan in 2009, FORMA is an international architecture and design studio working across five continents.
          </p>
          <p style={{ fontSize:14, fontWeight:300, lineHeight:1.95, color:'#8c8278' }}>
            We work at the intersection of architecture, landscape, and interior design — treating each commission not as a problem to solve but as a question to inhabit. Our projects are distinguished by their material intelligence, their sensitivity to light, and their conviction that truly excellent architecture should outlast fashion and trend.
          </p>
        </FadeIn>
      </section>

      {/* Full-width image */}
      <FadeIn style={{ margin:'80px 0', overflow:'hidden' }}>
        <motion.img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=85" alt="FORMA Studio"
          style={{ width:'100%', height:'68vh', objectFit:'cover', display:'block' }}
          whileHover={{ scale:1.02 }} transition={{ duration:1.2 }} />
      </FadeIn>

      {/* Team */}
      <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3, padding:'0 52px 80px' }}>
        {[
          { name:'Marco Elsinore', role:'Founding Principal · RIBA · AIA',
            img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85',
            bio:'Marco founded FORMA in 2009 after a decade at Herzog & de Meuron in Basel. A graduate of the Architectural Association in London and ETH Zürich, he brings a rigorous European sensibility to every commission. He lectures internationally and serves on the Pritzker Architecture Prize jury.' },
          { name:'Yuna Takahashi', role:'Design Director & Partner',
            img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=85',
            bio:'Yuna joined FORMA in 2015 after leading material research at OMA Rotterdam. Her background in material science infuses every project with a sensory intelligence rare in contemporary practice. Masters from University of Tokyo; Research Fellowship, MIT Media Lab.' },
        ].map((m,i) => (
          <FadeIn key={m.name} delay={i*0.15} style={{ background:'#ede8dd' }}>
            <div style={{ overflow:'hidden' }}>
              <motion.img src={m.img} alt={m.name}
                style={{ width:'100%', height:460, objectFit:'cover', objectPosition:'top', display:'block' }}
                whileHover={{ scale:1.04 }} transition={{ duration:0.9 }} />
            </div>
            <div style={{ padding:'32px 32px 40px' }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:400, marginBottom:4 }}>{m.name}</p>
              <p style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:20 }}>{m.role}</p>
              <p style={{ fontSize:13, fontWeight:300, lineHeight:1.9, color:'#8c8278' }}>{m.bio}</p>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Philosophy */}
      <section style={{ background:'#1a1714', padding:'120px 52px', textAlign:'center' }}>
        <FadeIn>
          <p style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#5c5248', marginBottom:48 }}>Our Philosophy</p>
          <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3.5vw,42px)', fontWeight:300, fontStyle:'italic', color:'#ede8dd', lineHeight:1.5, maxWidth:780, margin:'0 auto 36px' }}>
            "We resist the spectacular in favour of the genuine. A building that requires no explanation — that seems, when finished, to have always been there — is the highest aspiration of our practice."
          </blockquote>
          <p style={{ fontSize:10, letterSpacing:'0.2em', color:'#5c5248', textTransform:'uppercase' }}>— FORMA Design Manifesto, 2009</p>
        </FadeIn>
      </section>

      {/* Pillars */}
      <section style={{ padding:'100px 52px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:48, background:'#ede8dd' }}>
        {[
          { n:'01', t:'Material Intelligence',   b:'Every project begins with material. Before pencil touches paper, we touch the site — its stone, soil, and light. Architecture that does not know where it comes from cannot know where it belongs.' },
          { n:'02', t:'Contextual Sensitivity',  b:'We do not import solutions. Each building grows from its geography, climate, and cultural inheritance. Originality is a form of careful listening rather than spectacular deviation.' },
          { n:'03', t:'Enduring Restraint',      b:'We resist the spectacular in favour of the genuine. A building that requires no explanation — that seems to have always been there — is our highest aspiration.' },
        ].map((p,i) => (
          <FadeIn key={p.t} delay={i*0.12}>
            <p style={{ fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'#b8976a', marginBottom:20 }}>{p.n}</p>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:400, marginBottom:16 }}>{p.t}</h3>
            <p style={{ fontSize:13, fontWeight:300, lineHeight:1.9, color:'#8c8278' }}>{p.b}</p>
          </FadeIn>
        ))}
      </section>

      {/* Awards */}
      <section style={{ padding:'80px 52px 0' }}>
        <FadeIn>
          <p style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:16 }}>Recognition</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,4vw,56px)', fontWeight:300, lineHeight:1.05, marginBottom:60 }}>
            Awards &<br/><em style={{ fontStyle:'italic', color:'#8c8278' }}>Honours</em>
          </h2>
        </FadeIn>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'#d6cfc2' }}>
          {AWARDS.map((a,i) => (
            <FadeIn key={a.title} delay={i*0.07} style={{ background:'#f5f0e8', padding:'36px 28px' }}>
              <p style={{ fontSize:10, letterSpacing:'0.2em', color:'#b8b0a2', marginBottom:12 }}>{a.year}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:400, marginBottom:8 }}>{a.title}</p>
              <p style={{ fontSize:12, color:'#8c8278' }}>{a.org}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
