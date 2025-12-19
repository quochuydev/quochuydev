"use client"

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Button } from './ui/button';
import { Code, Eye } from 'lucide-react';

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    if (showRaw) return;

    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    if (ref.current) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      ref.current.innerHTML = '';
      mermaid.render(id, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [chart, showRaw]);

  return (
    <div className="relative my-8">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowRaw(!showRaw)}
          title={showRaw ? "Show diagram" : "Show raw code"}
        >
          {showRaw ? (
            <Eye className="h-4 w-4" />
          ) : (
            <Code className="h-4 w-4" />
          )}
        </Button>
      </div>
      {showRaw ? (
        <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto">
          <code className="text-sm text-foreground">{chart}</code>
        </pre>
      ) : (
        <div ref={ref} className="mermaid-diagram" />
      )}
    </div>
  );
}
