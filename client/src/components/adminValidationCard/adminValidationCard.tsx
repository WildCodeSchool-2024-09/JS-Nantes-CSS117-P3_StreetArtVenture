import type { ArtPiece } from "../../types/art_piece";
import "../adminValidationCard/adminValidationCard.css";
import { useEffect, useState } from "react";

// - onclick fonction qui va fetch quand on click sur le bouton
// - creer ta route /art_piece/validate/:Id
// - creer ton action ou tu recuper l'id dans req.params.id
// - creer repository ou tu fais la requete sql avec l'id donne en param

export function AdminValidationBoard() {
  const [status, setStatus] = useState<string | boolean>(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleAction = (message: string) => {
    setStatus(message);
    setShowMessage(true);
  };

  const [data, setData] = useState<ArtPiece | null>(null);

  useEffect(() => {
    const fetchArtPiece = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/art/latestArtPieceUnvelidated`,
      );
      const data = await response.json();
      setData(data[0]);
    };
    fetchArtPiece();
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const [banUser, setBanUser] = useState<string | boolean>(false);

  const handleBan = async () => {
    try {
      const response = await fetch(
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
                onClick={() =>
                  handleAction(
                    "Vous avez confirmé l'ajout de ce street art à la galerie.",
                  )
                }
                type="button"
                className="brown-button-admin"
              >
                Valider
              </button>
              <button
                onClick={() =>
                  handleAction(
                    "Vous avez refusé l'ajout de ce street art à la galerie.",
                  )
                }
                type="button"
                className="brown-button-admin"
              >
                Refuser
              </button>
              {showMessage && (
                <p className="admin-validation-message">{status}</p>
              )}
            </section>
            <button
              type="button"
              className="brown-button-admin"
              onClick={handleBan}
            >
              {banUser ? "Utilisateur banni" : "Bannir l'utilisateur"}
            </button>
          </>
        )}
      </section>
      <button type="button" className="next-button">
        ↪
      </button>
    </main>
  );
}
