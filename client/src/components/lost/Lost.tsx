import "./lost.css";
import traith1 from "/trait-h1-artwork.tsx.png";
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
            Consultez les signalements d'oeuvres disparues
          </h2>
          <img
            className="traith1"
            src={traith1}
            alt="background gray if from lighter to darker"
          />
          <section className="block-green-container">
            <p className="reported-work">Oeuvre-signalée</p>
            <p className="title-street-art">Titre du street art</p>
          </section>
        </section>
      </section>
    </>
  );
}

export default Lost;
