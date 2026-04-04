'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { pagesMetadata } from '@/lib/content';
import { useState, Suspense } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CopyMarkdown } from './copy-markdown';

const blogPages = pagesMetadata.filter((p) => p.path !== '/');

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="font-bold text-lg">
              quochuydev
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                Portfolio
              </Link>

              {/* Blogs dropdown */}
              <div className="relative group">
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname !== '/'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  Blogs
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {/* Dropdown */}
                <div className="absolute top-full left-0 pt-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150">
                  <div className="w-72 bg-popover border border-border rounded-lg shadow-lg py-1 max-h-[70vh] overflow-y-auto">
                    {blogPages.map((page) => (
                      <Link
                        key={page.path}
                        href={page.path}
                        className={cn(
                          'block px-4 py-2.5 text-sm transition-colors',
                          pathname === page.path
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent',
                        )}
                      >
                        <div className="font-medium">{page.title}</div>
                        <div
                          className={cn(
                            'text-xs mt-0.5',
                            pathname === page.path
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground',
                          )}
                        >
                          {page.excerpt}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-2 space-y-1 max-h-[70vh] overflow-y-auto">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                Portfolio
              </Link>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Blogs
              </div>
              {blogPages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-3 py-2 rounded-md text-sm transition-colors',
                    pathname === page.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end gap-2 mb-4">
            <CopyMarkdown />
          </div>
          <article className="prose prose-slate max-w-none">{children}</article>
        </div>
      </main>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
