"use client"

import { Mermaid } from './mermaid';
import type { MDXComponents } from 'mdx/types';
import type { ReactElement } from 'react';

interface CodeProps {
  className?: string;
  children?: string;
}

export const mdxComponents: MDXComponents = {
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => {
    const { children } = props;

    // Check if this is a mermaid code block
    const childElement = children as ReactElement<CodeProps> | undefined;
    if (
      childElement &&
      typeof childElement === 'object' &&
      'props' in childElement &&
      childElement.props?.className === 'language-mermaid'
    ) {
      const code = childElement.props.children;
      return <Mermaid chart={code || ''} />;
    }

    // Default pre rendering
    return <pre {...props} />;
  },
};
