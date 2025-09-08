# Technical Specification

## Technology

- **Framework:** `Next.js latest App Router`
- **Deployment:** `Vercel` (preview + production)
- **Storage:** `Supabase Storage`
- **Database:** `Supabase PostgreSQL` (DON'T use POLICY)
- **UI Library:** `shadcn/ui` (Keep default styling and interface, no update directly `./components/ui/`)
- **Styling:** `TailwindCSS` (Don't create custom, don't update `tailwind.config.ts`, just use default styling)
- **Client query:** `@tanstack/react-query`

## Project Structure

```
app/
├─ api/
├── admin/
├─── products/
├─── users/
├─── orders/
├── web/
├─── products/
├─── users/profile
├─── users/orders-history
├─── cart/
├─── checkout/
├─── reviews/ #
├─ auth/
├─ admin/
├── products/
├── users/
├── orders/
├─ (web)/
├── products/
├── products/[productId]
├── cart/
├── checkout/
├── checkout/thank-you
├── users/profile
├── users/orders-history
├─ pages/[pageId]
└─ layout.tsx
└─ pages.tsx
components/
├─ ui/
lib/
└─ utils.ts
hooks/
├─ useCart.ts
```
