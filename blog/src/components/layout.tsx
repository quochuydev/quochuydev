import { Link, useLocation } from "react-router-dom";
import { Search } from "./search";
import { cn } from "@/lib/utils";
import { pagesMetadata } from "@/lib/content";

// Use pages metadata for navigation
const navigation = pagesMetadata;

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
          </div>
          <Search />
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="font-medium">{item.title}</div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          location.pathname === item.path
                            ? "bg-primary-foreground/20"
                            : "bg-accent/50"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-slate max-w-none">
            {children}
          </article>
        </div>
      </main>
    </div>
  );
}
