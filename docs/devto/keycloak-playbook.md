# Repo

https://github.com/quochuydev/keycloak-playbook

# Title

How I Stopped Rebuilding Auth Every Project and Wrote the Keycloak Playbook I Wish I Had

# Tags

keycloak, authentication, nextjs, nodejs, opensource

# Body

Every new product I've shipped starts the same way: "We just need login, right?" Two weeks later we're knee-deep in password resets, refresh tokens, org invites, and role checks sprinkled across five services. I got tired of rediscovering the same traps, so I wrote down the exact Keycloak setup I now copy into every multi-tenant app — gateway, frontends, account app, and all.

## The Problem

Identity is three hard problems pretending to be one:

- **Authentication** — login, MFA, email/SMS verification, forgot-password, social providers
- **Authorization** — which role can do what, baked into tokens so services don't need to call a DB on every request
- **Multi-tenancy** — organizations, invites, role scoping per org, sysadmin vs org-owner vs end user

Most teams either roll their own (and leak tokens) or drop in Keycloak and then spend a month figuring out realms, clients, JWKS caching, and how the gateway should verify tokens. The docs tell you *what* exists, not *how to wire it into a real product*.

## The Solution: Keycloak Playbook

A hands-on playbook that walks through a realistic architecture — a Node.js gateway, three Next.js frontends, and a shared account app — all delegating to Keycloak via OIDC.

```
Browser → Account App (login UI) → Keycloak (OIDC + PKCE)
       → Gateway (verifies JWT via JWKS) → internal services
```

No copy-pasting snippets from five Stack Overflow answers. One consistent model from realm setup to JWT verification.

## How It Works

1. **Keycloak runs in Docker** — `docker-compose up` boots Keycloak 26 + Postgres with health checks
2. **One realm, four clients** — gateway, sysadmin, admin, app, account — each with the right flow and scopes
3. **Account App owns login** — every frontend redirects here, so SSO "just works" across apps
4. **Gateway verifies tokens** — JWKS cached, roles checked, trusted headers (`X-User-Id`, `X-Org-Id`) forwarded downstream

The result: raw tokens never leak past the gateway, and services stay blissfully unaware of Keycloak.

## Get Started in 30 Seconds

```bash
git clone https://github.com/quochuydev/keycloak-playbook
cd keycloak-playbook && docker-compose up -d
```

This gives you:

- **Keycloak 26** at `http://localhost:8080` — admin console ready
- **Postgres 16** — persistent realm/user data via named volume
- **Health checks** — so dependent services wait until Keycloak is actually ready
- **Docs site** — `cd docs && pnpm dev` to browse the full playbook locally

## What's Inside

| Section | Covers | Who It's For |
| ------- | ------ | ------------ |
| Setup | Realm, clients, roles, groups, orgs, SMTP, SMS SPI | DevOps / first-time Keycloak |
| APIs | `/token`, refresh, logout, introspect, admin APIs (curl + sample JSON) | Anyone wiring HTTP clients |
| Gateway | JWT verify, JWKS caching, role checks, service-to-service | Node.js backend devs |
| Next.js | auth.js config, silent refresh, RBAC on pages & actions | Frontend devs |
| Account App | Custom login/register/profile UI on top of Keycloak | Full-stack / UX |

## Why This Works

1. **Standards, not magic** — OIDC + OAuth 2.1 means you can swap libraries without rewriting auth logic
2. **One realm, many apps** — users log in once at the Account App and get SSO everywhere else
3. **Trusted headers over raw tokens** — downstream services don't touch JWTs, so blast radius stays small
4. **Copy-pasteable** — every section has real curl commands and real JSON responses, not hand-waving

## Try It

If you're about to bolt Keycloak onto a new project and dreading the realm-config rabbit hole:

```bash
git clone https://github.com/quochuydev/keycloak-playbook
cd keycloak-playbook && docker-compose up -d
```

Then open `http://localhost:8080`, log in with `admin / admin`, and follow the Setup section of the docs site to build your first realm.

---

> **GitHub**: [github.com/quochuydev/keycloak-playbook](https://github.com/quochuydev/keycloak-playbook)
>
> **Docs**: [keycloak.quochuy.dev](https://keycloak.quochuy.dev)

---

What's the most painful part of Keycloak you've hit in production — JWKS rotation, org invites, custom themes? I'd love to hear what I should add to the playbook next.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Architecture diagram | After "The Solution" | Flow diagram showing browser → account app → Keycloak → gateway → services |
| Keycloak admin console | After "Get Started" | Screenshot of Keycloak 26 admin console after first boot, showing the realm list |
| Token payload | After "How It Works" | Decoded JWT on jwt.io showing `realm_access`, `resource_access`, and `organization` claims |
| Docs site | After "What's Inside" | Screenshot of the playbook docs site (keycloak.quochuy.dev) showing the sidebar TOC |

# Banana AI banner prompt

Minimalist tech illustration showing a central shield/key icon connected by glowing lines to four surrounding app windows (labeled abstractly as gateway, sysadmin, admin, and end-user app). Represents a single identity provider fanning out to multiple services. Clean flat design, deep blue and electric teal gradient with white accents, subtle OIDC/JWT token shapes floating in the background. Modern developer-tool aesthetic, no text.
