interface IframeEmbedProps {
  src: string;
  title: string;
  height?: string;
  className?: string;
}

export function IframeEmbed({
  src,
  title,
  height = '600px',
  className = ''
}: IframeEmbedProps) {
  return (
    <div className={`w-full my-8 ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-lg border border-border shadow-lg"
        style={{ height }}
      >
        <iframe
          src={src}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Open in new tab ↗
        </a>
      </p>
    </div>
  );
}
