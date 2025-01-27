const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  // On récupère notre JWT dans le localstorage
  const token = localStorage.getItem("authToken");

  // On défini le header d'authentification si il existe
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  // On l'ajoute avec les headers passé en paramètre
  const mergedHeaders = {
    "Content-Type": "application/json",
    ...authHeaders,
    ...(options.headers as HeadersInit),
  };

  // Enfin on ajoute les headers aux options
  const mergedOptions: RequestInit = {
    ...options,
    headers: mergedHeaders,
  };

  // Puis on retourne le fetch
  return fetch(url, mergedOptions);
};
