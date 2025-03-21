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
      link: "/woocommerce-with-resend",
    },
    {
      text: "Woocommerce Nganluong gateway plugin",
      link: "/woocommerce-nganluong-gateway",
    },
    {
      text: "woocommerce Marketplace",
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
  ],
});
