import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Footer from '../components/Footer'

const INP = { width:'100%', background:'none', border:'none', borderBottom:'1px solid #d6cfc2', padding:'10px 0', fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:300, color:'#0d0b09', outline:'none', transition:'border-color .2s', cursor:'none' }
const LBL = { display:'block', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#b8b0a2', marginBottom:10 }
const fo  = e => (e.target.style.borderBottomColor='#0d0b09')
const bl  = e => (e.target.style.borderBottomColor='#d6cfc2')

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <div style={{ height:80, background:'#0d0b09' }} />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'calc(100vh - 80px)' }}>

        {/* Left — dark */}
        <div style={{ background:'#0d0b09', padding:'80px 56px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <FadeIn>
            <p style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#5c5248', marginBottom:24 }}>Get In Touch</p>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:300, color:'#f5f0e8', lineHeight:1.1, marginBottom:56 }}>
              Let's Build<br/>Something<br/><em style={{ fontStyle:'italic', color:'#b8976a' }}>Extraordinary</em>
            </h1>
          </FadeIn>
          <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
            {[
              { l:'Studio Address', v:'14 Via Bergognone\nMilan, Italy 20144' },
              { l:'Email',          v:'studio@forma-arch.com' },
              { l:'Phone',          v:'+39 02 4851 7630' },
              { l:'New Commissions',v:'commissions@forma-arch.com' },
            ].map((item,i) => (
              <FadeIn key={item.l} delay={0.15+i*0.08}>
                <p style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#5c5248', marginBottom:6 }}>{item.l}</p>
                <p style={{ fontSize:14, fontWeight:300, color:'rgba(245,240,232,.65)', lineHeight:1.7, whiteSpace:'pre-line' }}>{item.v}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.55} style={{ marginTop:52, display:'flex', gap:28 }}>
            {['Instagram','LinkedIn','Dezeen'].map(s => (
              <a key={s} href="#" data-cur style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#5c5248', transition:'color .2s' }}
                onMouseEnter={e=>(e.target.style.color='#b8976a')}
                onMouseLeave={e=>(e.target.style.color='#5c5248')}>{s}</a>
            ))}
          </FadeIn>
        </div>

        {/* Right — form */}
        <div style={{ background:'#f5f0e8', padding:'80px 56px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          {sent ? (
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center' }}>
              <p style={{ fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#b8976a', marginBottom:24 }}>Thank You</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:300, marginBottom:20 }}>We've received<br/>your enquiry.</h2>
              <p style={{ fontSize:14, fontWeight:300, color:'#8c8278', lineHeight:1.9, maxWidth:340, margin:'0 auto' }}>
                A member of our team will be in touch within two working days to discuss your project.
              </p>
            </motion.div>
          ) : (
            <>
              <FadeIn><p style={{ ...LBL, marginBottom:40, letterSpacing:'0.25em' }}>New Commission Enquiry</p></FadeIn>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28, marginBottom:28 }}>
                <FadeIn delay={0.1}><label style={LBL}>First Name</label><input placeholder="Marco" style={INP} onFocus={fo} onBlur={bl}/></FadeIn>
                <FadeIn delay={0.15}><label style={LBL}>Last Name</label><input placeholder="Rossi"  style={INP} onFocus={fo} onBlur={bl}/></FadeIn>
              </div>

              <FadeIn delay={0.2} style={{ marginBottom:28 }}>
                <label style={LBL}>Email</label>
                <input type="email" placeholder="marco@example.com" style={INP} onFocus={fo} onBlur={bl}/>
              </FadeIn>

              <FadeIn delay={0.25} style={{ marginBottom:28 }}>
                <label style={LBL}>Project Type</label>
                <select style={{ ...INP, appearance:'none' }} onFocus={fo} onBlur={bl}>
                  {['Residential','Commercial','Interior Design','Cultural / Civic','Master Planning'].map(t=><option key={t}>{t}</option>)}
                </select>
              </FadeIn>

              <FadeIn delay={0.3} style={{ marginBottom:28 }}>
                <label style={LBL}>Budget Range</label>
                <select style={{ ...INP, appearance:'none' }} onFocus={fo} onBlur={bl}>
                  {['€500k — €1M','€1M — €5M','€5M — €20M','€20M+','Not yet determined'].map(b=><option key={b}>{b}</option>)}
                </select>
              </FadeIn>

              <FadeIn delay={0.35} style={{ marginBottom:40 }}>
                <label style={LBL}>Your Vision</label>
                <textarea rows={4} placeholder="Describe your project, location, timeline and aspirations..."
                  style={{ ...INP, resize:'none', lineHeight:1.8 }} onFocus={fo} onBlur={bl}/>
              </FadeIn>

              <FadeIn delay={0.4}>
                <button onClick={() => setSent(true)} data-cur
                  style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', padding:'15px 52px', border:'1px solid #0d0b09', background:'none', color:'#0d0b09', fontFamily:"'DM Sans',sans-serif", transition:'all .3s' }}
                  onMouseEnter={e=>{e.target.style.background='#0d0b09';e.target.style.color='#f5f0e8'}}
                  onMouseLeave={e=>{e.target.style.background='none';e.target.style.color='#0d0b09'}}
                >
                  Send Enquiry
                </button>
              </FadeIn>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
