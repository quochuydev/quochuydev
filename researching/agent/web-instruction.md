# Web Instructions — User Registration (Frontend)

## Goal

Provide a simple, guided experience for users to register, confirm their account, and handle errors gracefully.

## Pages & Components

### 1. Registration Page (`/register`)

- Form fields: `Name, Email, Password, Confirm Password`.
- Client-side validations:
  - Email format check.
  - Password strength meter (8+ chars, uppercase, number, symbol).
- Submit → calls `RegisterUser` API.

### 2. Confirmation Page (`/confirm?token=XYZ`)

- Instruction: “Please confirm your email.”
- Button: **Confirm Email** → calls `ConfirmUserEmail`.
- Handle errors:
  - Token expired → option: **Resend Email**.
  - Invalid token → show error + link back to support.

### 3. Success Page (`/welcome`)

- Message: “Your account has been activated.”
- Call to action: **Go to Dashboard**.

### 4. Error/Blocked Page

- If registration fails:
  - Weak password → highlight rules.
  - Duplicate email → suggest login or password reset.
  - Blocked email/domain → contact support.

## UX Flows

### Happy Path

1. User fills registration form.
2. Backend returns success → show “Check your email for confirmation.”
3. User clicks email link → `/confirm`.
4. Token verified → account activated.
5. Redirect to `/welcome`.

### Edge Cases

- Duplicate email → inline error: “This email is already registered.”
- Weak password → inline error with checklist.
- Expired token → option to resend confirmation.
- Blocked → show error + contact support link.

## 🎨 Design Notes

- Responsive (mobile-first).
- Accessibility (WCAG 2.1).
- Show loading indicators for API calls.
- Friendly error messages (no technical jargon).
