import { OIDCLogin } from '../components/OIDCLogin';

/**
 * OIDC Demo Page
 *
 * This page demonstrates the OpenID Connect integration with ZITADEL.
 * It includes the login component and shows how to use the OIDC service.
 */
export default function OIDCDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ZITADEL OpenID Connect Demo
          </h1>
          <p className="text-lg text-gray-600">
            This page demonstrates OpenID Connect authentication with ZITADEL
          </p>
        </div>

        <div className="mb-8">
          <OIDCLogin />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Configuration</h2>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Authority:</span>
              <span className="col-span-2 font-mono text-xs">
                https://system-v1-fpms4l.zitadel.cloud
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Client ID:</span>
              <span className="col-span-2 font-mono text-xs">346770541404839766</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Redirect URI:</span>
              <span className="col-span-2 font-mono text-xs">
                {window.location.origin}/login/callback
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Scope:</span>
              <span className="col-span-2 font-mono text-xs">openid profile email</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="prose max-w-none">
            <ol className="space-y-4">
              <li>
                <strong>Login:</strong> Click the "Login with ZITADEL" button to initiate
                the authentication flow. You'll be redirected to ZITADEL's login page.
              </li>
              <li>
                <strong>Authentication:</strong> Enter your credentials on ZITADEL's secure
                login page.
              </li>
              <li>
                <strong>Callback:</strong> After successful authentication, you'll be
                redirected back to this application at the callback URL.
              </li>
              <li>
                <strong>Token Exchange:</strong> The callback page processes the
                authorization code and exchanges it for access tokens.
              </li>
              <li>
                <strong>Session:</strong> Your session is stored locally and will be
                maintained across page refreshes.
              </li>
              <li>
                <strong>Silent Renewal:</strong> Tokens are automatically renewed in the
                background before they expire.
              </li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-2">Debug Logging</h3>
            <p className="text-gray-700">
              All OIDC operations are logged to the browser console with detailed
              information. Open your browser's developer tools (F12) and check the Console
              tab to see:
            </p>
            <ul className="space-y-2 mt-2">
              <li>Authentication flow steps</li>
              <li>Token information (preview only, not full tokens)</li>
              <li>User profile data</li>
              <li>Error details if something goes wrong</li>
              <li>Silent renewal events</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-2">Features</h3>
            <ul className="space-y-2 mt-2">
              <li>Automatic token refresh with silent renewal</li>
              <li>Comprehensive debug logging</li>
              <li>Error handling and user-friendly messages</li>
              <li>Session persistence across page reloads</li>
              <li>Manual token refresh capability</li>
              <li>Debug information display</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Development Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              <strong>Console Logging:</strong> All debug logs are prefixed with [OIDC]
              for easy filtering
            </li>
            <li>
              <strong>Debug Info Button:</strong> Click "Show Debug Info" to see detailed
              configuration and session data
            </li>
            <li>
              <strong>Session Storage:</strong> OIDC data is stored in browser session
              storage with keys prefixed with 'oidc.'
            </li>
            <li>
              <strong>Token Preview:</strong> For security, only the first 20 characters
              of tokens are logged
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
