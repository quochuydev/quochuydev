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
      text: "Mails free for woocommerce with resend.com",
      link: "/woocommerce-resend",
    },
    {
      text: "Node.js x AWS x Github Action",
      link: "/nodejs-aws-github-cicd",
    },
    {
      text: "Multi-OIDC Session Management Application",
      link: "/multiple-oidc-session-management",
    },
    {
      text: "Zitadel and LemonLDAP (SAML) integration",
      link: "/zitadel-lemonldap-integration",
    },
  ],
});
