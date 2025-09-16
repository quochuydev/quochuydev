import { defineConfig } from "vocs";

export default defineConfig({
  title: "quochuydev",
  // basePath: process.env.ENVIRONMENT === "development" ? undefined : "/quochuydev",
  sidebar: [
    {
      text: "My portfolio",
      link: "/",
    },
    {
      text: "Work experience",
      link: "/work-experience",
    },
    {
      text: "AI Prompts",
      link: "/ai-prompts",
    },
    {
      text: "AI Website Builder",
      link: "/ai-website-builder",
    },
    {
      text: "Woocommerce with resend.com",
      link: "/woocommerce-with-resend",
    },
    {
      text: "Nganluong Gateway Plugin",
      link: "/woocommerce-nganluong-gateway",
    },
    {
      text: "Woocommerce Marketplace",
      link: "/woocommerce-marketplace",
    },
    {
      text: "Multi OIDC Session Management",
      link: "/multiple-oidc-session-management",
    },
    {
      text: "Zitadel and LemonLDAP integration",
      link: "/zitadel-lemonldap-integration",
    },
    {
      text: "Node.js x AWS x Github Action",
      link: "/nodejs-aws-github-cicd",
    },
    {
      text: "AWS Copilot",
      link: "/aws-copilot",
    },
    {
      text: "PayPal/Stripe Payment",
      link: "/paypal-stripe-payment",
    },
    {
      text: "WBS Management",
      link: "/wbs-management",
    },
    {
      text: "Freelance guide",
      link: "/freelance-guide",
    },
    {
      text: "Freelance communication",
      link: "/freelance-communication",
    },
    {
      text: "Freelance task checklist",
      link: "/freelance-task-checklist",
    },
    {
      text: "Freelance solution template",
      link: "/solution-template",
    },
    {
      text: "Freelance proposal examples",
      link: "/proposal-examples",
    },
    {
      text: "Event Storming with Miro",
      link: "/event-storming-miro",
    },
    {
      text: "Event Storming with Mermaid",
      link: "/event-storming-mermaid",
    },
    {
      text: "WebRTC",
      link: "/webrtc",
    },
  ],
});
