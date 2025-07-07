// frontend/src/services/keycloak.ts
const KEYCLOAK_URL       = process.env.NEXT_PUBLIC_KEYCLOAK_URL!;
const KEYCLOAK_REALM     = process.env.NEXT_PUBLIC_KEYCLOAK_REALM!;
const KEYCLOAK_CLIENT_ID = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!;

export interface KeycloakUser {
  sub: string;
  email: string;
  preferred_username: string;
  given_name?: string;
  family_name?: string;
  realm_access?: { roles: string[] };
}

export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

export class KeycloakService {
  private token: string | null = null;
  private refreshToken: string | null = null;
  private user: KeycloakUser | null = null;

  init() {
    if (typeof window !== 'undefined') {
      this.token        = localStorage.getItem('keycloak_token');
      this.refreshToken = localStorage.getItem('keycloak_refresh_token');
      const u = localStorage.getItem('keycloak_user');
      if (u) this.user = JSON.parse(u);
    }
  }

  login(redirectTo?: string) {
    const redirectUri = `${window.location.origin}/auth/callback`;
    const stateObj = {
      appRedirect: redirectTo ?? window.location.pathname + window.location.search + window.location.hash,
      nonce: this.generateState(),
    };
    const state = encodeURIComponent(JSON.stringify(stateObj));

    window.location.href =
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth?` +
      `client_id=${KEYCLOAK_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code&scope=openid email profile` +
      `&state=${state}`;
  }

  /**
   * Gère le callback OIDC.
   * On accepte le `state` en second argument (même si on ne l'utilise pas ici).
   */
  async handleCallback(code: string, state?: string): Promise<KeycloakUser> {
    // 1️⃣ Échange code → tokens
    const tokenRes = await fetch(
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: KEYCLOAK_CLIENT_ID,
          code,
          redirect_uri: `${window.location.origin}/auth/callback`,
        }),
      }
    );
    const tr = await tokenRes.json() as KeycloakTokenResponse;
    this.token        = tr.access_token;
    this.refreshToken = tr.refresh_token;
    localStorage.setItem('keycloak_token', this.token);
    localStorage.setItem('keycloak_refresh_token', this.refreshToken);

    // 2️⃣ Récupère userinfo
    const uiRes = await fetch(
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    this.user = await uiRes.json() as KeycloakUser;
    localStorage.setItem('keycloak_user', JSON.stringify(this.user));

    // 3️⃣ Synchronise en base (via /api/users/me protégé)
    const syncRes = await fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    if (!syncRes.ok) {
      console.error('Sync API failed:', await syncRes.text());
      throw new Error('Échec de la synchronisation utilisateur');
    }

		const account = await syncRes.json() as {
			id: string;
			email: string;
			username: string;
			roles: string[];
		}

		this.user = {
			sub: account.id,
			email: account.email,
			preferred_username: account.username,
			realm_access: { roles: account.roles }
		};

		localStorage.setItem('keycloak_user', JSON.stringify(this.user));

    return this.user!;
  }

  /** Permet de rafraîchir l’access token avec le refreshToken */
  async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('Aucun refresh token disponible');
    }
    const res = await fetch(
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: KEYCLOAK_CLIENT_ID,
          refresh_token: this.refreshToken,
        }),
      }
    );
    const tr = await res.json() as KeycloakTokenResponse;
    this.token        = tr.access_token;
    this.refreshToken = tr.refresh_token;
    localStorage.setItem('keycloak_token', this.token);
    localStorage.setItem('keycloak_refresh_token', this.refreshToken);
    return this.token;
  }

  /** Vérifie si l’access token est expiré */
  isTokenExpired(): boolean {
    if (!this.token) return true;
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  }

  logout() {
    this.token = this.refreshToken = this.user = null;
    localStorage.removeItem('keycloak_token');
    localStorage.removeItem('keycloak_refresh_token');
    localStorage.removeItem('keycloak_user');
    window.location.href =
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}` +
      `/protocol/openid-connect/logout?client_id=${KEYCLOAK_CLIENT_ID}` +
      `&post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }
  getAccessToken(): string | null { return this.token; }
  getCurrentUser(): KeycloakUser | null { return this.user; }

  private generateState(): string {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  }
}

// Export et initialisation
export const keycloakService = new KeycloakService();
if (typeof window !== 'undefined') {
  keycloakService.init();
}
