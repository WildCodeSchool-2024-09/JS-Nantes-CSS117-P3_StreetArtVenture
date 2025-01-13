import "../adminValidationCard/adminValidationCard.css";
import { useState } from "react";

export function AdminValidation() {
  const [status, setStatus] = useState<string | null>(null);

  const handleValidation = () => {
    setStatus("Your street art is valid");
  };

  const handleRejection = () => {
    setStatus("Your street art is not valid");
  };

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
            className="brown-button-admin"
            type="button"
            onClick={handleValidation}
          >
            {status === "Your street art is valid"}
            Valider
          </button>
          {status === "Your street art is valid" && (
            <p className="admin-validation-message">
              Vous avez confirmé l'ajout de ce street art à la galerie.
            </p>
          )}
          <button
            className="brown-button-admin"
            type="button"
            onClick={handleRejection}
          >
            {status === "refused"}
            Refuser
          </button>
          {status === "Your street art is not valid" && (
            <p className="admin-validation-message">
              Vous avez refusé l'ajout de ce street art à la galerie.
            </p>
          )}
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
