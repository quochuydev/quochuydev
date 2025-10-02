# Feature Specification: Accounting System for SME Cash Flow Management

**Feature Branch**: `001-read-users-phong`
**Created**: 2025-10-01
**Status**: Draft
**Input**: User description: "read /Users/phong/Dev/015_ai_agent/Tools/spec-agent/docs/Accounting_system_spec.md and build a web application based on the requirement"

## Execution Flow (main)

```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines

- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## Clarifications

### Session 2025-10-01

- Q: Authentication Method (NFR-008): Email/password, SSO integration, or OAuth providers? → A: Authentication not required in MVP stage
- Q: Notification Channels (FR-031): Email only, in-app notifications, SMS, or multi-channel? → A: In-app notification
- Q: Feedback Workflow (FR-033): Can approvers request changes, or only approve/reject? → A: Rejected requests must be resubmitted; feedback saved as draft cannot change approval status
- Q: Project Budget Allocation (FR-025): How do projects relate to departments? Can expenses be split across projects? → A: Projects can be shared between departments or stay within 1 department; each expense linked to exactly 1 project
- Q: Dashboard Time Period (FR-038): Monthly, quarterly, or yearly views for budget utilization? → A: Quarterly data
- Q: Data Retention Period (NFR-005): Legal requirement for audit log retention (assumed 7 years)? → A: 2-year retention period
- Q: Encryption Standards (NFR-007): Specific compliance requirements (SOC2, ISO 27001)? → A: Sensitive data defined in detail and encrypted following OWASP Top 10 standard
- Q: Receipt Extraction Failure (Edge Case): Manual entry fallback when OCR fails? → A: Manual input required
- Q: Budget at exact limit: How system handles requests when department budget exactly equals current spend? → A: No escalation occurs for manager-approved requests
- Q: Approver unavailability: Workflow for vacation/sick leave? → A: Delegation should be configured for each user in case of vacation
- Q: Mid-month budget changes: Impact on pending requests when budget modified? → A: New budget impacts pending-on-approval requests and requests created after budget change date
- Q: Employee departure: Handling of pending requests when creator leaves company? → A: When deactivating a user, delegation is required
- Q: OCR integration approach for MVP? → A: Mock OCR data in MVP; real integration deferred to deployment phase

---

## User Scenarios & Testing

### Primary User Story

An SME company (5-50 employees) needs to manage cash flow through budget tracking and expense management. Employees submit expense requests with receipts, which flow through configurable approval chains based on amount, category, and department budget. Department heads and management monitor budget utilization while finance teams maintain audit trails. The system makes management more efficient, proactive, and less complex while optimizing resource utilization.

### Acceptance Scenarios

1. **Given** an employee needs to purchase supplies, **When** they create an expense request with receipt attachment, **Then** the system extracts receipt data (provider, amount, items) and routes the request to their manager for approval

2. **Given** a manager receives an expense request under 20,000,000 VND within department budget, **When** they approve it, **Then** the request goes to finance for final approval without requiring CEO review

3. **Given** a finance team member reviews approved expenses, **When** they access the audit trail, **Then** they see immutable history of all approvals, changes, and timestamps with user identification

4. **Given** a department head plans quarterly spending, **When** they define department budget allocations, **Then** future expense requests validate against available budget before approval routing

5. **Given** a CEO needs to fast-track an urgent expense, **When** they approve any submitted request, **Then** the request completes immediately regardless of configured approval chain

6. **Given** an expense request exceeds department monthly budget, **When** it enters approval workflow, **Then** the system routes it to CEO for approval even if amount is under 20,000,000 VND

### Edge Cases

- When receipt image is unclear or unreadable, system requires manual input of expense data by requestor
- When expense request submitted at exact department budget limit, no escalation to CEO occurs for manager-approved requests
- When approver unavailable (vacation, sick leave), system uses delegation configured for that user
- When department budget modified mid-month, new budget applies to pending-on-approval requests and new requests created after change date
- When expense is rejected with feedback, requestor must resubmit as new request; feedback can be saved as draft but does not change approval status
- When employee leaves company, user deactivation requires delegation configuration for pending requests

## Requirements

### Functional Requirements

#### User Management & Access Control

- **FR-001**: System MUST support four role types: Employee, Manager, Finance, and CEO with distinct permission levels
- **FR-002**: System MUST organize users by department and team hierarchy
- **FR-003**: System MUST allow assignment of users to multiple departments or teams
- **FR-004**: System MUST initialize with six predefined accounts for MVP: duke@silentium.io (CEO), loan@silentium.io (Finance), hanh@silentium.io (HR Manager), khoa@silentium.io (Finance Manager), minh@silentium.io (HR Employee), account@silentium.io (Finance Employee)
- **FR-005**: Each user MUST be able to configure delegation to another user for vacation or absence periods
- **FR-006**: System MUST require delegation configuration when deactivating a user account with pending responsibilities

#### Expense Request Management

- **FR-007**: Employees MUST be able to create, edit, and delete their own expense requests
- **FR-008**: System MUST allow attachment of receipts or supporting documents in image and PDF formats
- **FR-009**: System MUST extract and populate expense data from receipt attachments including provider name, total amount, and line items; MVP uses mock data, real OCR integration deferred to deployment; when extraction fails, require manual input
- **FR-010**: System MUST categorize expenses into types including "Outside Goods & Services Purchases" and "Purchase of Fixed Assets & Equipment"
- **FR-011**: System MUST support custom fields and notes on expense requests
- **FR-012**: System MUST prevent editing of expense requests after submission for approval
- **FR-013**: System MUST allow only the request creator to delete expense requests in draft status

#### Approval Workflow Configuration

- **FR-014**: System MUST support configurable multi-level approval chains with up to three levels: Manager, Finance, and CEO
- **FR-015**: System MUST allow approval workflow configuration based on expense amount thresholds
- **FR-016**: System MUST allow approval workflow configuration based on expense category
- **FR-017**: System MUST allow approval workflow configuration based on department
- **FR-018**: System MUST allow approval workflow configuration based on document type
- **FR-019**: System MUST route requests under 20,000,000 VND within department budget to Manager then Finance only (skipping CEO)
- **FR-020**: System MUST route requests exceeding 20,000,000 VND or exceeding department budget through all three approval levels
- **FR-021**: When expense request at exact department budget limit, system MUST NOT escalate to CEO for manager-approved requests
- **FR-022**: CEO users MUST be able to approve any submitted request to immediately complete it regardless of configured workflow
- **FR-023**: System MUST route approval requests to configured delegate when primary approver is unavailable

#### Budget Control & Validation

- **FR-024**: Finance and CEO users MUST be able to define and assign budgets by department
- **FR-025**: System MUST validate expense requests against available department budget during approval routing
- **FR-026**: System MUST calculate total approved department expenses for current month including pending request amount
- **FR-027**: System MUST prevent approval of requests exceeding department monthly budget without CEO approval
- **FR-028**: System MUST display remaining budget information to managers and finance users
- **FR-029**: System MUST support budget assignment by project; projects can be shared across departments or limited to single department
- **FR-030**: Each expense request MUST be linked to exactly one project
- **FR-031**: When department budget modified mid-month, new budget MUST apply to pending-on-approval requests and requests created after change date

#### Audit Trail & Compliance

- **FR-032**: System MUST log all user actions with timestamp and user identification
- **FR-033**: System MUST maintain immutable history of all approval decisions
- **FR-034**: System MUST maintain immutable history of all expense request changes
- **FR-035**: System MUST display complete audit trail for each expense request showing who did what and when
- **FR-036**: System MUST prevent deletion or modification of historical audit records

#### Notifications & Workflow

- **FR-037**: System MUST provide in-app notifications to assigned approvers when expense requests require their review
- **FR-038**: System MUST notify request creators when their requests are approved or rejected via in-app notification
- **FR-039**: When expense request is rejected, requestor MUST resubmit as new request after addressing feedback; feedback can be saved as draft without changing approval status

#### Reporting & Visibility

- **FR-040**: Managers MUST be able to view all expense requests from their department
- **FR-041**: Finance users MUST be able to view all expense requests across all departments
- **FR-042**: Employees MUST be able to view only their own expense requests
- **FR-043**: System MUST display expense request status (Draft, Pending Manager, Pending Finance, Pending CEO, Approved, Rejected)
- **FR-044**: System MUST provide dashboard showing budget utilization by department with quarterly data views

### Non-Functional Requirements

- **NFR-001**: System MUST provide response times under 200ms for expense request list views (per Performance Requirements principle)
- **NFR-002**: System MUST provide response times under 100ms for user interactions like button clicks (per Performance Requirements principle)
- **NFR-003**: System MUST be accessible to screen readers and meet WCAG 2.1 AA standards (per User Experience Consistency principle)
- **NFR-004**: System MUST work on mobile devices and tablets with responsive design (per User Experience Consistency principle)
- **NFR-005**: System MUST maintain audit logs for minimum 2 years
- **NFR-006**: System MUST support concurrent access by 50 employees without performance degradation
- **NFR-007**: System MUST define sensitive data types in detail and encrypt them following OWASP Top 10 security standards at rest and in transit
- **NFR-008**: MVP stage does not require authentication; users initialized with predefined accounts (FR-004)
- **NFR-009**: MVP stage uses mock OCR data for receipt extraction; real OCR service integration deferred to deployment phase

### Key Entities

- **User**: Represents an employee with role (Employee, Manager, Finance, CEO), department assignment, email address, approval permissions, delegation configuration for absence periods, and active/inactive status
- **Delegation**: Temporary assignment of user responsibilities to another user during vacation or absence; required when deactivating users with pending responsibilities
- **Department**: Organizational unit with name, budget allocation, department head, and team members
- **Project**: Work initiative or operation that can be shared across departments or limited to single department, with budget allocation
- **Expense Request**: Payment request created by employee containing amount, category, provider, date, description, receipt attachments, custom fields, notes, status, linked project (exactly one), and relationship to creator
- **Receipt**: Supporting document attached to expense request with file data, extracted information (provider, amount, line items) via mock OCR (MVP) or manual input, and upload timestamp
- **Approval**: Decision record for expense request containing approver (or delegate), decision (approved/rejected), timestamp, comments, and workflow level
- **Budget**: Financial allocation containing amount, department assignment, project assignment, time period (monthly), effective date for changes, and remaining balance
- **Audit Log**: Immutable record containing user, action type, timestamp, affected entity, and changed values; retained for 2 years
- **Approval Workflow Configuration**: Rule set containing conditions (amount threshold, category, department, document type, budget limit status) and required approval chain (Manager, Finance, CEO)
- **Expense Category**: Classification type such as "Outside Goods & Services Purchases", "Purchase of Fixed Assets & Equipment" with accounting codes

---

## Review & Acceptance Checklist

### Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain (all 8 clarifications resolved)
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Clarifications integrated (Session 2025-10-01)
- [x] Review checklist passed

---
