import "./lost.css";
import traith1lost from "/trait-h1-artwork.tsx.png";

function Lost() {
  return (
    <>
      <section className="lost-page-background">
        <section className="signalement-container">
          <h1 className="signalement-text">Signalement</h1>
          <span className="circle">
            <p>2</p>
          </span>
        </section>
        <section className="works-container">
          <h2 className="works-consulting">
            Consultez les signalements d'œuvres disparues
          </h2>
          <img
            className="trait-h1-lost"
            src={traith1lost}
            alt="a black brushstroke under the text"
          />
          <section className="block-green">
            <section className="block-green-reported-work">
              <p className="compared-work">Oeuvre signalée</p>
              <p className="title-street-art">Titre street art</p>
              <p className="coordinates-gps">Coordonnées GPS</p>
              <p className="description-work-lost">Description :</p>
              <button className="btn-validation-lost" type="button">
                Validation
              </button>
              <button className="btn-refusal-lost" type="button">
                Refus
              </button>
            </section>
            <section className="block-compared-artwork-lost">
              <section className="block-green-container-compared-artwork-lost">
                <section className="block-green-container-reported-work">
                  <p className="reported-work">Oeuvre comparée</p>
                  <button className="btn-next-lost" type="button">
                    Suivant
                  </button>
                </section>
              </section>
              <section className="button-lost">
                <button className="my-left-button-lost" type="button">
                  <div className="arrow-left-lost arrow-lost" />
                </button>
                <button className="my-right-button-lost" type="button">
                  <div className="arrow-right-lost arrow-lost" />
                </button>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default Lost;
