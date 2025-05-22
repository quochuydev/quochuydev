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
      text: "Woocommerce with resend.com",
      link: "/woocommerce-with-resend-com",
    },
    {
      text: "Woocommerce Nganluong Gateway Plugin",
      link: "/woocommerce-nganluong-gateway-plugin",
    },
    {
      text: "Woocommerce Marketplace",
      link: "/woocommerce-marketplace",
    },
    {
      text: "Node.js x AWS x Github Action",
      link: "/nodejs-aws-github-cicd",
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
      text: "AI Agent",
      link: "/ai-agent",
    },
    {
      text: "AWS Machine Learning",
      link: "/aws-machine-learning",
    },
    {
      text: "PayPal and Stripe transaction",
      link: "/paypal-stripe-transaction",
    },
    {
      text: "WBS Management",
      link: "/wbs-management",
    },
    {
      text: "Freelancer guide",
      link: "/freelancer-guide",
    },
    {
      text: "Solution template",
      link: "/solution-template",
    },
    {
      text: "Proposal examples",
      link: "/proposal-examples",
    },
    {
      text: "Freelancer task checklist",
      link: "/freelancer-task-checklist",
    },
    {
      text: "Client communication guide",
      link: "/client-communication-guide",
    },
  ],
});
