# Facebook Authentication Setup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Set up Facebook OAuth authentication from scratch, including Facebook Developer Console configuration and React.js integration.

**Architecture:** OAuth 2.0 flow using Facebook Login SDK for client-side authentication with callback handling and token management.

**Tech Stack:** Facebook Login SDK, React.js, fetch API

---

## Part 1: Facebook Developer Console Setup

### Task 1: Create Facebook App

**Prerequisites:**
- Facebook account
- Browser access to developers.facebook.com

**Step 1: Navigate to Facebook Developers**

Action: Open browser to https://developers.facebook.com/
Expected: Facebook Developers homepage loads

**Step 2: Create New App**

Actions:
1. Click "My Apps" in top right
2. Click "Create App"
3. Select use case: "Consumer" or "Other" (for authentication)
4. Click "Next"

Expected: App creation form appears

**Step 3: Fill App Details**

Form inputs:
- App Name: `[Your App Name]`
- App Contact Email: `[your-email@example.com]`
- Optional: Business Account selection

Action: Click "Create App"
Expected: App dashboard loads with App ID visible

**Step 4: Note App Credentials**

Action: Copy and save securely:
- App ID: (visible on dashboard)
- App Secret: Settings > Basic > Show button

Expected: Credentials saved for later use

---

### Task 2: Configure Facebook Login Product

**Step 1: Add Facebook Login Product**

Actions:
1. In app dashboard, scroll to "Add Products to Your App"
2. Find "Facebook Login"
3. Click "Set Up"

Expected: Facebook Login settings page loads

**Step 2: Configure OAuth Settings**

Navigate to: Facebook Login > Settings

Form inputs:
- Client OAuth Login: Toggle ON
- Web OAuth Login: Toggle ON
- Valid OAuth Redirect URIs:
  ```
  http://localhost:3000/
  http://localhost:3000/auth/facebook/callback
  ```
  (Add production URLs when deploying)

Action: Click "Save Changes"
Expected: "Changes saved successfully" message

**Step 3: Configure App Domains**

Navigate to: Settings > Basic

Scroll to "App Domains"
Add:
```
localhost
```
(Add production domain when deploying)

Action: Click "Save Changes"
Expected: Settings saved

**Step 4: Add Platform**

In Settings > Basic, scroll to "Platform" section

Actions:
1. Click "+ Add Platform"
2. Select "Website"
3. Site URL: `http://localhost:3000`

Action: Click "Save Changes"
Expected: Platform added successfully

---

### Task 3: Configure App Permissions

**Step 1: Set Required Permissions**

Navigate to: App Review > Permissions and Features

Default permissions (no approval needed):
- `public_profile` - User's public profile info
- `email` - User's email address

Action: Note these are available by default for development
Expected: Permissions visible in list

**Step 2: Set App Mode to Development**

Navigate to: Settings > Basic

Find "App Mode" toggle at top

Action: Ensure set to "Development" (for testing)
Expected: "This app is in development mode" banner visible

Note: For production, you'll need to:
1. Add Privacy Policy URL
2. Submit for App Review
3. Switch to "Live" mode

---

## Part 2: React.js Implementation

### Task 4: Project Setup

**Files:**
- Create: `src/config/facebook.js`
- Create: `src/hooks/useFacebookAuth.js`
- Create: `src/components/FacebookLoginButton.jsx`
- Create: `.env.local`

**Step 1: Create environment file**

File: `.env.local`
```bash
REACT_APP_FACEBOOK_APP_ID=your_app_id_here
```

Action: Replace `your_app_id_here` with actual App ID from Step 1.4
Expected: File created in project root

**Step 2: Add to .gitignore**

File: `.gitignore`

Verify exists:
```
.env.local
.env*.local
```

Action: Check .gitignore includes env files
Expected: Environment files won't be committed

---

### Task 5: Facebook SDK Integration

**Step 1: Create Facebook config**

File: `src/config/facebook.js`

```javascript
export const FACEBOOK_CONFIG = {
  appId: process.env.REACT_APP_FACEBOOK_APP_ID,
  version: 'v18.0', // Check latest version at developers.facebook.com
  cookie: true,
  xfbml: true,
};

export const initializeFacebookSDK = () => {
  return new Promise((resolve) => {
    // Load the SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_CONFIG.appId,
        cookie: FACEBOOK_CONFIG.cookie,
        xfbml: FACEBOOK_CONFIG.xfbml,
        version: FACEBOOK_CONFIG.version,
      });
      resolve();
    };

    // Load SDK script
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve) => {
    window.FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};

export const facebookLogin = (options = {}) => {
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          resolve(response);
        } else {
          reject(new Error('User cancelled login or did not fully authorize.'));
        }
      },
      { scope: 'public_profile,email', ...options }
    );
  });
};

export const facebookLogout = () => {
  return new Promise((resolve) => {
    window.FB.logout((response) => {
      resolve(response);
    });
  });
};

export const getFacebookUserProfile = () => {
  return new Promise((resolve, reject) => {
    window.FB.api('/me', { fields: 'id,name,email,picture' }, (response) => {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response.error);
      }
    });
  });
};
```

