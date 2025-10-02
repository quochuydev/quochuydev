# Domain Knowledge Template

## 1. Core Identity

```yaml
domain_id: [unique-identifier]
domain_name: [Domain Name]
domain_type: [business_process|system|concept|regulation]
version: [1.0]
last_updated: [YYYY-MM-DD]
owner: [team/person]
status: [active|deprecated|draft]
```

**Definition**: [Single sentence definition]

**Tags**: `#tag1` `#tag2` `#tag3`

## 2. Concepts & Entities

### Entity: [Entity Name]

```yaml
entity_id: [unique-id]
entity_type: [person|system|document|data|process]
description: [Brief description]
attributes:
  - attribute_name: [name]
    data_type: [string|number|date|boolean]
    required: [true|false]
    description: [what it represents]
```

**Relationships**:

- `RELATES_TO` → [Entity B] (relationship_type)
- `DEPENDS_ON` → [Entity C] (dependency_type)
- `CONTAINS` → [Entity D] (composition)

**Synonyms**: [alt name 1], [alt name 2]

## 3. Business Rules

### Rule: [Rule ID]

```yaml
rule_id: [BR-001]
rule_type: [validation|authorization|calculation|workflow]
priority: [high|medium|low]
status: [active|inactive]

condition:
  if: [condition expression]

action:
  then: [action to take]

exception:
  else: [exception handling]

metadata:
  created_date: [YYYY-MM-DD]
  created_by: [author]
  compliance: [regulation if applicable]
```

**Plain Language**: [Describe rule in simple terms]

**Examples**:

- ✅ Valid: [example]
- ❌ Invalid: [example]

## 4. Processes

### Process: [Process Name]

```yaml
process_id: [PROC-001]
process_type: [approval|transformation|validation|notification]
trigger: [what starts this process]
frequency: [on-demand|scheduled|event-driven]
sla: [time constraint]
```

**Flow**:

```
[Step 1] → [Step 2] → [Step 3]
   ↓           ↓           ↓
[Actor]    [System]   [Output]
```

**Steps**:

#### Step 1: [Step Name]

```yaml
step_id: [STEP-001]
actor: [who/what performs]
input: [required input]
action: [what happens]
output: [what's produced]
next_step: [STEP-002|END]
exception: [error handling]
```

## 5. Roles & Access

### Role: [Role Name]

```yaml
role_id: [ROLE-001]
role_type: [user|admin|system|approver]
permissions:
  - resource: [resource_name]
    actions: [read|write|delete|approve]
    scope: [all|own|department]

requires:
  - skill: [required skill]
  - certification: [if applicable]

reports_to: [ROLE-002]
```

## 6. Data Model

### Data Object: [Object Name]

```yaml
object_id: [OBJ-001]
object_type: [master|transactional|reference]
storage: [database_name]
retention: [duration]
pii_flag: [true|false]

schema:
  - field: [field_name]
    type: [string|integer|float|date|json]
    required: [true|false]
    unique: [true|false]
    indexed: [true|false]
    validation: [regex or rule]

relationships:
  - target: [OBJ-002]
    type: [one-to-one|one-to-many|many-to-many]
    foreign_key: [field_name]
```

## 7. Systems & Integrations

### System: [System Name]

```yaml
system_id: [SYS-001]
system_type: [application|database|api|service]
vendor: [vendor name]
status: [production|staging|deprecated]

endpoints:
  - endpoint_id: [API-001]
    url: [endpoint url]
    method: [GET|POST|PUT|DELETE]
    auth: [oauth|api-key|basic]
    rate_limit: [requests per period]

integrations:
  - system: [SYS-002]
    direction: [inbound|outbound|bidirectional]
    protocol: [REST|SOAP|FILE|EVENT]
    frequency: [real-time|batch|scheduled]
    data_format: [JSON|XML|CSV]
```

## 8. Compliance & Security

### Control: [Control ID]

```yaml
control_id: [CTRL-001]
control_type: [preventive|detective|corrective]
regulation: [SOX|GDPR|HIPAA|PCI-DSS]
criticality: [critical|high|medium|low]

requirement: [what must be done]
frequency: [continuous|daily|quarterly|annual]
evidence: [what proves compliance]
owner: [responsible party]

tests:
  - test_id: [TEST-001]
    test_type: [automated|manual]
    pass_criteria: [criteria]
```

## 9. Metrics & KPIs

### Metric: [Metric Name]

```yaml
metric_id: [KPI-001]
metric_type: [efficiency|quality|volume|compliance]
category: [operational|financial|customer]

calculation:
  formula: [mathematical expression]
  data_sources: [list of sources]

targets:
  threshold: [value]
  operator: [>|<|=|>=|<=]
  unit: [unit of measure]

reporting:
  frequency: [daily|weekly|monthly]
  dashboard: [dashboard_name]
  alert_threshold: [value]
```

## 10. Scenarios & Use Cases

### Scenario: [Scenario ID]

```yaml
scenario_id: [UC-001]
scenario_type: [happy_path|exception|edge_case]
frequency: [common|rare]
complexity: [simple|moderate|complex]

actors: [list of actors]
preconditions: [what must be true]
postconditions: [expected outcome]

narrative: |
  [Step-by-step description of what happens]

variations:
  - variant_id: [VAR-001]
    condition: [when this applies]
    outcome: [different result]
```

