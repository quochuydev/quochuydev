# Domain Knowledge: Accounting Expense Approval Process

## 1. Core Identity

```yaml
domain_id: ACC-EXP-APP-001
domain_name: AccountingExpenseApproval
domain_type: business_process
version: 1.0
last_updated: 2025-10-02
owner: financeOpsTeam
status: active
```

**Definition**: Process to request, review, and approve expenses before they are paid or reimbursed.

**Tags**: `#accounting` `#expense` `#approval`

---

## 2. Concepts & Entities

### Entity: ExpenseRequest

```yaml
entity_id: ENT-001
entity_type: document
description: A record created by an employee to request reimbursement or payment.
attributes:
  - attribute_name: requestId
    data_type: string
    required: true
    description: Unique identifier of expense request
  - attribute_name: employeeId
    data_type: string
    required: true
    description: Who submitted the expense
  - attribute_name: amount
    data_type: number
    required: true
    description: Total cost requested
  - attribute_name: currency
    data_type: string
    required: true
    description: Currency of the expense
  - attribute_name: expenseDate
    data_type: date
    required: true
    description: Date of expense
  - attribute_name: status
    data_type: string
    required: true
    description: Current state (submitted, approved, rejected, paid)
```

**Relationships**:

- `SUBMITTED_BY` → Employee
- `REQUIRES_APPROVAL` → Manager
- `VALIDATED_BY` → FinanceTeam

**Synonyms**: claimForm, reimbursementRequest

---

### Entity: Employee

```yaml
entity_id: ENT-002
entity_type: person
description: Worker who submits an expense.
attributes:
  - attribute_name: employeeId
    data_type: string
    required: true
    description: Unique employee identifier
  - attribute_name: department
    data_type: string
    required: false
    description: Business unit of employee
```

**Relationships**:

- `SUBMITS` → ExpenseRequest
- `REPORTS_TO` → Manager

---

### Entity: Manager

```yaml
entity_id: ENT-003
entity_type: person
description: Person who reviews and approves expense requests.
attributes:
  - attribute_name: managerId
    data_type: string
    required: true
    description: Manager identifier
  - attribute_name: approvalLimit
    data_type: number
    required: true
    description: Max amount manager can approve
```

**Relationships**:

- `APPROVES` → ExpenseRequest
- `ESCALATES_TO` → FinanceTeam

---

### Entity: FinanceTeam

```yaml
entity_id: ENT-004
entity_type: system
description: Accounting team or system that validates policy compliance and processes payment.
attributes:
  - attribute_name: teamId
    data_type: string
    required: true
    description: Identifier of finance role
```

**Relationships**:

- `VALIDATES` → ExpenseRequest
- `PROCESSES` → PaymentTransaction

---

### Entity: PaymentTransaction

```yaml
entity_id: ENT-005
entity_type: transactional
description: Actual money transfer to employee or vendor after approval.
attributes:
  - attribute_name: transactionId
    data_type: string
    required: true
    description: Unique payment identifier
  - attribute_name: method
    data_type: string
    required: true
    description: Payment type (bankTransfer, payroll, card)
  - attribute_name: status
    data_type: string
    required: true
    description: State of payment
```

**Relationships**:

- `RESULT_OF` → ExpenseRequest

---

## 3. Business Rules

### Rule: ApprovalThreshold

```yaml
rule_id: BR-001
rule_type: authorization
priority: high
status: active

condition:
  if: amount <= manager.approvalLimit

action:
  then: approve request

exception:
  else: escalate to FinanceTeam

metadata:
  created_date: 2025-10-02
  created_by: financeOpsTeam
  compliance: SOX
```

**Plain Language**: Managers can only approve expenses up to their limit. Bigger amounts go to Finance.

**Examples**:

- ✅ Valid: Employee requests $500, manager limit is $1000.
- ❌ Invalid: Employee requests $5000, manager limit is $2000.

---

## 4. Processes

### Process: ExpenseApprovalWorkflow

