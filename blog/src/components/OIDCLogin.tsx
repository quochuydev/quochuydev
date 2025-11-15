import { useState, useEffect } from 'react';
import { User } from 'oidc-client-ts';
import { oidcService } from '../lib/oidc-service';

/**
 * OIDC Login Component
 *
 * This component provides a login button and displays user information
 * when authenticated. It includes debug information display.
 */
export function OIDCLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('[OIDCLogin] Checking authentication status');
      setLoading(true);
      const currentUser = await oidcService.getUser();
      setUser(currentUser);

      if (currentUser) {
        console.log('[OIDCLogin] User is authenticated', {
          email: currentUser.profile.email,
          name: currentUser.profile.name,
        });
      } else {
        console.log('[OIDCLogin] User is not authenticated');
      }
    } catch (err) {
      console.error('[OIDCLogin] Error checking authentication', err);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      console.log('[OIDCLogin] Login button clicked');
      setError(null);
      await oidcService.login();
    } catch (err) {
      console.error('[OIDCLogin] Login error', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      console.log('[OIDCLogin] Logout button clicked');
      setError(null);
      await oidcService.logout();
    } catch (err) {
      console.error('[OIDCLogin] Logout error', err);
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  const handleShowDebug = async () => {
    try {
      console.log('[OIDCLogin] Fetching debug info');
      const info = await oidcService.getDebugInfo();
      setDebugInfo(info);
      setShowDebug(!showDebug);
    } catch (err) {
      console.error('[OIDCLogin] Error getting debug info', err);
    }
  };

  const handleRefreshToken = async () => {
    try {
      console.log('[OIDCLogin] Refreshing token');
      setError(null);
      const newUser = await oidcService.renewToken();
      setUser(newUser);
      console.log('[OIDCLogin] Token refreshed successfully');
    } catch (err) {
      console.error('[OIDCLogin] Token refresh error', err);
      setError(err instanceof Error ? err.message : 'Token refresh failed');
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p>Loading authentication status...</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-4">ZITADEL OpenID Connect Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {user ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800 mb-2">Authenticated</h3>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {user.profile.name || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {user.profile.email || 'N/A'}
              </p>
              <p>
                <strong>User ID:</strong> {user.profile.sub}
              </p>
              <p>
                <strong>Expires at:</strong>{' '}
                {user.expires_at ? new Date(user.expires_at * 1000).toLocaleString() : 'N/A'}
              </p>
              <p>
                <strong>Expired:</strong> {user.expired ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>

            <button
              onClick={handleRefreshToken}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Refresh Token
            </button>

            <button
              onClick={handleShowDebug}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              {showDebug ? 'Hide' : 'Show'} Debug Info
            </button>
          </div>

          {showDebug && debugInfo && (
            <div className="p-4 bg-gray-50 border border-gray-300 rounded">
              <h4 className="font-semibold mb-2">Debug Information</h4>
              <pre className="text-xs overflow-auto max-h-96">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">You are not logged in.</p>

          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Login with ZITADEL
          </button>

          <button
            onClick={handleShowDebug}
            className="ml-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {showDebug ? 'Hide' : 'Show'} Debug Info
          </button>

          {showDebug && debugInfo && (
            <div className="p-4 bg-gray-50 border border-gray-300 rounded">
              <h4 className="font-semibold mb-2">Debug Information</h4>
              <pre className="text-xs overflow-auto max-h-96">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
