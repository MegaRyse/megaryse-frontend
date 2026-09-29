import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import SeoHead from './components/SeoHead'
import { EnquireModalProvider } from './context/EnquireModalContext'
import { isMaintenanceActive } from './lib/maintenanceMode'
import Maintenance from './pages/Maintenance'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Universities = lazy(() => import('./pages/Universities'))
const UniversityDetail = lazy(() => import('./pages/UniversityDetail'))
const Courses = lazy(() => import('./pages/Courses'))
const Careers = lazy(() => import('./pages/Careers'))
const Contact = lazy(() => import('./pages/Contact'))

function PageFallback() {
  return <div className="min-h-[50vh] bg-offwhite" aria-hidden />
}

function App() {
  const [maintenance, setMaintenance] = useState(isMaintenanceActive)

  useEffect(() => {
    setMaintenance(isMaintenanceActive())
  }, [])

  if (maintenance) {
    return <Maintenance />
  }

  return (
    <Router>
      <EnquireModalProvider>
        <ScrollToTop />
        <SeoHead />
        <Layout>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/universities/:slug" element={<UniversityDetail />} />
              <Route
                path="/universities/:universitySlug/courses/:courseSlug"
                element={<UniversityDetail />}
              />
              <Route path="/courses" element={<Courses />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </Layout>
      </EnquireModalProvider>
    </Router>
  )
}

export default App
