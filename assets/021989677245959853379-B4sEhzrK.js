import{u as i,j as e}from"./index-B2-KERsq.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"AI-Powered Web App Builder - Design Document"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Date:"}),` 2025-01-15
`,e.jsx(n.strong,{children:"Purpose:"}),` MVP GitHub repo for Upwork Full Stack Developer position
`,e.jsx(n.strong,{children:"Tech Stack:"})," Django + LangChain + PostgreSQL + Vite React TypeScript + Sandpack"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"An AI-powered web application generator using a multi-agent LangChain system. Users describe what they want to build through a chat interface, and three specialized agents (Brainstorming, Planning, Code Generation) work together to create a working React application with live preview and GitHub export."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Key Value Propositions:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Demonstrates multi-agent AI architecture (LangChain with Anthropic Claude)"}),`
`,e.jsx(n.li,{children:"Shows full-stack Python + React/TypeScript skills"}),`
`,e.jsx(n.li,{children:"Real-time streaming responses and live code preview"}),`
`,e.jsx(n.li,{children:"GitHub API integration for repo export"}),`
`,e.jsx(n.li,{children:"Clean architecture suitable for demo/portfolio"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Architecture"}),`
`,e.jsx(n.h3,{children:"High-Level System Design"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Backend (Django + LangChain + PostgreSQL):"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Three LangChain agents using Anthropic Claude:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"BrainstormingAgent"}),": Asks clarifying questions, explores requirements, defines app scope"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"PlanningAgent"}),": Creates structured implementation plan with components, features, file structure"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CodeGenerationAgent"}),": Generates React/TypeScript code based on the plan"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Django REST API handles:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chat message streaming (Server-Sent Events)"}),`
`,e.jsx(n.li,{children:"Project/conversation storage in PostgreSQL"}),`
`,e.jsx(n.li,{children:"Generated code storage (files, versions)"}),`
`,e.jsx(n.li,{children:"GitHub integration for repo export"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Frontend (Vite + React + TypeScript):"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Split-panel UI: Chat interface on left, Sandpack preview on right"}),`
`,e.jsx(n.li,{children:"Real-time streaming of agent responses"}),`
`,e.jsx(n.li,{children:"Sandpack shows live preview as code generates"}),`
`,e.jsx(n.li,{children:"File tree to browse generated files"}),`
`,e.jsx(n.li,{children:'"Export to GitHub" button when ready'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Data Flow:"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"User sends message → Django receives"}),`
`,e.jsx(n.li,{children:"Current agent processes (Brainstorm → Plan → CodeGen sequence)"}),`
`,e.jsx(n.li,{children:"Agent responses stream back to frontend via SSE"}),`
`,e.jsx(n.li,{children:"When CodeGenAgent completes, code saves to Postgres"}),`
`,e.jsx(n.li,{children:"Frontend loads code into Sandpack for preview"}),`
`,e.jsx(n.li,{children:"User can iterate via chat or export to GitHub"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Multi-Agent Workflow"}),`
`,e.jsx(n.h3,{children:"Agent Orchestration"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"1. BrainstormingAgent (Discovery Phase)"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Triggers"}),': First user message or when user says "start over"']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tools"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ask_clarifying_question"})," - asks one question at a time"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"summarize_requirements"})," - creates requirements summary"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prompt"}),": Act as product designer, explore user needs, YAGNI ruthlessly, identify core features only"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Output"}),": Requirements document (stored in ",e.jsx(n.code,{children:"projects.brainstorm_data"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Transition"}),": When enough info gathered, automatically invokes PlanningAgent"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"2. PlanningAgent (Design Phase)"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Triggers"}),': After BrainstormingAgent completes, or user says "revise plan"']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tools"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"create_component_list"})," - defines React components needed"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"create_file_structure"})," - plans folder/file organization"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"finalize_plan"})," - creates complete technical plan"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prompt"}),": Act as software architect, design simple React app, use Tailwind, focus on clean component structure"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Output"}),": Technical plan JSON (components, file structure, dependencies)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Transition"}),": Auto-invokes CodeGenerationAgent when plan finalized"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"3. CodeGenerationAgent (Implementation Phase)"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Triggers"}),": After PlanningAgent completes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tools"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"generate_file"})," - creates one file at a time"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"update_file"})," - modifies existing file based on user feedback"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prompt"}),": Act as senior React developer, generate clean TypeScript code, follow plan exactly, use functional components + hooks"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Output"}),": Complete file set (stored in ",e.jsx(n.code,{children:"generated_files"})," table)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Chat Refinements"}),": User can request changes, agent updates specific files"]}),`
`]}),`
`,e.jsx(n.h3,{children:"Coordinator Logic (Python/Django)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`class AgentCoordinator:
    def __init__(self):
        self.llm = ChatAnthropic(model="claude-sonnet-4-5")
        self.brainstorming_agent = BrainstormingAgent(self.llm)
        self.planning_agent = PlanningAgent(self.llm)
        self.code_gen_agent = CodeGenerationAgent(self.llm)

    def process_message(self, project_id, user_message):
        project = get_project(project_id)

        # Determine current phase
        if not project.brainstorm_data:
            return self.brainstorming_agent.run(user_message)
        elif not project.plan_data:
            return self.planning_agent.run(user_message, project.brainstorm_data)
        elif not project.generated_files:
            return self.code_gen_agent.run(user_message, project.plan_data)
        else:
            # Refinement phase - route to CodeGenAgent
            return self.code_gen_agent.refine(user_message, project)
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Database Schema"}),`
`,e.jsx(n.h3,{children:"PostgreSQL Tables"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"1. projects"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-sql",children:`- id (uuid, primary key)
- user_id (varchar, nullable) - Not used in MVP (shareable links only)
- title (varchar) - auto-generated from brainstorming
- created_at (timestamp)
- updated_at (timestamp)
- current_phase (enum: 'brainstorming', 'planning', 'coding', 'completed')
- brainstorm_data (jsonb) - requirements, Q&A history
- plan_data (jsonb) - component list, file structure, dependencies
- github_repo_url (varchar, nullable) - set when exported
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"2. messages"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-sql",children:`- id (uuid, primary key)
- project_id (uuid, foreign key → projects.id)
- role (enum: 'user', 'agent')
- content (text) - message text
- agent_name (varchar, nullable) - 'BrainstormingAgent', 'PlanningAgent', etc.
- created_at (timestamp)
- metadata (jsonb) - any extra data (tool calls, thinking process)
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"3. generated_files"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-sql",children:`- id (uuid, primary key)
- project_id (uuid, foreign key → projects.id)
- file_path (varchar) - e.g., 'src/App.tsx', 'src/components/Header.tsx'
- content (text) - actual file code
- version (integer) - increments on updates
- created_at (timestamp)
- updated_at (timestamp)
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Design Decisions:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"JSONB for flexible storage of brainstorm/plan data"}),`
`,e.jsxs(n.li,{children:["Versioning in ",e.jsx(n.code,{children:"generated_files"})," for iteration tracking"]}),`
`,e.jsxs(n.li,{children:["Separate ",e.jsx(n.code,{children:"messages"})," table for clean chat history"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"current_phase"})," helps coordinator know where project is"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Frontend UI & User Experience"}),`
`,e.jsx(n.h3,{children:"Layout (Split Panel)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`┌─────────────────────────────────────────────────────────┐
│  AI App Builder                    [Export to GitHub]   │
├──────────────────┬──────────────────────────────────────┤
│                  │                                       │
│   Chat Panel     │      Sandpack Preview Panel          │
│   (40% width)    │      (60% width)                     │
│                  │                                       │
│  ┌────────────┐  │  ┌─────────────────────────────┐    │
│  │ Agent:     │  │  │  File Explorer  │ Preview   │    │
│  │ Brainstorm │  │  │                 │           │    │
│  │            │  │  │ src/            │ [iframe]  │    │
│  │ "What kind │  │  │  App.tsx ✓      │           │    │
│  │  of app?"  │  │  │  Header.tsx     │           │    │
│  └────────────┘  │  │  Footer.tsx     │           │    │
│                  │  │                 │           │    │
│  ┌────────────┐  │  │ package.json    │           │    │
│  │ User:      │  │  │                 │           │    │
│  │ "A todo    │  │  └─────────────────────────────┘    │
│  │  list app" │  │                                       │
│  └────────────┘  │                                       │
│                  │                                       │
│  [Input box... ] │                                       │
└──────────────────┴──────────────────────────────────────┘
`})}),`
`,e.jsx(n.h3,{children:"Component Breakdown"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"ChatPanel Component:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Auto-scrolling message list"}),`
`,e.jsx(n.li,{children:'Messages show agent name badge ("🤔 Brainstorming", "📋 Planning", "⚡ Coding")'}),`
`,e.jsx(n.li,{children:"Streaming messages appear word-by-word (SSE)"}),`
`,e.jsx(n.li,{children:"Input box at bottom with Send button"}),`
`,e.jsx(n.li,{children:'Shows "Agent is thinking..." indicator during processing'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"SandpackPreviewPanel Component:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Hidden during brainstorming/planning phases"}),`
`,e.jsx(n.li,{children:"Appears when CodeGenerationAgent starts producing files"}),`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:"@codesandbox/sandpack-react"}),":",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<SandpackProvider
  template="react-ts"
  files={generatedFiles}
  customSetup={{
    dependencies: { /* from plan_data */ }
  }}
