# Repo

https://github.com/quochuydev/visionpipe3d

# Title

How I Built a Real-Time Hand Tracking Platform That Runs Entirely in the Browser

# Tags

computervision, mediapipe, threejs, nextjs, opensource

# Body

You know that moment when you're demoing gesture controls and the client asks "So we need to install what exactly?" I got tired of explaining native apps and Python dependencies, so I built a computer vision platform that works right in the browser—no installs required.

## The Problem

Building gesture-controlled interfaces usually means:

- Installing Python, OpenCV, and a dozen dependencies
- Asking users to trust a native app download
- Wrestling with webcam permissions across different OSes
- Spinning up servers just to process hand movements
- Watching latency kill the "real-time" experience

## The Solution: VisionPipe

What if hand tracking just worked in a browser tab?

```javascript
// Detect pinch gesture - thumb tip (4) to index tip (8)
const distance = Math.sqrt(
  Math.pow(thumbTip.x - indexTip.x, 2) +
  Math.pow(thumbTip.y - indexTip.y, 2)
);
const angle = Math.min(distance * 500, 90);
```

That's real code from the branch-opening sample—mapping a pinch gesture to control 3D animations. MediaPipe handles detection, Three.js renders the visuals.

## How It Works

1. **Browser loads MediaPipe** - No install, just a CDN import
2. **Webcam feeds landmarks** - 21 hand points tracked in real-time
3. **JavaScript maps gestures** - Translate finger positions into actions
4. **Three.js renders output** - Smooth 3D visualization at 60fps

The entire pipeline runs client-side. Your webcam feed never leaves your device.

## Tech Stack

Built with Next.js 16, React 19, and TypeScript. The platform includes:

- **Clerk** for authentication
- **Stripe** for payments
- **Drizzle ORM** with PostgreSQL
- **Fumadocs** for documentation
- **MediaPipe** for hand detection
- **Three.js** for 3D visualization

## Get Started in 30 Seconds

**Browser (zero install):**
```
Visit the Playground → Select effect → Grant camera → Done
```

The Playground is always free and unlimited.

**Cloud API:**
```bash
curl -X POST https://visionpipe3d.quochuy.dev/api/v1/sessions \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Returns a shareable playground URL with a JWT token valid for 24 hours.

## Features

| Feature | Playground | Cloud API |
| ------- | ---------- | --------- |
| Hand Landmark Detection | Yes | Yes |
| Real-time Tracking | Yes | Via sessions |
| Offline Support | Yes (after load) | No |
| Processing Location | Client-side | Server-side |
| Rate Limit | Unlimited | 100 req/min |
| Privacy | Data stays local | Processed & discarded |

**Supported formats:** JPEG, PNG, WebP, GIF (up to 10MB)

**Browser support:** Chrome 80+, Firefox 75+, Safari 14+, Edge 80+

## Pricing (Cloud API)

| Plan | Credits | Cost | Per Credit |
| ---- | ------- | ---- | ---------- |
| Free | 3 | $0 | - |
| Starter | 1,000 | $10 | $0.010 |
| Growth | 5,000 | $40 | $0.008 |
| Scale | 20,000 | $150 | $0.0075 |

1 credit = 1 API call. Credits never expire. No monthly subscriptions—pay only for what you use.

**Enterprise?** Custom volume pricing, private endpoints, 99.9% SLA, and dedicated support available.

## Why This Works

1. **Zero friction** - Open a URL, grant camera, start detecting. No Python, no installs, no "works on my machine"
2. **Privacy by default** - Playground processes locally. Cloud API discards images immediately after processing
3. **Production ready** - TLS 1.3 encryption, SHA-256 key hashing, GDPR compliant
4. **Works everywhere** - Any modern browser with WebGL support. Any device with a webcam

## Sample Projects

**Branch Opening Demo**

An interactive visualization where pinch gestures control branch animations. The sample shows how to:
- Initialize the HandTracker from the VisionPipe SDK
- Calculate distances between landmarks (thumb tip at position 4, index tip at position 8)
- Map physical movements to animation parameters

Check the [samples documentation](https://visionpipe3d.quochuy.dev/docs/samples/branch-opening) for the full walkthrough.

## Try It

Head to the [Playground](https://visionpipe3d.quochuy.dev/playground) and wave your hand. That's the entire onboarding.

For the Cloud API:
```bash
# 1. Sign in and get your API key from the Cloud Console
# 2. Create a session
curl -X POST https://visionpipe3d.quochuy.dev/api/v1/sessions \
  -H "Authorization: Bearer vp_live_YOUR_KEY"
```

The response includes a `playgroundUrl` you can embed or share.

---

> **GitHub**: [quochuydev/visionpipe3d](https://github.com/quochuydev/visionpipe3d)
>
> **Docs**: [visionpipe3d.quochuy.dev/docs](https://visionpipe3d.quochuy.dev/docs)
>
> **Playground**: [visionpipe3d.quochuy.dev/playground](https://visionpipe3d.quochuy.dev/playground)

---

What gesture-based interfaces have you built or wanted to build? I'm curious what use cases people are exploring beyond the typical "air guitar" demos.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Hand tracking demo | After "The Solution" | Screenshot of the Playground showing hand landmarks overlaid on webcam feed |
| Landmark diagram | After "How It Works" | Diagram showing the 21 hand landmarks and their IDs (0-20) |
| Tech stack overview | After "Tech Stack" | Architecture diagram or screenshot of the docs landing page |
| API response | After Cloud API curl | Terminal showing the JSON response with playgroundUrl and token |
| Branch opening sample | After "Sample Projects" | GIF of the branch-opening demo—hand pinching to control animation angle |

# Banana AI banner prompt

Futuristic illustration of a human hand silhouette with glowing connection points at each joint and fingertip, rendered in a wireframe style. Digital blue and cyan color scheme against dark background. Subtle browser window frame in the corner suggesting web-based technology. Abstract data streams flowing from the hand. Clean, modern tech aesthetic with slight depth-of-field blur effect. No text.
