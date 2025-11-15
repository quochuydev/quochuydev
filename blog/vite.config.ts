import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import Pages from 'vite-plugin-pages'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/quochuydev/' : '/',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react(),
    Pages({
      extensions: ['tsx', 'mdx'],
      dirs: 'src/pages',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})