>
  <SandpackLayout>
    <SandpackFileExplorer />
    <SandpackCodeEditor />
    <SandpackPreview />
  </SandpackLayout>
</SandpackProvider>
`})}),`
`]}),`
`,e.jsx(n.li,{children:"Real-time updates when agent generates/modifies files"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Header Component:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Project title (auto-generated)"}),`
`,e.jsx(n.li,{children:`"Export to GitHub" button (enabled when in 'completed' phase)`}),`
`,e.jsx(n.li,{children:"Phase indicator badge"}),`
`]}),`
`,e.jsx(n.h3,{children:"Key UX Flows"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"New project"}),': Landing page → "Start New Project" → ',e.jsx(n.code,{children:"/project/{uuid}"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Code generated"}),": Sandpack fades in, shows live preview"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Refinement"}),': User types "add dark mode" → agent updates files → Sandpack reloads']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Export"}),": Click button → modal shows GitHub repo created → link to view"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"API & Real-Time Communication"}),`
`,e.jsx(n.h3,{children:"REST API Endpoints (Django REST Framework)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`POST   /api/projects/                    # Create new project
GET    /api/projects/:id/                # Get project details
GET    /api/projects/:id/messages/       # Get chat history
POST   /api/projects/:id/messages/       # Send user message
GET    /api/projects/:id/stream/         # SSE stream for agent responses
GET    /api/projects/:id/files/          # Get all generated files
POST   /api/projects/:id/export-github/  # Export to GitHub
`})}),`
`,e.jsx(n.h3,{children:"Real-Time Streaming (Server-Sent Events)"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Django Backend:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`from django.http import StreamingHttpResponse

