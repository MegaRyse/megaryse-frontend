import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { EnquireNowFormModal } from './enquireNowFormModal'
import ScrollToTopButton from './ScrollToTopButton'
import ClickSpark from '../animatedComponents/ClickSpark'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      <Navbar />
      <main className="flex-grow">
        <ClickSpark
          sparkColor="black"
          sparkRadius={18}
          sparkCount={10}
          duration={450}
          className="min-h-full"
        >
          {children}
        </ClickSpark>
      </main>
      <Footer />
      <EnquireNowFormModal />
      <ScrollToTopButton />
    </div>
  )
}

export default Layout

