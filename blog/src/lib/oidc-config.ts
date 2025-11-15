import type { UserManagerSettings } from 'oidc-client-ts';

/**
 * ZITADEL OpenID Connect Configuration
 *
 * This configuration is used to set up the OIDC client for authentication
 * with ZITADEL identity provider.
 */
export const oidcConfig: UserManagerSettings = {
  // ZITADEL authority URL
  authority: 'https://system-v1-fpms4l.zitadel.cloud',

  // Client ID from ZITADEL application
  client_id: '346770541404839766',

  // Redirect URI after successful authentication
  redirect_uri: `${window.location.origin}/login/callback`,

  // Redirect URI after logout
  post_logout_redirect_uri: window.location.origin,

  // Response type for authorization code flow with PKCE
  response_type: 'code',

  // Requested scopes
  scope: 'openid profile email',

  // Automatically refresh token silently
  automaticSilentRenew: true,

  // Silent redirect URI for token renewal
  silent_redirect_uri: `${window.location.origin}/silent-renew.html`,

  // Load user info from the identity provider
  loadUserInfo: true,

  // Metadata for the OIDC provider (auto-discovery)
  metadata: {
    issuer: 'https://system-v1-fpms4l.zitadel.cloud',
    authorization_endpoint: 'https://system-v1-fpms4l.zitadel.cloud/oauth/v2/authorize',
    token_endpoint: 'https://system-v1-fpms4l.zitadel.cloud/oauth/v2/token',
    userinfo_endpoint: 'https://system-v1-fpms4l.zitadel.cloud/oidc/v1/userinfo',
    end_session_endpoint: 'https://system-v1-fpms4l.zitadel.cloud/oidc/v1/end_session',
    jwks_uri: 'https://system-v1-fpms4l.zitadel.cloud/oauth/v2/keys',
  },
};

/**
 * Debug mode flag
 * Set to true to enable detailed logging for OIDC operations
 */
export const OIDC_DEBUG = true;
