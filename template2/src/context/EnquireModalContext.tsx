import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface EnquireModalContextValue {
  isOpen: boolean
  openEnquireModal: () => void
  closeEnquireModal: () => void
}

const EnquireModalContext = createContext<EnquireModalContextValue | null>(null)

export function EnquireModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openEnquireModal = useCallback(() => setIsOpen(true), [])
  const closeEnquireModal = useCallback(() => setIsOpen(false), [])
  return (
    <EnquireModalContext.Provider value={{ isOpen, openEnquireModal, closeEnquireModal }}>
      {children}
    </EnquireModalContext.Provider>
  )
}

export function useEnquireModal(): EnquireModalContextValue {
  const ctx = useContext(EnquireModalContext)
  if (!ctx) {
    throw new Error('useEnquireModal must be used within EnquireModalProvider')
  }
  return ctx
}
