/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '~react-pages' {
  import type { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module '*.md' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}
