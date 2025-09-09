Got it — below is a TASK-ANALYZER style deliverable, produced as a single, structured response in the format you requested. I could not access your private RAG/KBase or the local guideline files, so I state that as an assumption and provide practical schemas, representative contents, and explicit file paths you asked for so you can drop them into your repo/KB.

---

## 1. Tagging

**Extracted keywords (Tech / Framework / Tools / Services)**

- Shopify, Online Store 2.0, Shopify CLI, Liquid, JSON Templates
- Sections & Blocks, Sections API, Theme App Extensions, Metafields
- HTML5, CSS3, SCSS, Tailwind (optional)
- JavaScript (ES6), Fetch API, Ajax Cart, deferred scripts
- React (Shopify apps), Polaris (UI), Node.js, npm/yarn
- Image CDN, WebP, srcset, lazy-loading, responsive images
- Performance: Lighthouse, Core Web Vitals (LCP, CLS, TBT)
- Payments: Shopify Payments, Stripe, PayPal, test orders, Bogus Gateway
- Version control: Git, GitHub, Theme backups
- RAG/KB: Vector DB (Pinecone/Weaviate), embeddings (OpenAI), metadata
- Monitoring: Sentry, GA4, Shopify Analytics
- Accessibility: WCAG 2.1, aria attributes

---

## 2. Entities and Relations

### Entities (nouns / keywords from the requirement)

- Store, Theme, Section, Block, Asset, Template, Page, Product, Collection
- Task, Issue, User (admin/store owner), Designer, Developer, Client
- PaymentGateway, Checkout, Cart, Order
- RAG Document, Embedding, VectorIndex, Metadata
- Policy (code-style, security, privacy), Guideline file (general/be/fe)

### Relations (connections between entities)

- `Store` **uses** `Theme`
- `Theme` **contains** `Sections` and `Assets`
- `Section` **composed_of** `Blocks`
- `Task` **affects** `Section`/`Theme`/`Integration`
- `Person` **assigned_to** `Task`
- `PaymentGateway` **integrates_with** `Checkout`
- `RAG Document` **references** `Entities` (e.g., Theme, Task)
- `Policy` **applies_to** `Task`/`Code`

### What entities could be used for this task

- `Store` (target store), `Theme` (active theme id), `Sections` (hero, features, testimonials, newsletter), `Assets` (CSS/JS/images), `PaymentGateway`, `Task` (create, test, deploy), `RAG Document` (audit/history), `Person` (you / client).

### What relations could be used for this task

- `Task -> Theme` (task modifies theme)
- `Task -> Asset` (task creates/edits assets)
- `Theme -> Section` (new sections added to theme)
- `PaymentGateway -> Checkout` (validate payments)
- `RAG Document -> Task` (history of tasks & results)

---

## 3. Event Storming (`../templates/event-storming.md`)

```markdown
# Event Storming — Shopify Enhancements

## Events

- UserVisitedHomePage
- SectionRendered(hero/features/testimonials)
- UserClickedCTA
- UserAddedToCart
- CartUpdated
- CheckoutInitiated
- PaymentSucceeded
- PaymentFailed
- ThemeAssetUpdated
- LighthouseAuditCompleted
- TaskCreated / TaskCompleted

## Commands

- render_section(section_id)
- update_theme_asset(asset_path, content)
- add_section_to_template(template, section_name, position)
- optimize_image(asset_id)
- run_lighthouse_audit(target_url)
- create_task(title, description, assignee)
- run_checkout_test(payment_method)

## Policies

- Code style: follow `../guidelines/general.md` (linting, comment rules)
- Backend secrets: DO NOT store API keys in theme assets
- Privacy: Do not export PII to third-party services without consent
- Accessibility: Follow WCAG 2.1 AA for public pages
- Performance: Target Lighthouse >= 90 (desktop), >= 75 (mobile) as feasible
- Checkout: Use Shopify-hosted checkout or approved gateways only

## External Systems

- Shopify Admin (REST/GraphQL APIs)
- Shopify CDN for images
- Payment Gateways (Shopify Payments, Stripe, PayPal)
- Vector DB / RAG (Pinecone / Weaviate / Milvus)
- Analytics (GA4), Monitoring (Sentry)

## Sub processes

1. Access & Backup
   - Acquire collaborator access
   - Backup theme (download / git)
2. Develop
   - Add new sections & assets
   - Local testing (Shopify theme serve / dev store)
3. Performance Optimization
   - Image optimization, critical CSS, defer scripts
4. Payment Validation
   - Test checkout flows, verify webhooks
5. QA & Accessibility
   - Cross-device testing, keyboard nav, color contrast
6. Deploy & Monitor
   - Push theme, monitor metrics and errors
```

---

## 4. UI Prototype Prompt (`../templates/web-instruction.md`)

