## Guidelines

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
