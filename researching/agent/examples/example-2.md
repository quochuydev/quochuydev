**Answer:**  
To create an accounting expense approval application based on the provided context, you need to implement the following core features and approval workflows:

---

**Details:**

1. **Expense Request Management**

   - Employees can **create**, **edit**, and **delete** their own expense requests until submission.
   - Once an expense request is submitted, it enters the approval workflow.

2. **Approval Workflow Rules**

   - **Standard flow**: For expense requests **under 20,000,000 VND** and **within the department budget**:
     - Step 1: The request is sent to the **Manager** for approval.
     - Step 2: After Manager approval, the request goes to **Finance** for final approval.
   - **CEO Override**: CEO users can directly approve any submitted request, instantly marking it as complete, bypassing other approvals.

3. **Audit Logging**
   - The system must **maintain audit logs** of all actions (creation, editing, submission, approval, rejection, deletion) for a **minimum of 2 years**. This ensures traceability for compliance.

---

**Related:**

- Consider role-based access control to distinguish between employees, Managers, Finance, and CEO users.
- Ensure compliance for data retention on audit logs as per the 2-year minimum.
- You may need to define department budget constraints and validation checks at the time of request creation.
- Edge Case: For requests over 20,000,000 VND or outside the department budget, approval rules are not specified—clarification from business stakeholders may be required.
- If a request is deleted, be sure to log the deletion event in the audit logs for compliance.

---

If you need more specifications on entity fields, UI workflows, or additional business rules, please provide further details or ask specific questions!
