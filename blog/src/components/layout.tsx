import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "./search";
import { cn } from "@/lib/utils";

const navigation = [
  { text: "My portfolio", link: "/" },
  { text: "Browse by Tags", link: "/tags" },
  { text: "Work experience", link: "/work-experience" },
  { text: "AI Prompts", link: "/ai-prompts" },
  { text: "Freelance Prompt", link: "/freelance-prompt" },
  { text: "AI Website Builder", link: "/ai-website-builder" },
  { text: "Woocommerce with resend.com", link: "/woocommerce-with-resend" },
  { text: "Nganluong Gateway Plugin", link: "/woocommerce-nganluong-gateway" },
  { text: "Woocommerce Marketplace", link: "/woocommerce-marketplace" },
  {
    text: "Multi OIDC Session Management",
    link: "/multiple-oidc-session-management",
  },
  {
    text: "Zitadel and LemonLDAP integration",
    link: "/zitadel-lemonldap-integration",
  },
  { text: "Node.js x AWS x Github Action", link: "/nodejs-aws-github-cicd" },
  { text: "AWS Copilot", link: "/aws-copilot" },
  { text: "PayPal/Stripe Payment", link: "/paypal-stripe-payment" },
  { text: "WBS Management", link: "/wbs-management" },
  { text: "Freelance communication", link: "/freelance-communication" },
  { text: "Event Storming with Mermaid", link: "/event-storming-mermaid" },
  { text: "Video call with Livekit", link: "/livekit-app" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-88 border-b lg:border-b-0 lg:border-r border-border bg-card">
        <div className="sticky top-0 h-screen overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              <Link to="/">quochuydev</Link>
            </h1>
            <ThemeToggle />
          </div>
          <Search />
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.link
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </article>
        </div>
      </main>
    </div>
  );
}