def stream_agent_response(request, project_id):
    def event_stream():
        for chunk in agent_coordinator.process_message_stream(project_id, message):
            yield f"data: {json.dumps(chunk)}\\n\\n"

    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"React Frontend:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`const eventSource = new EventSource(\`/api/projects/\${id}/stream/\`);
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'message_chunk') {
    appendToLastMessage(data.content);
  } else if (data.type === 'file_generated') {
    updateSandpackFiles(data.file_path, data.content);
  } else if (data.type === 'phase_change') {
    setCurrentPhase(data.phase);
  }
};
`})}),`
`,e.jsx(n.h3,{children:"Message Flow"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"User types message, clicks Send"}),`
`,e.jsxs(n.li,{children:["Frontend POSTs to ",e.jsx(n.code,{children:"/api/projects/:id/messages/"})]}),`
`,e.jsx(n.li,{children:"Django creates message record, returns immediately"}),`
`,e.jsxs(n.li,{children:["Frontend opens SSE connection to ",e.jsx(n.code,{children:"/api/projects/:id/stream/"})]}),`
`,e.jsx(n.li,{children:"Backend streams agent response chunks"}),`
`,e.jsxs(n.li,{children:["When agent generates files, sends ",e.jsx(n.code,{children:"file_generated"})," events"]}),`
`,e.jsx(n.li,{children:"Frontend updates Sandpack in real-time"}),`
`,e.jsx(n.li,{children:"SSE closes when agent finishes"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Why SSE over WebSocket?"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Simpler implementation (no Django Channels for MVP)"}),`
`,e.jsx(n.li,{children:"Auto-reconnection built-in"}),`
`,e.jsx(n.li,{children:"One-way communication is sufficient"}),`
`,e.jsx(n.li,{children:"Less infrastructure overhead"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"GitHub Export Integration"}),`
`,e.jsx(n.h3,{children:"Implementation"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"PyGithub Integration:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`from github import Github

