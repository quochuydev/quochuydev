**Backend Guidelines**

- Create API should be simple, easy to review, don't use complex logic, just CRUD to database
- Using `zod` schema for validation in API routes (Require for POST, PUT, PATCH request)
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
