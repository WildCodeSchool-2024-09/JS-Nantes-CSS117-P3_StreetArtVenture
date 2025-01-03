import "./Artwork.css";

import backgroundimage from "../../assets/image/background-grey.jpg";

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
        </div>
      </section>
    </>
  );
}

export default Artwork;