class GitHubService:
    def __init__(self, access_token):
        self.client = Github(access_token)

    def create_repo_from_project(self, project):
        user = self.client.get_user()

        # Create repo
        repo_name = f"{project.title.lower().replace(' ', '-')}"
        repo = user.create_repo(
            name=repo_name,
            description=f"Generated by AI App Builder",
            private=False,
            auto_init=True
        )

        # Create files in repo
        files = project.generated_files.all()
        for file in files:
            repo.create_file(
                path=file.file_path,
                message=f"Add {file.file_path}",
                content=file.content
            )

        # Create README.md
        readme_content = self.generate_readme(project)
        repo.create_file("README.md", "Add README", readme_content)

        return repo.html_url
`})}),`
`,e.jsx(n.h3,{children:"Authentication Strategy (MVP)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Store personal GitHub token in Django settings"}),`
`,e.jsx(n.li,{children:"All repos created under your account"}),`
`,e.jsx(n.li,{children:'Users just click "Export" - no OAuth needed'}),`
`,e.jsx(n.li,{children:"Good enough to demo the feature"}),`
`]}),`
`,e.jsx(n.h3,{children:"What Gets Exported"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["All files from ",e.jsx(n.code,{children:"generated_files"})," table"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"package.json"})," with dependencies"]}),`
`,e.jsxs(n.li,{children:["Auto-generated ",e.jsx(n.code,{children:"README.md"})," with setup instructions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:".gitignore"})," (node_modules, .env, etc.)"]}),`
`,e.jsxs(n.li,{children:["Optional: ",e.jsx(n.code,{children:"vercel.json"})," for easy deployment"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Error Handling & Logging"}),`
`,e.jsx(n.h3,{children:"Agent Failures"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"LLM API Errors:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`try:
    for chunk in agent.run(message):
        yield chunk
except anthropic.RateLimitError:
    yield {"type": "error", "message": "AI is busy, please try again"}
except anthropic.APIError as e:
    error_id = RequestLogger.log_error(e, context)
    yield {"type": "error", "message": f"Error ID: {error_id}"}
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Invalid Code Generation:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Sandpack shows console errors"}),`
`,e.jsx(n.li,{children:'User can ask: "Fix the syntax error in App.tsx"'}),`
`,e.jsx(n.li,{children:"Agent regenerates that file"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Agent Timeouts:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"60s timeout per agent phase"}),`
`,e.jsx(n.li,{children:'Show error + "Start Over" button if stuck'}),`
`]}),`
`,e.jsx(n.h3,{children:"Simple Logging with Short IDs"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`import shortuuid
import logging

