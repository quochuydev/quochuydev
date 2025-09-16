# Coding Guidelines

## General Guidelines

- Use `camelCase` for variable names
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
- Use `fetch` for query API, don't use axios

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

# Backend Guidelines

- Always assume **Next.js App Router API** `/api/*`
- Always integrate **Supabase Storage** for storage
- Store data in **Supabase PostgreSQL** - Migration files stored in `./migrations`
- Don't create new `supabase table/migration` until a new type is defined in `./types/entities.ts`. It mean a type is mapped to a table
- Create API should be simple, easy to review, don't use complex logic, just CRUD to database
- Using `zod` schema for validation in API routes (Require for POST, PUT, PATCH request)
- Create service files, expose function with interface for specific API route

```ts
// Example: `CreateProduct(title, description, price, stock, categoryId, images)`

type AdminCreateProductApi = {
  method: "POST";
  body: {
    title: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
  };
  result: {
    productId: string;
  };
};
```

- Try/catch rule

```ts
// API
try {
  //
} catch (err) {
  return NextResponse.json(
    {
      error: err instanceof Error ? err.message : "Invalid request",
    },
    {
      status: 400,
    }
  );
}
```
