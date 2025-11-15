import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { oidcService } from '../../lib/oidc-service';

/**
 * OIDC Callback Page
 *
 * This page handles the redirect after successful authentication from ZITADEL.
 * It processes the authorization code and exchanges it for tokens.
 */
export default function OIDCCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    console.log('[OIDCCallback] Starting callback processing');
    console.log('[OIDCCallback] Current URL:', window.location.href);

    try {
      // Handle the callback and get the user
      const user = await oidcService.handleCallback();

      console.log('[OIDCCallback] Callback handled successfully', {
        userId: user.profile.sub,
        email: user.profile.email,
        name: user.profile.name,
      });

      setStatus('success');

      // Get debug info
      const info = await oidcService.getDebugInfo();
      setDebugInfo(info);

      // Wait a moment to show success message, then redirect
      setTimeout(() => {
        console.log('[OIDCCallback] Redirecting to home page');
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('[OIDCCallback] Callback processing failed', err);

      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setStatus('error');

      // Get debug info even on error
      try {
        const info = await oidcService.getDebugInfo();
        setDebugInfo(info);
      } catch (debugErr) {
        console.error('[OIDCCallback] Failed to get debug info', debugErr);
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Processing Authentication
          </h1>
          <p className="text-center text-gray-600">
            Please wait while we complete your login...
          </p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <p className="text-blue-800">
              Debug: Processing callback from ZITADEL
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Authentication Failed
          </h1>

          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800 font-semibold mb-1">Error:</p>
            <p className="text-red-700">{error}</p>
          </div>

          {debugInfo && (
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                Debug Information (click to expand)
              </summary>
              <div className="mt-2 p-4 bg-gray-50 border border-gray-300 rounded">
                <pre className="text-xs overflow-auto max-h-96">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            </details>
          )}

          <div className="mt-6 text-center space-y-3">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Return to Home
            </button>
            <p className="text-sm text-gray-600">
              If this problem persists, please check your browser console for more details.
            </p>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
            <p className="text-yellow-800 font-semibold mb-1">Troubleshooting:</p>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              <li>Check if the ZITADEL configuration is correct</li>
              <li>Verify the redirect URI is registered in ZITADEL</li>
              <li>Check browser console for detailed error messages</li>
              <li>Ensure cookies are enabled in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Login Successful!
          </h1>

          <p className="text-center text-gray-600 mb-4">
            You have been successfully authenticated. Redirecting you now...
          </p>

          {debugInfo && (
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                Debug Information (click to expand)
              </summary>
              <div className="mt-2 p-4 bg-gray-50 border border-gray-300 rounded">
                <pre className="text-xs overflow-auto max-h-96">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            </details>
          )}

          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
