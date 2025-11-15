# ZITADEL OpenID Connect Implementation

This implementation provides a complete OpenID Connect (OIDC) authentication solution using ZITADEL as the identity provider, with comprehensive debug logging for easy troubleshooting.

## Configuration

The OIDC configuration is set up in `src/lib/oidc-config.ts`:

```typescript
authority: 'https://system-v1-fpms4l.zitadel.cloud'
client_id: '346770541404839766'
redirect_uri: `${window.location.origin}/login/callback`
scope: 'openid profile email'
```

### Debug Mode

Debug logging is enabled by default via the `OIDC_DEBUG` flag in `src/lib/oidc-config.ts`. Set it to `false` to disable detailed logging in production.

```typescript
export const OIDC_DEBUG = true; // Set to false to disable debug logging
```

## Files Created

### 1. Configuration File
- **Location**: `src/lib/oidc-config.ts`
- **Purpose**: Contains OIDC configuration settings for ZITADEL
- **Key Features**:
  - Authority URL
  - Client ID
  - Redirect URIs
  - Scope configuration
  - Debug mode flag

### 2. OIDC Service
- **Location**: `src/lib/oidc-service.ts`
- **Purpose**: Core service for handling all OIDC operations
- **Key Features**:
  - Comprehensive debug logging for all operations
  - Event listeners for authentication lifecycle
  - Methods for login, logout, token management
  - Debug information collection

### 3. Login Component
- **Location**: `src/components/OIDCLogin.tsx`
- **Purpose**: React component for login UI
- **Key Features**:
  - Login/Logout buttons
  - User profile display
  - Debug information viewer
  - Token refresh capability

### 4. Callback Page
- **Location**: `src/pages/login/callback.tsx`
- **Purpose**: Handles the redirect after authentication
- **Key Features**:
  - Processes authorization code
  - Error handling with debug info
  - Success/Error status display
  - Automatic redirect after success

### 5. Silent Renew Page
- **Location**: `public/silent-renew.html`
- **Purpose**: Handles background token renewal
- **Key Features**:
  - Loaded in hidden iframe
  - Automatic token refresh
  - Debug logging

### 6. Demo Page
- **Location**: `src/pages/oidc-demo.tsx`
- **Purpose**: Demonstration and documentation page
- **Key Features**:
  - Shows configuration
  - Explains the flow
  - Lists features
  - Development tips

## Usage

### Basic Usage in a Component

```typescript
import { oidcService } from './lib/oidc-service';

// Login
await oidcService.login();

// Get current user
const user = await oidcService.getUser();

// Check if authenticated
const isAuth = await oidcService.isAuthenticated();

// Logout
await oidcService.logout();

// Get access token
const token = await oidcService.getAccessToken();

// Get user profile
const profile = await oidcService.getUserProfile();
```

### Using the Login Component

```tsx
import { OIDCLogin } from './components/OIDCLogin';

function App() {
  return (
    <div>
      <OIDCLogin />
    </div>
  );
}
```

### Accessing the Demo Page

Navigate to `/oidc-demo` in your browser to see the live demo and documentation.

## Debug Logging

All OIDC operations are logged to the browser console with the `[OIDC]` prefix. This includes:

### Login Flow Logging
```
[OIDC] Initiating login { authority, client_id, redirect_uri, scope }
[OIDC] Login redirect initiated
[OIDC] Handling callback { url, search, hash }
[OIDC] Callback handled successfully { user_id, email, name, expires_at }
```

### User Session Logging
```
[OIDC] Getting current user
[OIDC] User retrieved { user_id, email, expires_in_seconds }
[OIDC] Authentication check { isAuthenticated, expired }
```

### Token Management Logging
```
[OIDC] Access token expiring { action: 'Token will be renewed soon' }
[OIDC] Manually renewing token
[OIDC] Token renewed successfully { expires_at }
[OIDC] Access token retrieved { token_preview, expires_at }
```

### Event Logging
The service automatically logs these events:
- User loaded
- User unloaded
- Access token expiring
- Access token expired
- Silent renew errors
- User signed in
- User signed out
- User session changed

## Debug Information

Use the `getDebugInfo()` method to collect comprehensive debug information:

