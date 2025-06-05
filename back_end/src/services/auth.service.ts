import fetch from "node-fetch";

const clientId = "ebook-frontend";
const realm = "ebook-store";
const keycloakBaseUrl = "http://localhost:8080";

export const loginToKeycloak = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", clientId);
  params.append("username", username);
  params.append("password", password);

  const response = await fetch(
    `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  );

  if (!response.ok) {
    throw new Error("Échec de la connexion à Keycloak");
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
  };
};

export const logoutFromKeycloak = async (refreshToken: string) => {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("refresh_token", refreshToken);

  const response = await fetch(
    `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/logout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  );

  if (!response.ok) {
    throw new Error("Échec du logout Keycloak");
  }

  return true;
};
