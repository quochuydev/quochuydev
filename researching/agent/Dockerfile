FROM node:20.15.1-alpine

WORKDIR /app

# Copy package.json only (no package-lock.json to avoid stale dependencies)
COPY package.json ./

# Install dependencies fresh
RUN npm install

# Copy source code
COPY . .

# Expose MCP server port
EXPOSE 8079

# Start the agent
CMD ["npm", "start"]