```typescript
const debugInfo = await oidcService.getDebugInfo();
console.log(debugInfo);
```

This returns:
- Current timestamp
- Configuration details
- User session information
- Session storage keys

## Security Features

1. **Token Preview Only**: Only the first 20 characters of tokens are logged for security
2. **PKCE Flow**: Uses authorization code flow with PKCE for enhanced security
3. **Automatic Token Refresh**: Tokens are silently renewed before expiration
4. **Session Storage**: Uses browser session storage for token management

## ZITADEL Setup Requirements

Ensure your ZITADEL application is configured with:

1. **Application Type**: Web application
2. **Redirect URIs**:
   - `http://localhost:5173/login/callback` (development)
   - Your production URL + `/login/callback`
3. **Post Logout Redirect URIs**:
   - `http://localhost:5173` (development)
   - Your production URL
4. **Grant Types**: Authorization Code with PKCE
5. **Scopes**: `openid`, `profile`, `email`

## Troubleshooting

### Common Issues

1. **"Failed to fetch" errors**
   - Check CORS settings in ZITADEL
   - Verify the authority URL is correct
   - Check network connectivity

2. **"Invalid redirect URI" errors**
   - Ensure the redirect URI in code matches ZITADEL configuration
   - Check for trailing slashes
   - Verify the URL protocol (http vs https)

3. **Silent renewal failures**
   - Check if `public/silent-renew.html` is accessible
   - Verify third-party cookies are enabled
   - Check browser console for errors

### Debug Checklist

When troubleshooting issues:

1. ✅ Check browser console for `[OIDC]` prefixed logs
2. ✅ Click "Show Debug Info" button to view configuration
3. ✅ Verify ZITADEL configuration matches code
4. ✅ Check session storage for `oidc.*` keys
5. ✅ Test in incognito mode to rule out cache issues
6. ✅ Verify redirect URIs are correctly registered

## Advanced Usage

### Custom Error Handling

```typescript
try {
  await oidcService.login();
} catch (error) {
  console.error('Login failed:', error);
  // Handle error
}
```

### Manual Token Refresh

```typescript
try {
  const newUser = await oidcService.renewToken();
  console.log('Token refreshed', newUser);
} catch (error) {
  console.error('Token refresh failed', error);
  // Redirect to login
}
```

### Clearing Session

```typescript
// Remove user session locally
await oidcService.removeUser();

// Clear all OIDC storage
oidcService.clearStorage();
```

## API Reference

### oidcService Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `login()` | Initiates login flow | `Promise<void>` |
| `handleCallback()` | Handles auth callback | `Promise<User>` |
| `getUser()` | Gets current user | `Promise<User \| null>` |
| `isAuthenticated()` | Checks auth status | `Promise<boolean>` |
| `logout()` | Initiates logout | `Promise<void>` |
| `removeUser()` | Removes user locally | `Promise<void>` |
| `renewToken()` | Manually renews token | `Promise<User \| null>` |
| `getAccessToken()` | Gets access token | `Promise<string \| null>` |
| `getUserProfile()` | Gets user profile | `Promise<object \| null>` |
| `getDebugInfo()` | Gets debug information | `Promise<object>` |
| `clearStorage()` | Clears OIDC storage | `void` |

## Environment Variables (Optional)

For better security, you can move configuration to environment variables:

```env
VITE_OIDC_AUTHORITY=https://system-v1-fpms4l.zitadel.cloud
VITE_OIDC_CLIENT_ID=346770541404839766
```

Then update `src/lib/oidc-config.ts`:

```typescript
export const oidcConfig: UserManagerSettings = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY || 'https://system-v1-fpms4l.zitadel.cloud',
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID || '346770541404839766',
  // ... rest of config
};
```

## Testing

1. Navigate to `/oidc-demo`
2. Open browser developer tools (F12)
3. Click "Login with ZITADEL"
4. Watch console logs for detailed flow information
5. After login, check "Show Debug Info" for session details

## License

This implementation is part of your project and follows your project's license.

## References

- [oidc-client-ts Documentation](https://github.com/authts/oidc-client-ts)
- [ZITADEL Documentation](https://zitadel.com/docs)
- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)
