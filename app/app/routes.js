import { index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("login", "routes/login.jsx"),

  // Routes accessibles uniquement une fois connecté
  layout("routes/protected-layout.jsx", [
    route("profil", "routes/profile.jsx"),
    route("dashboard", "routes/dashboard.jsx")
  ]),

  route("*", "routes/not-found.jsx")
];
