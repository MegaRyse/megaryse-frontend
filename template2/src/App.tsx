import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import { EnquireModalProvider } from './context/EnquireModalContext'
import Home from './pages/Home'
import About from './pages/About'
import Universities from './pages/Universities'
import UniversityDetail from './pages/UniversityDetail'
import Courses from './pages/Courses'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <EnquireModalProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:slug" element={<UniversityDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </EnquireModalProvider>
    </Router>
  )
}

export default App

