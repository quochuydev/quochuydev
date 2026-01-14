# Repo

https://github.com/quochuydev/zitadel-login-ui

# Title

How I Built a Custom Login UI for ZITADEL That Actually Looks Good

# Tags

authentication, nextjs, typescript, opensource, security

# Body

Ever tried customizing ZITADEL's default login page and realized you're stuck with their hosted UI? I needed full control over the login experience—branding, flows, languages—so I built a drop-in replacement using Next.js that speaks OIDC natively.

## The Problem

ZITADEL is great for identity management, but the default login UI has limitations:

- Customization options are restricted to themes and basic branding
- No control over the actual login flow UX
- Adding custom pages (passkeys, TOTP setup) requires workarounds
- Multi-language support needs external tooling
- Self-hosted instances still look like hosted ZITADEL

## The Solution: Custom Login UI

A Next.js app that replaces ZITADEL's login interface entirely. Same OIDC flows, your design.

```bash
# Your app redirects to your login UI, not ZITADEL's
OIDC Authorization → Your Custom UI → ZITADEL API → Token
```

Full control over every screen: login, register, password reset, TOTP, passkeys.

## How It Works

1. **OIDC-compliant** - Implements standard authorization flows, works with any OIDC client
2. **Service user auth** - Talks to ZITADEL's API using service account tokens
3. **i18n built-in** - Multi-language support via next-translate out of the box
4. **Modern stack** - Next.js 14 App Router, TypeScript, Tailwind CSS, React Hook Form + Zod

Your existing apps just point to this UI instead of ZITADEL's hosted login.

## Get Started in 30 Seconds

```bash
git clone https://github.com/quochuydev/zitadel-login-ui.git
cd zitadel-login-ui
cp .env.example .env
yarn install
yarn dev
```

This gives you:

- **Login page** - Username/password authentication
- **Registration** - New user signup flow
- **Password reset** - Self-service password recovery
- **TOTP setup** - Two-factor authentication with QR codes
- **Passkeys** - WebAuthn/FIDO2 passwordless login

## Authentication Routes

| Route | Purpose | Features |
| ----- | ------- | -------- |
| `/login` | User authentication | Username/password, remember me |
| `/register` | New account creation | Form validation, email verification |
| `/password` | Password management | Reset flow, change password |
| `/totp` | 2FA setup | QR code generation, backup codes |
| `/passkeys` | Passwordless auth | WebAuthn registration and login |
| `/account` | User profile | Manage account settings |

## Environment Configuration

| Variable | Purpose |
| -------- | ------- |
| `APP_URL` | Your login UI URL (e.g., `http://localhost:3333`) |
| `ZITADEL_URL` | Your ZITADEL instance URL |
| `ZITADEL_SERVICE_USER_ID` | Service user ID from ZITADEL |
| `ZITADEL_SERVICE_USER_TOKEN` | API token for service user |
| `RESEND_API_KEY` | Optional: for email delivery |

## Setting Up ZITADEL Service User

1. Go to `https://YOUR_ZITADEL/ui/console/instance/members`
2. Create a service user with `IAM_OWNER` role
3. Generate a personal access token
4. Add the user ID and token to your `.env`

## Why This Works

1. **Full design control** - Every pixel is yours, not ZITADEL's theme system
2. **Standard OIDC** - Any app expecting OIDC works without changes
3. **Production-ready stack** - Next.js 14, TypeScript, Tailwind—battle-tested
4. **i18n from day one** - Add languages by dropping translation files in `/locales`
5. **Modern auth methods** - Passkeys and TOTP built in, not bolted on

## Try It

Live demo: [zitadel-login-ui-v2.vercel.app](https://zitadel-login-ui-v2.vercel.app)

```bash
git clone https://github.com/quochuydev/zitadel-login-ui.git
cd zitadel-login-ui
yarn dev
```

Start with the login page, then explore the TOTP and passkey flows to see the full auth experience.

---

> **GitHub**: [quochuydev/zitadel-login-ui](https://github.com/quochuydev/zitadel-login-ui)
>
> **Live Demo**: [zitadel-login-ui-v2.vercel.app](https://zitadel-login-ui-v2.vercel.app)

---

Are you using ZITADEL's default UI or did you build something custom? I'd love to hear how others handle login customization.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Login page | After "The Solution" | Screenshot of the login form from the live demo |
| TOTP setup | After "Authentication Routes" | QR code screen showing 2FA enrollment |
| Service user setup | After "Setting Up ZITADEL" | docs/create-service-user.png from the repo |
| Folder structure | After "Get Started" | VS Code showing app/[lang]/ routes structure |

# Banana AI banner prompt

Clean modern illustration of a login screen floating in center with shield/lock icons around it, connected by lines to ZITADEL logo and Next.js logo on sides. Gradient background from deep blue to teal. Minimalist flat design with subtle authentication symbols (keys, fingerprint, QR code). Professional SaaS aesthetic, security-focused mood. No text on the image.
