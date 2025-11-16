from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
import json
import requests
import pathlib
from dotenv import load_dotenv
from code_manager import CodeManager

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Feature Implementation SDK Manager")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use direct requests instead of Anthropic SDK to avoid proxies issue
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
ANTHROPIC_BASE_URL = os.getenv("ANTHROPIC_BASE_URL")
print("ANTHROPIC_API_KEY", ANTHROPIC_API_KEY)
print("ANTHROPIC_BASE_URL", ANTHROPIC_BASE_URL)

# Source code management paths
PROJECT_ROOT = pathlib.Path(__file__).parent.parent
PROJECT_PATH = PROJECT_ROOT / "project"

# Initialize Code Manager
code_manager = CodeManager(PROJECT_ROOT)


class CodeRequest(BaseModel):
    description: str
    project_context: Dict[str, str] = {}
    request_type: str = "simple"  # "simple" or "complex"


class FileOperation(BaseModel):
    path: str
    content: Optional[str] = None
    operation: str  # "create", "modify", "delete"


class CodeResponse(BaseModel):
    operations: List[FileOperation]
    explanation: str
    success: bool


@app.get("/")
async def root():
    return {"message": "Claude Agent SDK - Source Code Manager is running"}


@app.get("/api/project")
async def get_project_structure():
    """Get current project structure and files"""
    try:
        structure = code_manager.get_project_structure("project")
        file_list = code_manager.get_file_list("project")
        return {"success": True, "files": structure, "file_list": file_list}
    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/api/file/{file_path:path}")
async def get_file_content(file_path: str):
    """Get content of a specific file"""
    try:
        content = code_manager.read_file(file_path)
        return {"success": True, "content": content}
    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/api/sandpack-files")
async def get_sandpack_files():
    """Get project files formatted for Sandpack"""
    try:
        project_structure = code_manager.get_project_structure("project")

        # Map project files to Sandpack format
        sandpack_files = {}

        # Define file mappings and required files
        file_mappings = {
            "project/src/App.tsx": "src/App.tsx",
            "project/src/App.css": "src/App.css",
            "project/src/index.css": "src/index.css",
            "project/src/main.tsx": "src/main.tsx",
            "project/package.json": "package.json",
        }

        # Map files to Sandpack format
        for project_path, sandpack_path in file_mappings.items():
            if project_path in project_structure:
                sandpack_files[sandpack_path] = project_structure[project_path]

        # Get package.json for dependencies if not in project structure
        if "package.json" not in sandpack_files:
            try:
                package_content = code_manager.read_file("project/package.json")
                sandpack_files["package.json"] = package_content
            except:
                # Fallback package.json for React+TypeScript
                sandpack_files["package.json"] = json.dumps(
                    {
                        "name": "project",
                        "private": True,
                        "version": "0.0.0",
                        "type": "module",
                        "scripts": {
                            "dev": "vite",
                            "build": "tsc -b && vite build",
                            "lint": "eslint .",
                            "preview": "vite preview",
                        },
                        "dependencies": {"react": "^19.2.0", "react-dom": "^19.2.0"},
                        "devDependencies": {
                            "@eslint/js": "^9.39.1",
                            "@types/node": "^24.10.0",
                            "@types/react": "^19.2.2",
                            "@types/react-dom": "^19.2.2",
                            "@vitejs/plugin-react": "^5.1.0",
                            "eslint": "^9.39.1",
                            "eslint-plugin-react-hooks": "^7.0.1",
                            "eslint-plugin-react-refresh": "^0.4.24",
                            "globals": "^16.5.0",
                            "typescript": "~5.9.3",
                            "typescript-eslint": "^8.46.3",
                            "vite": "^7.2.2",
                        },
                    },
                    indent=2,
                )

        return {
            "success": True,
            "files": sandpack_files,
            "dependencies": {"react": "^19.2.0", "react-dom": "^19.2.0"},
        }
    except Exception as e:
        return {"success": False, "error": str(e)}


@app.post("/api/generate", response_model=CodeResponse)
async def generate_and_apply_code(request: CodeRequest):
    """Main SDK Manager endpoint that generates and applies source code changes"""

    try:
        # Get current project context
        project_context = code_manager.get_project_structure("project")

        # Build context from existing files
        context = "\n\n".join(
            [
                f"File: {filename}\n```\n{content}\n```"
                for filename, content in project_context.items()
            ]
        )

        # Build prompt based on request type
        if request.request_type == "simple":
            prompt = f"""You are a React/TypeScript developer modifying a v0-style AI assistant app. Analyze this codebase and implement the requested feature.

CURRENT CODEBASE:
{context}

REQUEST: {request.description}

Provide the implementation as a JSON response with this format:
{{
    "operations": [
        {{"path": "frontend/src/App.tsx", "content": "modified content", "operation": "modify"}},
        {{"path": "frontend/src/NewComponent.tsx", "content": "new file content", "operation": "create"}}
    ],
    "explanation": "Brief explanation of what was implemented"
}}

Keep changes minimal and focused on React/TypeScript components. Return only valid JSON."""
        else:
            prompt = f"""You are a senior React/TypeScript developer working on a v0-style AI assistant app with live preview. Analyze this codebase and implement the requested feature.

CURRENT CODEBASE:
{context}

REQUEST: {request.description}

First brainstorm the approach, then implement the solution. Focus on:
- Creating reusable React components
- Maintaining the v0-style chat + preview layout
- Using TypeScript properly
- Following React best practices

Provide the implementation as a JSON response with this format:
{{
    "operations": [
        {{"path": "frontend/src/App.tsx", "content": "modified content", "operation": "modify"}},
        {{"path": "frontend/src/NewComponent.tsx", "content": "new file content", "operation": "create"}}
    ],
    "explanation": "Detailed explanation of what was implemented and why"
}}

Return only valid JSON."""

        headers = {
            "Authorization": f"Bearer {ANTHROPIC_API_KEY}",
            # "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        }

        data = {
            # "model": "claude-sonnet-4-5-20250929",
            "model": "glm-4.6",
            "max_tokens": 4000,
            "messages": [{"role": "user", "content": prompt}],
        }

        response = requests.post(
            f"{ANTHROPIC_BASE_URL}/v1/messages", headers=headers, json=data
        )

        if response.status_code != 200:
            raise Exception(f"API error: {response.status_code} - {response.text}")

        response_data = response.json()
        response_text = response_data["content"][0]["text"]

        # Extract JSON from response
        try:
            # Find JSON in response
            start = response_text.find("{")
            end = response_text.rfind("}") + 1
            json_str = response_text[start:end]
            result = json.loads(json_str)

            # Convert to FileOperation objects
            operations = []
            for op in result.get("operations", []):
                operations.append(
                    FileOperation(
                        path=op["path"],
                        content=op.get("content"),
                        operation=op["operation"],
                    )
                )

            # Apply the operations to the source code
            apply_success = code_manager.apply_operations(operations)

            return CodeResponse(
                operations=operations,
                explanation=result.get("explanation", "Code generation completed"),
                success=apply_success,
            )

        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            return CodeResponse(
                operations=[],
                explanation="Failed to parse implementation. Please try again.",
                success=False,
            )

    except Exception as e:
        return CodeResponse(
            operations=[], explanation=f"Error: {str(e)}", success=False
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
