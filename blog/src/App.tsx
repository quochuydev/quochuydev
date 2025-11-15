import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { Layout } from '@/components/layout'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        {useRoutes(routes)}
      </Layout>
    </Suspense>
  )
}

export default App
