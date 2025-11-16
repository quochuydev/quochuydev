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

# from claude_agent_sdk import query

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Feature Implementation SDK Manager")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Claude API configuration
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
ANTHROPIC_BASE_URL = os.getenv("ANTHROPIC_BASE_URL")

# Print SDK availability and configuration
print("ANTHROPIC_API_KEY", "*****" if ANTHROPIC_API_KEY else "Not set")
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
    return {
        "message": "Claude Agent SDK - Source Code Manager is running",
        "python_version": f"{os.sys.version_info.major}.{os.sys.version_info.minor}.{os.sys.version_info.micro}",
    }


@app.get("/api/status")
async def get_status():
    """Get the status of Claude Agent SDK and system information"""
    return {
        "python_version": f"{os.sys.version_info.major}.{os.sys.version_info.minor}.{os.sys.version_info.micro}",
        "anthropic_configured": bool(ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL),
        "working_directory": str(PROJECT_ROOT),
    }


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

        return {
            "success": True,
            "files": sandpack_files,
            "dependencies": {"react": "^19.2.0", "react-dom": "^19.2.0"},
        }
    except Exception as e:
        return {"success": False, "error": str(e)}


async def generate_code_with_sdk(prompt: str) -> str:
    """Generate code using Claude Agent SDK or fallback to requests"""
    try:
        response_text = ""
        async for message in query(prompt=prompt):
            response_text += str(message)
        return response_text
    except Exception as e:
        print(f"Claude SDK error, falling back to requests: {e}")


@app.post("/api/generate", response_model=CodeResponse)
async def generate_and_apply_code(request: CodeRequest):
    """Main SDK Manager endpoint that generates and applies source code changes using Claude Agent SDK"""

    try:
        # Get current project context
        project_context = code_manager.get_project_structure("project")

        # Build context from existing files (CSS and TSX only)
        context = "\n\n".join(
            [
                f"File: {filename}\n```\n{content}\n```"
                for filename, content in project_context.items()
                if filename.endswith(".css") or filename.endswith(".tsx")
            ]
        )

        prompt = (
            f"Generate React TypeScript code for: {request.description}\n\n"
            f"Current code:\n\n{context}\n\n"
            """Return this exact JSON format:
{
    "operations": [
        {
            "path": "project/src/App.tsx",
            "content": "import React, { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', color: 'white', fontFamily: 'Arial' }}}>\n      <h1>Counter: {count}</h1>\n      <button onClick={() => setCount(count + 1)} style={{ margin: '10px', padding: '10px 20px' }}>+</button>\n      <button onClick={() => setCount(count - 1)} style={{ margin: '10px', padding: '10px 20px' }}>-</button>\n    </div>\n  );\n}\n\nexport default App;",
            "operation": "modify"
        }
    ],
    "explanation": "Generated counter app"
}

No explanations, just JSON."""
        )

        print("Prompt:", prompt)

        headers = {
            "Authorization": f"Bearer {ANTHROPIC_API_KEY}",
            "content-type": "application/json",
        }

        data = {
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
