export interface PageMetadata {
  title: string;
  path: string;
  excerpt: string;
  tags?: string[];
  category?: string;
  date?: string;
}

export const pagesMetadata: PageMetadata[] = [
  {
    title: "My portfolio",
    path: "/",
    excerpt: "Personal portfolio and projects",
    tags: ["portfolio"],
    category: "About",
  },
  {
    title: "Work experience",
    path: "/work-experience",
    excerpt: "Professional experience and background",
    tags: ["career", "experience"],
    category: "About",
  },
  {
    title: "AI Prompts",
    path: "/ai-prompts",
    excerpt: "Collection of AI prompts and templates",
    tags: ["ai", "prompts", "templates"],
    category: "AI & Tools",
  },
  // {
  //   title: "Freelance Prompt",
  //   path: "/freelance-prompt",
  //   excerpt: "Prompts for freelance work",
  //   tags: ["freelance", "ai", "prompts"],
  //   category: "Freelance",
  // },
  {
    title: "AI Website Builder",
    path: "/ai-website-builder",
    excerpt: "AI-powered website building tools",
    tags: ["ai", "web-development", "tools"],
    category: "AI & Tools",
  },
  {
    title: "WooCommerce with resend.com",
    path: "/woocommerce-with-resend",
    excerpt: "WooCommerce integration with Resend",
    tags: ["woocommerce", "email", "integration"],
    category: "E-commerce",
  },
  {
    title: "Nganluong Gateway Plugin",
    path: "/woocommerce-nganluong-gateway",
    excerpt: "Payment gateway plugin for WooCommerce",
    tags: ["woocommerce", "payment", "plugin"],
    category: "E-commerce",
  },
  {
    title: "WooCommerce Marketplace",
    path: "/woocommerce-marketplace",
    excerpt: "Marketplace features for WooCommerce",
    tags: ["woocommerce", "marketplace", "multi-vendor"],
    category: "E-commerce",
  },
  {
    title: "Multi OIDC Session Management",
    path: "/multiple-oidc-session-management",
    excerpt: "Managing multiple OIDC sessions",
    tags: ["authentication", "oidc", "security"],
    category: "Authentication",
  },
  {
    title: "Zitadel and LemonLDAP integration",
    path: "/zitadel-lemonldap-integration",
    excerpt: "Integration guide for Zitadel and LemonLDAP",
    tags: ["authentication", "integration", "ldap"],
    category: "Authentication",
  },
  {
    title: "Node.js x AWS x Github Action",
    path: "/nodejs-aws-github-cicd",
    excerpt: "CI/CD pipeline with AWS and GitHub Actions",
    tags: ["nodejs", "aws", "cicd", "devops"],
    category: "DevOps",
  },
  // {
  //   title: "AWS Copilot",
  //   path: "/aws-copilot",
  //   excerpt: "AWS Copilot deployment guide",
  //   tags: ["aws", "deployment", "devops"],
  //   category: "DevOps",
  // },
  // {
  //   title: "PayPal/Stripe Payment",
  //   path: "/paypal-stripe-payment",
  //   excerpt: "Payment integration examples",
  //   tags: ["payment", "integration", "stripe", "paypal"],
  //   category: "E-commerce",
  // },
  {
    title: "WBS Management",
    path: "/wbs-management",
    excerpt: "Work breakdown structure management",
    tags: ["project-management", "planning"],
    category: "Project Management",
  },
  // {
  //   title: "Freelance communication",
  //   path: "/freelance-communication",
  //   excerpt: "Communication guidelines for freelancers",
  //   tags: ["freelance", "communication", "guide"],
  //   category: "Freelance",
  // },
  {
    title: "Event Storming with Mermaid",
    path: "/event-storming-mermaid",
    excerpt: "Event storming using Mermaid diagrams",
    tags: ["event-storming", "diagrams", "ddd"],
    category: "Software Design",
  },
  {
    title: "Video call with Livekit",
    path: "/livekit-app",
    excerpt: "Video calling application with LiveKit",
    tags: ["video", "real-time", "webrtc"],
    category: "Real-time Apps",
  },
  {
    title: "Color Brain Game",
    path: "/color-brain",
    excerpt: "Interactive color-based brain training game",
    tags: ["game", "interactive", "brain-training"],
    category: "Games",
  },
];

export function getAllTags(): string[] {
  const tags = new Set<string>();
  pagesMetadata.forEach((page) => {
    page.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  pagesMetadata.forEach((page) => {
    if (page.category) categories.add(page.category);
  });
  return Array.from(categories).sort();
}

export function getPagesByTag(tag: string): PageMetadata[] {
  return pagesMetadata.filter((page) => page.tags?.includes(tag));
}

export function getPagesByCategory(category: string): PageMetadata[] {
  return pagesMetadata.filter((page) => page.category === category);
}
