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
              Nantes(44)
            </option>
            <option className="select-city" value="paris">
              Paris(75)
            </option>
            <option className="select-city" value="strasbourd">
              Strasbourg(67)
            </option>
            <option className="select-city" value="toulouse">
              Toulouse(31)
            </option>
            <option className="select-city" value="marseille">
              Marseille(13)
            </option>
            <option className="select-city" value="nice">
              Nice(06)
            </option>
            <option className="select-city" value="clermond-ferrand">
              Clermond-Ferrand(63)
            </option>
          </select>
          <div className="container-owerflow">
            {/* <div className="container"> */}
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Artwork;
