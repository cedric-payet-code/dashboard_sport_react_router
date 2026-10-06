import {
  MOCK_CREDENTIALS,
  mockLoginResponse,
  mockUserInfo,
  mockUserActivity
} from "../mocks/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Levée quand l'API refuse le token (absent, invalide ou expiré)
export class UnauthorizedError extends Error {
  constructor() {
    super("Votre session a expiré, veuillez vous reconnecter");
    this.name = "UnauthorizedError";
  }
}

// Appel à l'API : gère le serveur injoignable et le token refusé,
// et renvoie `errorMessage` pour toute autre réponse en erreur
async function request(path, { token, errorMessage, ...options } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
  } catch {
    throw new Error("Impossible de contacter le serveur");
  }

  if (token && response.status === 401) {
    throw new UnauthorizedError();
  }
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function login(username, password) {
  if (USE_MOCK) {
    if (username !== MOCK_CREDENTIALS.username || password !== MOCK_CREDENTIALS.password) {
      throw new Error("Identifiants invalides");
    }
    return mockLoginResponse;
  }

  return request("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    errorMessage: "Identifiants invalides"
  });
}

export async function getUserInfo(token) {
  if (USE_MOCK) return mockUserInfo;

  return request("/api/user-info", {
    token,
    errorMessage: "Impossible de récupérer les informations utilisateur"
  });
}

export async function getUserActivity(startWeek, endWeek, token) {
  if (USE_MOCK) {
    // Même filtrage que l'API : séances entre les deux dates, sans dates futures
    const start = new Date(startWeek);
    const end = new Date(endWeek);
    const now = new Date();
    return mockUserActivity.filter((session) => {
      const date = new Date(session.date);
      return date >= start && date <= end && date <= now;
    });
  }

  return request(`/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`, {
    token,
    errorMessage: "Impossible de récupérer les activités utilisateur"
  });
}