Action: Create file with complete SDK wrapper
Expected: Facebook SDK utilities available

**Step 2: Verify configuration**

Check:
- App ID is from environment variable
- SDK version is current (check https://developers.facebook.com/docs/javascript/versions)
- Scope includes needed permissions

Expected: Configuration matches Facebook app settings

---

### Task 6: Create Authentication Hook

**Step 1: Create useFacebookAuth hook**

File: `src/hooks/useFacebookAuth.js`

```javascript
import { useState, useEffect } from 'react';
import {
  initializeFacebookSDK,
  getFacebookLoginStatus,
  facebookLogin,
  facebookLogout,
  getFacebookUserProfile,
} from '../config/facebook';

export const useFacebookAuth = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize SDK on mount
  useEffect(() => {
    const loadSDK = async () => {
      try {
        await initializeFacebookSDK();
        setIsSDKLoaded(true);

        // Check if user is already logged in
        const response = await getFacebookLoginStatus();
        if (response.status === 'connected') {
          const profile = await getFacebookUserProfile();
          setUser(profile);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadSDK();
  }, []);

  const login = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isSDKLoaded) {
        throw new Error('Facebook SDK not loaded');
      }

      const response = await facebookLogin();
      const profile = await getFacebookUserProfile();

      setUser(profile);
      setIsAuthenticated(true);

      return { user: profile, accessToken: response.authResponse.accessToken };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to login with Facebook';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await facebookLogout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to logout';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSDKLoaded,
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
  };
};
```

Action: Create hook with full authentication lifecycle
Expected: Hook provides login/logout functionality

**Step 2: Verify hook interface**

Check hook returns:
- `isSDKLoaded` - boolean for SDK ready state
- `isAuthenticated` - boolean for auth state
- `user` - user profile object or null
- `isLoading` - boolean for loading state
- `error` - error message or null
- `login` - async function
- `logout` - async function

Expected: Complete authentication interface

---

### Task 7: Create Login Button Component

**Step 1: Create FacebookLoginButton component**

File: `src/components/FacebookLoginButton.jsx`

```javascript
import React from 'react';
import { useFacebookAuth } from '../hooks/useFacebookAuth';

export const FacebookLoginButton = ({ onLoginSuccess, onLoginError }) => {
  const { isSDKLoaded, isAuthenticated, user, isLoading, error, login, logout } = useFacebookAuth();

  const handleLogin = async () => {
    try {
      const result = await login();
      if (onLoginSuccess) {
        onLoginSuccess(result);
      }
    } catch (err) {
      if (onLoginError) {
        onLoginError(err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      if (onLoginError) {
        onLoginError(err);
      }
    }
  };

  if (!isSDKLoaded) {
    return <button disabled>Loading Facebook SDK...</button>;
  }

  if (isAuthenticated && user) {
    return (
      <div>
        <p>Welcome, {user.name}!</p>
        {user.picture && <img src={user.picture.data.url} alt={user.name} />}
        <button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleLogin}
        disabled={isLoading}
        style={{
          backgroundColor: '#1877f2',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
        }}
      >
        {isLoading ? 'Logging in...' : 'Continue with Facebook'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
```

Action: Create component with login/logout UI
Expected: Functional button component

**Step 2: Add component to App**

File: `src/App.js`

```javascript
import React from 'react';
import { FacebookLoginButton } from './components/FacebookLoginButton';
import { toast } from 'sonner'; // or your preferred toast library

function App() {
  const handleLoginSuccess = (result) => {
    console.log('Login successful:', result);
    console.log('Event:FacebookLoginSuccess', JSON.stringify({
      userId: result.user.id,
      userName: result.user.name,
    }));
    // Optional: Send to your backend
    // await fetch('/api/auth/facebook', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ accessToken: result.accessToken }),
    // });
  };

  const handleLoginError = (error) => {
    console.error('Login error:', error);
    const message = error instanceof Error ? error.message : 'Failed to login with Facebook';
    toast.error(message);
  };

  return (
    <div className="App">
      <h1>Facebook Authentication Demo</h1>
      <FacebookLoginButton
        onLoginSuccess={handleLoginSuccess}
        onLoginError={handleLoginError}
      />
    </div>
  );
}

export default App;
```

Action: Integrate component into app
Expected: Component renders in app

---

### Task 8: Testing and Verification

**Step 1: Start development server**

Command:
```bash
npm start
```

Expected:
- Server starts on http://localhost:3000
- No console errors
- Page loads successfully

**Step 2: Test login flow**

Actions:
1. Click "Continue with Facebook" button
2. Facebook login popup appears
3. Enter test Facebook credentials
4. Approve permissions
5. Popup closes

Expected:
- User name displays
- Profile picture shows
- Console logs "Event:FacebookLoginSuccess"
- No errors in console

**Step 3: Test logout flow**

Actions:
1. Click "Logout" button
2. Wait for logout to complete

Expected:
- User info disappears
- "Continue with Facebook" button shows again
- No errors in console

**Step 4: Test refresh persistence**

Actions:
1. Login with Facebook
2. Refresh the page (F5 or Cmd+R)

Expected:
- User remains logged in
- User info displays immediately
- No re-authentication required

**Step 5: Verify error handling**

Test scenarios:
1. Cancel login popup → Error message displays
2. Network offline → Appropriate error message
3. Invalid App ID in .env → SDK fails to load gracefully

Expected: All error cases handled with user-friendly messages

---

### Task 9: Security Checklist

**Step 1: Verify environment security**

Check:
- ✅ `.env.local` in `.gitignore`
- ✅ No hardcoded App ID in source
- ✅ App Secret never exposed to client

Action: Audit all files for hardcoded credentials
Expected: No credentials in source code

**Step 2: Verify Facebook app settings**

In Facebook Developer Console, check:
- ✅ Valid OAuth Redirect URIs matches your domain
- ✅ App Domains configured correctly
- ✅ App is in Development mode (for testing)
- ✅ Only necessary permissions requested

Expected: All settings secure and minimal

**Step 3: Plan production deployment**

Before going live:
1. Add production URL to Valid OAuth Redirect URIs
2. Add production domain to App Domains
3. Add production Site URL to Platform
4. Add Privacy Policy URL in Settings > Basic
5. Submit app for review (if using advanced permissions)
6. Switch App Mode to "Live"

Action: Document production checklist
Expected: Clear deployment path

---

### Task 10: Commit Implementation

**Step 1: Stage files**

```bash
git add src/config/facebook.js
git add src/hooks/useFacebookAuth.js
git add src/components/FacebookLoginButton.jsx
git add src/App.js
git add .env.local.example
git add .gitignore
```

Note: Create `.env.local.example` with placeholder:
```
REACT_APP_FACEBOOK_APP_ID=your_app_id_here
```

**Step 2: Commit**

```bash
git commit -m "feat: implement Facebook OAuth authentication

- Add Facebook SDK integration and config
- Create useFacebookAuth hook for auth lifecycle
- Add FacebookLoginButton component
- Configure environment variables
- Add security best practices"
```

Expected: Clean commit with all authentication files

---

## Troubleshooting Common Issues

### Issue: "App Not Setup" error

Solution:
1. Verify App ID matches in Facebook app and .env.local
2. Check App Domains includes your domain
3. Verify platform (Website) is added with correct URL

### Issue: "redirect_uri" error

Solution:
1. Add exact callback URL to Valid OAuth Redirect URIs
2. Include both http://localhost:3000/ AND http://localhost:3000/auth/facebook/callback
3. Save changes and wait 5 minutes for propagation

### Issue: Can't request email permission

Solution:
1. Email requires app review for production
2. In development mode, only test users can grant email
3. Add test users in Roles > Test Users

### Issue: SDK not loading

Solution:
1. Check browser console for errors
2. Verify App ID is correct
3. Check network tab for blocked requests
4. Disable ad blockers (they often block Facebook SDK)

---

## Next Steps (Optional Enhancements)

1. **Backend Integration**: Send access token to your API for server-side validation
2. **Token Refresh**: Implement token refresh logic for long-lived sessions
3. **Profile Sync**: Store user profile in your database
4. **Advanced Permissions**: Request additional permissions (requires App Review)
5. **Analytics**: Track authentication events with Facebook Analytics

---

## Resources

- Facebook Login Docs: https://developers.facebook.com/docs/facebook-login/web
- JavaScript SDK Reference: https://developers.facebook.com/docs/javascript
- App Review: https://developers.facebook.com/docs/app-review
- Permissions Reference: https://developers.facebook.com/docs/permissions/reference