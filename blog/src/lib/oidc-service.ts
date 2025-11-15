import { UserManager, User, Log } from 'oidc-client-ts';
import { oidcConfig, OIDC_DEBUG } from './oidc-config';

/**
 * OIDC Service
 *
 * This service provides methods for OpenID Connect authentication
 * with comprehensive debug logging capabilities.
 */
class OIDCService {
  private userManager: UserManager;
  private debugEnabled: boolean;

  constructor() {
    // Enable oidc-client-ts internal logging if debug is enabled
    if (OIDC_DEBUG) {
      Log.setLogger(console);
      Log.setLevel(Log.DEBUG);
    }

    this.userManager = new UserManager(oidcConfig);
    this.debugEnabled = OIDC_DEBUG;

    // Setup event listeners for debugging
    this.setupEventListeners();

    this.log('OIDCService initialized', { config: oidcConfig });
  }

  /**
   * Setup event listeners for OIDC events with debug logging
   */
  private setupEventListeners(): void {
    this.userManager.events.addUserLoaded((user) => {
      this.log('User loaded', {
        profile: user.profile,
        expires_at: user.expires_at,
        scope: user.scope,
      });
    });

    this.userManager.events.addUserUnloaded(() => {
      this.log('User unloaded');
    });

    this.userManager.events.addAccessTokenExpiring(() => {
      this.log('Access token expiring', { action: 'Token will be renewed soon' });
    });

    this.userManager.events.addAccessTokenExpired(() => {
      this.log('Access token expired', { action: 'User needs to re-authenticate' });
    });

    this.userManager.events.addSilentRenewError((error) => {
      this.error('Silent renew error', error);
    });

    this.userManager.events.addUserSignedIn(() => {
      this.log('User signed in');
    });

    this.userManager.events.addUserSignedOut(() => {
      this.log('User signed out');
    });

    this.userManager.events.addUserSessionChanged(() => {
      this.log('User session changed');
    });
  }

  /**
   * Debug logging utility
   */
  private log(message: string, data?: unknown): void {
    if (this.debugEnabled) {
      console.log(`[OIDC] ${message}`, data || '');
    }
  }

  /**
   * Error logging utility
   */
  private error(message: string, error?: unknown): void {
    if (this.debugEnabled) {
      console.error(`[OIDC Error] ${message}`, error || '');
    }
  }

  /**
   * Initiate login process
   * Redirects user to ZITADEL login page
   */
  async login(): Promise<void> {
    try {
      this.log('Initiating login', {
        authority: oidcConfig.authority,
        client_id: oidcConfig.client_id,
        redirect_uri: oidcConfig.redirect_uri,
        scope: oidcConfig.scope,
      });

      await this.userManager.signinRedirect({
        state: {
          returnUrl: window.location.pathname,
        },
      });

      this.log('Login redirect initiated');
    } catch (error) {
      this.error('Login failed', error);
      throw error;
    }
  }

  /**
   * Handle callback after successful authentication
   * Call this method on the redirect_uri page
   */
  async handleCallback(): Promise<User> {
    try {
      this.log('Handling callback', {
        url: window.location.href,
        search: window.location.search,
        hash: window.location.hash,
      });

      const user = await this.userManager.signinRedirectCallback();

      this.log('Callback handled successfully', {
        user_id: user.profile.sub,
        email: user.profile.email,
        name: user.profile.name,
        expires_at: user.expires_at ? new Date(user.expires_at * 1000).toISOString() : 'N/A',
        access_token_preview: user.access_token.substring(0, 20) + '...',
      });

      return user;
    } catch (error) {
      this.error('Callback handling failed', error);
      throw error;
    }
  }

