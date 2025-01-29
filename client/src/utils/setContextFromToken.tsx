import type { User } from "../context/UserContextType";

export async function setContextFromToken(
  token: string | null,
  setUser: (user: User | null) => void,
) {
  if (!token) {
    console.warn("No token found");
    setUser(null);
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/verifyToken`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    );

    if (!response.ok) {
      console.error("Echec de la validation du token.");
      setUser(null);
      return;
    }

    const data = await response.json();
    setUser(data.decodedToken);
  } catch (error) {
    console.error("Erreur lors de la vérification de connexion:", error);
  }
}
