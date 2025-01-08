import { useEffect } from "react";
import { useState } from "react";
import "./Artwork.css";
import backgroundimage from "/background-grey.jpg";
import imageGalerieOeuvre1 from "/images/image-galerie-oeuvre1.png";
import imageGalerieOeuvre2 from "/images/image-galerie-oeuvre2.png";
import traith1 from "/trait-h1-artwork.tsx.png";

function Artwork() {
  const [citys, setCitys] = useState<{ city: string }[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/art/")
      .then((res) => res.json())
      .then((cities) => setCitys(cities));
  }, []);

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
            {citys.map((city) => (
              <option key={city.city}>{city.city}</option>
            ))}
          </select>
          <div className="container-owerflow">
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre2}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre1}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre2}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre1}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre2}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre1}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre2}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre1}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
            </div>
            <div className="green-container">
              <img
                className="galerie-oeuvre"
                src={imageGalerieOeuvre2}
                alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
              />
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
          </div>
        </div>
      </section>
    </>
  );
}

export default Artwork;
