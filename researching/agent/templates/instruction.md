# INSTRUCTION

Metadata:

- request_id: {{request_id}}
- client_id: {{client_id}}
- project_id: {{project_id}}
- received_at: {{ISO8601 timestamp}}
- priority: {{low|medium|high|urgent}}
- files_attached: [{{file1}}, {{file2}}, ...]

Client Problem Statement:

- goal: {{single-sentence summary of client's goal}}
- acceptance_criteria: [
  "{{AC1 - functional}}",
  "{{AC2 - performance/scale}}",
  "{{AC3 - security/compliance}}"
  ]
- sample_input / sample_output: {{if provided}}

Processing steps (agent MUST follow in order):

1. **Parse & classify request**

   - Classify: type = {feature|bug|refactor|research|demo|prototype|ops}
   - Identify requested artifacts: {code, api_spec, tests, deployment, design}
   - Extract constraints: language, frameworks, infra, tokens, budget, latency.

2. **Context & KB retrieval**

   - Create embedding of the client prompt and any attachments.
   - Query KB with filters: project_id, client_id. Retrieve top 10 chunks; re-rank using cross-encoder.
   - Attach KB context list (id, title, sim, excerpt) into `kb_context`.

3. **Assumptions**

   - If any required info is missing (auth, infra, data format), list explicit assumptions (max 6).
   - Mark which assumptions are "blocking" vs "non-blocking".

4. **Design & plan**

   - Provide architecture diagram (textual or mermaid) and component responsibilities.
   - Provide API contract(s) – JSON Schema + example requests/responses.
   - Provide data schema / DB migration plan if needed.
   - Provide non-functional targets (latency, RPS, cost estimates, storage).

5. **Implementation**

   - Generate code artifacts: file tree, each file's contents in separate code blocks, and build/test commands.
   - For ML/LLM components: include model selection rationale, tokenizer, prompt template, safety filters, batching, caching strategy, and sampling settings.
   - Provide RAG integration code: embedding call, vector query, context concatenation, fallback behavior if no relevant docs, caching TTL, eviction strategy.

6. **Tests & validation**

   - Unit tests (examples using your project's test framework).
   - Integration test scaffolding (how to run end-to-end).
   - Performance test plan (tools and sample scripts: e.g., loader, concurrency).

7. **Security & compliance checks**

   - Secrets handling (vault usage; no hard-coded secrets).
   - Input validation & rate limiting.
   - PII detection & redaction steps.
   - Dependency list & vulnerability scan commands.

8. **Deliverables & commands**

   - List deliverables (file paths and summary).
   - Explicit commands: build, test, lint, run, deploy (with env examples).
   - If deployment is included: provide terraform/infra-as-code snippets and a rollback plan.

9. **Confidence & next steps**

   - Output `confidence` and succinct justification.
   - Provide followup questions (labeled "Optional clarifications") if anything recommended but not required.

10. **Final structured output**

- End the message with the `__agent_response_json__` object as required by the System Prompt.

EXAMPLE (short):

- request_id: 123
- client goal: "Add LLM-based code completion endpoint to repo X"
- What agent will return: architecture mermaid, service API (OpenAPI snippet), code files for endpoint, unit tests, vector-store retrieval function, tests, CI commands, and JSON response object.
