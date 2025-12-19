"use client"

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Search } from './search';
import { cn } from '@/lib/utils';
import { pagesMetadata } from '@/lib/content';
import { useState, Suspense } from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const navigation = pagesMetadata;

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('open');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isOpen === 'false');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-card border border-border shadow-sm"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 border-r border-border bg-card transform transition-all duration-200 ease-in-out lg:relative',
          // Mobile behavior
          'lg:translate-x-0 -translate-x-full w-80',
          sidebarOpen && 'translate-x-0',
          // Desktop collapsed state
          !sidebarCollapsed && 'lg:w-80',
          sidebarCollapsed && 'lg:w-16',
        )}
      >
        <div className="sticky top-0 h-screen overflow-y-auto p-6 lg:p-4">
          <div className="flex items-center justify-between mb-6">
            <h1
              className={cn(
                'font-bold transition-all duration-200',
                sidebarCollapsed ? 'text-lg text-center' : 'text-2xl',
              )}
            >
              <Link href="/" className={sidebarCollapsed ? 'block' : ''}>
                {sidebarCollapsed ? 'QD' : 'quochuydev'}
              </Link>
            </h1>

            <div className="flex items-center gap-1">
              {/* Desktop collapse button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex p-1 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={
                  sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                }
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>

              {/* Close button for mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-accent"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Hide search when collapsed on desktop */}
          <div className={cn(sidebarCollapsed && 'lg:hidden')}>
            <Search />
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm transition-colors',
                  pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  sidebarCollapsed && 'lg:justify-center lg:px-2',
                )}
                title={sidebarCollapsed ? item.title : undefined}
              >
                <div className="font-medium">
                  {sidebarCollapsed ? (
                    // Show first letter or icon when collapsed
                    item.title.charAt(0).toUpperCase()
                  ) : (
                    <>
                      {item.title}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                'text-xs px-1.5 py-0.5 rounded',
                                pathname === item.path
                                  ? 'bg-primary-foreground/20'
                                  : 'bg-accent/50',
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/20"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 lg:px-12 py-[80px]">
        <div className="max-w-4xl mx-auto">
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
