import { defineConfig } from "vocs";

export default defineConfig({
  title: "Docs",
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
  ],
});
