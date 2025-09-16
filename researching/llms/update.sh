#!/bin/sh

set -e

mkdir llms

curl -o ./llms/cloudflare.md https://developers.cloudflare.com/llms-full.txt
curl -o ./llms/mcp.md https://modelcontextprotocol.io/llms-full.txt
curl -o ./llms/metamask.md https://docs.metamask.io/llms.txt
curl -o ./llms/pinecone.md https://docs.pinecone.io/llms-full.txt
curl -o ./llms/shopify.md https://shopify.dev/llms.txt
curl -o ./llms/solana.md https://solana.com/llms.txt
curl -o ./llms/stripe.md https://docs.stripe.com/llms.txt
curl -o ./llms/vercel.md https://vercel.com/llms.txt
curl -o ./llms/zitadel.md https://zitadel.com/docs/llms.txt