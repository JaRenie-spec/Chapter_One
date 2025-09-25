/**
 * Interface TS représentant la réponse Keycloak lors d'une authentification password
 */

export interface KeycloakTokenResponse {
	access_token: string;
	expires_in: number;
	refresh_expires_in: number;
	token_type: string;
	scope: string;
}
