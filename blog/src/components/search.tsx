import { useState, useEffect } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

interface SearchResult {
  title: string
  path: string
  excerpt: string
}

const pages = [
  { title: "My portfolio", path: "/", excerpt: "Personal portfolio and projects" },
  { title: "Work experience", path: "/work-experience", excerpt: "Professional experience and background" },
  { title: "AI Prompts", path: "/ai-prompts", excerpt: "Collection of AI prompts and templates" },
  { title: "Freelance Prompt", path: "/freelance-prompt", excerpt: "Prompts for freelance work" },
  { title: "AI Website Builder", path: "/ai-website-builder", excerpt: "AI-powered website building tools" },
  { title: "Woocommerce with resend.com", path: "/woocommerce-with-resend", excerpt: "WooCommerce integration with Resend" },
  { title: "Nganluong Gateway Plugin", path: "/woocommerce-nganluong-gateway", excerpt: "Payment gateway plugin for WooCommerce" },
  { title: "Woocommerce Marketplace", path: "/woocommerce-marketplace", excerpt: "Marketplace features for WooCommerce" },
  { title: "Multi OIDC Session Management", path: "/multiple-oidc-session-management", excerpt: "Managing multiple OIDC sessions" },
  { title: "Zitadel and LemonLDAP integration", path: "/zitadel-lemonldap-integration", excerpt: "Integration guide for Zitadel and LemonLDAP" },
  { title: "Node.js x AWS x Github Action", path: "/nodejs-aws-github-cicd", excerpt: "CI/CD pipeline with AWS and GitHub Actions" },
  { title: "AWS Copilot", path: "/aws-copilot", excerpt: "AWS Copilot deployment guide" },
  { title: "PayPal/Stripe Payment", path: "/paypal-stripe-payment", excerpt: "Payment integration examples" },
  { title: "WBS Management", path: "/wbs-management", excerpt: "Work breakdown structure management" },
  { title: "Freelance communication", path: "/freelance-communication", excerpt: "Communication guidelines for freelancers" },
  { title: "Event Storming with Mermaid", path: "/event-storming-mermaid", excerpt: "Event storming using Mermaid diagrams" },
  { title: "Video call with Livekit", path: "/livekit-app", excerpt: "Video calling application with LiveKit" },
]

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchResults = pages.filter((page) => {
      const searchStr = `${page.title} ${page.excerpt}`.toLowerCase()
      return searchStr.includes(query.toLowerCase())
    })

    setResults(searchResults)
    setIsOpen(searchResults.length > 0)
  }, [query])

  return (
    <div className="relative mb-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.path}
              to={result.path}
              onClick={() => {
                setQuery('')
                setIsOpen(false)
              }}
              className="block px-4 py-3 hover:bg-accent transition-colors border-b last:border-b-0"
            >
              <div className="font-medium text-sm">{result.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{result.excerpt}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
