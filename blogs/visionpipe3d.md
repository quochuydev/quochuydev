# Repo

https://github.com/quochuydev/visionpipe3d

# Title

How I Built a Real-Time Hand Tracking Platform That Runs Entirely in the Browser

# Tags

computervision, mediapipe, threejs, webdev, opensource

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
// Detect pinch gesture
const distance = Math.sqrt(
  Math.pow(thumbTip.x - indexTip.x, 2) +
  Math.pow(thumbTip.y - indexTip.y, 2)
);
const angle = Math.min(distance * 500, 90);
```

That's real code mapping a pinch gesture to control animations. MediaPipe handles detection, Three.js renders the visuals.

## How It Works

1. **Browser loads MediaPipe** - No install, just a CDN import
2. **Webcam feeds landmarks** - 21 hand points tracked in real-time
3. **JavaScript maps gestures** - Translate finger positions into actions
4. **Three.js renders output** - Smooth 3D visualization at 60fps

The entire pipeline runs client-side. Your webcam feed never leaves your device.

## Get Started in 30 Seconds

**Browser (zero install):**
```
Visit the Playground → Select effect → Grant camera → Done
```

**Cloud API:**
```bash
curl -X POST https://api.visionpipe.com/v1/detect \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@hand.jpg"
```

New accounts get 100 free API credits—no card required.

## Features

| Feature | Browser SDK | Cloud API |
| ------- | ----------- | --------- |
| Hand Landmark Detection | Yes | Yes |
| Real-time Tracking | Yes | Batch only |
| Offline Support | Yes (after load) | No |
| Processing Location | Client-side | Server-side |
| Latency | ~16ms | Network dependent |
| Privacy | Data stays local | Processed & discarded |

## Pricing (Cloud API)

| Plan | Credits | Cost | Per Credit |
| ---- | ------- | ---- | ---------- |
| Free | 100 | $0 | - |
| Starter | 1,000 | $10 | $0.010 |
| Growth | 5,000 | $40 | $0.008 |
| Scale | 20,000 | $150 | $0.0075 |

1 credit = 1 API call. Credits never expire. The Playground is always free.

## Why This Works

1. **Zero friction** - Open a URL, grant camera, start detecting. No Python, no installs, no "works on my machine"
2. **Privacy by default** - Browser SDK processes locally. Cloud API discards images immediately after processing
3. **Production ready** - TLS 1.3 encryption, SHA-256 key hashing, GDPR compliant
4. **Works everywhere** - Chrome, Firefox, Safari 14+, Edge. Any device with a webcam

## Try It

Head to the Playground and wave your hand. That's the entire onboarding.

For the Cloud API:
```bash
# Get your API key from the console
curl -X POST https://api.visionpipe.com/v1/detect \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@sample.jpg"
```

The 100 free credits are enough to build a proof-of-concept.

---

> **GitHub**: [quochuydev/visionpipe3d](https://github.com/quochuydev/visionpipe3d)
>
> **Docs**: [visionpipe.com/docs](https://visionpipe.com/docs)

---

What gesture-based interfaces have you built or wanted to build? I'm curious what use cases people are exploring beyond the typical "air guitar" demos.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Hand tracking demo | After "The Solution" | Screenshot of the Playground showing hand landmarks overlaid on webcam feed |
| Landmark diagram | After "How It Works" | Diagram showing the 21 hand landmarks and their IDs (0-20) |
| API response | After curl example | Terminal showing the JSON response from the detection endpoint |
| Pinch animation | After Features table | GIF of the branch-opening sample—hand pinching to control animation angle |

# Banana AI banner prompt

Futuristic illustration of a human hand silhouette with glowing connection points at each joint and fingertip, rendered in a wireframe style. Digital blue and cyan color scheme against dark background. Subtle browser window frame in the corner suggesting web-based technology. Abstract data streams flowing from the hand. Clean, modern tech aesthetic with slight depth-of-field blur effect. No text.
