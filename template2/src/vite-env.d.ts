/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAINTENANCE_MODE?: string
  readonly VITE_MAINTENANCE_PREVIEW_KEY?: string
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.PNG' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

