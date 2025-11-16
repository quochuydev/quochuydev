import pathlib
import os
import json
from typing import Dict, List, Optional
from fastapi import HTTPException


class CodeManager:
    def __init__(self, project_root: pathlib.Path):
        self.project_root = project_root
        self.frontend_path = project_root / "frontend"

    def read_file(self, file_path: str) -> str:
        """Read content from a file"""
        try:
            full_path = self.project_root / file_path
            with open(full_path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            raise HTTPException(status_code=404, detail=f"File not found: {file_path}")

    def write_file(self, file_path: str, content: str) -> bool:
        """Write content to a file"""
        try:
            full_path = self.project_root / file_path
            # Create directories if they don't exist
            full_path.parent.mkdir(parents=True, exist_ok=True)
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"Error writing file {file_path}: {e}")
            return False

    def delete_file(self, file_path: str) -> bool:
        """Delete a file"""
        try:
            full_path = self.project_root / file_path
            if full_path.exists():
                full_path.unlink()
                return True
            return False
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")
            return False

    def get_project_structure(self, path: str = "frontend") -> Dict[str, str]:
        """Get the project structure and file contents"""
        structure = {}
        target_path = self.project_root / path

        if not target_path.exists():
            return structure

        for file_path in target_path.rglob("*"):
            if file_path.is_file() and not any(
                skip in str(file_path)
                for skip in [".git", "node_modules", ".next", "dist"]
            ):
                relative_path = str(file_path.relative_to(self.project_root))
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        # Limit content size for API calls
                        if len(content) > 10000:
                            content = content[:10000] + "\n... (truncated)"
                        structure[relative_path] = content
                except:
                    # Skip binary files
                    pass

        return structure

    def apply_operations(self, operations: List) -> bool:
        """Apply file operations to the source code"""
        success = True
        for op in operations:
            try:
                if op.operation == "create" or op.operation == "modify":
                    if not self.write_file(op.path, op.content or ""):
                        success = False
                elif op.operation == "delete":
                    if not self.delete_file(op.path):
                        success = False
            except Exception as e:
                print(f"Error applying operation {op.operation} on {op.path}: {e}")
                success = False

        return success

    def get_file_list(self, path: str = "frontend") -> List[str]:
        """Get a list of all source files"""
        files = []
        target_path = self.project_root / path

        if not target_path.exists():
            return files

        for file_path in target_path.rglob("*"):
            if file_path.is_file() and not any(
                skip in str(file_path)
                for skip in [".git", "node_modules", ".next", "dist"]
            ):
                relative_path = str(file_path.relative_to(self.project_root))
                files.append(relative_path)

        return sorted(files)
