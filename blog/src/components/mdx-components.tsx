import { Mermaid } from './mermaid';

export const mdxComponents = {
  pre: (props: any) => {
    const { children } = props;

    // Check if this is a mermaid code block
    if (children?.props?.className === 'language-mermaid') {
      const code = children.props.children;
      return <Mermaid chart={code} />;
    }

    // Default pre rendering
    return <pre {...props} />;
  },
};
