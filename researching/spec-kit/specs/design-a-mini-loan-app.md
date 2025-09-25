# Feature Specification: Loan Repayment Schedule Mini-App (Reducing Balance and Amortized Methods)

**Feature Branch**: `003-design-a-mini`  
**Created**: 2025-09-25  
**Status**: Draft  
**Input**: User description: "Design a mini-app that calculates loan repayment schedules using reducing balance method and amortized loan method. The app should allow users to input loan amount, interest rate, loan term, and repayment frequency. Output should include a detailed month-by-month schedule showing principal, interest, remaining balance, and total payment. Provide summary metrics such as total interest paid and total repayment amount. Ensure calculations are precise and consistent with financial standards. UI must be simple, mobile-friendly, and fast, with clear charts/tables for comparison between methods. Include option to export results as CSV or PDF."

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

### Section Requirements

- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation

When creating this spec from a user prompt:

1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## User Scenarios & Testing _(mandatory)_

### Primary User Story

As a borrower or financial planner, I want to enter a loan amount, interest rate, loan term, and repayment frequency, and choose between the reducing balance method and the amortized loan method so that I can view a clear, month-by-month repayment schedule and summary metrics, compare methods, and export results.

### Acceptance Scenarios

1. **Given** valid inputs for amount, annual interest rate, term, and repayment frequency, **When** I select the reducing balance method and calculate, **Then** I see a month-by-month schedule listing for each period: principal, interest, total payment, and remaining balance, plus summary totals.
2. **Given** valid inputs for amount, annual interest rate, term, and repayment frequency, **When** I select the amortized loan method and calculate, **Then** I see a month-by-month schedule with the same columns and accurate amortization.
3. **Given** the same inputs, **When** I select "Compare methods", **Then** the app shows side-by-side tables and a simple chart highlighting differences in principal vs. interest over time and total interest paid.
4. **Given** a generated schedule, **When** I choose "Export as CSV", **Then** a CSV file downloads containing the schedule rows and a summary section.
5. **Given** a generated schedule, **When** I choose "Export as PDF", **Then** a PDF downloads containing the schedule tables and summary with clear formatting suitable for sharing.
6. **Given** invalid input (e.g., negative amount, zero rate, unsupported frequency), **When** I attempt to calculate, **Then** I receive a clear validation message explaining what to fix and calculation does not proceed.
7. **Given** a mobile device, **When** I use the mini-app, **Then** the UI renders responsively with readable tables and controls, and calculations return results quickly.

### Edge Cases

- Extremely small or large loan amounts and/or interest rates.
- Very short terms (e.g., 1–3 months) and very long terms (e.g., 30 years).
- Non-monthly repayment frequencies (e.g., weekly, bi-weekly, quarterly) and how periods map to months in schedules. [NEEDS CLARIFICATION: supported repayment frequencies and period-to-month mapping]
- Final payment rounding differences causing a small remainder or overpayment; last installment adjustment rules. [NEEDS CLARIFICATION: rounding policy and final payment adjustment]
- Zero-interest loans (rate = 0%).
- Interest-only periods or grace periods if ever needed. [NEEDS CLARIFICATION: are special periods in scope?]
- Handling leap years and day-count conventions if frequency is not monthly. [NEEDS CLARIFICATION: day-count basis]
- Currency, locale, and formatting (decimal places, thousand separators). [NEEDS CLARIFICATION: target currency/locale]

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST let users input loan amount, annual interest rate, loan term, and repayment frequency.
- **FR-002**: The system MUST support at least two calculation methods: reducing balance method and amortized loan method.
- **FR-003**: The system MUST produce a detailed schedule for each repayment period showing principal, interest, total payment, and remaining balance.
- **FR-004**: The system MUST display summary metrics including total interest paid and total repayment amount for the chosen method.
- **FR-005**: The system MUST allow users to compare results between reducing balance and amortized methods via tables and clear charts.
- **FR-006**: The system MUST provide export options to CSV and PDF containing schedule data and summary metrics.
- **FR-007**: The system MUST validate inputs and show actionable error messages for invalid values or missing fields.
- **FR-008**: The UI MUST be simple, mobile-friendly, and performant, rendering readable tables on small screens.
- **FR-009**: The system MUST ensure calculations are precise and consistent with financial standards, including predictable rounding rules. [NEEDS CLARIFICATION: rounding rules and precision (e.g., 2 decimals, 4 for rates)]
- **FR-010**: The system MUST support configurable repayment frequency options. [NEEDS CLARIFICATION: which frequencies: monthly, bi-weekly, weekly, quarterly?]
- **FR-011**: The system MUST clearly indicate assumptions (e.g., compounding convention, period mapping). [NEEDS CLARIFICATION: compounding frequency; day-count convention]
- **FR-012**: The system MUST compute and display payment due dates based on a start date if provided. [NEEDS CLARIFICATION: should users input a start date? how to handle month-end alignment]
- **FR-013**: The system MUST allow users to switch methods without re-entering inputs.
- **FR-014**: The system SHOULD provide accessibility-friendly color contrasts and alt text for charts.
- **FR-015**: The system SHOULD allow users to copy summary metrics easily.
- **FR-016**: The system SHOULD allow selecting currency and locale for number formatting. [NEEDS CLARIFICATION: in scope? default locale]
- **FR-017**: The system MUST handle the last installment adjustment so remaining balance reaches zero within rounding tolerance. [NEEDS CLARIFICATION: acceptable tolerance threshold]
- **FR-018**: The system MUST present performance feedback if calculations exceed a reasonable time threshold (e.g., show a spinner and avoid blocking UI).

### Key Entities _(include if feature involves data)_

- **Loan**: Represents the borrowing arrangement; attributes include principal amount, annual interest rate, term (in months or years), repayment frequency, optional start date, currency/locale preferences, and calculation method selected.
- **ScheduleEntry**: Represents a single period row in the schedule; attributes include period index/date, opening balance, interest, principal, total payment, and closing balance.
- **SummaryReport**: Aggregated metrics; attributes include total interest, total repayment, number of installments, and method used; includes assumptions applied.
- **ExportRequest**: Represents a user request to export results; attributes include format (CSV/PDF), selected method(s), and timestamp.

---

## Review & Acceptance Checklist

_GATE: Automated checks run during main() execution_

### Content Quality

- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness

- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status

_Updated by main() during processing_

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [ ] Review checklist passed

---
