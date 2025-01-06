import "./Artwork.css";

import backgroundimage from "/background-grey.jpg";

import traith1 from "/trait-h1-artwork.tsx.png";

function Artwork() {
  return (
    <>
      <section className="artwork-page">
        <img
          className="background-gray"
          src={backgroundimage}
          alt="background gray if from lighter to darker"
        />

        <div className="white-card">
          <h1>Galerie d'oeuvre</h1>
          <img
            className="traith1"
            src={traith1}
            alt="background gray if from lighter to darker"
          />

          <select className="city" name="city">
            <option className="select-city" value="nantes">
              Nantes
            </option>
            <option className="select-city" value="paris">
              Paris
            </option>
            <option className="select-city" value="strasbourd">
              Strasbourg
            </option>
            <option className="select-city" value="toulouse">
              Toulouse
            </option>
            <option className="select-city" value="marseille">
              Marseille
            </option>
            <option className="select-city" value="nice">
              Nice
            </option>
            <option className="select-city" value="clermond-ferrand">
              Clermond-Ferrand
            </option>
          </select>
        </div>
      </section>
    </>
  );
}

export default Artwork;