class RequestLogger:
    @staticmethod
    def log_error(error, context=None):
        error_id = shortuuid.ShortUUID().random(length=8)  # e.g., "a3kF9mN2"

        logger.error(f"[{error_id}] {error}", extra={
            'error_id': error_id,
            'context': context
        })

        return error_id
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"User sees:"}),' "Something went wrong. Error ID: ',e.jsx(n.strong,{children:"a3kF9mN2"}),`" (clickable to copy)
`,e.jsx(n.strong,{children:"Developer pastes:"})," ",e.jsx(n.code,{children:"a3kF9mN2"})," in logs to find exact error + context"]}),`
`,e.jsx(n.h3,{children:"Frontend Error Handling"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"SSE Connection Drops:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`eventSource.onerror = () => {
  setError("Connection lost. Retrying...");
  setTimeout(() => reconnect(), 2000);
};
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Edge Cases:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Invalid project URL → 404 page with "Start New Project"'}),`
`,e.jsx(n.li,{children:"Large files → Limit to 50 files max, 10KB each"}),`
`,e.jsx(n.li,{children:"GitHub errors → Show friendly message, log for debugging"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Deployment & Setup"}),`
`,e.jsx(n.h3,{children:"Local Development with Docker"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Project Structure:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`prototypes/
├── backend/              # Django project
│   ├── agents/           # LangChain agents
│   ├── api/              # REST views
│   ├── models.py         # DB models
│   ├── requirements.txt
│   ├── Dockerfile
│   └── manage.py
├── frontend/             # Vite React
│   ├── src/
│   │   ├── components/   # ChatPanel, SandpackPanel, etc.
│   │   ├── hooks/        # useProject, useSSE
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml
├── .env.example
└── README.md
`})}),`
`,e.jsx(n.h3,{children:"Docker Compose Setup"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-yaml",children:`version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ai_builder
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/ai_builder
      ANTHROPIC_API_KEY: \${ANTHROPIC_API_KEY}
      GITHUB_TOKEN: \${GITHUB_TOKEN}
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    command: npm run dev -- --host
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: http://localhost:8000

volumes:
  postgres_data:
`})}),`
`,e.jsx(n.h3,{children:"Quick Start"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# Clone and setup
cd prototypes
cp .env.example .env  # Add ANTHROPIC_API_KEY and GITHUB_TOKEN

# Run everything
docker-compose up

# Access:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
`})}),`
`,e.jsx(n.h3,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["Backend ",e.jsx(n.code,{children:"requirements.txt"}),":"]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Django==5.0
djangorestframework==3.14
psycopg2-binary==2.9
langchain==0.1
langchain-anthropic==0.1
PyGithub==2.1
shortuuid==1.0
python-dotenv==1.0
django-cors-headers==4.3
`})}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["Frontend ",e.jsx(n.code,{children:"package.json"}),":"]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "dependencies": {
    "react": "^18.2",
    "@codesandbox/sandpack-react": "^2.13",
    "tailwindcss": "^3.4"
  }
}
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Success Criteria"}),`
`,e.jsx(n.p,{children:"This MVP successfully demonstrates:"}),`
`,e.jsxs(n.p,{children:["✅ ",e.jsx(n.strong,{children:"Multi-agent AI architecture"}),` - LangChain agents with specialized roles
✅ `,e.jsx(n.strong,{children:"LLM integration"}),` - Anthropic Claude API usage
✅ `,e.jsx(n.strong,{children:"Full-stack skills"}),` - Python/Django backend + React/TypeScript frontend
✅ `,e.jsx(n.strong,{children:"Real-time features"}),` - SSE streaming, live preview
✅ `,e.jsx(n.strong,{children:"External API integration"}),` - GitHub repo creation
✅ `,e.jsx(n.strong,{children:"Database design"}),` - PostgreSQL with JSONB, proper relationships
✅ `,e.jsx(n.strong,{children:"Modern tooling"}),` - Docker, Sandpack, Vite
✅ `,e.jsx(n.strong,{children:"User experience"})," - Chat-based interface, instant feedback"]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Portfolio Value:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Clean, well-architected codebase"}),`
`,e.jsx(n.li,{children:"Working demo in minutes (Docker Compose up)"}),`
`,e.jsx(n.li,{children:"Showcases exactly what the Upwork job requires"}),`
`,e.jsx(n.li,{children:"Expandable foundation for more features"}),`
`]})]})}function l(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{l as default};
