## 1. Core Identity

```yaml
domain_id: domain-expense-approval-001
domain_name: Expense Approval Flow
domain_type: business_process
version: 1.0
last_updated: 2025-10-02
owner: Finance-IT / SolutionEngineering
status: active
```

**Definition**: The structured process and rules that take an employee expense from submission through validation, multi-step approval, and payment while enforcing budgets, policies, and audit trails.

**Tags**: `#expense` `#approval` `#finance` `#workflow` `#audit`

---

## 2. Concepts & Entities

### Entity: ExpenseRequest

```yaml
entity_id: ENT-EXP-001
entity_type: document
description: Employee's claim for reimbursement or corporate charge containing one or more expense items.
attributes:
  - attribute_name: requestId
    data_type: string
    required: true
    description: Unique ID for the expense request
  - attribute_name: submitterId
    data_type: string
    required: true
    description: Employee user id who submitted
  - attribute_name: departmentId
    data_type: string
    required: true
    description: Department responsible for cost
  - attribute_name: totalAmount
    data_type: number
    required: true
    description: Sum of expense items
  - attribute_name: currency
    data_type: string
    required: true
    description: ISO currency code
  - attribute_name: status
    data_type: string
    required: true
    description: Current state (draft, submitted, pending, approved, rejected, paid)
  - attribute_name: createdDate
    data_type: date
    required: true
    description: Submission timestamp
  - attribute_name: attachments
    data_type: json
    required: false
    description: Receipts, invoices or supporting files
```

**Relationships**:

- `RELATES_TO` → Employee (person)
- `CONTAINS` → ExpenseItem (composition)
- `DEPENDS_ON` → ApprovalPolicy (validation)

**Synonyms**: ExpenseClaim, ReimbursementRequest

---

### Entity: ExpenseItem

```yaml
entity_id: ENT-ITEM-002
entity_type: data
description: Single line expense within a request (e.g., taxi, hotel, meal).
attributes:
  - attribute_name: itemId
    data_type: string
    required: true
    description: Unique item id
  - attribute_name: expenseType
    data_type: string
    required: true
    description: Category (travel, meal, officeSupply)
  - attribute_name: amount
    data_type: number
    required: true
    description: Amount for the item
  - attribute_name: vendor
    data_type: string
    required: false
    description: Vendor name or merchant
  - attribute_name: expenseDate
    data_type: date
    required: true
    description: When the expense occurred
  - attribute_name: receiptAttached
    data_type: boolean
    required: true
    description: Whether receipt exists
```

**Relationships**:

- `RELATES_TO` → ExpenseRequest (parent)
- `DEPENDS_ON` → PolicyRule (validation)

**Synonyms**: LineItem

---

### Entity: Approver

```yaml
entity_id: ENT-APP-003
entity_type: person
description: A user who can review and act on an expense step (department head, finance manager, CEO).
attributes:
  - attribute_name: approverId
    data_type: string
    required: true
    description: User id
  - attribute_name: role
    data_type: string
    required: true
    description: Role name (departmentHead, financeManager, CFO)
  - attribute_name: approvalLimit
    data_type: number
    required: true
    description: Max amount this approver can approve
  - attribute_name: delegatesTo
    data_type: string
    required: false
    description: User id for delegation
```

**Relationships**:

- `PERFORMS` → ApprovalStep (action)
- `REPORTS_TO` → Role (org)

**Synonyms**: Reviewer, AuthorizedApprover

---

### Entity: ApprovalPolicy

```yaml
entity_id: ENT-POL-004
entity_type: data
description: Set of rules that determine routing, thresholds, required receipts, and auto-approvals.
attributes:
  - attribute_name: policyId
    data_type: string
    required: true
    description: Unique policy id
  - attribute_name: rules
    data_type: json
    required: true
    description: Array of rule objects (thresholds, approvalsByRole)
  - attribute_name: effectiveDate
    data_type: date
    required: true
    description: When policy starts
```

**Relationships**:

- `APPLIES_TO` → ExpenseRequest
- `ENFORCED_BY` → ApprovalEngine (system)

**Synonyms**: ApprovalRules, RoutingPolicy

---

### Entity: AuditLog

