/** @type {import("@react-router/dev/config").Config} */
export default {
  // Mode SPA : l'application tourne entièrement dans le navigateur.
  // Le token est lu dans un cookie côté client et les données viennent de l'API SportSee,
  // le rendu serveur n'apporte donc rien ici.
  ssr: false,
};
