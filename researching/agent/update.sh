#!/bin/sh

set -e

# mkdir llms

# curl -o ./llms/mcp.md https://modelcontextprotocol.io/llms-full.txt
# curl -o ./llms/cloudflare.md https://developers.cloudflare.com/llms-full.txt
# curl -o ./llms/pinecone.md https://docs.pinecone.io/llms-full.txt
curl -o ./llms/vercel.md https://vercel.com/llms.txt

echo "Ingesting docs into Qdrant..."
npx tsx ./scripts/ingest.ts