```yaml
entity_id: ENT-AUD-005
entity_type: document
description: Immutable record of actions on the expense (submit, approve, reject, edit).
attributes:
  - attribute_name: logId
    data_type: string
    required: true
    description: Unique id
  - attribute_name: eventType
    data_type: string
    required: true
    description: Action type
  - attribute_name: actorId
    data_type: string
    required: true
    description: Who performed the action
  - attribute_name: timestamp
    data_type: date
    required: true
    description: When it happened
  - attribute_name: details
    data_type: json
    required: false
    description: Extra info (reason, comment)
```

**Relationships**:

- `RELATES_TO` → ExpenseRequest

**Synonyms**: ActivityTrail, ChangeLog

---

## 3. Business Rules

### Rule: BR-001

```yaml
rule_id: BR-001
rule_type: authorization
priority: high
status: active

condition:
  if: request.totalAmount > approver.approvalLimit

action:
  then: routeToNextApprover

exception:
  else: autoApproveIfWithinPolicy

metadata:
  created_date: 2023-07-01
  created_by: Finance-Policy-Owner
  compliance: SOX
```

**Plain Language**: If the request amount is more than an approver's limit, send it to the next approver. If not, approver can approve.

**Examples**:

- ✅ Valid: DeptHead limit $1,000, request $800 → DeptHead can approve.
- ❌ Invalid: DeptHead limit $1,000, request $2,500 → must escalate.

---

### Rule: BR-002

```yaml
rule_id: BR-002
rule_type: validation
priority: high
status: active

condition:
  if: expenseItem.amount > policy.maxSingleItemWithoutReceipt AND expenseItem.receiptAttached == false

action:
  then: rejectOrRequestReceipt

exception:
  else: proceed

metadata:
  created_date: 2024-01-15
  created_by: Finance-Policy-Owner
  compliance: internalPolicy
```

**Plain Language**: Require receipts for items above a threshold.

**Examples**:

- ✅ Valid: $25 meal with receipt → OK.
- ❌ Invalid: $150 taxi without receipt → Request receipt or reject.

---

### Rule: BR-003

```yaml
rule_id: BR-003
rule_type: workflow
priority: medium
status: active

condition:
  if: request.submittedDate > policy.claimWindowDays from expenseDate

action:
  then: flagAsLate AND notifyFinance

exception:
  else: normalProcessing

metadata:
  created_date: 2022-11-05
  created_by: Ops
  compliance: internalPolicy
```

**Plain Language**: Late submissions are flagged and need extra review.

**Examples**:

- ✅ Valid: Expense on 2025-01-01, submitted 2025-01-07 within 30 days → normal.
- ❌ Invalid: Submitted after policy window → flagged.

---

## 4. Processes

### Process: Submit Expense

```yaml
process_id: PROC-001
process_type: approval
trigger: employee submits an expense request
frequency: on-demand
sla: 1 business day (acknowledge)
```

**Flow**:

```
[Employee] → [System Validation] → [Routing] → [FirstApprover]
   ↓             ↓                  ↓
submit      validateSchema     determinePath
```

**Steps**:

#### Step 1: Create Request

```yaml
step_id: STEP-001
actor: employee
input: expenseItems, attachments, costCenter
action: fillForm and submit
output: ExpenseRequest (status: submitted)
next_step: STEP-002
exception: validationErrors returned to user
```

#### Step 2: Validate Request

```yaml
step_id: STEP-002
actor: system
input: ExpenseRequest
action: run schema and policy validations (duplicate check, receipt rules, budgetCheck)
output: validationResult (pass/fail)
next_step: STEP-003|END
exception: if fail -> notify submitter with errors
```

#### Step 3: Route For Approval

```yaml
step_id: STEP-003
actor: approvalEngine
input: validated ExpenseRequest
action: buildApprovalPath based on amount, department, expenseType
output: ApprovalPath with ordered ApprovalSteps
next_step: STEP-004
exception: if no approver found -> escalate to financeManager
```

#### Step 4: Approval Loop

```yaml
step_id: STEP-004
actor: approver(s)
input: ApprovalStep
action: approve|reject|requestChanges|delegate
output: updated ExpenseRequest.status or next ApprovalStep
next_step: STEP-004|STEP-005|END
exception: timeout -> escalate per policy
```

#### Step 5: Payment & Close

```yaml
step_id: STEP-005
actor: accountsPayable
input: approved ExpenseRequest
action: create payment (payroll/bank), post ledger entries
output: Payment record, ExpenseRequest.status=paid
next_step: END
exception: paymentFailure -> retry and notifyFinance
```

