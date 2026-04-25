import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar          from './components/Navbar'
import Cursor          from './components/Cursor'
import Loader          from './components/Loader'
import PageTransition  from './components/PageTransition'
import Home            from './pages/Home'
import Studio          from './pages/Studio'
import Projects        from './pages/Projects'
import ProjectDetail   from './pages/ProjectDetail'
import Contact         from './pages/Contact'
import NotFound        from './pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                element={<PageTransition><Home          /></PageTransition>} />
          <Route path="/studio"          element={<PageTransition><Studio        /></PageTransition>} />
          <Route path="/projects"        element={<PageTransition><Projects      /></PageTransition>} />
          <Route path="/projects/:slug"  element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/contact"         element={<PageTransition><Contact       /></PageTransition>} />
          <Route path="*"                element={<PageTransition><NotFound      /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