  /**
   * Get current authenticated user
   */
  async getUser(): Promise<User | null> {
    try {
      this.log('Getting current user');
      const user = await this.userManager.getUser();

      if (user) {
        this.log('User retrieved', {
          user_id: user.profile.sub,
          email: user.profile.email,
          expires_in_seconds: user.expires_at ? user.expires_at - Math.floor(Date.now() / 1000) : 'N/A',
        });
      } else {
        this.log('No user found');
      }

      return user;
    } catch (error) {
      this.error('Failed to get user', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getUser();
      const isAuth = user !== null && !user.expired;

      this.log('Authentication check', {
        isAuthenticated: isAuth,
        expired: user?.expired,
      });

      return isAuth;
    } catch (error) {
      this.error('Authentication check failed', error);
      return false;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      this.log('Initiating logout');

      await this.userManager.signoutRedirect({
        post_logout_redirect_uri: oidcConfig.post_logout_redirect_uri,
      });

      this.log('Logout redirect initiated');
    } catch (error) {
      this.error('Logout failed', error);
      throw error;
    }
  }

  /**
   * Remove user session locally without server-side logout
   */
  async removeUser(): Promise<void> {
    try {
      this.log('Removing user session locally');
      await this.userManager.removeUser();
      this.log('User session removed');
    } catch (error) {
      this.error('Failed to remove user', error);
      throw error;
    }
  }

  /**
   * Manually trigger silent token renewal
   */
  async renewToken(): Promise<User | null> {
    try {
      this.log('Manually renewing token');
      const user = await this.userManager.signinSilent();

      this.log('Token renewed successfully', {
        expires_at: user?.expires_at ? new Date(user.expires_at * 1000).toISOString() : 'N/A',
      });

      return user;
    } catch (error) {
      this.error('Token renewal failed', error);
      throw error;
    }
  }

  /**
   * Get access token
   */
  async getAccessToken(): Promise<string | null> {
    try {
      const user = await this.getUser();

      if (user && !user.expired) {
        this.log('Access token retrieved', {
          token_preview: user.access_token.substring(0, 20) + '...',
          expires_at: user.expires_at ? new Date(user.expires_at * 1000).toISOString() : 'N/A',
        });
        return user.access_token;
      }

      this.log('No valid access token available');
      return null;
    } catch (error) {
      this.error('Failed to get access token', error);
      return null;
    }
  }

  /**
   * Get user profile information
   */
  async getUserProfile(): Promise<Record<string, unknown> | null> {
    try {
      const user = await this.getUser();

      if (user) {
        this.log('User profile retrieved', user.profile);
        return user.profile;
      }

      return null;
    } catch (error) {
      this.error('Failed to get user profile', error);
      return null;
    }
  }

  /**
   * Clear all session storage related to OIDC
   */
  clearStorage(): void {
    try {
      this.log('Clearing OIDC storage');

      // Clear session storage
      const keys = Object.keys(sessionStorage);
      keys.forEach((key) => {
        if (key.startsWith('oidc.')) {
          sessionStorage.removeItem(key);
        }
      });

      this.log('OIDC storage cleared');
    } catch (error) {
      this.error('Failed to clear storage', error);
    }
  }

  /**
   * Get detailed debug information
   */
  async getDebugInfo(): Promise<Record<string, unknown>> {
    try {
      const user = await this.getUser();

      const debugInfo = {
        timestamp: new Date().toISOString(),
        config: {
          authority: oidcConfig.authority,
          client_id: oidcConfig.client_id,
          redirect_uri: oidcConfig.redirect_uri,
          scope: oidcConfig.scope,
        },
        user: user
          ? {
              sub: user.profile.sub,
              email: user.profile.email,
              name: user.profile.name,
              expires_at: user.expires_at ? new Date(user.expires_at * 1000).toISOString() : 'N/A',
              expired: user.expired,
              scope: user.scope,
            }
          : null,
        sessionStorage: this.getSessionStorageKeys(),
      };

      this.log('Debug info collected', debugInfo);
      return debugInfo;
    } catch (error) {
      this.error('Failed to get debug info', error);
      return { error: String(error) };
    }
  }

  /**
   * Get all OIDC related session storage keys
   */
  private getSessionStorageKeys(): string[] {
    const keys = Object.keys(sessionStorage);
    return keys.filter((key) => key.startsWith('oidc.'));
  }
}

// Export singleton instance
export const oidcService = new OIDCService();
