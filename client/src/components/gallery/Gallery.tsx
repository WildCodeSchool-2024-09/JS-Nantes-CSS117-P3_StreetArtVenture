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

  const filteredArray =
    selectedValue !== "Votre ville"
      ? card.filter((el) => el.city.includes(selectedValue))
      : card;

  return (
    <section className="artwork-page">
      <div className="white-card">
        <h1>Galerie d'oeuvre</h1>

        <img src="/separator.png" alt="élément graphique séparateur" />

        <select className="city" name="city" onChange={handleSelect}>
          <option>Votre ville</option>
          {cities.map((cities) => (
            <option key={cities.city}>{cities.city}</option>
          ))}
        </select>
        <section className="container-overflow">
          {filteredArray.map((card) => (
            <div className="green-container" key={card.id}>
              <img
                className="galery-art"
                src={`${import.meta.env.VITE_API_URL}${card.picture_path}`}
                alt={`Art street, ${card.picture_path}`}
              />

              <div className="streetart-title" key={card.name}>
                {card.name}
              </div>
              <div key={card.adress}>
                {card.adress}, {card.city}
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}

export default Gallery;
