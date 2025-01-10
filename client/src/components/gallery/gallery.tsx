import { useEffect } from "react";
import { useState } from "react";
import "./gallery.css";
import backgroundimage from "/background-grey.jpg";

import traith1 from "/trait-h1-artwork.tsx.png";

interface CardI {
  id: number;
  name: string;
  adress: string;
  city: string;
  department: string;
  coordinate: { x: number; y: number };
  is_validated: boolean;
  is_covered: boolean;
  description: string;
  points_value: number;
  picture_path: string;
}

function Gallery() {
  const [cities, setCities] = useState<{ city: string }[]>([]);
  const [card, setCard] = useState<CardI[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/art/getCities")
      .then((res) => res.json())
      .then((city) => setCities(city));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/art/getArt")
      .then((res) => res.json())
      .then((streetart) => setCard(streetart));
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
            {cities.map((cities) => (
              <option key={cities.city}>{cities.city}</option>
            ))}
          </select>
          <div className="container-owerflow">
            {card.map((card) => (
              <div className="green-container" key={card.id}>
                <img
                  className="galerie-oeuvre"
                  src={`http://localhost:3310${card.picture_path}`}
                  alt='The street art piece features the phrase "Life is a miracle, enjoy it!" in a stylish cursive font on a brick wall. The bold, black and white lettering adds a visually striking artistic flair to the message'
                />

                <div className="streetart" key={card.name}>
                  {card.name}
                </div>
                <div className="streetart" key={card.adress}>
                  {card.adress}, {card.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
