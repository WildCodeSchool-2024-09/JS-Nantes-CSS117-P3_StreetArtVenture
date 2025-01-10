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
        <section className="street-art-given-title">
          Titre du street-art:
          <br /> YODA
        </section>
        <section className="number-of-points">
          Recompense : <br />
          <section className="show-number-of-points" />
          100 points
        </section>
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
