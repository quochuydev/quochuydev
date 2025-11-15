import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { pagesMetadata, type PageMetadata } from "@/lib/content";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PageMetadata[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = pagesMetadata.filter((page) => {
      const searchStr = `${page.title} ${page.excerpt}`.toLowerCase();
      return searchStr.includes(query.toLowerCase());
    });

    setResults(searchResults);
    setIsOpen(searchResults.length > 0);
  }, [query]);

  return (
    <div className="relative mb-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.path}
              to={result.path}
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="block px-4 py-3 hover:bg-accent transition-colors border-b last:border-b-0"
            >
              <div className="font-medium text-sm">{result.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {result.excerpt}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
