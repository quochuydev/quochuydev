# Repo

https://github.com/quochuydev/n8n-openapi

# Title

I Built a Tool That Turns Any OpenAPI Spec Into n8n Workflow Nodes in Seconds

# Tags

n8n, automation, opensource, typescript, productivity

# Body

You know that feeling when you find an API with 50+ endpoints and need to wire them into your n8n workflow? Yeah, I spent way too many hours manually configuring HTTP Request nodes. So I built something to fix that.

## The Problem

If you use n8n for automation:

- Every API endpoint means a new HTTP Request node to configure manually
- Copy-pasting URLs, headers, and parameters is tedious and error-prone
- Complex APIs with dozens of endpoints? That's hours of clicking
- OpenAPI specs have all the info you need, but n8n can't read them directly
- One typo in the endpoint path and your workflow breaks silently

## The Solution: OpenAPI to n8n Converter

What if you could paste an OpenAPI spec and get ready-to-use n8n nodes?

```
1. Paste your OpenAPI/Swagger spec (URL, JSON, or YAML)
2. Select the endpoints you need
3. Copy → Paste into n8n
```

That's it. Minutes of manual work compressed into seconds.

## How It Works

1. **Provide your spec** - Paste a URL, upload a file, or paste raw JSON/YAML
2. **Parse & Convert** - The tool reads your OpenAPI 3.x or Swagger 2.0 spec
3. **Cherry-pick endpoints** - Select only the endpoints you actually need
4. **Copy to n8n** - One click copies the node config, paste it into your workflow

No installation. No signup. Just open the browser and convert.

## Get Started in 30 Seconds

```
https://n8n-openapi.vercel.app
```

The interface gives you:

- **URL fetching** - Point to any public OpenAPI spec URL
- **File upload** - Drop your local spec files
- **Direct paste** - Copy-paste spec content directly
- **Popular APIs** - Pre-configured examples (GitHub, Stripe, Slack, Discord, etc.)

## Features at a Glance

| Feature              | What It Does                               |
| -------------------- | ------------------------------------------ |
| Multi-format support | OpenAPI 3.x & Swagger 2.0, JSON & YAML     |
| Selective conversion | Pick specific endpoints, skip the rest     |
| Base URL override    | Point to staging, production, or localhost |
| Browser persistence  | Your conversions are saved automatically   |
| Multi-tab workflow   | Manage multiple API conversions at once    |
| One-click copy       | Clipboard-ready n8n node configurations    |

## Why This Works

1. **Zero friction** - Browser-based, no install, no account required
2. **Spec as source of truth** - OpenAPI already documents everything; this just transforms it
3. **Selective imports** - Don't bloat your workflow with endpoints you won't use
4. **Time savings** - What took 30 minutes of clicking now takes 30 seconds

## Try It

Head to the converter and try it with one of the pre-loaded APIs:

```
https://n8n-openapi.vercel.app
```

Try converting the GitHub or Stripe API spec first—they're already in the Popular APIs section.

---

> **GitHub**: [quochuydev/n8n-openapi](https://github.com/quochuydev/n8n-openapi)
>
> **Live Demo**: [n8n-openapi.vercel.app](https://n8n-openapi.vercel.app)

---

How do you currently handle integrating complex APIs into n8n? Would love to hear if there are endpoints or specs that break the converter—PRs welcome!

# Image capture for blog

| Image              | Where in Post                 | What to Capture                                                                      |
| ------------------ | ----------------------------- | ------------------------------------------------------------------------------------ |
| Main interface     | After "The Solution"          | Screenshot of the converter homepage showing the input area and Popular APIs section |
| Endpoint selection | After "How It Works"          | Screenshot showing parsed endpoints with checkboxes for selection                    |
| Generated output   | Before "Features at a Glance" | Screenshot of the generated n8n node JSON configuration                              |
| n8n workflow       | After "Why This Works"        | Screenshot of the converted nodes pasted into an actual n8n workflow editor          |

# Banana AI banner prompt

Clean, modern illustration showing the conversion flow: an OpenAPI/Swagger document icon on the left transforming (with arrows/particles) into n8n workflow nodes on the right. Use n8n's signature orange/coral color combined with deep navy blue. Minimalist flat design with subtle JSON brackets and curly braces in the background. Developer tool aesthetic, no text, white space emphasis.
