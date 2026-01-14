# Repo

https://github.com/quochuydev/woocommerce-nganluong-gateway-plugin

# Title

How I Built a WooCommerce Payment Gateway for Vietnamese Banks

# Tags

woocommerce, php, ecommerce, opensource, payments

# Body

Running an e-commerce store in Vietnam? You've probably hit the wall: international payment gateways don't support local banks, and customers abandon carts when they can't pay with their preferred method. I built a plugin that brings QR Code and Internet Banking to WooCommerce.

## The Problem

For Vietnamese e-commerce stores:

- Customers prefer paying via local bank transfers and QR codes
- International gateways (Stripe, PayPal) have limited Vietnam support
- Manual bank transfer verification is error-prone and time-consuming
- Building a payment integration from scratch requires deep API knowledge
- No ready-to-use WooCommerce plugin for Ngan Luong existed

## The Solution: WooCommerce Ngan Luong Gateway

A WordPress plugin that integrates Ngan Luong payment processing directly into WooCommerce checkout.

```php
// Customers see familiar payment options at checkout
// QR Code, Internet Banking, ATM cards - all Vietnamese banks supported
```

Your customers pay with what they know. You get instant payment notifications.

## How It Works

1. **Install the plugin** - Upload to WordPress, activate in WooCommerce
2. **Configure API credentials** - Enter your Ngan Luong merchant account details
3. **Customers checkout** - They see QR Code and Internet Banking options
4. **Receive payments** - Orders update automatically when payment confirms

No redirect to external sites. The checkout stays on your domain with Seamless Checkout integration.

## Get Started in 30 Seconds

```bash
# Download the plugin
wget https://github.com/quochuydev/woocommerce-nganluong-gateway-plugin/raw/main/nganluong-gateway.zip

# Or clone and zip
git clone https://github.com/quochuydev/woocommerce-nganluong-gateway-plugin.git
cd woocommerce-nganluong-gateway-plugin
zip -r nganluong-gateway.zip nganluong-gateway
```

Then in WordPress:
- Go to **Plugins > Add New > Upload Plugin**
- Select `nganluong-gateway.zip`
- Activate and configure in **WooCommerce > Settings > Payments**

## Supported Payment Methods

| Method | Description | Use Case |
| ------ | ----------- | -------- |
| QR Code | Mobile banking scan-to-pay | Quick mobile payments |
| Internet Banking | Direct bank login payment | Desktop customers |
| ATM Cards | Domestic debit cards | Non-credit card users |
| E-wallets | Vietnamese digital wallets | Tech-savvy customers |

## Why This Works

1. **Seamless Checkout** - Customers stay on your site, no jarring redirects to third-party domains
2. **Local bank coverage** - Supports major Vietnamese banks that international gateways ignore
3. **Automatic order updates** - Payment confirmation triggers WooCommerce order status changes
4. **MIT Licensed** - Free to use, modify, and distribute for your projects

## Prerequisites

Before installing, you'll need:
- A [Ngan Luong merchant account](https://www.nganluong.vn/vn/about/index.html)
- API credentials from the [integration portal](https://www.nganluong.vn/vn/integrate/seamless.html)
- WooCommerce installed on your WordPress site

## Try It

If you're running a WooCommerce store targeting Vietnamese customers:

```bash
git clone https://github.com/quochuydev/woocommerce-nganluong-gateway-plugin.git
```

Upload the plugin and configure your Ngan Luong credentials. Your customers will thank you for the familiar payment experience.

---

> **GitHub**: [quochuydev/woocommerce-nganluong-gateway-plugin](https://github.com/quochuydev/woocommerce-nganluong-gateway-plugin)
>
> **Ngan Luong Docs**: [nganluong.vn/integrate/seamless](https://www.nganluong.vn/vn/integrate/seamless.html)

---

What payment challenges have you faced with Vietnamese e-commerce? I'd love to hear how others are handling local payment integrations.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Payment flow diagram | After "How It Works" | A flowchart showing: Customer -> WooCommerce Checkout -> Ngan Luong API -> Bank -> Payment Confirmation -> Order Updated |
| Checkout page | After "Supported Payment Methods" | WooCommerce checkout page showing QR Code and Internet Banking options |
| Plugin settings | After "Get Started" section | WooCommerce > Settings > Payments screen with Ngan Luong gateway configured |
| QR Code example | In "Supported Payment Methods" section | A sample QR code payment screen that customers would see |

# Banana AI banner prompt

Clean modern illustration of a shopping cart icon connected to Vietnamese bank logos through payment flow lines. Include a QR code element and a WooCommerce "W" logo. Color palette: Ngan Luong orange (#F7941D) with purple WooCommerce accent (#96588A) on white background. Flat design style with subtle gradient, professional fintech aesthetic. No text overlay needed.
