import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { getAllTags, getAllCategories, getPagesByTag, getPagesByCategory } from '@/lib/content'

export default function TagsPage() {
  const tags = getAllTags()
  const categories = getAllCategories()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Browse by Tags & Categories</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const pages = getPagesByCategory(category)
            return (
              <div key={category} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{category}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {pages.length} {pages.length === 1 ? 'page' : 'pages'}
                </p>
                <ul className="space-y-1">
                  {pages.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-sm hover:text-primary underline-offset-2 hover:underline"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const count = getPagesByTag(tag).length
            return (
              <Badge key={tag} variant="secondary" className="cursor-pointer">
                {tag} ({count})
              </Badge>
            )
          })}
        </div>
      </section>
    </div>
  )
}