```yaml
process_id: PROC-001
process_type: approval
trigger: employee submits ExpenseRequest
frequency: on-demand
sla: 5 business days
```

**Flow**:

```
[Submit Expense] → [Manager Review] → [Finance Validation] → [Payment]
   ↓                   ↓                  ↓                  ↓
Employee            Manager           FinanceTeam        System
```

**Steps**:

#### Step 1: SubmitExpense

```yaml
step_id: STEP-001
actor: Employee
input: expense details
action: create ExpenseRequest
output: pending request
next_step: STEP-002
exception: reject if missing data
```

#### Step 2: ManagerReview

```yaml
step_id: STEP-002
actor: Manager
input: ExpenseRequest
action: approve or reject
output: approved request
next_step: STEP-003
exception: escalate if over limit
```

#### Step 3: FinanceValidation

```yaml
step_id: STEP-003
actor: FinanceTeam
input: approved request
action: check compliance
output: validated request
next_step: STEP-004
exception: reject if not valid
```

#### Step 4: PaymentProcessing

```yaml
step_id: STEP-004
actor: FinanceSystem
input: validated request
action: execute payment
output: PaymentTransaction
next_step: END
exception: retry if payment fails
```

---

## 5. Roles & Access

### Role: Employee

```yaml
role_id: ROLE-001
role_type: user
permissions:
  - resource: ExpenseRequest
    actions: [create, read, update]
    scope: own
```

### Role: Manager

```yaml
role_id: ROLE-002
role_type: approver
permissions:
  - resource: ExpenseRequest
    actions: [read, approve, reject]
    scope: department
```

### Role: FinanceTeam

```yaml
role_id: ROLE-003
role_type: admin
permissions:
  - resource: ExpenseRequest
    actions: [read, validate, finalize]
    scope: all
```

---

## 6. Data Model

### Data Object: ExpenseRequest

```yaml
object_id: OBJ-001
object_type: transactional
storage: expenseDb
retention: 7 years
pii_flag: true

schema:
  - field: requestId
    type: string
    required: true
    unique: true
    indexed: true
  - field: employeeId
    type: string
    required: true
    unique: false
    indexed: true
  - field: amount
    type: float
    required: true
    unique: false
    indexed: true
  - field: status
    type: string
    required: true
    unique: false
    indexed: true
```

---

## 7. Systems & Integrations

### System: ExpenseManagementSystem

```yaml
system_id: SYS-001
system_type: application
vendor: internal
status: production

endpoints:
  - endpoint_id: API-001
    url: /api/expenseRequests
    method: POST
    auth: oauth
    rate_limit: 100/min
```

---

## 8. Compliance & Security

### Control: SegregationOfDuties

```yaml
control_id: CTRL-001
control_type: preventive
regulation: SOX
criticality: critical

requirement: Submitter cannot approve own request
frequency: continuous
evidence: auditLog
owner: financeOps
```

---

## 9. Metrics & KPIs

### Metric: ApprovalTime

```yaml
metric_id: KPI-001
metric_type: efficiency
category: operational

calculation:
  formula: avg(approvalDate - submitDate)
  data_sources: [ExpenseRequest]

targets:
  threshold: 2
  operator: <=
  unit: businessDays

reporting:
  frequency: monthly
  dashboard: financeOpsDashboard
  alert_threshold: 3
```

---

## 10. Scenarios & Use Cases

### Scenario: StandardApproval

```yaml
scenario_id: UC-001
scenario_type: happy_path
frequency: common
complexity: simple

actors: Employee, Manager, FinanceTeam
preconditions: Employee has valid receipts
postconditions: Payment is processed

narrative: |
  Employee submits a travel expense. Manager approves within limit. Finance validates and pays.
```

---

## 11. Decision Logic

### Decision: ExpenseApprovalRouting

```yaml
decision_id: DEC-001
decision_type: routing

inputs:
  - input_name: amount
    required: true

logic:
  - condition: IF amount <= manager.approvalLimit
    result: approve by manager
    confidence: 0.95
  - condition: ELSE
    result: escalate to FinanceTeam
    confidence: 0.9
  - default: reject
```

