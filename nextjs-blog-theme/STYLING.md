# Styling Techniques in nextjs-blog-theme

## 1. Multi-Layer Gradient Backgrounds

- **7 overlapping radial gradients** with different positions
- Heavy blur (`blur(44px)`) for soft, ethereal look
- Creates organic, colorful hero sections

```css
/* Example from Layout.module.css */
background:
  radial-gradient(at 71% 77%, var(--gradient-1) 0, transparent 59%),
  radial-gradient(at 36% 47%, var(--gradient-2) 0, transparent 51%),
  radial-gradient(at 71% 14%, var(--gradient-3) 0, transparent 40%),
  /* ... more layers */
filter: blur(44px);
```

## 2. Theme System (5 Color Palettes)

Environment-driven via `BLOG_THEME` variable:

| Theme   | Colors              |
|---------|---------------------|
| default | Purple / Cyan       |
| bejamas | Red / Blue          |
| netlify | Green / Cyan        |
| reddie  | Red / Gold          |
| greenie | Brown / Green       |

CSS variables generated at build time in `_document.js`.

## 3. Glassmorphism Cards

```css
bg-white/10 backdrop-blur-lg border border-gray-800/10
dark:bg-black/30 hover:bg-white/20
```

- Semi-transparent backgrounds
- Frosted glass blur effect
- Subtle borders with low opacity

## 4. Conic Gradient Avatar

```css
bg-conic-180 from-gradient-3 to-gradient-4
```

Creates a rotating gradient effect using theme colors for profile avatars.

## 5. Smart Dark Mode

- localStorage persistence
- System preference detection via `prefers-color-scheme`
- CSS class-based toggling on `document.documentElement`
- Different opacity values per mode

## 6. Opacity Layering for Depth

Strategic use of opacity creates visual hierarchy:

| Element     | Light Mode   | Dark Mode    |
|-------------|--------------|--------------|
| Background  | `opacity-40` | `opacity-60` |
| Accents     | `opacity-20` | `opacity-10` |
| Secondary   | `opacity-60` | `opacity-60` |

## 7. Typography

- `@tailwindcss/typography` plugin for MDX content
- `prose dark:prose-invert` for automatic dark mode styling
- Configurable heading/body fonts via environment variables:
  - `BLOG_FONT_HEADINGS`
  - `BLOG_FONT_BODY`

## 8. Smooth Interactions

```css
/* Consistent transitions */
transition

/* Hover states */
hover:bg-white/20 dark:hover:bg-black/50

/* Focus rings with theme colors */
focus:ring-4 focus:ring-primary/50
```

## 9. Responsive Border Styling

```css
first:rounded-t-lg last:rounded-b-lg
md:first:rounded-tr-none
border-t-0 border-b-0
```

Conditional border rendering with Tailwind's pseudo-selectors for grouped cards.

## 10. CSS Modules

- `Layout.module.css` for gradient backgrounds
- Component-scoped styles prevent cascade issues and naming conflicts