---

## 5. Roles & Access

### Role: Employee

```yaml
role_id: ROLE-EMP-001
role_type: user
permissions:
  - resource: ExpenseRequest
    actions: [create, read, update]
    scope: own
requires:
  - skill: basicExpenseFiling
reports_to: ROLE-DEP-HEAD-002
```

---

### Role: Department Head

```yaml
role_id: ROLE-DEP-HEAD-002
role_type: approver
permissions:
  - resource: ExpenseRequest
    actions: [read, approve, reject, comment]
    scope: department
requires:
  - skill: budgetAuthority
reports_to: ROLE-FIN-MGR-003
```

---

### Role: Finance Manager

```yaml
role_id: ROLE-FIN-MGR-003
role_type: approver
permissions:
  - resource: ExpenseRequest
    actions: [read, approve, reject, override]
    scope: all
requires:
  - skill: financialControl
reports_to: ROLE-CFO-004
```

---

### Role: Accounts Payable

```yaml
role_id: ROLE-AP-005
role_type: system
permissions:
  - resource: Payment
    actions: [create, read, update]
    scope: all
requires:
  - skill: paymentProcessing
reports_to: ROLE-FIN-MGR-003
```

---

### Role: Auditor

```yaml
role_id: ROLE-AUD-006
role_type: user
permissions:
  - resource: AuditLog
    actions: [read]
    scope: all
requires:
  - skill: auditCompliance
reports_to: financeAuditCommittee
```

---

## 6. Data Model

### Data Object: ExpenseRequest (object)

```yaml
object_id: OBJ-EXP-001
object_type: transactional
storage: finance_db.expense_requests
retention: 7 years
pii_flag: true

schema:
  - field: requestId
    type: string
    required: true
    unique: true
    indexed: true
    validation: ^REQ-[0-9a-fA-F]{8}$
  - field: submitterId
    type: string
    required: true
    unique: false
    indexed: true
  - field: totalAmount
    type: float
    required: true
    unique: false
    indexed: false
    validation: >
  - field: currency
    type: string
    required: true
    unique: false
  - field: status
    type: string
    required: true
    unique: false
  - field: approvalPath
    type: json
    required: false
    unique: false

relationships:
  - target: OBJ-ITEM-002
    type: one-to-many
    foreign_key: requestId
```

---

### Data Object: ExpenseItem

```yaml
object_id: OBJ-ITEM-002
object_type: transactional
storage: finance_db.expense_items
retention: 7 years
pii_flag: false

schema:
  - field: itemId
    type: string
    required: true
    unique: true
    indexed: true
  - field: requestId
    type: string
    required: true
    indexed: true
  - field: expenseType
    type: string
    required: true
  - field: amount
    type: float
    required: true
  - field: receiptAttached
    type: boolean
    required: true

relationships:
  - target: OBJ-EXP-001
    type: many-to-one
    foreign_key: requestId
```

---

## 7. Systems & Integrations

### System: Expense Management App

```yaml
system_id: SYS-EXP-001
system_type: application
vendor: internal|third-party
status: production

endpoints:
  - endpoint_id: API-EXP-GET
    url: /api/expenses/{requestId}
    method: GET
    auth: oauth
    rate_limit: 1000/min

integrations:
  - system: ERP
    direction: outbound
    protocol: REST
    frequency: real-time
    data_format: JSON
  - system: DocumentStorage
    direction: outbound
    protocol: FILE
    frequency: real-time
    data_format: PDF
  - system: OCRService
    direction: inbound
    protocol: REST
    frequency: real-time
    data_format: JSON
```

---

### System: ERP / GL Posting

```yaml
system_id: SYS-ERP-002
system_type: application
vendor: ERP-Vendor
status: production

endpoints:
  - endpoint_id: API-ERP-POST
    url: /api/postJournal
    method: POST
    auth: api-key
    rate_limit: 200/min

integrations:
  - system: ExpenseManagementApp
    direction: inbound
    protocol: REST
    frequency: batch|real-time
    data_format: JSON
```

---

### System: Bank Payment Gateway

