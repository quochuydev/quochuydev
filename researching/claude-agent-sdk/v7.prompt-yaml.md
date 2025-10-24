```yaml
meta:
  name: "Expense–Finance–Approval Core"
  version: "1.0"

read_models:
  - id: RM.Dashboard
    name: "Requester PO Dashboard"
  - id: RM.ApprovalQueue
    name: "Approver PO Queue"
  - id: PO.View
    name: "PO Details"
  - id: RM.AuditTrail
    name: "PO Audit Log"

actors:
  - id: A.Requester
    name: "Requester"
  - id: A.Approver
    name: "Approver"
  - id: A.Finance
    name: "Finance"

commands:
  - id: C.CreatePO
    name: "Create PO"
  - id: C.SubmitForApproval
    name: "Submit for Approval"
  - id: C.ApprovePO
    name: "Approve PO"
  - id: C.RejectPO
    name: "Reject PO"
  - id: C.ResubmitPO
    name: "Resubmit PO"
  - id: C.CancelPO
    name: "Cancel PO"
  - id: C.RecordPayment
    name: "Record Payment"

policies:
  - id: P.POCreation
    name: "PO Creation Policy"
  - id: P.ApprovalWorkflow
    name: "Approval Workflow Policy"
  - id: P.PaymentProcessing
    name: "Payment Processing Policy"
  - id: P.CancellationPolicy
    name: "PO Cancellation Policy"

events:
  - id: E.POCreated
    name: "PO Created"
  - id: E.POSubmittedForApproval
    name: "PO Submitted for Approval"
  - id: E.POApproved
    name: "PO Approved"
  - id: E.PORejected
    name: "PO Rejected"
  - id: E.POCancelled
    name: "PO Cancelled"
  - id: E.POPaymentRecorded
    name: "PO Payment Recorded"

flows:
  - name: "Requester Creates and Submits PO"
    edges:
      - source_id: RM.Dashboard
        target_id: A.Requester
      - source_id: A.Requester
        target_id: C.CreatePO
      - source_id: C.CreatePO
        target_id: P.POCreation
      - source_id: P.POCreation
        target_id: E.POCreated
      - source_id: E.POCreated
        target_id: PO.View
      - source_id: A.Requester
        target_id: C.SubmitForApproval
      - source_id: C.SubmitForApproval
        target_id: P.ApprovalWorkflow
      - source_id: P.ApprovalWorkflow
        target_id: E.POSubmittedForApproval
      - source_id: E.POSubmittedForApproval
        target_id: RM.ApprovalQueue
      - source_id: E.POSubmittedForApproval
        target_id: RM.AuditTrail

  - name: "Approver Reviews PO"
    edges:
      - source_id: RM.ApprovalQueue
        target_id: A.Approver
      - source_id: A.Approver
        target_id: C.ApprovePO
      - source_id: C.ApprovePO
        target_id: P.ApprovalWorkflow
      - source_id: P.ApprovalWorkflow
        target_id: E.POApproved
      - source_id: E.POApproved
        target_id: PO.View
      - source_id: E.POApproved
        target_id: RM.AuditTrail
      - source_id: A.Approver
        target_id: C.RejectPO
      - source_id: C.RejectPO
        target_id: P.ApprovalWorkflow
      - source_id: P.ApprovalWorkflow
        target_id: E.PORejected
      - source_id: E.PORejected
        target_id: PO.View
      - source_id: E.PORejected
        target_id: RM.AuditTrail

  - name: "Requester Resubmits Rejected PO"
    edges:
      - source_id: PO.View
        target_id: A.Requester
      - source_id: A.Requester
        target_id: C.ResubmitPO
      - source_id: C.ResubmitPO
        target_id: P.ApprovalWorkflow
      - source_id: P.ApprovalWorkflow
        target_id: E.POSubmittedForApproval
      - source_id: E.POSubmittedForApproval
        target_id: RM.ApprovalQueue

  - name: "PO Cancellation"
    edges:
      - source_id: PO.View
        target_id