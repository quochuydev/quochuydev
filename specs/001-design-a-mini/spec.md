# Feature Specification: Loan Repayment Schedule Mini-App

**Feature Branch**: `001-design-a-mini`  
**Created**: 2025-09-23  
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

## User Scenarios & Testing *(mandatory)*

### Primary User Story
A borrower, financial planner, or small business owner wants to quickly understand and compare how their loan will be repaid over time using two methods: reducing balance and amortized loan. They enter loan parameters (amount, interest rate, term, and repayment frequency) and receive a clear, month-by-month schedule and a summary of totals. They can compare the two methods side-by-side and export the results.

### Acceptance Scenarios
1. **Given** a user opens the mini-app on a mobile device, **When** they enter loan amount, annual interest rate, loan term, and choose a monthly repayment frequency, **Then** the system shows a month-by-month schedule for each method with principal, interest, total payment, and remaining balance, plus summary totals.
2. **Given** a user switches repayment frequency (e.g., monthly to biweekly), **When** they update inputs, **Then** the schedules and totals recalculate consistently and display updated figures for both methods.
3. **Given** schedules are generated, **When** the user selects export as CSV, **Then** the system provides a downloadable CSV that includes all schedule rows and the summary section.
4. **Given** schedules are generated, **When** the user selects export as PDF, **Then** the system provides a formatted PDF with clear tables and a comparison summary suitable for sharing or printing.
5. **Given** the user provides invalid inputs (e.g., negative amounts, zero term, non-numeric values), **When** they submit, **Then** the system shows clear validation errors and prevents calculation until corrected.
6. **Given** large loan terms (e.g., 40 years monthly) or frequent schedules (e.g., weekly), **When** the user calculates, **Then** results are produced quickly with no visible performance degradation on typical mobile devices within a reasonable response time [NEEDS CLARIFICATION: define target performance threshold in seconds and supported device baseline].

### Edge Cases
- Extremely small interest rates (near 0%) and very high rates (e.g., > 50%).
- Very short terms (1–3 periods) and very long terms (e.g., 40 years at weekly frequency).
- Rounding differences across periods accumulating to noticeable variances in final balance; final payment adjustment handling.
- Non-standard repayment frequencies (weekly, biweekly, monthly, quarterly) and how interest accrues per period [NEEDS CLARIFICATION: interest compounding convention per frequency].
- Balloon or interest-only options are out of scope unless explicitly added [NEEDS CLARIFICATION: confirm exclusion].
- Fees, taxes, insurance, or extra payments not included unless specified [NEEDS CLARIFICATION: confirm exclusion].

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: The system MUST allow the user to input loan amount, annual interest rate, loan term, and repayment frequency (weekly, biweekly, monthly, quarterly) [NEEDS CLARIFICATION: finalize supported frequencies].
- **FR-002**: The system MUST calculate and display a detailed period-by-period repayment schedule (default monthly) for the reducing balance method (a.k.a. declining balance) and the amortized loan method.
- **FR-003**: The schedule MUST include, per period: starting balance, interest component, principal component, total payment, and ending balance.
- **FR-004**: The system MUST present summary metrics per method: total interest paid, total repayment amount, total number of payments, and final payoff date.
- **FR-005**: The system MUST allow side-by-side comparison between the two methods, including charts and/or tables that clearly distinguish totals and trends.
- **FR-006**: The system MUST support recalculation immediately upon input changes and update all views consistently.
- **FR-007**: The system MUST validate inputs with clear error messages for out-of-range or invalid values (e.g., negative amounts, zero or negative terms, interest outside allowed range) [NEEDS CLARIFICATION: specify allowed ranges and defaults].
- **FR-008**: The system MUST provide an option to export the full schedule and summary as CSV.
- **FR-009**: The system MUST provide an option to export the full schedule and summary as PDF suitable for printing.
- **FR-010**: The system MUST ensure calculation precision and consistency with financial standards, including documented rounding and interest accrual conventions [NEEDS CLARIFICATION: rounding per period, number of decimal places, day-count basis (e.g., 30/360, ACT/365), and compounding convention].
- **FR-011**: The UI MUST be simple, mobile-friendly, fast to interact with, and accessible (readable tables, responsive layout, clear labels and hints) [NEEDS CLARIFICATION: accessibility targets such as contrast and minimum touch targets].
- **FR-012**: The system MUST support displaying and exporting currency-formatted values with appropriate thousands separators and decimal precision [NEEDS CLARIFICATION: default currency/locale and formatting rules].
- **FR-013**: The system MUST handle the final payment adjustment to fully amortize the loan when rounding causes a small residual balance.
- **FR-014**: The system MUST clearly communicate assumptions and any calculation conventions used (e.g., compounding frequency, rounding strategy) in a help or info section.
- **FR-015**: The system SHOULD allow users to choose repayment frequency independently from compounding frequency, while enforcing consistent financial treatment if they differ [NEEDS CLARIFICATION: whether compounding equals payment frequency or is configurable].
- **FR-016**: The system SHOULD support saving or sharing the configured scenario via a URL parameter or shareable summary [NEEDS CLARIFICATION: in or out of scope].

*Ambiguities to resolve for testability:*
- Interest rate interpretation: nominal annual vs effective annual; mapping to period rate given frequency.
- Compounding frequency and its relationship to payment frequency.
- Day-count convention for interest accrual (e.g., ACT/365, 30/360).
- Rounding rules: per-period rounding, cumulative rounding, and final payment adjustment policy.
- Supported repayment frequencies and default frequency.
- Currency/locale formatting defaults; support for multiple locales.
- Handling of fees, taxes, insurance, and extra/early payments (assumed out of scope unless specified).

### Key Entities *(include if feature involves data)*
- **Loan Configuration**: Captures inputs entered by the user: loan amount, annual interest rate, loan term (years or total periods), repayment frequency, optional compounding frequency [NEEDS CLARIFICATION], start date [NEEDS CLARIFICATION].
- **Repayment Schedule**: A collection of period rows computed under a specific method and configuration; includes per-row values (period index/date, starting balance, interest, principal, total payment, ending balance) and flags for final-payment adjustment.
- **Summary Metrics**: Aggregated totals for a given schedule: total interest, total repayment, number of payments, payoff date, and any variance notes due to rounding.
- **Comparison View**: A view model that holds two schedules (reducing balance vs amortized) and aligns periods for comparison.
- **Export Artifact**: Represents an exportable output (CSV or PDF) containing schedules and summary, with metadata (timestamp, currency/locale) and formatting rules.

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

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
*Updated by main() during processing*

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [ ] Review checklist passed

---

