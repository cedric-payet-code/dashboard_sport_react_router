import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export function setToken(token) {
  Cookies.set(TOKEN_KEY, token, {
    expires: 1,
    // Le cookie n'est jamais envoyé à un autre site
    sameSite: "strict",
    // Transmis uniquement en HTTPS une fois en production
    // (certains navigateurs refusent les cookies "secure" sur http://localhost)
    secure: window.location.protocol === "https:"
  });
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}
