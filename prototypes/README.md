# Feature Implementation Assistant MVP

Built using the anthropic Python SDK for code analysis and feature implementation.

## Architecture

Follows the app builder platform architecture with hybrid agent approach:

```
isSimpleRequest → enhanced codeModifyAgent → codeGenerated
isComplexRequest → brainstormingAgent → codeGenAgent → codeGenerated
```

## Setup

### Backend (Python + FastAPI)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your ANTHROPIC_API_KEY
python main.py
```

### Frontend (Vite + React + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Upload codebase files (.tsx, .ts, .js, .py, .md)
2. Describe the feature to implement
3. Choose request type:
   - **Simple**: Direct implementation for basic changes
   - **Complex**: With analysis for major features
4. Click "Implement Feature"
5. Review changes and explanations

## Technology Stack

- **Backend**: FastAPI + Anthropic Python SDK
- **Frontend**: Vite + React + TypeScript + Axios
- **AI**: Claude Sonnet 4.5 model for code analysis and generation

## Features

- File upload and codebase analysis
- Simple vs complex request routing
- Direct code changes with explanations
- Minimal context approach for efficiency
- Clean request-response pattern between agents