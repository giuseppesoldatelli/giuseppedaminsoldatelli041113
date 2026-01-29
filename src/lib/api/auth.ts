import type { AuthTokens, User } from "@/lib/auth/types";
import {
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearTokens,
} from "./client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pet-manager-api.geia.vip";

export async function loginApi(
  username: string,
  password: string
): Promise<User> {
  const response = await fetch(`${API_URL}/autenticacao/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Credenciais inválidas");
  }

  const tokens: AuthTokens = await response.json();
  setAccessToken(tokens.access_token);
  setRefreshToken(tokens.refresh_token);

  return { username };
}

export function logoutApi() {
  clearTokens();
}

export async function initializeAuth(): Promise<User | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_URL}/autenticacao/refresh`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const tokens: AuthTokens = await response.json();
    setAccessToken(tokens.access_token);
    setRefreshToken(tokens.refresh_token);

    return { username: "Usuário" };
  } catch {
    clearTokens();
    return null;
  }
}
