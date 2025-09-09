# Frontend Guidelines

- Client in `./app/(web)` can only use fetch API to call API routes `./app/api/web`

```ts
// Example: /app/(web)/products/[productId]

// BAD
const response = await fetch(`${baseUrl}/api/admin/products/${productId}`);
const data = await response.json();

// GOOD
const response = await fetch(`${baseUrl}/api/web/products/${productId}`);
const data = await response.json();
```

- Client in `./app/admin` can use fetch API to call API routes `./app/api/admin`

```ts
// Example: /app/admin/products/[productId]

// BAD
const response = await fetch(`${baseUrl}/api/web/products/${productId}`);
const data = await response.json();

// GOOD
const response = await fetch(`${baseUrl}/api/admin/products/${productId}`);
const data = await response.json();
```

- Use fetch API to call API routes or Nextjs actions

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

- Don't allow API using fetch to call to API routes, it must be query from Database

```ts
// Example: Inside web product API, calling to admin product API

// BAD:
const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : `http://localhost:${process.env.PORT || 3000}`;
const response = await fetch(`${baseUrl}/api/admin/products/${productId}`);
const data = await response.json();

// GOOD - Query product by ID from database
```

- Try/catch rule

```ts
// Client
import { toast } from "sonner";

try {
  //
} catch (err) {
  const message = err instanceof Error ? err.message : `Failed to ${Command}`;
  toast(message);
}
```
