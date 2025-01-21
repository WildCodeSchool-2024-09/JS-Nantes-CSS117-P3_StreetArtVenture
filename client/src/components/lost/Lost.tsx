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
            alt="Background gray gradient from lighter to darker"
          />
          <section className="block-green">
            <section className="block-green-reported-work">
              <section className="block-green-container-reported-work">
                <p className="reported-work">Oeuvre comparée</p>
                <p className="title-street-art">Titre street art</p>
                <p className="coordinates-gps">Coordonnées GPS</p>
              </section>
            </section>
            <section className="block-compared-artwork-lost">
              <section className="block-green-container-compared-artwork-lost">
                <p className="compared-work">Oeuvre signalée</p>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default Lost;
