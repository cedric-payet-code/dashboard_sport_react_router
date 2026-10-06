import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";
import { AuthProvider } from "./context/AuthProvider";
import { UserInfoProvider } from "./context/UserInfoProvider";
import { UserActivityProvider } from "./context/UserActivityProvider";
import "./app.css";

export const links = () => [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }
];

export function meta() {
  return [{ title: "SportSee" }];
}

export function Layout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserInfoProvider>
        <UserActivityProvider>
          <Outlet />
        </UserActivityProvider>
      </UserInfoProvider>
    </AuthProvider>
  );
}

// Affiché pendant le chargement initial de l'application (mode SPA)
export function HydrateFallback() {
  return <p>Chargement...</p>;
}

export function ErrorBoundary({ error }) {
  let details = "Une erreur inattendue est survenue.";

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }

  return (
    <main>
      <h1>Erreur</h1>
      <p>{details}</p>
    </main>
  );
}
