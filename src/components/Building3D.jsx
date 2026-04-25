import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Building3D() {
  const mountRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (!inView) return
    const mount = mountRef.current
    if (!mount) return

    let renderer, animId
    let theta = 0.3, phi = 0.38, r = 18
    let dragging = false, ox = 0, oy = 0, t2 = 0, lt = null

    const W = mount.clientWidth || 900
    const H = 480

    import('three').then((THREE) => {
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
        renderer.setSize(W, H)
        renderer.setPixelRatio(1) // fixed to 1 — biggest perf win
        renderer.shadowMap.enabled = false // shadows off = much faster
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x1a1714, 20, 60)

        const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
        camera.position.set(8, 6, 14)
        camera.lookAt(0, 2, 0)

        // Simple lighting — no shadow maps
        scene.add(new THREE.AmbientLight(0xd4c4a0, 0.7))
        const sun = new THREE.DirectionalLight(0xfff8e8, 1.4)
        sun.position.set(8, 16, 6)
        scene.add(sun)
        const fill = new THREE.DirectionalLight(0x8899bb, 0.4)
        fill.position.set(-10, 4, -6)
        scene.add(fill)
        const warm = new THREE.PointLight(0xc8a96e, 0.8, 25)
        warm.position.set(-3, 8, 2)
        scene.add(warm)

        // Shared geometries (reuse = less GPU memory)
        const geos = {
          box: (w, h, d) => new THREE.BoxGeometry(w, h, d),
          cyl: (rt, rb, h, s) => new THREE.CylinderGeometry(rt, rb, h, s),
          sph: (r, w, h) => new THREE.SphereGeometry(r, w, h),
          pln: (w, h) => new THREE.PlaneGeometry(w, h),
        }

        const mats = {
          conc:  new THREE.MeshLambertMaterial({ color: 0xd6cfc2 }),
          concD: new THREE.MeshLambertMaterial({ color: 0xb8b0a2 }),
          glass: new THREE.MeshLambertMaterial({ color: 0x8899aa, transparent: true, opacity: 0.4 }),
          steel: new THREE.MeshLambertMaterial({ color: 0x9a9490 }),
          gnd:   new THREE.MeshLambertMaterial({ color: 0x2a2622 }),
          tree:  new THREE.MeshLambertMaterial({ color: 0x4a5c3a }),
          trunk: new THREE.MeshLambertMaterial({ color: 0x5c4a32 }),
          water: new THREE.MeshLambertMaterial({ color: 0x3d6080, transparent: true, opacity: 0.65 }),
        }

        const add = (geo, mat, x = 0, y = 0, z = 0) => {
          const m = new THREE.Mesh(geo, mat)
          m.position.set(x, y, z)
          scene.add(m)
          return m
        }

        // Ground
        const g = add(geos.pln(80, 80), mats.gnd)
        g.rotation.x = -Math.PI / 2; g.position.y = -0.01

        // Main tower
        add(geos.box(5, 9, 0.1), mats.concD, 0, 4.5, 0)
        add(geos.box(0.2, 9, 5), mats.concD, -2.5, 4.5, 0)
        add(geos.box(0.2, 9, 5), mats.concD,  2.5, 4.5, 0)
        add(geos.box(5, 9, 4.6), mats.glass,  0, 4.5, 0)
        add(geos.box(5, 0.2, 5), mats.conc,   0, 9.1, 0)
        add(geos.box(5, 9, 0.1), mats.concD,  0, 4.5, -2.5)

        // Shared floor plate geo
        const floorGeo = geos.box(4.8, 0.12, 4.8)
        for (let i = 1; i < 9; i++) add(floorGeo, mats.steel, 0, i, 0)

        // Fins (merged into fewer meshes)
        const finGeo = geos.box(0.04, 0.8, 4.6)
        for (let i = 0; i < 8; i++)
          add(finGeo, mats.steel, -2.4 + i * 0.68, 4.5 + Math.sin(i * 0.5) * 0.4, 0)

        // Wing
        add(geos.box(4, 5, 6),   mats.conc,  -4.5, 2.5, -1)
        add(geos.box(4, 5, 5.8), mats.glass, -4.5, 2.5, -1)
        add(geos.box(4, 0.15, 6),mats.conc,  -4.5, 5.1, -1)

        // Canopy + entrance
        add(geos.box(9, 0.18, 2.5), mats.conc, -2, 5.2, -2.2)
        add(geos.box(3, 0.1, 1),    mats.conc,  0, 0.05,-2.6)
        add(geos.box(2.6, 0.2, 1),  mats.conc,  0, 0.15,-3.5)

        const colGeo = geos.cyl(0.12, 0.12, 5.2, 6)
        add(colGeo, mats.steel, -0.9, 0.1, -2.6)
        add(colGeo, mats.steel,  0.9, 0.1, -2.6)

        // Trees — shared geo
        const sphereGeo = geos.sph(0.7, 6, 6)
        const trunkGeo  = geos.cyl(0.08, 0.1, 0.9, 5)
        ;[[7,0.7,2],[7,0.7,-3],[-8,0.7,4],[-9,0.7,-2]].forEach(([x, y, z]) => {
          add(trunkGeo, mats.trunk, x, 0.45, z)
          const t = add(sphereGeo, mats.tree, x, y + 0.9, z)
          t.scale.y = 1.2 + Math.random() * 0.3
        })

        // Water
        const wtr = add(geos.pln(4, 1.5), mats.water, 5, 0.02, 4)
        wtr.rotation.x = -Math.PI / 2

        setLoaded(true)

        // Controls
        const el = renderer.domElement
        const onDown = e => { dragging = true; ox = e.clientX; oy = e.clientY }
        const onUp   = () => (dragging = false)
        const onMov  = e => {
          if (!dragging) return
          theta -= (e.clientX - ox) * 0.005
          phi   -= (e.clientY - oy) * 0.004
          phi    = Math.max(0.1, Math.min(1.3, phi))
          ox = e.clientX; oy = e.clientY
        }
        const onWhl  = e => { r = Math.max(9, Math.min(28, r + e.deltaY * 0.02)); e.preventDefault() }
        el.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup',   onUp)
        window.addEventListener('mousemove', onMov)
        el.addEventListener('wheel', onWhl, { passive: false })

        const onTS = e => { lt = e.touches[0]; dragging = true }
        const onTM = e => {
          if (!lt) return
          theta -= (e.touches[0].clientX - lt.clientX) * 0.005
          phi   -= (e.touches[0].clientY - lt.clientY) * 0.004
          phi    = Math.max(0.1, Math.min(1.3, phi))
          lt = e.touches[0]; e.preventDefault()
        }
        el.addEventListener('touchstart', onTS)
        el.addEventListener('touchmove',  onTM, { passive: false })
        el.addEventListener('touchend', () => { dragging = false; lt = null })

        // Render — throttled to ~40fps to save CPU
        let last = 0
        const render = (ts) => {
          animId = requestAnimationFrame(render)
          if (ts - last < 25) return // ~40fps cap
          last = ts
          t2 += 0.003
          if (!dragging) theta += 0.0015
          camera.position.x = r * Math.sin(theta) * Math.cos(phi)
          camera.position.y = r * Math.sin(phi) + 2
          camera.position.z = r * Math.cos(theta) * Math.cos(phi)
          camera.lookAt(0, 3, 0)
          warm.intensity = 0.8 + 0.2 * Math.sin(t2 * 2)
          renderer.render(scene, camera)
        }
        animId = requestAnimationFrame(render)

      } catch (err) {
        console.warn('3D error:', err)
      }
    })

    return () => {
      cancelAnimationFrame(animId)
      if (renderer) {
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
        renderer.dispose()
      }
    }
  }, [inView])

  return (
    <div ref={ref} style={{ background: '#1a1714', position: 'relative', overflow: 'hidden' }}>
      {!loaded && (
        <div style={{ width: '100%', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: 'italic', color: 'rgba(245,240,232,0.3)', letterSpacing: '0.08em' }}>
            Loading 3D model...
          </p>
        </div>
      )}
      <div ref={mountRef} style={{ width: '100%', height: loaded ? 480 : 0 }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 52 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,.35)' }}>
          Studio Atelier · 3D Exploration
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,42px)', fontWeight: 300, fontStyle: 'italic', color: '#ede8dd', lineHeight: 1.2, marginTop: 8, maxWidth: 360 }}>
          Architecture as Living Form
        </p>
        <p style={{ fontSize: 11, color: 'rgba(245,240,232,.28)', marginTop: 10 }}>Drag to orbit · Scroll to zoom</p>
      </div>
    </div>
  )
}
