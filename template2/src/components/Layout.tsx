import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { EnquireNowFormModal } from './enquireNowFormModal'
import ScrollToTopButton from './ScrollToTopButton'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <EnquireNowFormModal />
      <ScrollToTopButton />
    </div>
  )
}

export default Layout

