---
description: Read install guide from a URL, clone the repo, and run it locally
---

# Run Project Locally from URL

Set up and run locally: **$ARGUMENTS**

## Instructions

### 1. Identify the URL

The user will provide a URL. It could be:
- A GitHub repository URL (e.g., `https://github.com/owner/repo`)
- A documentation/install guide URL
- A raw README URL

### 2. Fetch and Read the Install Guide

- **If GitHub repo URL**: Use WebFetch to read the README:
  - Try `https://raw.githubusercontent.com/{owner}/{repo}/main/README.md`
  - If that fails, try `https://raw.githubusercontent.com/{owner}/{repo}/master/README.md`
  - Also check for docs like `CONTRIBUTING.md`, `INSTALL.md`, `docs/getting-started.md`
- **If other URL**: Use WebFetch to read the page content directly
- Extract key information:
  - Prerequisites (Node.js version, Python version, system dependencies, etc.)
  - Installation steps
  - Environment variables needed
  - How to start the development server
  - Default ports and URLs

### 3. Clone the Repository

- Determine the git clone URL from the provided link
- Clone into a temporary or appropriate working directory:
  ```
  cd /tmp && git clone <repo-url>
  ```
- Navigate into the cloned directory

### 4. Install Dependencies

Based on the install guide, detect the package manager and install:

- **Node.js projects**: Check for `package-lock.json` (npm), `yarn.lock` (yarn), `pnpm-lock.yaml` (pnpm), `bun.lockb` (bun)
  - Run the appropriate install command
- **Python projects**: Check for `requirements.txt`, `pyproject.toml`, `Pipfile`, `setup.py`
  - Create a virtual environment if needed
  - Install dependencies
- **Go projects**: Run `go mod download`
- **Rust projects**: Run `cargo build`
- **Docker projects**: If `docker-compose.yml` exists, use `docker compose up`
- **Other**: Follow the README instructions

### 5. Set Up Environment

- Check for `.env.example` or `.env.sample` files
- Copy to `.env` and inform the user about any required environment variables they need to fill in
- If there are required API keys or secrets, STOP and ask the user to provide them before proceeding

### 6. Run the Project

- Start the development server using the appropriate command from the README
- Run the server in the background so the user can continue working
- Tell the user:
  - The URL where the app is running (e.g., `http://localhost:3000`)
  - How to stop the server
  - Any default credentials if mentioned in the docs

### 7. Verify

- After starting, wait a few seconds and check if the server is running
- If it fails, read the error output, diagnose the issue, and attempt to fix it
- Common issues to handle:
  - Missing system dependencies → suggest install commands
  - Port already in use → try a different port
  - Missing environment variables → ask the user
  - Version mismatches → suggest using nvm/pyenv/etc.

## Important Notes

- ALWAYS read the install guide thoroughly before attempting any setup
- If the project requires paid API keys or services, inform the user before proceeding
- If the README has multiple setup options (Docker vs local), prefer local development setup unless the user specifies otherwise
- Do NOT modify the cloned project's source code unless needed to fix setup issues
- If setup requires interactive input, ask the user for the values

Now fetch and set up: **$ARGUMENTS**
