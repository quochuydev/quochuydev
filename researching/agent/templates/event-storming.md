# Event Storming

## Rules

- Use `camelCase` for the name
- Event's name must be passive voice
- Command's name must be action and a user's role

## Types

- 🔵 Command: Action and a user's role, Example: `CreateOrder (User)`
- 🟠 Event: Passive voice, Example: `OrderCreated`
- 🟣 Policy: Business rule, often a condition
- 🟢 Read model: Input data
- 🟡 Sub process (a process that often repeat, start with an 🟠 Event)
- 🔴 External: External system, what we can't control

### YAML Format

```yaml
eventStormingModel: "Online Order Checkout"

actors:
  - name: "Customer"
    description: "Initiates order"

events:
  - id: E1
    name: "CartCheckedOut"
    description: "Customer submits cart for checkout"
  - id: E2
    name: "PaymentAuthorized"
    description: "Payment gateway authorized the payment"
  - id: E3
    name: "PaymentFailed"
    description: "Payment gateway declined the payment"
  - id: E4
    name: "OrderShipped"
    description: "Warehouse shipped the order"

commands:
  - id: C1
    name: "ValidateOrder"
    triggeredBy: "CartCheckedOut"
    realModel:
      input:
        customerId: "UUID"
        cartItems:
          - productId: "UUID"
            quantity: "Integer"
      context: "Ensure stock and pricing are up-to-date"
  - id: C2
    name: "AuthorizePayment"
    triggeredBy: "ValidateOrderSucceeded"
    realModel:
      input:
        orderId: "UUID"
        amount: "Decimal"
        paymentMethod:
          type: "CreditCard"
          details:
            cardNumber: "String"
            expiry: "MM/YY"
  - id: C3
    name: "ShipOrder"
    triggeredBy: "PaymentAuthorized"
    realModel:
      input:
        orderId: "UUID"
        shippingAddress:
          line1: "String"
          city: "String"
          postalCode: "String"

policies:
  - id: P1
    name: "EnsureValidOrderData"
    type: "after command"
    onCommand: "ValidateOrder"
    action: "Reject if cartItems empty or customerId invalid"
  - id: P2
    name: "HandlePaymentOutcome"
    type: "after event"
    onEvent: "PaymentAuthorized"
    action: "Trigger ShipOrder command"
  - id: P3
    name: "HandlePaymentFailure"
    type: "after event"
    onEvent: "PaymentFailed"
    action: "Notify Customer and cancel order"

subprocesses:
  - id: SP1
    name: "GenerateInvoice"
    startEvent: "ValidateOrderSucceeded"
    steps:
      - command: "CreateInvoiceRecord"
      - event: "InvoiceGenerated"
    description: "Reusable invoicing flow"

externalSystems:
  - id: X1
    name: "Payment Gateway"
    actions:
      - command: "AuthorizePayment"
      - eventSuccess: "PaymentAuthorized"
      - eventFailure: "PaymentFailed"
  - id: X2
    name: "Shipping Service"
    actions:
      - command: "ShipOrder"
      - eventSuccess: "OrderShipped"
```
