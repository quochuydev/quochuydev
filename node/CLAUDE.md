## Guidelines

### General

- Never run start app in claude code.

### Common Issues

- Not using `any`
- Get the error with ESlint
- The related file is not imported
- Missing null/undefined checks
- Not using readonly for immutable data

### Specific requirements

- Variable naming: use camelCase

**Bad:**

```typescript
const update_date = new Date();
```

**Good:**

```typescript
const updateDate = new Date();
```

- Use ISOString format for request body

**Bad:**

```typescript
await fetch('/api/update', {
  method: 'POST',
  body: JSON.stringify({ updateDate: Date.now() }),
});
```

**Good:**

```typescript
await fetch('/api/update', {
  method: 'POST',
  body: JSON.stringify({ updateDate: new Date().toISOString() }),
});
```

### Backend Guidelines

- Create API should be simple, easy to review, don't use complex logic, just CRUD to database
- Using `zod` schema for validation in API routes (Require for POST, PUT, PATCH request)
- Try/catch rule

```ts
// API
try {
  //
} catch (err) {
  //
}
```
