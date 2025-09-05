# Event Storming — User Registration (Backend)

## 🎯 Goal

Handle user registration securely and consistently, ensuring unique users, validated input, and confirmed emails.

---

## 🟢 Commands

- `RegisterUser (email, password, name)`
- `ConfirmUserEmail (userId, token)`
- `ResendConfirmationEmail (userId)`
- `BlockUserRegistration (email)`

---

## 🟠 Domain Events

- `UserRegistered`
- `UserEmailConfirmed`
- `UserRegistrationFailed`
- `UserEmailConfirmationExpired`
- `UserRegistrationBlocked`

---

## 🔵 Aggregates

### User Aggregate

- Attributes: `userId, email, passwordHash, status`
- States:
  - `PendingConfirmation`
  - `Active`
  - `Blocked`
  - `Failed`
- Business rules:
  - Email must be unique.
  - Password must pass security policy.
  - Confirmation required before activation.

---

## 🟡 Policies

- On `UserRegistered` → send confirmation email with token.
- On `UserEmailConfirmed` → activate account.
- On `UserRegistrationFailed` → log + notify.
- On `UserEmailConfirmationExpired` → allow re-send.
- On `UserRegistrationBlocked` → reject any future attempts.

---

## ⚠️ Edge Cases

- Duplicate email → `UserRegistrationFailed (EmailAlreadyUsed)`.
- Weak password → `UserRegistrationFailed (WeakPassword)`.
- Blocked domain/email → `UserRegistrationBlocked`.
- Expired token → `UserEmailConfirmationExpired`.
- Invalid token → `UserRegistrationFailed (InvalidToken)`.
- Suspicious activity → `UserRegistrationBlocked`.
- System error (DB/Email down) → `UserRegistrationFailed (SystemError)`.

---

## 📖 Projections / Read Models

- **User List View**: id, email, status.
- **Registration Status View**: pending, active, blocked, failed.
