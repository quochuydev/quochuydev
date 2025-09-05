# Technical Specification — Web Builder Project

## 🏗️ Technology Stack

### Framework

- **Next.js 14+ (App Router)**
  - Routing with `app/` directory
  - API routes via `app/api`
  - Server Components for data-fetching
  - Client Components for interactive UI

### Deployment

- **Vercel**
  - Preview deployments per branch
  - Production deployment on `main`
  - Environment variables managed in Vercel dashboard
  - Serverless edge functions for backend API routes

### Storage

- **Vercel Blob**
  - Store user-uploaded images, videos, documents
  - Blob URLs used in JSON config for rendering
  - API integration for upload and retrieval
  - Lifecycle policy: define expiry or permanent storage

### UI + Interaction

- **React-RND**
  - Wrapping components for resizing in the builder canvas
  - Configuration of `minWidth`, `maxWidth`, `aspectRatio`, `resizeHandles`
  - Snapping to grid system
  - Used only in **editor mode**, not in published site

### Styling

- **TailwindCSS**
  - Utility-first styling
  - Responsive breakpoints (`sm`, `md`, `lg`, `xl`)
  - Theme customization for colors and typography

### UI Library

- **shadcn/ui**
  - `Button`, `Card`, `Dialog`, `Form`, `Input`, `NavigationMenu`
  - Used to render standard building blocks in a consistent design system

## 📂 Project Structure

```
app/
├─ api/ # API routes (upload, products, auth)
├─ (marketing)/ # Landing pages
├─ (builder)/ # Editor canvas and inspector
├─ (runtime)/ # Dynamic renderer for JSON pages
└─ layout.tsx # Root layout
components/
├─ ui/ # shadcn/ui components
├─ builder/ # React-RND wrappers, inspector controls
└─ render/ # JSON → React component mapper
lib/
├─ vercel-blob.ts # Upload/retrieve helpers
├─ actions.ts # Server actions
└─ utils.ts # Helpers
```

## ✅ Requirements Checklist (Envato-like Marketplace)

### 1. User Management

- [ ] User registration with email confirmation
- [ ] Login with email + password
- [ ] OAuth (Google, GitHub) optional
- [ ] User profile management
- [ ] Role-based access: **buyer, seller, admin**

### 2. Product Management

- [ ] Sellers can upload products (template, asset, plugin)
- [ ] Each product has metadata (title, description, tags, categories, price, license type)
- [ ] Uploads stored in **Vercel Blob** (files, previews, images)
- [ ] Product moderation by admin before publishing
- [ ] Product versioning (updates & changelog)

### 3. Marketplace Features

- [ ] Product browsing with categories & filters
- [ ] Product detail page (preview images, description, ratings, author info)
- [ ] Cart & checkout (Stripe or Paddle integration)
- [ ] License selection (regular, extended)
- [ ] Download link after purchase (secure, expiring link from Blob)

### 4. Payment & Billing

- [ ] Stripe integration for card payments
- [ ] Invoices & receipts (PDF)
- [ ] Commission system (Envato takes % cut, seller receives rest)
- [ ] Payouts for sellers (manual or automated)

### 5. Ratings & Reviews

- [ ] Buyers can rate purchased products
- [ ] Review moderation (admin can approve/block)

### 6. Security & Compliance

- [ ] JWT or NextAuth for authentication
- [ ] File validation on upload (size, type, virus scan if possible)
- [ ] GDPR compliance for EU users
- [ ] HTTPS enforced (handled by Vercel)

### 7. Builder/Editor Features (Optional)

- [ ] JSON schema for page layouts (hero, grid, product list, CTA, footer)
- [ ] Editor mode with **React-RND** resizing handles
- [ ] Save & publish page schema
- [ ] Render schema at runtime with shadcn components
- [ ] Upload assets to Vercel Blob directly from builder

### 8. Deployment/DevOps

- [ ] Hosted on Vercel (auto-deploy from GitHub repo)
- [ ] Preview deployments per branch
- [ ] Production at `envato-clone.vercel.app`
- [ ] Monitoring & logging (Vercel Analytics / Sentry)

## 🚀 Developer Notes

- Use **server actions** for mutations where possible
- Keep `page.json` in database (Postgres / Supabase / Prisma ORM)
- Store product files in **Vercel Blob** with metadata in DB
- Protect downloads: issue signed URLs with expiry
- For scalability: consider moving to AWS S3 + CloudFront later if needed
