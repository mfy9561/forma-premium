import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#0d0b09', padding: '52px' }}>
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap: 24 }}>
        <div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color:'#ede8dd', letterSpacing:'0.12em', marginBottom: 6 }}>
            FORMA Studio
          </p>
          <p style={{ fontSize: 11, color:'#3a3530', letterSpacing:'0.1em' }}>
            14 Via Bergognone, Milan · Est. 2009
          </p>
        </div>
        <nav style={{ display:'flex', gap: 28 }}>
          {[['Home','/'],['Studio','/studio'],['Projects','/projects'],['Contact','/contact']].map(([l,to])=>(
            <Link key={to} to={to} data-cur style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#5c5248', transition:'color .2s' }}
              onMouseEnter={e=>(e.target.style.color='#d6cfc2')}
              onMouseLeave={e=>(e.target.style.color='#5c5248')}
            >{l}</Link>
          ))}
        </nav>
        <p style={{ fontSize:10, letterSpacing:'0.1em', color:'#2a2520' }}>
          © {new Date().getFullYear()} FORMA Architecture Studio
        </p>
      </div>
    </footer>
  )
}
