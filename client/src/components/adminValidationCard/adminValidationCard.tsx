import "../adminValidationCard/adminValidationCard.css";
import { useEffect, useState } from "react";

export function AdminValidation() {
  const [status, setStatus] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleAction = (message: string) => {
    setStatus(message);
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const [banUser, setBanUser] = useState<string | false>(false);

  const handleBan = () => {
    setBanUser("User is banned");
  };

  return (
    <main className="body-admin-validation">
      <section className="main-validation-card">
        <img
          src="public\backgroundInscription.jpg"
          alt="Street Art representation sent by user"
          className="new-street-art-photo"
        />
        <section className="street-art-info">
          <p>
            Titre de l'oeuvre: <br />
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
          {showMessage && <p className="admin-validation-message">{status}</p>}
        </section>
        <button
          type="button"
          className="brown-button-admin"
          onClick={handleBan}
        >
          {banUser === "User is ban"}
          Bannir l'utilisateur
        </button>
      </section>
      <button type="button" className="next-button">
        ↪
      </button>
    </main>
  );
}
