import { mockUserInfo } from "../mocks/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(username, password) {
//   if (USE_MOCK) return mockLoginResponse;

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

export async function getUserActivity(token, startWeek, endWeek) {

    const response = await fetch(`${API_BASE_URL}/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error("Impossible de récupérer les activités utilisateur");
    }

    return response.json();
}