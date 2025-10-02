### Setup

```sh
windsurf ~/.codeium/windsurf/mcp_config.json
```

```json
{
  "mcpServers": {
    "core-x": {
      "serverUrl": "http://localhost:8088/sse",
      "headers": {}
    }
  }
}
```

### Commands

```sh
# Format job: upwork-job-formatter.md

# Analyze
npm run analyze job_id

npm run analyze 021964924377118179548

# 1. Install Python 3.12 with Homebrew
brew install python@3.12

# 2. Verify installation
python3.12 --version
# should show Python 3.12.x

# 3. Create a fresh virtual environment
python3.12 -m venv graphrag-env

# 4. Activate the environment
source graphrag-env/bin/activate

# 5. Upgrade pip inside the venv
python -m pip install --upgrade pip

# 6. Install graphrag inside the venv
python -m pip install graphrag

source graphrag-env/bin/activate

# Graphrag
mkdir -p ./project-1/input

graphrag init --root ./project-1

graphrag index --root ./project-1

graphrag query \
--root ./project-1 \
--method global \
--query "What are the top themes in this story?"

graphrag query \
--root ./project-1 \
--method local \
--query "Who is Scrooge and what are his main relationships?"

# https://github.com/run-llama/llama_index
pip3 install llama-index-core llama-index-llms-openai llama-index-llms-replicate llama-index-embeddings-huggingface
pip3 install llama-index-core
pip3 install llama-index-llms-openai
pip3 install llama-index-llms-replicate
pip3 install llama-index-embeddings-huggingface

# Install uv
python3 -m pip install uv
python3 -m venv .venv
source .venv/bin/activate
pip install uv

$HOME/.local/bin/uv run generate

$HOME/.local/bin/uv run llamactl deploy llama_deploy.yml

# Drawio
npm run generate billing

npm run generate login-feature

npm run generate login-feature-2


```

### Sources

```
https://www.upwork.com/nx/search/jobs/?location=Australia%20and%20New%20Zealand,Northern%20America,Europe&nbs=1&q=shopify&sort=recency

https://github.com/microsoft/graphrag/blob/main/docs/get_started.md

https://github.com/microsoft/graphrag/issues/741?utm_source=chatgpt.com
```

### Claude code vs MCP

https://www.llamaindex.ai/blog/adding-document-understanding-to-claude-code

During code generation, Claude Code can choose to query the MCP server to give it rich context about your business processes, policies, and data structures.

prompt:

- Create an expense approval workflow.

### Domain Knowledge

- User Management

Domain - Feature - Components: Accounting Expense Approval Workflow

- Accounting - User Management - List Users (User: firstName, lastName, email, role)
  - Intent layout - TODO
- Accounting - User Management - Create User (User: firstName, lastName, email, role)
- Accounting - User Management - Update User (User: firstName, lastName, email, role)
- Accounting - User Management - Update User Role (User: userId, role)
- Accounting - Expense Management - List Expenses (Expense: description, amount, date, status)
- Accounting - Expense Management - Create Expense (Expense: description, amount, date, status)
- Accounting - Expense Management - Integrate OCR Expense (Expense: description, amount, date, status)
- Accounting - Approval Workflow - List Approvals (Approval: description, amount, date, status)
- Accounting - Approval Workflow - Manager Approval/Reject (Approval: description, amount, date, status)
- Accounting - Approval Workflow - Accountant Approval/Reject (Approval: description, amount, date, status)

----- prompt

# ** Domain Knowledge for Accounting - User Management **

## **Overview: Purpose and Problem Solving**

- ...

## **Proposal**

- ...

## **Weighting / Pros and Cons**

### **Pros**

- ...

### **Cons**

- ...

## **Implementation Steps**

### \*\*1. ...

- ...

### \*\*2. ....

- ...
  ...

## **Conclusion**

- ...
  ...

## **References**

- ...
  ...

```




```
