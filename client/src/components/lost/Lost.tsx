import "./lost.css";
import { useEffect, useState } from "react";
import traith1lost from "/trait-h1-artwork.tsx.png";

function Lost() {
  const [nbReported, setNbReported] = useState<number>(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/reporting`)
      .then((res) => res.json())
      .then((data) => {
        setNbReported(data[0].nb_signalements);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <section className="lost-page-background">
        <div className="h1-circle-lost">
          <h1 className="signalement-text">Signalement</h1>
          <span className="circle-lost">
            <p>{nbReported}</p>
          </span>
        </div>

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
            <div>
              <button className="btn-validation-lost" type="button">
                Validation
              </button>
              <button className="btn-refusal-lost" type="button">
                Refus
              </button>
            </div>
          </section>
          <section className="block-compared-artwork-lost">
            <p className="reported-work">Oeuvre comparée</p>
            <button className="btn-next-lost" type="button">
              Suivant
            </button>
          </section>
        </section>

        <nav className="button-lost">
          <button className="my-left-button-lost" type="button">
            <img
              className="arrow-left-lost"
              src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
              alt="arrow white with border black"
            />
          </button>
          <button className="my-right-button-lost" type="button">
            <img
              className="arrow-right-lost"
              src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
              alt="arrow white with border black"
            />
          </button>
        </nav>
      </section>
    </>
  );
}

export default Lost;
