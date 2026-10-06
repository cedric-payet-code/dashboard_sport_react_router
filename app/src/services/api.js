import {
  MOCK_CREDENTIALS,
  mockLoginResponse,
  mockUserInfo,
  mockUserActivity
} from "../mocks/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(username, password) {
  if (USE_MOCK) {
    if (username !== MOCK_CREDENTIALS.username || password !== MOCK_CREDENTIALS.password) {
      throw new Error("Identifiants invalides");
    }
    return mockLoginResponse;
  }

  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Identifiants invalides");
  }

  return response.json();
}

export async function getUserInfo(token) {
  if (USE_MOCK) return mockUserInfo;

  const response = await fetch(`${API_BASE_URL}/api/user-info`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les informations utilisateur");
  }

  return response.json();
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

  const response = await fetch(`${API_BASE_URL}/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les activités utilisateur");
  }

  return response.json();
}
