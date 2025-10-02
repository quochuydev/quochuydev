# Domain Knowledge Template

## 1. Core Identity

```yaml
domain_id: UMF-001
domain_name: User Management Flow
domain_type: business_process
version: 1.0
last_updated: 2025-10-02
owner: solutionEngineeringTeam
status: active
```

**Definition**: User management flow is the structured process of creating, updating, authenticating, authorizing, and deactivating users in a system.

**Tags**: `#identity` `#accessControl` `#workflow`

---

## 2. Concepts & Entities

### Entity: UserAccount

```yaml
entity_id: ENT-001
entity_type: person
description: Represents an individual or system account used to access resources.
attributes:
  - attribute_name: userId
    data_type: string
    required: true
    description: unique identifier for the user
  - attribute_name: username
    data_type: string
    required: true
    description: login name
  - attribute_name: email
    data_type: string
    required: true
    description: primary contact
  - attribute_name: passwordHash
    data_type: string
    required: true
    description: encrypted password
  - attribute_name: status
    data_type: string
    required: true
    description: active, inactive, locked
```

**Relationships**:

- `RELATES_TO` → Role (assignment)
- `DEPENDS_ON` → AuthenticationMethod (login validation)
- `CONTAINS` → UserProfile (details)

**Synonyms**: account, identity

---

### Entity: Role

```yaml
entity_id: ENT-002
entity_type: data
description: Defines permission set for a user.
attributes:
  - attribute_name: roleId
    data_type: string
    required: true
    description: unique role identifier
  - attribute_name: roleName
    data_type: string
    required: true
    description: human readable role name
  - attribute_name: permissions
    data_type: json
    required: true
    description: actions allowed for this role
```

**Relationships**:

- `CONTAINS` → Permission
- `ASSIGNED_TO` → UserAccount

**Synonyms**: accessRole, userGroup

---

## 3. Business Rules

### Rule: Unique Username

```yaml
rule_id: BR-001
rule_type: validation
priority: high
status: active

condition:
  if: username already exists

action:
  then: reject user creation

exception:
  else: create new user

metadata:
  created_date: 2025-10-02
  created_by: system
  compliance: internalPolicy
```

**Plain Language**: A username must be unique.

**Examples**:

- ✅ Valid: alice01, bob2025
- ❌ Invalid: alice01 (already exists)

---

## 4. Processes

### Process: UserOnboarding

```yaml
process_id: PROC-001
process_type: approval
trigger: user registration request
frequency: on-demand
sla: within 5 minutes
```

**Flow**:

```
[User Registration] → [Email Verification] → [Role Assignment]
   ↓                      ↓                     ↓
[User]                 [System]             [Admin]
```

**Steps**:

#### Step 1: Registration

```yaml
step_id: STEP-001
actor: user
input: username, email, password
action: system captures data
output: pendingUserAccount
next_step: STEP-002
exception: validationError
```

---

## 5. Roles & Access

### Role: SystemAdmin

```yaml
role_id: ROLE-001
role_type: admin
permissions:
  - resource: userAccount
    actions: [create, read, update, delete, approve]
    scope: all
requires:
  - skill: systemManagement
reports_to: none
```

---

## 6. Data Model

### Data Object: UserAccountRecord

```yaml
object_id: OBJ-001
object_type: master
storage: userDB
retention: permanent
pii_flag: true

schema:
  - field: userId
    type: string
    required: true
    unique: true
    indexed: true
    validation: uuid
  - field: email
    type: string
    required: true
    unique: true
    indexed: true
    validation: emailRegex
  - field: status
    type: string
    required: true
    unique: false
    indexed: true
    validation: active|inactive|locked
relationships:
  - target: OBJ-002
    type: one-to-many
    foreign_key: roleId
```

---

## 7. Systems & Integrations

### System: IdentityService

```yaml
system_id: SYS-001
system_type: service
vendor: internal
status: production

endpoints:
  - endpoint_id: API-001
    url: /api/v1/users
    method: POST
    auth: oauth
    rate_limit: 1000/min

integrations:
  - system: SYS-002
    direction: outbound
    protocol: REST
    frequency: real-time
    data_format: JSON
```

---

## 8. Compliance & Security

### Control: PasswordPolicy

```yaml
control_id: CTRL-001
control_type: preventive
regulation: GDPR
criticality: high

requirement: password must be 12+ chars, with complexity
frequency: continuous
evidence: passwordValidationLogs
owner: securityTeam

tests:
  - test_id: TEST-001
    test_type: automated
    pass_criteria: reject weak password
```

---

## 9. Metrics & KPIs

### Metric: AccountCreationSuccessRate

```yaml
metric_id: KPI-001
metric_type: efficiency
category: operational

calculation:
  formula: successfulAccounts / totalAttempts
  data_sources: userDB, logs

targets:
  threshold: 95
  operator: >
  unit: percent

reporting:
  frequency: weekly
  dashboard: userOpsDashboard
  alert_threshold: 85
```