## 11. Decision Logic

### Decision: [Decision Point]

```yaml
decision_id: [DEC-001]
decision_type: [approval|routing|calculation|classification]

inputs:
  - input_name: [name]
    required: [true|false]

logic:
  - condition: [IF condition]
    result: [THEN outcome]
    confidence: [0.0-1.0]

  - condition: [ELSE IF condition]
    result: [THEN outcome]
    confidence: [0.0-1.0]

  - default: [fallback outcome]

escalation:
  trigger: [when to escalate]
  escalate_to: [ROLE-ID]
```

## 12. Issues & Patterns

### Issue: [Issue Type]

```yaml
issue_id: [ISS-001]
issue_type: [error|warning|anti-pattern|bottleneck]
severity: [critical|high|medium|low]

symptoms:
  - [observable symptom 1]
  - [observable symptom 2]

root_causes:
  - [potential cause 1]
  - [potential cause 2]

resolution:
  - step: [action to take]
    owner: [who resolves]
    sla: [time to resolve]

prevention: [how to avoid]
```

## 13. Knowledge Fragments (For Fine-tuning)

### Q&A Pairs

**Q**: [Common question]  
**A**: [Accurate answer]  
**Context**: [when this applies]  
**Related**: [DOC-001, ENT-002]

**Q**: [Common question]  
**A**: [Accurate answer]  
**Context**: [when this applies]  
**Related**: [PROC-003, RULE-005]

### Example Interactions

**User Intent**: [what user wants]  
**Expected Response**: [how system should respond]  
**Required Context**: [DOC-001, ENT-005]

## 14. Semantic Links

```yaml
# For graph database relationships
relationships:
  - source: [this-domain]
    relation: IS_PART_OF
    target: [parent-domain]

  - source: [this-domain]
    relation: REQUIRES
    target: [dependency-domain]
    weight: [0.8]

  - source: [this-domain]
    relation: SIMILAR_TO
    target: [related-domain]
    similarity_score: [0.75]

  - source: [Entity-A]
    relation: TRANSFORMS_INTO
    target: [Entity-B]
    via: [Process-X]

# For vector embeddings
embeddings:
  text_chunks:
    - chunk_id: [CHUNK-001]
      content: [text content for embedding]
      metadata:
        section: [section name]
        importance: [high|medium|low]
        keywords: [keyword1, keyword2]
```

## 15. Training Examples

### Classification Examples

```yaml
- input: [example input text]
  label: [classification label]
  confidence: [0.95]
  reasoning: [why this classification]

- input: [example input text]
  label: [classification label]
  confidence: [0.88]
  reasoning: [why this classification]
```

### Entity Extraction Examples

```yaml
- text: [sample text]
  entities:
    - entity: [entity value]
      type: [entity type]
      start: [character position]
      end: [character position]
```

## 16. Metadata (For Indexing)

```yaml
metadata:
  domain_id: [unique-id]
  created: [ISO-8601 timestamp]
  modified: [ISO-8601 timestamp]
  version: [semantic version]
  language: [en|es|fr]

  classification:
    confidentiality: [public|internal|confidential|restricted]
    sensitivity: [low|medium|high]

  searchability:
    primary_keywords: [keyword1, keyword2, keyword3]
    secondary_keywords: [keyword4, keyword5]
    exclude_terms: [term1, term2]

  quality:
    completeness: [0.0-1.0]
    accuracy: [0.0-1.0]
    last_verified: [YYYY-MM-DD]
    verified_by: [person/system]

  usage:
    access_count: [number]
    last_accessed: [ISO-8601 timestamp]
    popularity_score: [0.0-1.0]
```

## 17. Vector DB Schema

```json
{
  "id": "domain-unique-id",
  "type": "domain_knowledge",
  "embedding": [0.123, -0.456, ...],
  "text": "Full text content for semantic search",
  "metadata": {
    "domain": "domain-name",
    "section": "section-name",
    "entity_type": "process|rule|role|system",
    "tags": ["tag1", "tag2"],
    "importance": 0.85,
    "timestamp": "2025-10-01T00:00:00Z"
  },
  "relationships": [
    {"type": "relates_to", "target_id": "other-doc-id", "weight": 0.7}
  ]
}
```

## 18. Graph DB Schema

```cypher
// Node types
(:Domain {id, name, type, description})
(:Entity {id, name, type, attributes})
(:Process {id, name, steps, sla})
(:Rule {id, condition, action, priority})
(:Role {id, name, permissions})
(:System {id, name, vendor, status})
(:Metric {id, name, formula, target})

// Relationship types
(Domain)-[:CONTAINS]->(Entity)
(Entity)-[:RELATED_TO {type, weight}]->(Entity)
(Process)-[:REQUIRES]->(Entity)
(Process)-[:PERFORMED_BY]->(Role)
(Rule)-[:APPLIES_TO]->(Entity)
(Rule)-[:ENFORCED_BY]->(System)
(Role)-[:HAS_ACCESS {level}]->(System)
(System)-[:INTEGRATES_WITH {protocol}]->(System)
(Metric)-[:MEASURES]->(Process)
```

**Generated For**: Vector DB Ingestion & Graph Knowledge Base  
**Optimized For**: RAG, Semantic Search, Knowledge Graphs  
**Format Version**: 2.0
