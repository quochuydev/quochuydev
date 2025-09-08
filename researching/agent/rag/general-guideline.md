## Guidelines

- Ensure output matches **Envato marketplace checklist**
- Each time run the command for code generation:
  - Review current existing code
  - Don't change too much
  - Just change the necessary part, clean code, easy to review
  - Example: `claude "update admin order management"` : update code for `./app/admin/orders` and `./app/api/admin/orders` ONLY, especially not `./(web)`
  - Example: `claude "@docs/web/products ..."` : This mean you should update code for flow web products only
- Every files in these folder is created by engineer, don't change it:
  - Typescript interfaces/types are in `./types/entities.ts`
  - Documentations are in `./docs`
  - `./CLAUDE.md`
- Don't expect use `switch case` to handle different actions
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
