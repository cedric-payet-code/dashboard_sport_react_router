import { redirect } from "react-router";

// "/" n'a pas de page propre : on renvoie vers le profil
// (qui redirige lui-même vers /login si l'utilisateur n'est pas connecté)
export function clientLoader() {
  return redirect("/profil");
}

export default function Home() {
  return null;
}
