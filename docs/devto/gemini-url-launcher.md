# Repo

https://github.com/quochuydev/gemini-url-launcher

# Title

How I Built a Chrome Extension That Launches Gemini Prompts Straight From a URL

# Tags

chrome, ai, productivity, automation, opensource

# Body

I kept opening Gemini, waiting for the page to load, clicking the input box, pasting my prompt, and hitting enter—maybe twenty times a day. Multiply that by a team and it's death by a thousand clicks. So I built a tiny Chrome extension that turns the whole dance into a single URL.

## The Problem

If you use Gemini regularly, you've probably felt this:

- Every prompt starts with: open tab → wait → click input → paste → press enter
- You can't share a "runnable" prompt with a teammate—only the raw text
- Launcher tools (Raycast, Alfred, PopClip) can open URLs, but Gemini doesn't accept prompts via URL
- Bookmarks are useless for anything beyond a home page
- Repetitive prompts (daily standup summaries, translation, code review) have no shortcut

The friction is small, but it adds up. And it kills the instinct to "just ask Gemini real quick."

## The Solution: Gemini URL Launcher

What if a URL could carry the prompt, and Gemini would just run it?

```
https://gemini.google.com/app?q=Summarize%20today%27s%20standup%20notes
```

Open that link, and the extension types the prompt into Gemini and submits it for you. That's the whole idea.

## How It Works

1. **You craft a URL** with `?q=<your prompt>` pointing at `gemini.google.com/app`
2. **The extension watches** that domain for the `q` parameter
3. **A content script fills the input** and submits the prompt automatically
4. **Gemini responds** as if you typed it yourself

No API keys. No server. No data leaves your browser—the extension only runs on `gemini.google.com`.

## Get Started in 30 Seconds

```bash
git clone https://github.com/quochuydev/gemini-url-launcher
```

Then load it as an unpacked extension:

- Open `chrome://extensions`
- Toggle **Developer mode** (top-right)
- Click **Load unpacked** and pick the cloned folder
- Pin it from the puzzle-piece icon so you know it's active

Works on Chrome, Edge, Brave, Arc, and Opera—anything Chromium-based.

## Ways to Use It

| Trigger              | How to Set It Up                                            | Example                                     |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------- |
| Browser bookmark     | Save the Gemini URL with your prompt as a bookmark          | One-click "explain this error" prompt       |
| Raycast / Alfred     | Create a quicklink or web search with `{query}` in the URL  | Type prompt in launcher → hits Gemini       |
| PopClip              | Add a URL action that sends selected text as the prompt     | Select text anywhere → send to Gemini       |
| Shell alias          | `open "https://gemini.google.com/app?q=$*"`                 | `gemini "refactor this regex"` from the CLI |
| Scripts / automation | Generate URLs from templates and open them programmatically | Daily digest, code review, translation      |

## Why This Works

1. **URLs are universal** - Every tool, OS, and script knows how to open one
2. **Zero config** - No auth, no API, no server; it's just a content script
3. **Private by design** - The extension collects nothing and only touches Gemini's domain
4. **Composable** - Drop it into any workflow you already have

## One Caveat

Gemini occasionally changes its page layout, which can break the selector the extension relies on. If it stops working, pull the latest version—fixes usually land fast because the content script is tiny.

## Try It

If you've ever wished Gemini had a command palette, this is basically that—just using URLs as the interface:

```bash
git clone https://github.com/quochuydev/gemini-url-launcher
```

Load it, then try bookmarking a prompt you run often. You'll feel the difference after about three uses.

---

> **GitHub**: [github.com/quochuydev/gemini-url-launcher](https://github.com/quochuydev/gemini-url-launcher)

---

What's the prompt you'd wire to a single keystroke if you could? Drop it in the comments—I'm collecting ideas for a shared "Gemini shortcut pack."

# Image capture for blog

| Image                  | Where in Post            | What to Capture                                                                        |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| URL-to-prompt demo     | After "The Solution"     | Screen recording or GIF: paste URL in address bar → Gemini auto-fills and submits      |
| Extension install flow | After "Get Started"      | `chrome://extensions` page with Developer mode on and Load unpacked highlighted        |
| Raycast quicklink      | Inside "Ways to Use It"  | Raycast quicklink editor showing the Gemini URL with `{query}` placeholder             |
| Content script code    | After "How It Works"     | Snippet of `content.js` showing the query-param read and input-submit logic            |

# Banana AI banner prompt

Minimalist tech illustration of a browser address bar with a glowing URL flowing into a Gemini-style sparkle icon on the right, representing a prompt being launched from a link. Clean flat design, blue-to-purple gradient with white accents, subtle circuit-line pattern in the background, modern developer-tool aesthetic, no text.