```markdown
# Web Instruction — Homepage additions & tweaks

## Goal

Add a lightweight, brand-consistent hero, a 3-column features strip, a testimonials slider, and a newsletter signup block to the Homepage (Online Store 2.0). Keep assets minimal to preserve performance and accessibility.

## Sections to create

1. Custom Hero

   - Settings: heading, subheading, background image (image_picker), CTA text & URL
   - Behavior: responsive image using srcset, LQIP optional, loading="lazy" for non-critical variants
   - Accessibility: heading as H1 on homepage, aria-label for region

2. Features Strip

   - Repeatable blocks (icon, title, description)
   - Mobile-first stacking

3. Testimonials

   - Repeatable blocks (quote, author, avatar)
   - Minimal JS slider (vanilla), accessible (aria-live, controls), no external libs

4. Newsletter
   - Form to capture email (Shopify customer or external provider)
   - Use Shopify form action for customers or the client’s provider endpoint
   - Provide success/failure accessible messages

## Visual / Layout

- Full-width hero (fluid), features in a centered container, testimonials in a constrained max-width, newsletter above footer.
- Design tokens: CSS variables for brand colors and spacing

## Implementation notes for developer

- Add `sections/hero.liquid`, `sections/features.liquid`, `sections/testimonials.liquid`, `sections/newsletter.liquid`
- Add small JS at `assets/homepage-ui.js` for slider + ajax subscribe
- Add CSS to `assets/theme.scss.liquid` with CSS variables
- Use Shopify CLI for pull/push: `shopify theme pull` / `shopify theme push`
```

---

## 5. Implementation Step — Step-by-step (code + manual)

### Overview & constraints

- Budget \$10 → scope should be small: add 1-3 sections + simple performance improvements and payment checks.
- Assume Online Store 2.0 theme (JSON templates + sections). If legacy theme, steps differ slightly.

### Phase 0 — Pre-reqs / Access (manual)

1. Ask client for collaborator invite (or store admin credentials). Confirm store domain.
2. Verify theme: Online Store → Themes → note active theme id and name.
3. Backup: Admin → Actions → Download theme file (zip). Also pull locally:

   ```bash
   shopify login --store=your-store.myshopify.com
   shopify theme pull --theme <theme_id>
   git init
   git add .
   git commit -m "backup before homepage changes"
   ```

---

### Phase 1 — Code: Add sections (immediate artifacts)

#### 1. `sections/hero.liquid` (drop-in)

```liquid
{% schema %}
{
  "name": "Custom Hero",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Welcome to Our Store" },
    { "type": "textarea", "id": "subheading", "label": "Subheading", "default": "Premium products" },
    { "type": "image_picker", "id": "image", "label": "Background image" },
    { "type": "url", "id": "cta_url", "label": "CTA URL" },
    { "type": "text", "id": "cta_text", "label": "CTA Text", "default": "Shop Now" }
  ],
  "presets": [{ "name": "Custom Hero" }]
}
{% endschema %}

<section class="ta-hero" role="region" aria-label="{{ section.settings.heading }}">
  <div class="ta-hero__media">
    {% if section.settings.image %}
      <img
        src="{{ section.settings.image | img_url: '800x' }}"
        srcset="{{ section.settings.image | img_url: '400x' }} 400w, {{ section.settings.image | img_url: '800x' }} 800w, {{ section.settings.image | img_url: '1600x' }} 1600w"
        sizes="(max-width:600px) 100vw, 1200px"
        loading="lazy"
        alt="{{ section.settings.image.alt | escape }}">
    {% endif %}
  </div>
  <div class="ta-hero__content">
    <h1>{{ section.settings.heading }}</h1>
    <p>{{ section.settings.subheading }}</p>
    {% if section.settings.cta_url %}
      <a class="btn" href="{{ section.settings.cta_url }}">{{ section.settings.cta_text }}</a>
    {% endif %}
  </div>
</section>
```

#### 2. Minimal `assets/homepage-ui.js` (slider + accessibility)

```js
document.addEventListener("DOMContentLoaded", () => {
  // simple testimonial carousel
  const container = document.querySelector(".ta-testimonials");
  if (!container) return;
  const slides = container.querySelectorAll(".ta-testimonial");
  let idx = 0;
  function show(i) {
    slides.forEach((s, n) => s.classList.toggle("active", n === i));
    container.setAttribute("aria-live", "polite");
  }
  show(idx);
  setInterval(() => {
    idx = (idx + 1) % slides.length;
    show(idx);
  }, 5000);
});
```

#### 3. Quick add-to-cart (AJAX snippet)

```js
async function addToCart(variantId, qty = 1) {
  try {
    const res = await fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: variantId, quantity: qty }),
    });
    const json = await res.json();
    // update cart UI: cart count, mini-cart contents
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: json }));
    return json;
  } catch (err) {
    console.error("Add to cart failed", err);
    throw err;
  }
}
```

---

### Phase 2 — Manual: Template integration & Theme Editor

1. Edit `templates/index.json` to insert the new sections:

```json
{
  "sections": {
    "hero": { "type": "hero" },
    "features": { "type": "features" },
    "collection": { "type": "collection" }
  },
  "order": ["hero", "features", "collection", "footer"]
}
```

