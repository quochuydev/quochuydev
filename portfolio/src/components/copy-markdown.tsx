'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyMarkdown() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const article = document.querySelector('article.prose');
    if (!article) return;

    const html = (article as HTMLElement).innerHTML;
    const text = (article as HTMLElement).innerText;
    const blob = new Blob([html], { type: 'text/html' });
    const textBlob = new Blob([text], { type: 'text/plain' });
    await navigator.clipboard.write([
      new ClipboardItem({ 'text/html': blob, 'text/plain': textBlob }),
    ]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Copy page content"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  );
}
