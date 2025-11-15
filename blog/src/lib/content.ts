export interface PageMetadata {
  title: string
  path: string
  tags?: string[]
  category?: string
  date?: string
}

export const pagesMetadata: PageMetadata[] = [
  {
    title: "My portfolio",
    path: "/",
    tags: ["portfolio"],
    category: "About"
  },
  {
    title: "Work experience",
    path: "/work-experience",
    tags: ["career", "experience"],
    category: "About"
  },
  {
    title: "AI Prompts",
    path: "/ai-prompts",
    tags: ["ai", "prompts", "templates"],
    category: "AI & Tools"
  },
  {
    title: "Freelance Prompt",
    path: "/freelance-prompt",
    tags: ["freelance", "ai", "prompts"],
    category: "Freelance"
  },
  {
    title: "AI Website Builder",
    path: "/ai-website-builder",
    tags: ["ai", "web-development", "tools"],
    category: "AI & Tools"
  },
  {
    title: "WooCommerce with resend.com",
    path: "/woocommerce-with-resend",
    tags: ["woocommerce", "email", "integration"],
    category: "E-commerce"
  },
  {
    title: "Nganluong Gateway Plugin",
    path: "/woocommerce-nganluong-gateway",
    tags: ["woocommerce", "payment", "plugin"],
    category: "E-commerce"
  },
  {
    title: "WooCommerce Marketplace",
    path: "/woocommerce-marketplace",
    tags: ["woocommerce", "marketplace", "multi-vendor"],
    category: "E-commerce"
  },
  {
    title: "Multi OIDC Session Management",
    path: "/multiple-oidc-session-management",
    tags: ["authentication", "oidc", "security"],
    category: "Authentication"
  },
  {
    title: "Zitadel and LemonLDAP integration",
    path: "/zitadel-lemonldap-integration",
    tags: ["authentication", "integration", "ldap"],
    category: "Authentication"
  },
  {
    title: "Node.js x AWS x Github Action",
    path: "/nodejs-aws-github-cicd",
    tags: ["nodejs", "aws", "cicd", "devops"],
    category: "DevOps"
  },
  {
    title: "AWS Copilot",
    path: "/aws-copilot",
    tags: ["aws", "deployment", "devops"],
    category: "DevOps"
  },
  {
    title: "PayPal/Stripe Payment",
    path: "/paypal-stripe-payment",
    tags: ["payment", "integration", "stripe", "paypal"],
    category: "E-commerce"
  },
  {
    title: "WBS Management",
    path: "/wbs-management",
    tags: ["project-management", "planning"],
    category: "Project Management"
  },
  {
    title: "Freelance communication",
    path: "/freelance-communication",
    tags: ["freelance", "communication", "guide"],
    category: "Freelance"
  },
  {
    title: "Event Storming with Mermaid",
    path: "/event-storming-mermaid",
    tags: ["event-storming", "diagrams", "ddd"],
    category: "Software Design"
  },
  {
    title: "Video call with Livekit",
    path: "/livekit-app",
    tags: ["video", "real-time", "webrtc"],
    category: "Real-time Apps"
  },
]

export function getAllTags(): string[] {
  const tags = new Set<string>()
  pagesMetadata.forEach(page => {
    page.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getAllCategories(): string[] {
  const categories = new Set<string>()
  pagesMetadata.forEach(page => {
    if (page.category) categories.add(page.category)
  })
  return Array.from(categories).sort()
}

export function getPagesByTag(tag: string): PageMetadata[] {
  return pagesMetadata.filter(page => page.tags?.includes(tag))
}

export function getPagesByCategory(category: string): PageMetadata[] {
  return pagesMetadata.filter(page => page.category === category)
}
