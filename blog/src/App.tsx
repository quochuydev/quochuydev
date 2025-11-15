import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import routes from '~react-pages'
import { Layout } from '@/components/layout'
import { mdxComponents } from '@/components/mdx-components'

function App() {
  return (
    <MDXProvider components={mdxComponents}>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          {useRoutes(routes)}
        </Layout>
      </Suspense>
    </MDXProvider>
  )
}

export default App