---

## 12. Issues & Patterns

### Issue: MissingReceipts

```yaml
issue_id: ISS-001
issue_type: error
severity: medium

symptoms:
  - request missing attachment
  - finance rejects request

root_causes:
  - employee forgot to upload
  - attachment system error

resolution:
  - step: notify employee to re-upload
    owner: employee
    sla: 2 days

prevention: enforce receiptRequired flag
```

---

## 13. Knowledge Fragments

**Q**: Who can approve an expense above manager limit?
**A**: FinanceTeam must approve.
**Context**: Expenses over approvalLimit.
**Related**: BR-001, PROC-001

**Q**: How long should approval take?
**A**: 2 business days, SLA is 5.
**Context**: Performance monitoring.
**Related**: KPI-001

---

## 14. Semantic Links

```yaml
relationships:
  - source: AccountingExpenseApproval
    relation: IS_PART_OF
    target: AccountingProcess

  - source: ExpenseRequest
    relation: REQUIRES
    target: ApprovalThreshold
    weight: 0.9

  - source: ExpenseRequest
    relation: RESULT_IN
    target: PaymentTransaction
```

---

## 15. Training Examples

```yaml
- input: "Employee submits travel expense of $400"
  label: submitExpense
  confidence: 0.9
  reasoning: Text contains employee action and expense amount

- input: "Manager approves claim of $1000"
  label: managerApproval
  confidence: 0.95
  reasoning: Action approve within manager responsibility
```

---

## 16. Metadata

```yaml
metadata:
  domain_id: ACC-EXP-APP-001
  created: 2025-10-02T10:00:00Z
  modified: 2025-10-02T10:00:00Z
  version: 1.0
  language: en

  classification:
    confidentiality: internal
    sensitivity: medium

  searchability:
    primary_keywords: [expense, approval, reimbursement, accounting]
    secondary_keywords: [manager, finance, policy]
    exclude_terms: [loan, investment]

  quality:
    completeness: 0.95
    accuracy: 0.9
    last_verified: 2025-10-02
    verified_by: financeOpsTeam

  usage:
    access_count: 0
    last_accessed: null
    popularity_score: 0.0
```

---

## 17. Graph DB Schema

```cypher
(:Domain {id:"ACC-EXP-APP-001", name:"AccountingExpenseApproval", type:"business_process"})
(:Entity {id:"ENT-001", name:"ExpenseRequest", type:"document"})
(:Entity {id:"ENT-002", name:"Employee", type:"person"})
(:Entity {id:"ENT-003", name:"Manager", type:"person"})
(:Entity {id:"ENT-004", name:"FinanceTeam", type:"system"})
(:Entity {id:"ENT-005", name:"PaymentTransaction", type:"transactional"})
(:Rule {id:"BR-001", condition:"amount <= manager.approvalLimit", action:"approve"})
(:Process {id:"PROC-001", name:"ExpenseApprovalWorkflow", sla:"5 days"})
(:Role {id:"ROLE-001", name:"Employee"})
(:Role {id:"ROLE-002", name:"Manager"})
(:Role {id:"ROLE-003", name:"FinanceTeam"})
(:Metric {id:"KPI-001", name:"ApprovalTime", formula:"avg(approvalDate - submitDate)"})

(:Employee)-[:SUBMITS]->(:ExpenseRequest)
(:Manager)-[:APPROVES]->(:ExpenseRequest)
(:ExpenseRequest)-[:RESULT_IN]->(:PaymentTransaction)
(:FinanceTeam)-[:VALIDATES]->(:ExpenseRequest)
(:Rule)-[:APPLIES_TO]->(:ExpenseRequest)
(:Process)-[:REQUIRES]->(:ExpenseRequest)
(:Process)-[:PERFORMED_BY]->(:Manager)
(:Process)-[:PERFORMED_BY]->(:FinanceTeam)
(:Metric)-[:MEASURES]->(:Process)
```
