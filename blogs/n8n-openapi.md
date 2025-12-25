# Repo

https://github.com/quochuydev/n8n-openapi

# Title

How I Built a Tool That Converts Any OpenAPI Spec to n8n Nodes in Seconds

# Tags

n8n, automation, openapi, typescript, devtools

# Body

Ever spent hours manually creating HTTP Request nodes in n8n for a third-party API? Copy-pasting endpoints, figuring out authentication, mapping parameters—it's tedious work that feels like it should be automated. So I built a tool that does exactly that.

## The Problem

When integrating APIs into n8n workflows:

- You open the API docs, find an endpoint, then manually configure the HTTP Request node
- Each endpoint needs URL, method, headers, query params, and body configured separately
- Large APIs with 50+ endpoints? That's hours of repetitive clicking
- Swagger/OpenAPI specs already have all this info—but n8n can't read them directly
- One typo in the URL or wrong HTTP method, and you're debugging for 30 minutes

## The Solution: n8n-openapi

What if you could paste an OpenAPI spec URL and get ready-to-use n8n nodes instantly?

```
1. Paste OpenAPI spec URL
2. Select the endpoints you need
3. Copy → Paste into n8n
```

That's it. Every endpoint becomes a properly configured HTTP Request node.

## How It Works

1. **Input your spec** - Paste a URL, upload a file, or paste the raw JSON/YAML directly
2. **Parse & convert** - The tool reads OpenAPI 3.x or Swagger 2.0 and generates n8n-compatible nodes
3. **Select endpoints** - Pick only the endpoints you actually need instead of importing everything
4. **Copy to n8n** - One click copies the node JSON, paste it directly into your workflow

No CLI. No installation. Just open the web app and convert.

## Get Started in 30 Seconds

```bash
# No installation needed - just visit:
https://n8n-openapi.vercel.app
```

The web app provides:
- **URL input** - Fetch any public OpenAPI spec directly
- **File upload** - Drop your local spec files (JSON or YAML)
- **Text input** - Paste raw spec content
- **Multi-tab interface** - Work with multiple APIs at once

## Features

| Feature | What It Does |
| ------- | ------------ |
| OpenAPI 3.x & Swagger 2.0 | Supports both modern and legacy specs |
| JSON & YAML | Works with either format |
| Selective conversion | Choose specific endpoints instead of all |
| Custom base URL | Override the default API host |
| Auto-save | Browser storage persists your work |
| One-click copy | Paste directly into n8n workflow |

## Why This Works

1. **No context switching** - Stay in your browser, convert specs, paste into n8n
2. **Accuracy** - The spec defines the exact URL, method, and parameters—no manual errors
3. **Speed** - Convert an entire API in seconds instead of hours
4. **Selective** - Only import the 5 endpoints you need from a 100-endpoint API

## Try It

If you're building n8n workflows with third-party APIs, give it a shot:

```bash
https://n8n-openapi.vercel.app
```

Try it with any public OpenAPI spec—Stripe, GitHub, or your own API docs.

---

> **GitHub**: [quochuydev/n8n-openapi](https://github.com/quochuydev/n8n-openapi)
>
> **Live App**: [n8n-openapi.vercel.app](https://n8n-openapi.vercel.app)

---

What APIs are you integrating into your n8n workflows? I'd love to hear which ones could benefit from faster setup.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Main interface | After "The Solution" | The web app showing URL input field and conversion interface |
| Endpoint list | After "How It Works" | Screenshot showing parsed endpoints with checkboxes for selection |
| Copy action | After "Features" table | The one-click copy button and the resulting node JSON preview |
| n8n paste result | At the end | The converted node pasted into an actual n8n workflow editor |
