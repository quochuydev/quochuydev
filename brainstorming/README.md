# Proposal Assistant

A Next.js application that helps freelancers create professional proposals for Upwork jobs through AI-powered brainstorming.

## Features

- 🤖 AI-guided proposal creation using Claude
- 📝 Step-by-step brainstorming conversation
- 🚀 Automatic GitHub integration for proposal storage
- 🌐 Public proposal URLs for client sharing
- 🎨 Upwork-inspired professional design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Get from: https://console.anthropic.com/
GLM_API_KEY=your_GLM_API_KEY_here

# Create from: https://github.com/settings/tokens
# Choose 'repo' scope for full repository access
GITHUB_PERSONAL_TOKEN=your_github_personal_token_here

# Your GitHub username and the repository name for proposals
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=proposals
```

### 3. GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Proposal Assistant")
4. Select **repo** scope for full repository access
5. Generate token and copy it immediately
6. Add the token to your `.env.local` file

### 4. Create Proposals Repository

1. Create a new public repository named `proposals` (or your chosen name)
2. Enable GitHub Pages in repository settings
3. Select source as "Deploy from a branch" and choose `main` branch with `/ (root)` folder

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Paste Job Description**: Copy the complete Upwork job posting
2. **Brainstorm**: Answer Claude's questions about the project
3. **Generate Proposal**: Claude will create a professional proposal and save it to GitHub
4. **Share**: Get a public URL to share with your client

## Architecture

- **Frontend**: Next.js 16 with App Router
- **Backend**: Next.js API Routes
- **AI**: Anthropic Claude API
- **Storage**: GitHub API with GitHub Pages
- **Styling**: Tailwind CSS with Upwork-inspired design

## File Structure

```
brainstorming/
├── app/
│   ├── api/
│   │   └── chat/route.ts              # Claude API integration
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Main application
│   └── globals.css                   # Global styles
├── components/
│   ├── JobPaste.tsx                  # Job description input
│   ├── ChatInterface.tsx             # AI conversation interface
│   └── ProposalView.tsx              # Success state with proposal link
├── lib/
│   └── github.ts                     # GitHub API utilities
├── tailwind.config.js                # Custom color scheme
├── package.json                      # Dependencies
└── README.md                         # This file
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
