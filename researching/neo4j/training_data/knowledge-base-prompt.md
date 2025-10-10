As a Solution Engineer/AI Engineer. User management flow
Write me the domain knowledge following the template below.
Simple English words, easy to understand and AI friendly to put graph DB; Technical words should be camelCase and common used in software development.
No need AI start/end section content.
Deep search and understand about the domain:



---

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

## 7. Scenarios & Use Cases

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

## 8. Decision Logic

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

## 9. Training Examples

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

## 10. Metadata (For Indexing)

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

## 11. Graph DB Schema

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
