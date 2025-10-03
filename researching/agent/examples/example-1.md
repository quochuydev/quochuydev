**Answer**: Based on the provided context, here are the functional requirements related to the accounting (expense management) system:

**Details**:

- **Expense Approval Workflow**:
  - Expense requests under 20,000,000 VND and within department budget are routed to the Manager for approval, then to Finance for final approval. (FR-ExpenseWorkflow)
  - CEO users have the authority to approve any submitted request, which immediately completes the approval process. (FR-CEOApprove)
- **User Actions on Expense Requests**:
  - Employees can create, edit, and delete their own expense requests. (FR-ExpenseCRUD)
- **Audit Logging**:
  - The system must maintain audit logs for a minimum of 2 years, covering all relevant system actions. (NFR-AuditLogRetention)

**Related**:

- Routing may differ for expenses above 20,000,000 VND or those outside the department budget (not detailed in the provided context).
- Audit logs are a non-functional requirement but are crucial for accounting and compliance.

**If you need more granular requirements (field definitions, entity relationships, etc.), please specify and I can search further.**
