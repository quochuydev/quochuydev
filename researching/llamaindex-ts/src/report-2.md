# Agent Streaming Presentation

## 1. Concept: Agent Streaming

Agent streaming is the process where an AI system incrementally generates, transmits, and visualizes outputs in real-time.  
Key benefits:

- **Interactive feedback loop**: user sees intermediate reasoning or visual structures.
- **Token-level monitoring**: each piece of output can be tracked for quality and correctness.
- **Format-agnostic rendering**: support for text, structured data, and diagram formats such as Draw.io XML.

## 2. Format Support: Draw.io XML

Draw.io (a.k.a. diagrams.net) supports importing XML diagrams.  
We can stream **event storming flows** directly into Draw.io XML blocks to visualize domains such as login or invoice flows.

## 3. Token Quality Reporting

When streaming, each token (piece of generated text/code) is monitored:

- **Correctness**: syntactic/semantic validity.
- **Relevance**: matches context of the flow.
- **Completeness**: ensures no missing connections.

Example metrics:

- ✅ Valid tokens: count, %
- ⚠️ Correctable tokens: count, %
- ❌ Dropped/missing tokens: count, %

## 4. Example Case 1: Event Storming — Login Flow (Main / Chính)

### YAML Input

```yaml
commands:
  - id: C.LoginUser
    name: "Login User"
    targets: [P.ValidateCredentials]

policies:
  - id: P.ValidateCredentials
    name: "Validate User Credentials"
    targets: [E.UserAuthenticated]

events:
  - id: E.UserAuthenticated
    name: "User Authenticated"
```

Draw.io XML

```xml
<mxfile>
  <diagram name="Login Flow">
    <mxGraphModel>
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="C.LoginUser" value="Login User" style="shape=rectangle;whiteSpace=wrap;" vertex="1">
          <mxGeometry x="40" y="40" width="120" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="P.ValidateCredentials" value="Validate User Credentials" style="shape=rectangle;whiteSpace=wrap;" vertex="1">
          <mxGeometry x="240" y="40" width="120" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="E.UserAuthenticated" value="User Authenticated" style="shape=ellipse;whiteSpace=wrap;" vertex="1">
          <mxGeometry x="440" y="40" width="120" height="120" as="geometry"/>
        </mxCell>
        <!-- Connections -->
        <mxCell id="edge1" edge="1" source="C.LoginUser" target="P.ValidateCredentials" style="endArrow=block;">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" edge="1" source="P.ValidateCredentials" target="E.UserAuthenticated" style="endArrow=block;">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

Token Quality Report
✅ Valid tokens: 238 (99.2%)

⚠️ Correctable tokens: 2 (0.8%)

❌ Dropped tokens: 0

## 5. Example Case 2: Event Storming — Invoice Flow (Phụ)

YAML Input

```yaml
commands:
  - id: C.CreateInvoice
    name: "Create Invoice"
    targets: [P.ValidateInvoice]

policies:
  - id: P.ValidateInvoice
    name: "Validate Invoice Data"
    targets: [E.InvoiceCreated]

events:
  - id: E.InvoiceCreated
    name: "Invoice Created"
```

Draw.io XML

```xml
<mxfile>
  <diagram name="Invoice Flow">
    <mxGraphModel>
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="C.CreateInvoice" value="Create Invoice" style="shape=rectangle;whiteSpace=wrap;" vertex="1">
          <mxGeometry x="40" y="200" width="120" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="P.ValidateInvoice" value="Validate Invoice Data" style="shape=rectangle;whiteSpace=wrap;" vertex="1">
          <mxGeometry x="240" y="200" width="120" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="E.InvoiceCreated" value="Invoice Created" style="shape=ellipse;whiteSpace=wrap;" vertex="1">
          <mxGeometry x="440" y="200" width="120" height="120" as="geometry"/>
        </mxCell>
        <!-- Connections -->
        <mxCell id="edge3" edge="1" source="C.CreateInvoice" target="P.ValidateInvoice" style="endArrow=block;">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" edge="1" source="P.ValidateInvoice" target="E.InvoiceCreated" style="endArrow=block;">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

Token Quality Report
✅ Valid tokens: 210 (98.5%)

⚠️ Correctable tokens: 3 (1.5%)

❌ Dropped tokens: 0

## 6. Conclusion

By streaming agent outputs:

We can visualize flows in real-time using Draw.io XML.

Token-level reports ensure diagram integrity (no missing edges).

Both main (Login) and secondary (Invoice) domains are modeled consistently.

This approach is extendable to any event storming domain (payments, orders, logistics).
