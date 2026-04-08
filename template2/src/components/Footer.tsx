import { Link } from 'react-router-dom'
import { useEnquireModal } from '../context/EnquireModalContext'

const Footer = () => {
  const { openEnquireModal } = useEnquireModal()
  return (
    <footer className="bg-[#00275E] border-t border-gold-bright/20 mt-auto">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">MegaRyse</h3>
            <p className="text-white/80 text-sm">
              Your trusted partner in higher education and career advancement.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><Link to="/about" className="hover:text-gold-bright transition-colors">About Us</Link></li>
              <li><Link to="/universities" className="hover:text-gold-bright transition-colors">Universities</Link></li>
              <li><Link to="/courses" className="hover:text-gold-bright transition-colors">Courses</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><Link to="/careers" className="hover:text-gold-bright transition-colors">Careers</Link></li>
              <li>
              <button type="button" onClick={openEnquireModal} className="text-white/80 text-sm hover:text-gold-bright transition-colors text-left bg-transparent border-0 p-0 cursor-pointer">
                Contact
              </button>
            </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Email: info@megaryse.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gold-bright/20 text-center text-white/80 text-sm">
          <p>&copy; 2024 MegaRyse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
