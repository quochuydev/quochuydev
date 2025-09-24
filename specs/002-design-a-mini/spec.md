# Feature Specification: Loan Repayment Schedule Mini-App

**Feature Branch**: `002-design-a-mini`  
**Created**: 2025-09-24  
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

## User Scenarios & Testing (mandatory)

### Primary User Story
As a user, I want to enter my loan details and instantly see month-by-month repayment schedules for both the reducing balance method and the amortized loan method, so I can compare how much I’ll pay in interest and total payments over time and decide on the best repayment option.

### Acceptance Scenarios
1. Given a loan amount, annual interest rate, loan term, and a repayment frequency, when I submit the form, then the system generates two comparable schedules (reducing balance and amortized) with a row per period showing principal, interest, total payment, and remaining balance.
2. Given a generated schedule, when I view the summary section, then I see total interest paid and total amount repaid for each method, plus the number of periods and the final payoff date per method.
3. Given a generated schedule, when I choose Export as CSV, then I receive a CSV file containing the full schedule for the selected method and a separate summary section with totals.
4. Given a generated schedule, when I choose Export as PDF, then I receive a PDF with a clear table of the schedule and a summary section; charts shown in the UI are included as static visuals or omitted per design.
5. Given different repayment frequencies (e.g., monthly, bi-weekly, weekly), when I compute schedules, then the number of periods, per-period interest/principal allocations, and total interest adjust accordingly and remain consistent with financial standards.
6. Given large inputs (e.g., high principal, long terms), when I compute schedules, then the results render within an acceptable time and the UI remains responsive on mobile.
7. Given invalid inputs (e.g., negative amounts, zero term), when I submit the form, then I receive validation errors indicating what to correct without losing entered data.

### Edge Cases
- Zero or near-zero interest rates: ensure schedules reflect negligible interest and that principal allocation remains correct.
- Very short terms (e.g., 1–3 periods) and very long terms (e.g., 30 years) to verify correctness and performance.
- High repayment frequency (e.g., weekly) producing > 50 rows per year and verifying rendering and export scalability.
- Rounding impacts that could cause small residual balances in the final period; handle final payment adjustment gracefully.
- Non-standard first/last periods due to partial periods or date alignment. [NEEDS CLARIFICATION: Should the first payment align to the next period boundary or a fixed start date?]
- Overpayments or extra lump-sum payments. [NEEDS CLARIFICATION: Are users allowed to model extra payments or only standard schedules?]

## Requirements (mandatory)

### Functional Requirements
- **FR-001**: The system MUST accept user inputs: loan amount (principal), annual interest rate, loan term, and repayment frequency.
- **FR-002**: The system MUST support at least these repayment frequencies: monthly; SHOULD support bi-weekly and weekly where feasible. [NEEDS CLARIFICATION: Exact set of supported frequencies and region-specific conventions]
- **FR-003**: The system MUST generate a detailed period-by-period schedule for the reducing balance method including per-period interest, principal, total payment, and remaining balance.
- **FR-004**: The system MUST generate a detailed period-by-period schedule for the amortized loan method including per-period interest, principal, total payment (constant payment per period), and remaining balance.
- **FR-005**: The system MUST display a side-by-side comparison (tables and/or charts) of key metrics between methods, including cumulative interest and remaining balance trajectory.
- **FR-006**: The system MUST present summary metrics per method: total interest paid, total repayment amount, number of periods, and projected payoff date.
- **FR-007**: The system MUST allow exporting full schedules and summaries as CSV files.
- **FR-008**: The system MUST allow exporting full schedules and summaries as PDF files. [NEEDS CLARIFICATION: Branding, pagination rules, and inclusion of charts]
- **FR-009**: The system MUST validate inputs (e.g., positive numeric values, reasonable ranges) and show clear, inline error messages.
- **FR-010**: The system MUST be usable on mobile devices with a simple, fast UI and readable tables/charts.
- **FR-011**: The system SHOULD allow selection of compounding and interest conventions if required by users. [NEEDS CLARIFICATION: Day count convention (e.g., 30/360, ACT/365), nominal vs effective APR, compounding frequency]
- **FR-012**: The system SHOULD allow choosing a loan start date to anchor period dates and compute payoff date. [NEEDS CLARIFICATION: Default start date and holiday/weekend adjustments]
- **FR-013**: The system SHOULD provide clear definitions/tooltips explaining the two methods and any financial terms used.
- **FR-014**: The system SHOULD provide an option to download both methods in a single combined export for comparison.
- **FR-015**: The system SHOULD handle rounding and final payment adjustments to ensure the remaining balance reaches zero within tolerance aligned with financial standards. [NEEDS CLARIFICATION: Rounding precision and tie-breaking rules]

### Key Entities (include if feature involves data)
- **Loan Input**: Represents a single calculation request; attributes include principal amount, annual interest rate, loan term, repayment frequency, optional start date, and optional convention settings.
- **Schedule Entry**: Represents one period’s results; attributes include period index/date, interest amount, principal amount, total payment, and remaining balance.
- **Method Result**: Represents the full schedule and summary for a method; attributes include list of schedule entries, total interest, total repayment, number of periods, and payoff date.
- **Export Request**: Represents an export action; attributes include selected method(s), format (CSV or PDF), and timestamp.

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