```yaml
system_id: SYS-BANK-003
system_type: service
vendor: Bank
status: production

endpoints:
  - endpoint_id: API-PAY
    url: /payments
    method: POST
    auth: oauth
    rate_limit: 60/min

integrations:
  - system: AccountsPayable
    direction: outbound
    protocol: REST
    frequency: batch
    data_format: JSON
```

---

## 8. Compliance & Security

### Control: CTRL-001

```yaml
control_id: CTRL-001
control_type: preventive
regulation: SOX
criticality: critical

requirement: enforce segregation of duties between approver and payment initiator
frequency: continuous
evidence: AuditLog entries showing distinct actorIds for approval and payment
owner: Finance-IT
tests:
  - test_id: TEST-001
    test_type: automated
    pass_criteria: no expense approved and paid by same user in same cycle
```

---

### Control: CTRL-002

```yaml
control_id: CTRL-002
control_type: detective
regulation: GDPR
criticality: high

requirement: mask personal data in exports and limit retention
frequency: continuous
evidence: access logs and data retention reports
owner: DataProtectionOfficer
tests:
  - test_id: TEST-002
    test_type: manual
    pass_criteria: exported reports contain masked PII fields
```

---

## 9. Metrics & KPIs

### Metric: Approval Cycle Time

```yaml
metric_id: KPI-001
metric_type: efficiency
category: operational

calculation:
  formula: average(approvalCompleteTime - submissionTime)
  data_sources: ExpenseRequest.auditLogs, ApprovalSteps

targets:
  threshold: 48
  operator: <=
  unit: hours

reporting:
  frequency: weekly
  dashboard: FinanceOpsDashboard
  alert_threshold: 72
```

---

### Metric: On-time Payment Rate

```yaml
metric_id: KPI-002
metric_type: quality
category: financial

calculation:
  formula: paymentsOnTime / totalPayments
  data_sources: PaymentRecords

targets:
  threshold: 0.98
  operator: >
  unit: ratio

reporting:
  frequency: monthly
  dashboard: APDashboard
  alert_threshold: 0.95
```

---

## 10. Scenarios & Use Cases

### Scenario: UC-001 (Happy Path)

```yaml
scenario_id: UC-001
scenario_type: happy_path
frequency: common
complexity: simple

actors: [employee, departmentHead, financeManager, accountsPayable]
preconditions: submitter has valid account, items under limits, receipts attached
postconditions: expense marked paid and ledger posted

narrative: |
  Employee submits request -> system validates receipts and duplicates -> approvalPath creates DeptHead -> DeptHead approves -> FinanceManager approves (if needed) -> AccountsPayable issues payment -> Expense closed.

variations:
  - variant_id: VAR-001
    condition: request.totalAmount < autoApproveThreshold
    outcome: becomes autoApproved and sent to AccountsPayable
```

---

### Scenario: UC-002 (Missing Receipt)

```yaml
scenario_id: UC-002
scenario_type: exception
frequency: common
complexity: moderate

actors: [employee, departmentHead]
preconditions: expenseItem above receiptThreshold and no receiptAttached
postconditions: expense flagged; submitter asked to upload receipt or item rejected

narrative: |
  Employee submits without receipt -> validation fails -> system notifies submitter to attach receipt within X days -> if not provided, DeptHead must manually approve or reject.

variations:
  - variant_id: VAR-002
    condition: vendor supports e-receipt
    outcome: OCRService attempts to recover receipt automatically
```

---

## 11. Decision Logic

### Decision: DEC-001

```yaml
decision_id: DEC-001
decision_type: routing

inputs:
  - input_name: totalAmount
    required: true
  - input_name: departmentId
    required: true
  - input_name: expenseType
    required: true

logic:
  - condition: IF totalAmount <= policy.autoApproveThreshold AND submitter.role != contractor
    result: autoApprove
    confidence: 0.95

  - condition: ELSE IF totalAmount <= departmentHead.limit
    result: routeToDepartmentHead
    confidence: 0.9

  - condition: ELSE IF totalAmount <= financeManager.limit
    result: routeToFinanceManager
    confidence: 0.9

  - default: routeToCFO

escalation:
  trigger: approverTimeout > policy.approvalTimeoutHours
  escalate_to: ROLE-FIN-MGR-003
```

---

## 12. Issues & Patterns

### Issue: Approval Bottleneck