2. Push theme changes with Shopify CLI or zip upload.

   ```bash
   shopify theme push --theme <theme_id>
   ```

3. Use Theme Editor to add content and verify layout on mobile/desktop.

---

### Phase 3 — Performance Optimizations (code + manual)

1. **Responsive images & lazy-loading** — implemented in hero snippet using `srcset` and `loading="lazy"`.
2. **Defer non-critical JS** — when including `assets/homepage-ui.js`:

```liquid
<script defer src="{{ 'homepage-ui.js' | asset_url }}"></script>
```

3. **Inline critical CSS** — add minimal hero CSS inline in `<head>` to reduce render-blocking:

```liquid
<style>
  .ta-hero{display:flex;align-items:center;padding:2rem 1rem}
  .ta-hero__media img{max-width:100%;height:auto;display:block}
</style>
```

4. **Audit & iterate** — run Lighthouse (Chrome DevTools) or use Shopify Speed report; focus on LCP/CLS fixes.

---

### Phase 4 — Payment & Checkout Validation (manual + test)

1. In store admin: Settings → Payments — verify active gateways (Shopify Payments, PayPal, etc.).
2. Create test order: use Bogus Gateway or test mode (gateway dependent).
3. Validate webhooks (if any) and order creation in Admin.
4. If Shopify Plus and checkout customization required, ensure `checkout.liquid` changes are safe and tested.

---

### Phase 5 — QA, Accessibility & Deploy

1. Accessibility checks: headings order, aria-labels, keyboard navigation, color contrast (WCAG 2.1 AA).
2. Cross-browser and device testing (Chrome, Safari mobile, Firefox).
3. Final backup & deploy: `shopify theme push` and publish.
4. Produce short deliverable: list of changed files, before/after screenshots, Lighthouse report, how to revert.

---

## 6. With Code — Search-related docs and example references

(You should consult these docs in your KB / RAG — include paths / queries in your KB.)

- Shopify Theme docs: `docs/shopify/themes/sections` (query: "Online Store 2.0 sections schema")
- AJAX Cart API: `docs/shopify/ajax-api/reference` (query: "cart/add.js")
- Shopify CLI usage: `docs/shopify/cli`
- Performance: `Lighthouse audit`, `Core Web Vitals`, `image optimization`
- RAG integration: "pinecone + openai embeddings example", "weaviate openai embeddings"

**Example search queries for your RAG:**

- `"theme sections schema Online Store 2.0"`
- `"cart add.js ajax example shopify"`
- `"shopify image srcset best practice"`
- `"lighthouse core web vitals improvement strategies"`

**Example code references included above** (hero.liquid, homepage-ui.js, addToCart function).

---

## 7. BE: `../guidelines/be.md` (representative summary)

> _Note: I could not open `../guidelines/be.md`. Below is a typical backend guideline you should place in that file._

- Do not store secrets or API keys in theme assets or source control. Use environment variables for apps and Admin secure settings for API credentials.
- Use REST/GraphQL Shopify Admin API with app-level access tokens stored securely. Rotate keys per policy.
- Validate and sanitize all inputs; never render raw user-submitted HTML without escaping.
- Keep server-side integrations (fulfillment, payments, webhooks) idempotent and log errors to monitoring (Sentry).
- For RAG ingestion tasks, redact PII before indexing and store source URLs as metadata.

---

## 8. FE: `../guidelines/fe.md` (representative summary)

> _Note: I could not open `../guidelines/fe.md`. Below is a typical frontend guideline you should place in that file._

- Code style: consistent formatting (prettier/ESLint), small components, comments for non-obvious logic.
- Accessibility: semantic HTML, visible focus states, aria roles/labels for interactive widgets.
- Performance: lazy-load offscreen images, use `srcset`, defer non-critical JS, avoid heavy frameworks for simple UI.
- Responsiveness: mobile-first CSS, test breakpoints, set `sizes` and `srcset` on images.
- Versioning: use Git with feature branches and PR for changes; keep one commit per logical change.

---

## Notes, Assumptions & Next Actions

- I could not access your RAG/KBase or the guideline files referenced (`../guidelines/*.md`). I included recommended schema and representative guideline contents so you can paste those into your KB and tailor them.
- Given the job budget (\$10), scope should be constrained: small UI sections and lightweight optimizations. Larger work (checkout customization, extensive refactor, heavy performance engineering) requires a larger budget.
- If you want, I can now (pick one) and I will produce immediately in this reply:

  - A. Full ready-to-paste files for `hero.liquid`, `features.liquid`, `testimonials.liquid`, `assets/homepage-ui.js`, and minimal CSS (all together).
  - B. A Lighthouse checklist + a shell script to bulk-optimize images (ImageMagick examples) for local workflow.
  - C. Example RAG retrieval code for Pinecone + OpenAI embeddings to fetch `entities`, `relations`, `tasks`, and `core structure base`.

Pick A, B, or C and I will produce the artifact _right now_ in this reply.
