**General Guidelines**

- Use `camelCase` for variable names
- Each time run the command for code generation:
  - Review current existing code
  - Don't change too much
  - Just change the necessary part, clean code, easy to review
- Don't expect use `switch case` to handle different actions
- Use `fetch` for query API, don't use `axios`

```ts
const response = await fetch("/api/admin/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title: "Product 1", price: 10 }),
});
const data = await response.json();
```

- Don't use direct `process.env.` and hard code URL

```ts
// BAD
const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : `http://localhost:${process.env.PORT || 3000}`;

const response = await fetch(`${baseUrl}/api/admin/products/${productId}`);
const data = await response.json();

// GOOD
import { config } from "./config";

const response = await fetch(
  `${config.appUrl}/api/admin/products/${productId}`
);
const data = await response.json();
```

- Logging: Using `console.log` must be matching with a command in `Event storming`

```ts
console.log(
  "Command:CreateProduct",
  JSON.stringify({ title, description, price, stock, categoryId, images })
);
```

- Logging: Using `console.log` must be matching with a event in `Event storming`

```ts
console.log("Event:ProductCreated", JSON.stringify(productId));
```
