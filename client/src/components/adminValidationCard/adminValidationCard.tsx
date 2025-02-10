import type { ArtPiece } from "../../types/art_piece";
import { fetchWithAuth } from "../../utils/api";
import "../adminValidationCard/adminValidationCard.css";
import { useEffect, useState } from "react";

export function AdminValidationBoard() {
  const [data, setData] = useState<ArtPiece | null>(null);

  useEffect(() => {
    const fetchArtPiece = async () => {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/latestArtPieceUnvelidated`,
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setData(data[0]);
      }
    };
    fetchArtPiece();
  }, []);

  async function handleValidation() {
    if (!data || !data.id) {
      alert("Aucune œuvre à valider.");
      return;
    }
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/artPieceValidation/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.user_id,
            pointsValue: data.points_value,
          }),
        },
      );
      if (response.ok) {
        alert("L'œuvre a été validée avec succès !");
      } else {
        alert("Échec de la validation. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Une erreur est survenue.");
    }
  }

  async function handleDeny() {
    if (!data || !data.id) {
      alert("Aucune œuvre à valider.");
      return;
    }
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/artPieceDenied/${data.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data.user_id }),
        },
      );
      if (response.ok) {
        alert("L'œuvre a été refusée avec succès !");
      } else {
        alert("Échec du refus. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Une erreur est survenue.");
    }
  }

  const [banUser, setBanUser] = useState<string | boolean>(false);

  const handleBan = async () => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/user/verifyUser`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        setBanUser(true);
        alert("L'utilisateur a été banni avec succès.");
      } else {
        throw new Error("Erreur lors de la tentative de bannir l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de bannir l'utilisateur.");
    }
  };

  return (
    <main className="body-admin-validation">
      <section className="main-validation-card">
        {data && (
          <>
            <img
              src={`${import.meta.env.VITE_API_URL}${data.picture_path}`}
              alt="Street Art representation sent by user"
              className="new-street-art-photo"
            />
            <section className="street-art-info">
              <p>
                Titre de l'oeuvre: {data.name}
                <br />
              </p>
              <p>
                Recompense: <br />
                <input className="points" type="number" /> points
              </p>
            </section>
            <textarea
              placeholder="Description de l'oeuvre..."
              className="art-description"
            />
            <section className="accepted-or-refused-buttons">
              <button
                onClick={handleValidation}
                type="button"
                className="brown-button-admin"
              >
                Valider
              </button>
              <button
                onClick={handleDeny}
                type="button"
                className="brown-button-admin"
              >
                Refuser
              </button>
            </section>
            <button
              type="button"
              className="brown-button-admin"
              onClick={handleBan}
            >
              {banUser ? "Utilisateur banni" : "Bannir l'utilisateur"}
            </button>
            <button type="button" className="next-button">
              ↪
            </button>
          </>
        )}
        {!data && (
          <section className="no-art-piece">
            Il n'y a aucune œuvre à valider.
          </section>
        )}
      </section>
    </main>
  );
}
