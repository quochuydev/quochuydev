# OIDC Quick Start Guide

## Quick Setup (5 minutes)

### Step 1: Configuration
Your ZITADEL configuration is already set up in `src/lib/oidc-config.ts`:

```typescript
authority: 'https://system-v1-fpms4l.zitadel.cloud'
client_id: '346770541404839766'
redirect_uri: `${window.location.origin}/login/callback`
```

### Step 2: Use the Login Component

Add the login component to any page:

```tsx
import { OIDCLogin } from './components/OIDCLogin';

export default function MyPage() {
  return (
    <div>
      <h1>My Application</h1>
      <OIDCLogin />
    </div>
  );
}
```

### Step 3: Test It

1. Start your dev server: `npm run dev`
2. Navigate to the page with the OIDCLogin component
3. Click "Login with ZITADEL"
4. Open browser DevTools (F12) to see debug logs
5. Login with your ZITADEL credentials

## Debug Logging

All operations are automatically logged to the console with `[OIDC]` prefix:

```
[OIDC] Initiating login
[OIDC] Login redirect initiated
[OIDC] Handling callback
[OIDC] Callback handled successfully
[OIDC] User loaded
```

## Common Use Cases

### Get Current User

```typescript
import { oidcService } from './lib/oidc-service';

const user = await oidcService.getUser();
if (user) {
  console.log(user.profile.email);
  console.log(user.profile.name);
}
```

### Protect a Route

```typescript
const isAuthenticated = await oidcService.isAuthenticated();
if (!isAuthenticated) {
  await oidcService.login();
}
```

### Get Access Token for API Calls

```typescript
const token = await oidcService.getAccessToken();

fetch('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Manual Logout

```typescript
await oidcService.logout();
```

## Viewing Debug Info

Click the "Show Debug Info" button in the OIDCLogin component to see:
- Current configuration
- User session details
- Token expiration times
- Session storage keys

## Demo Page

Visit `/oidc-demo` to see a complete demo with:
- Live login/logout
- Configuration display
- How it works explanation
- Development tips

## Troubleshooting

**Login not working?**
1. Check browser console for `[OIDC Error]` messages
2. Verify redirect URI is registered in ZITADEL: `http://localhost:5173/login/callback`
3. Check cookies are enabled
4. Try in incognito mode

**Need more details?**
See `OIDC_IMPLEMENTATION.md` for complete documentation.
