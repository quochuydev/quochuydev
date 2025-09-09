# WEB INSTRUCTION

Metadata:

- request_id: {{request_id}}
- client_id: {{client_id}}
- page_or_flow: {{e.g., "Create onboarding flow", "Admin dashboard - user details"}}
- target_platforms: {{web|mobile-web|ios|android|responsive|system|backend|some-of-these}}
- design_system: {{company-design-system or "none"}}
- accessibility_level: {{AA|AAA|none}}
- localization: {{languages required}}

Client UX brief:

- user_persona: {{primary user persona}}
- primary_user_goals: [{{goal1}}, {{goal2}}]
- success_metrics: [{{activation %, time-to-first-action}}]
- content_provided: [texts, logos, images, style tokens]

Processing steps (agent MUST follow)

1. **Requirement normalization**

   - Convert "design intent" into explicit user stories and acceptance criteria. Example: "As a user I want to X so that Y".

2. **Information architecture & flows**

   - Provide flow diagram: **mermaid**
   - For each screen, provide purpose, preconditions, post conditions, and data required.

3. **Wireframe / Low-fidelity**

   - For every major screen (list max 10), produce:
     - Wireframe ASCII/mermaid + labeled regions (header, main, controls).
     - Data model used by the screen (JSON schema for the payloads).
   - Provide edge cases and error states.

4. **High-fidelity prototype instructions**

   - Provide component list with props and behavior:
     - Example component spec:
       ```json
       {
         "name": "UserCard",
         "props": {
           "id": "string",
           "avatar_url": "url",
           "name": "string",
           "role": "string"
         },
         "behavior": "onClick -> open /users/:id; keyboard focusable; aria role='button'"
       }
       ```
   - Provide layout grid breakpoints (mobile, tablet, desktop) with column counts and gutters.
   - Provide spacing scale (e.g., 4/8/16/24/32) and type scale for headings/body.

5. **Accessibility & internationalization**

   - Required ARIA attributes and keyboard patterns.
   - Text-length allowances for translated strings (e.g., +30% width).
   - Color contrast checks (target AA). Provide hex tokens.

6. **Interaction design & micro-interactions**

   - For each interactive control list animation timing (duration, easing), states (hover, pressed, disabled).
   - Provide Lottie / simple animation guidance or CSS keyframe snippets (if applicable).

7. **Deliverables: select one or more**

   - Figma spec (preferred): Provide a JSON-like spec mapping screens -> components -> tokens plus a suggested file structure and example copy. If you cannot produce an actual Figma file via API, produce a Figma-ready spec with layer naming, spacing, and assets listed.
   - React + Tailwind UI components: Provide a recommended file tree, components as single-file React components using Tailwind classes, Props Types, Storybook story example.
   - Static HTML/CSS prototype: index.html + CSS (BEM or utility-first) and sample data.
   - Clickable prototype description: mapping of screens and transitions (for a PM to implement in Figma/Framer).

8. **Frontend engineering notes**

   - State management pattern (local state | redux | zustand) and why.
   - Data fetching patterns: SWR/react-query, caching TTL, optimistic updates.
   - Form handling & validation strategy (schema: zod/joi + client-side + server-side).
   - Tests: component unit tests (Jest + React Testing Library) and end-to-end (Playwright/Cypress) scripts.

9. **API contracts**

   - For each screen, include required API endpoints, HTTP method, request body JSON schema, response schema, error codes, and example responses. Include minimal auth scheme (jwt/bearer cookie) and rate limits.

10. **Performance & delivery**

    - List recommended bundling targets (esbuild/webpack), code-splitting points, and asset optimization steps.
    - Provide Lighthouse checkpoints to achieve (e.g., LCP < 2.5s).

11. **Output packaging**
    - The agent MUST produce:
      - `design_spec.md` (full spec)
      - `components/` (React/Tailwind code snippets or full examples)
      - `api_contracts.json` (OpenAPI-lite snippets)
      - `prototype_flow.mmd` (mermaid)
      - `__agent_response_json__` (the structured JSON described in the System Prompt)
    - Provide shell commands to bootstrap the frontend prototype, e.g.:
      - `npx create-vite@latest my-proto --template react`
      - `cd my-proto && npm install && npm run dev`
      - plus any environment variables required (with placeholders)

EXAMPLE COMPONENT SPEC (short):

```json
{
  "name": "SearchBar",
  "props": {
    "query": "string",
    "onSearch": "(q)=>void",
    "placeholder": "string"
  },
  "accessibility": "role=search, aria-label='Search items'",
  "keyboard": "Enter triggers search, Esc clears input"
}
```
