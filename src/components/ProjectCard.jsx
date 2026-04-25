import { Link } from 'react-router-dom'

// No Framer Motion on cards — pure CSS for better perf on 10+ cards
export default function ProjectCard({ project, index = 0 }) {
  return (
    <div
      style={{
        breakInside: 'avoid', marginBottom: 3,
        opacity: 0, animation: `cardIn 0.6s ${index * 0.06}s ease forwards`,
      }}
    >
      <Link
        to={`/projects/${project.slug}`}
        data-cur
        className="proj-card-link"
        style={{ display: 'block', position: 'relative', overflow: 'hidden', background: '#ede8dd' }}
      >
        <img
          src={project.thumb}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform 0.7s ease' }}
          className="proj-img"
        />
        <div className="proj-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top,rgba(13,11,9,.72) 0%,rgba(13,11,9,.2) 55%,transparent 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '24px 20px',
          opacity: 0, transition: 'opacity 0.3s ease',
        }}>
          <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b8976a', marginBottom: 6 }}>{project.category}</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: '#f5f0e8', marginBottom: 4 }}>{project.title}</p>
          <p style={{ fontSize: 11, color: 'rgba(245,240,232,.65)' }}>{project.location} · {project.year}</p>
        </div>
      </Link>
      <style>{`
        @keyframes cardIn { to { opacity:1 } }
        .proj-card-link:hover .proj-img { transform: scale(1.06); }
        .proj-card-link:hover .proj-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  )
}
