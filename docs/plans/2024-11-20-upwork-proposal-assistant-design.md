# Upwork Proposal Assistant - Design Document

**Date:** 2024-11-20
**Status:** Ready for Implementation

## Overview

A Next.js application that streamlines Upwork proposal creation through AI-powered brainstorming. Users paste job descriptions, engage in a guided conversation with Claude, and automatically generate professional proposals that are committed to GitHub and served as beautiful web pages.

## Architecture

### High-Level Flow
1. User pastes Upwork job description
2. Claude conducts step-by-step brainstorming conversation
3. Claude generates final proposal markdown
4. Automatic GitHub commit to `/proposals/YYYY-MM-DD-client-name.md`
5. Public GitHub Pages URL for client sharing

### Tech Stack
- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **AI:** Anthropic Claude API with tool functions
- **Storage:** GitHub API with GitHub Pages hosting
- **Authentication:** GitHub OAuth

## Frontend Design

### Component Architecture
```
app/
├── page.tsx                    # Main page with progress indicator
├── components/
│   ├── JobPaste.tsx           # Job description input
│   ├── ChatInterface.tsx      # Real-time conversation with Claude
│   ├── ProposalView.tsx       # Success state with GitHub link
│   └── MarkdownPreview.tsx    # Optional live preview
└── lib/
    └── github.ts              # GitHub API client
```

### User Experience
1. **Paste Stage:** Clean textarea for job description
2. **Brainstorm Stage:** Chat interface with one question at a time
3. **Complete Stage:** Success view with public proposal link

### Design System (Upwork-inspired)
```css
--primary-500: #14a800;      /* Upwork green */
--secondary-500: #374151;    /* Professional gray */
--accent-500: #00bfa5;       /* Upwork teal */
```

## Backend Architecture

### API Routes

#### `/api/chat` (Single Endpoint)
**Purpose:** Handles conversation with Claude and GitHub commits

**Request:**
```json
{
  "message": "string",
  "conversation": "Array<message>",
  "jobDescription": "string"
}
```

**Response:**
```json
{
  "reply": "string",
  "conversation": "Array<message>",
  "completed": "boolean",
  "proposalUrl": "string"
}
```

### Tool Function for Claude
```javascript
{
  name: "commit_to_github",
  description: "Commit final proposal to GitHub repository",
  input_schema: {
    type: "object",
    properties: {
      clientName: { type: "string" },
      projectName: { type: "string" },
      content: { type: "string" }
    },
    required: ["clientName", "projectName", "content"]
  }
}
```

### GitHub Integration

#### File Structure
```
proposals/
├── 2024-11-20-acme-corp-website-redesign.md
├── 2024-11-21-tech-startup-mobile-app.md
└── 2024-11-22-enterprise-api-integration.md
```

#### Commit Function (`lib/github.ts`)
```typescript
export async function commitToGitHub(
  content: string,
  clientName: string,
  projectName: string,
  token: string
): Promise<{
  filename: string;
  url: string;
  commitUrl: string;
}>
```

**Features:**
- Auto-generates filename from date + client + project
- Base64 encoding for GitHub API
- Returns GitHub Pages URL
- Handles file updates (existing file SHA)

## Conversation Context Management

### State Management
```typescript
const [conversation, setConversation] = useState([
  {
    role: "system",
    content: "You are an expert Upwork proposal assistant..."
  },
  // ... conversation history
])
```

### Persistence
- Session storage for refresh resilience
- Full conversation history sent to Claude on each request
- Maintains context across multiple questions

## Security & Authentication

### GitHub OAuth Flow
1. User authenticates with GitHub
2. Access token stored in secure HTTP-only cookies
3. Token validation on each API call
4. Repository access permissions enforced

### Environment Variables
```
ANTHROPIC_API_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REPO_OWNER=
GITHUB_REPO_NAME=
NEXTAUTH_SECRET=
```

## Error Handling

### API Errors
- Claude API rate limiting
- GitHub API quota management
- Invalid file sizes/formats
- Network timeouts

### User Experience
- Loading states during API calls
- Graceful degradation on failures
- Retry mechanisms for transient errors
- Clear error messages with action steps

## Deployment

### Hosting Options
- **Vercel:** Recommended for Next.js apps
- **Netlify:** Alternative with GitHub integration
- **Self-hosted:** Docker deployment option

### GitHub Setup
1. Create proposals repository
2. Enable GitHub Pages
3. Configure GitHub App for API access
4. Set up appropriate branch protection

## Future Enhancements

### Phase 2 Features
- Proposal templates library
- Client tracking database
- Analytics on proposal conversion
- Bulk proposal generation
- Integration with Upwork API

### Technical Improvements
- Real-time collaboration
- Advanced markdown editing
- Custom domain support
- Proposal versioning

## Implementation Timeline

**Phase 1 (MVP):**
- [ ] Next.js app setup
- [ ] GitHub OAuth integration
- [ ] Claude API with tool functions
- [ ] Basic chat interface
- [ ] GitHub commit functionality
- [ ] GitHub Pages deployment

**Phase 2 (Enhancements):**
- [ ] Advanced UI components
- [ ] Error handling improvements
- [ ] Performance optimization
- [ ] Testing coverage

---

This design provides a complete roadmap for building the Upwork Proposal Assistant with modern web technologies and AI-powered capabilities.