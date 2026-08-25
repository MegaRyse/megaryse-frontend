import { lazy, Suspense, type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'

const ClickSpark = lazy(() => import('../animatedComponents/ClickSpark'))
const EnquireNowFormModal = lazy(() =>
  import('./enquireNowFormModal').then((m) => ({ default: m.EnquireNowFormModal })),
)

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-full">{children}</div>}>
          <ClickSpark
            sparkColor="black"
            sparkRadius={18}
            sparkCount={10}
            duration={450}
            className="min-h-full"
          >
            {children}
          </ClickSpark>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <EnquireNowFormModal />
      </Suspense>
      <ScrollToTopButton />
    </div>
  )
}

export default Layout
