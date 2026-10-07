const PREVIEW_STORAGE_KEY = 'megaryse-maintenance-preview'

export function isMaintenanceBuild(): boolean {
  return import.meta.env.VITE_MAINTENANCE_MODE === 'true'
}

/** True when visitors should see the maintenance page (preview key can bypass). */
export function isMaintenanceActive(): boolean {
  if (!isMaintenanceBuild()) return false
  if (typeof window === 'undefined') return true

  const previewKey = import.meta.env.VITE_MAINTENANCE_PREVIEW_KEY
  if (!previewKey) return true

  const params = new URLSearchParams(window.location.search)
  if (params.get('preview') === previewKey) {
    sessionStorage.setItem(PREVIEW_STORAGE_KEY, '1')
    return false
  }

  return sessionStorage.getItem(PREVIEW_STORAGE_KEY) !== '1'
}