---

## 10. Scenarios & Use Cases

### Scenario: UC-001

```yaml
scenario_id: UC-001
scenario_type: happy_path
frequency: common
complexity: simple

actors: [User, SystemAdmin]
preconditions: email not registered
postconditions: account created and active

narrative: |
  User submits registration form.
  System validates and sends email verification.
  User verifies email.
  Admin assigns default role.
```

---

## 11. Decision Logic

### Decision: Role Assignment

```yaml
decision_id: DEC-001
decision_type: routing

inputs:
  - input_name: department
    required: true
  - input_name: jobTitle
    required: true

logic:
  - condition: IF jobTitle = "Manager"
    result: assignRole ManagerRole
    confidence: 0.9
  - condition: IF jobTitle = "Intern"
    result: assignRole LimitedRole
    confidence: 0.9
  - default: assignRole DefaultUser
escalation:
  trigger: unknown jobTitle
  escalate_to: ROLE-001
```

---

## 12. Issues & Patterns

### Issue: Duplicate Accounts

```yaml
issue_id: ISS-001
issue_type: error
severity: medium

symptoms:
  - multiple accounts share same email
  - login conflicts

root_causes:
  - weak validation rules
  - race conditions in registration

resolution:
  - step: enforce unique email
    owner: devTeam
    sla: 1 day

prevention: email uniqueness constraint
```

---

## 13. Knowledge Fragments (For Fine-tuning)

**Q**: Can two users have the same email?
**A**: No, each email must be unique.
**Context**: During registration.
**Related**: BR-001

**Q**: Who can deactivate a user?
**A**: Only systemAdmin or departmentAdmin roles.
**Context**: Account deactivation flow.
**Related**: PROC-004

---

## 14. Semantic Links

```yaml
relationships:
  - source: User Management Flow
    relation: IS_PART_OF
    target: IdentityAndAccessManagement

  - source: User Management Flow
    relation: REQUIRES
    target: AuthenticationDomain
    weight: 0.9

  - source: Role
    relation: CONTAINS
    target: Permission

  - source: UserAccount
    relation: TRANSFORMS_INTO
    target: ActiveUser
    via: UserOnboarding
```

---

## 15. Training Examples

### Classification Examples

```yaml
- input: "Register new user with email alice@example.com"
  label: userRegistration
  confidence: 0.95
  reasoning: contains action "register new user"

- input: "Assign manager role to Bob"
  label: roleAssignment
  confidence: 0.9
  reasoning: contains action "assign role"
```

### Entity Extraction Examples

```yaml
- text: "Deactivate user account for userId=12345"
  entities:
    - entity: 12345
      type: userId
      start: 34
      end: 39
```

---

## 16. Metadata (For Indexing)

```yaml
metadata:
  domain_id: UMF-001
  created: 2025-10-02T00:00:00Z
  modified: 2025-10-02T00:00:00Z
  version: 1.0.0
  language: en

  classification:
    confidentiality: internal
    sensitivity: high

  searchability:
    primary_keywords: [user, account, identity, role, access]
    secondary_keywords: [registration, login, authorization]
    exclude_terms: [guest, anonymous]

  quality:
    completeness: 0.95
    accuracy: 0.98
    last_verified: 2025-10-02
    verified_by: solutionEngineeringTeam

  usage:
    access_count: 1000
    last_accessed: 2025-09-30T18:30:00Z
    popularity_score: 0.92
```

---

## 17. Graph DB Schema

```cypher
(:Domain {id:'UMF-001', name:'User Management Flow', type:'business_process', description:'Handles user lifecycle'})
(:Entity {id:'ENT-001', name:'UserAccount', type:'person'})
(:Entity {id:'ENT-002', name:'Role', type:'data'})
(:Process {id:'PROC-001', name:'UserOnboarding'})
(:Rule {id:'BR-001', condition:'unique username', action:'reject duplicate'})
(:Role {id:'ROLE-001', name:'SystemAdmin'})
(:System {id:'SYS-001', name:'IdentityService', vendor:'internal', status:'production'})
(:Metric {id:'KPI-001', name:'AccountCreationSuccessRate', formula:'success/total', target:'95%'})

(Domain)-[:CONTAINS]->(Entity)
(Entity)-[:RELATED_TO {type:'assignment'}]->(Entity)
(Process)-[:REQUIRES]->(Entity)
(Process)-[:PERFORMED_BY]->(Role)
(Rule)-[:APPLIES_TO]->(Entity)
(Rule)-[:ENFORCED_BY]->(System)
(Role)-[:HAS_ACCESS {level:'admin'}]->(System)
(System)-[:INTEGRATES_WITH {protocol:'REST'}]->(System)
(Metric)-[:MEASURES]->(Process)
```
