import type { ArtPiece } from "../../types/art_piece";
import { fetchWithAuth } from "../../utils/api";
import "../adminValidationCard/adminValidationCard.css";
import { useEffect, useState } from "react";
import useToast from "../../utils/useToast";

export function AdminValidationBoard() {
  const [validation, setValidation] = useState<ArtPiece | null>(null);
  const { success, failed, information } = useToast();

  useEffect(() => {
    fetchArtPiece();
  }, []);
  const [formData, setFormData] = useState({
    titre: "Aucun titre",
    points: 30,
    commentaire: "",
  });
  const fetchArtPiece = async () => {
    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/art/latestArtPieceUnvelidated`,
    );
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      setValidation(data[0]);
      setFormData((prev) => ({ ...prev, titre: data[0].name }));
    }
  };
  async function handleValidation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validation || !validation.id) {
      information("Aucune œuvre à valider.");
      return;
    }
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/artPieceValidation/${validation.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ArtTitle: formData.titre,
            comment: formData.commentaire,
            userId: validation.user_id,
            pointsValue: formData.points,
          }),
        },
      );
      if (response.ok) {
        setValidation(null);
        setFormData({
          titre: "Aucun titre",
          points: 30,
          commentaire: "",
        });
        fetchArtPiece();
        success("L'œuvre a été validée avec succès !");
      } else {
        failed("Échec de la validation. Veuillez réessayer.");
      }
    } catch (error) {
      failed("Une erreur est survenue.");
    }
  }

  async function handleDeny() {
    if (!validation || !validation.id) {
      alert("Aucune œuvre à valider.");
      return;
    }
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/artPieceDenied/${validation.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: validation.user_id }),
        },
      );
      if (response.ok) {
        setValidation(null);
        setFormData({
          titre: "Aucun titre",
          points: 30,
          commentaire: "",
        });
        fetchArtPiece();

        success("L'œuvre a été refusée avec succès !");
      } else {
        failed("Échec du refus. Veuillez réessayer.");
      }
    } catch (error) {
      failed("Une erreur est survenue.");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="body-admin-validation">
      <section className="main-validation-card">
        {validation && (
          <>
            <img
              src={`${import.meta.env.VITE_API_URL}${validation.picture_path}`}
              alt="Street Art representation sent by user"
              className="new-street-art-photo"
            />
            <form action="submit" onSubmit={handleValidation}>
              <section className="street-art-info">
                <label>
                  titre
                  <input
                    className="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                  />
                </label>{" "}
                <label>
                  description :
                  <input
                    className="comment"
                    name="commentaire"
                    value={formData.commentaire}
                    onChange={handleChange}
                  />
                </label>{" "}
                <label>
                  Points :
                  <input
                    className="points"
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                  />
                </label>
              </section>

              <section className="accepted-or-refused-buttons">
                <button type="submit" className="brown-button-admin">
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
            </form>
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
        {!validation && (
          <section className="no-art-piece">
            Il n'y a aucune œuvre à valider.
          </section>
        )}
      </section>
    </main>
  );
}
