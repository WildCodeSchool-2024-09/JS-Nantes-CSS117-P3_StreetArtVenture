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
    <main className="artwork-page">
      <div className="galery-main-container">
        <h1>GALERIE D’œuvres</h1>
        <img
          className="traith1"
          src="/trait-h1-artwork.tsx.png"
          alt="background gray if from lighter to darker"
        />

        <select className="city" name="city" onChange={handleSelect}>
          <option>Ville</option>
          {cities.map((cities) => (
            <option key={cities.city}>{cities.city}</option>
          ))}
        </select>
        <ul className="gallery-card-container">
          {filteredArray.map((card) => (
            <li className="gallery-card" key={card.id}>
              <img
                className="galerie-oeuvre"
                src={`${import.meta.env.VITE_API_URL}${card.picture_path}`}
                alt={`${card.description || "art piece"}`}
              />

              <p className="streetart" key={card.name}>
                {card.name}
              </p>
              <p className="streetart" key={card.adress}>
                {card.adress}, {card.city}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Gallery;
