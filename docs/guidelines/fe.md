**Frontend Guidelines**

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
