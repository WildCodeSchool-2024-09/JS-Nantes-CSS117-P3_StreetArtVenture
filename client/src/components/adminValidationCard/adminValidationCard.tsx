import "../adminValidationCard/adminValidationCard.css";

export function AdminValidation() {
  return (
    <main className="body-admin-validation">
      <section className="main-validation-card">
        <img
          src="public\backgroundInscription.jpg"
          alt="Document sent by user(...)"
          className="new-street-art-photo"
        />
        <section className="street-art-info">
          <p>
            Titre de l'oeuvre: <br />
            Yoda
          </p>
          <p>
            Recompense: <br />
            100 points
          </p>
        </section>
        <textarea
          placeholder="Description de l'oeuvre..."
          className="art-description"
        />
        <section className="accepted-or-refused-buttons">
          <button type="button" className="brown-button-admin">
            {" "}
            Valider
          </button>
          <button type="button" className="brown-button-admin">
            Refuser
          </button>
        </section>
        <button type="button" className="brown-button-admin">
          {" "}
          Bannir l'utilisateur
        </button>
      </section>
      <button type="button" className="next-button">
        {" "}
        Suivant{" "}
      </button>
    </main>
  );
}
