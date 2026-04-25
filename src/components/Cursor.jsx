import { useEffect, useRef } from 'react'

// Pure CSS cursor — no React re-renders, no RAF in hook
export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let cx = -200, cy = -200
    let rx = -200, ry = -200
    let raf

    const move = (e) => {
      cx = e.clientX; cy = e.clientY
      dot.style.transform = `translate(${cx - 3.5}px, ${cy - 3.5}px)`
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const loop = () => {
      rx = lerp(rx, cx, 0.09)
      ry = lerp(ry, cy, 0.09)
      ring.style.transform = `translate(${rx - 17}px, ${ry - 17}px)`
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(loop)

    const on  = () => { dot.classList.add('hov');  ring.classList.add('hov') }
    const off = () => { dot.classList.remove('hov'); ring.classList.remove('hov') }

    const attach = () => {
      document.querySelectorAll('a, button, [data-cur]').forEach(el => {
        el.addEventListener('mouseenter', on)
        el.addEventListener('mouseleave', off)
      })
    }
    attach()

    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 7, height: 7,
        background: '#0d0b09', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        willChange: 'transform',
        transition: 'width .2s, height .2s, background .2s',
      }} className="cur-d" />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 34, height: 34,
        border: '1px solid rgba(13,11,9,.28)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        willChange: 'transform',
        transition: 'width .28s, height .28s, border-color .2s',
      }} className="cur-r" />
      <style>{`
        .cur-d.hov { width:11px!important; height:11px!important; background:#b8976a!important; }
        .cur-r.hov { width:52px!important; height:52px!important; border-color:rgba(184,151,106,.45)!important; }
      `}</style>
    </>
  )
}