```yaml
issue_id: ISS-001
issue_type: bottleneck
severity: high

symptoms:
  - many pending requests assigned to same approver
  - long approvalCycleTime

root_causes:
  - single approver has high workload
  - no delegation configured

resolution:
  - step: enableAutoEscalation
    owner: PlatformAdmin
    sla: 2 business days
  - step: allow delegation and loadBalancing
    owner: HR/IT
    sla: 5 business days

prevention: set approvalLimits and automatic escalation rules; monitor approver queues
```

---

### Issue: Duplicate Claims

```yaml
issue_id: ISS-002
issue_type: anti-pattern
severity: medium

symptoms:
  - two requests with same vendor, amount and date
  - matched receipts reused

root_causes:
  - manual submission errors
  - malicious duplicate claims

resolution:
  - step: implement duplicateDetection using fuzzy matching
    owner: DataEngineering
    sla: 10 business days

prevention: run duplicate checks at validation and block auto approval when suspected
```

---

## 13. Knowledge Fragments (For Fine-tuning)

### Q&A Pairs

**Q**: When is a receipt required?
**A**: When item.amount > policy.maxSingleItemWithoutReceipt.
**Context**: validation step.
**Related**: BR-002, PROC-001

**Q**: Who approves expenses over $10,000?
**A**: Route to CFO or financeDirector per policy thresholds.
**Context**: decision routing.
**Related**: DEC-001

### Example Interactions

**User Intent**: Submit expense with missing receipt
**Expected Response**: System returns validationError with steps to attach receipt and sets status to awaitingDocumentation.
**Required Context**: ExpenseRequest, PolicyRules

---

## 14. Semantic Links

```yaml
relationships:
  - source: Expense Approval Flow
    relation: IS_PART_OF
    target: FinanceOperations

  - source: ExpenseRequest
    relation: REQUIRES
    target: ApprovalPolicy
    weight: 1.0

  - source: ExpenseRequest
    relation: SIMILAR_TO
    target: PurchaseOrder
    similarity_score: 0.6

  - source: ExpenseRequest
    relation: TRANSFORMS_INTO
    target: PaymentRecord
    via: PaymentProcess
```

---

## 15. Training Examples

### Classification Examples

```yaml
- input: "Expense for taxi on 2025-09-29 $45 no receipt"
  label: missing_receipt
  confidence: 0.95
  reasoning: amount > policy.minReceipt && receiptAttached=false

- input: "Office supplies $120 submitted by finance clerk"
  label: needsDeptApproval
  confidence: 0.88
  reasoning: amount under financeManager but above autoApprove
```

### Entity Extraction Examples

```yaml
- text: "Submitted REQ-1a2b3c4d by user U-123 for $1,200 on 2025-09-20 with receipt"
  entities:
    - entity: REQ-1a2b3c4d
      type: requestId
      start: 10
      end: 20
    - entity: U-123
      type: submitterId
      start: 33
      end: 38
    - entity: 1200
      type: amount
      start: 43
      end: 47
```

---

## 16. Metadata (For Indexing)

```yaml
metadata:
  domain_id: domain-expense-approval-001
  created: 2024-06-01T09:00:00Z
  modified: 2025-10-02T00:00:00Z
  version: 1.0
  language: en

  classification:
    confidentiality: internal
    sensitivity: medium

  searchability:
    primary_keywords: [expense, approval, reimbursement]
    secondary_keywords: [receipt, approver, payment, routing]
    exclude_terms: [personalExpense]

  quality:
    completeness: 0.9
    accuracy: 0.95
    last_verified: 2025-10-02
    verified_by: SolutionEngineering

  usage:
    access_count: 0
    last_accessed: null
    popularity_score: 0.0
```

---

## 17. Graph DB Schema

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

---

### Implementation notes (short, practical)

- Use node labels: `:ExpenseRequest`, `:ExpenseItem`, `:Approver`, `:ApprovalPolicy`, `:AuditLog`.
- Model approvalPath as a subgraph: `(:ExpenseRequest)-[:HAS_STEP]->(:ApprovalStep)-[:TO_BE_APPROVED_BY]->(:Approver)`.
- Store immutable events in `AuditLog` nodes and link with `:LOGS -> ExpenseRequest`.
- Keep policy rules as JSON on `ApprovalPolicy` nodes to allow dynamic changes and versioning.
- Index commonly queried fields: `requestId`, `submitterId`, `status`, and `createdDate`.
