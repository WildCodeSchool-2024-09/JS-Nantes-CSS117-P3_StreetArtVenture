import { useEffect, useState } from "react";
import "./gallery.css";
import type { CardI } from "./GalleryType";

function Gallery() {
  const [cities, setCities] = useState<{ city: string }[]>([]);
  const [card, setCard] = useState<CardI[]>([]);
  const [selectedValue, setSelectedValue] = useState("Votre ville");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/art/getCities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities);
        setCard(data.artCard);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedValue(event.target.value);
  }

  const filtereArray =
    selectedValue !== "Votre ville"
      ? card.filter((el) => el.city.includes(selectedValue))
      : card;

  return (
    <>
      <section className="artwork-page">
        <div className="white-card">
          <h1>Galerie d'oeuvre</h1>

          <img
            className="traith1"
            src="/separator.png"
            alt="élément graphique"
          />

          <select className="city" name="city" onChange={handleSelect}>
            <option>Votre ville</option>
            {cities.map((cities) => (
              <option key={cities.city}>{cities.city}</option>
            ))}
          </select>
          <div className="container-owerflow">
            {filtereArray.map((card) => (
              <div className="green-container" key={card.id}>
                <img
                  className="galerie-oeuvre"
                  src={`${import.meta.env.VITE_API_URL}${card.picture_path}`}
                  alt=""
                />

                <div className="streetart_title" key={card.name}>
                  {card.name}
                </div>
                <div key={card.adress}>
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
