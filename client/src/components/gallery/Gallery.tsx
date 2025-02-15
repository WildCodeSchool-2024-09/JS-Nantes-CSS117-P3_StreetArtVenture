import { useEffect, useState } from "react";
import "./gallery.css";
import { useUser } from "../../context/UserContext";
import type { CardI } from "./GalleryType";

function Gallery() {
  const [cities, setCities] = useState<{ city: string }[]>([]);
  const [card, setCard] = useState<CardI[]>([]);
  const [selectedValue, setSelectedValue] = useState("Votre ville");
  const [inputValue, setInputValue] = useState("");
  const [cardsByArtwork, setCardsByArtwork] = useState<{
    [key: number]: string[];
  }>({});
  const { user } = useUser();

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const filteredArray =
    selectedValue !== "Votre ville"
      ? card.filter((el) => el.city.includes(selectedValue))
      : card;

  const addCard = (artworkId: number) => {
    setCardsByArtwork((prev) => {
      if (prev[artworkId] && prev[artworkId].length > 0) {
        return prev;
      }

      return { ...prev, [artworkId]: [""] };
    });
  };

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
          {filteredArray.map((artwork) => (
            <li className="gallery-card" key={artwork.id}>
              <img
                className="galerie-oeuvre"
                src={`${import.meta.env.VITE_API_URL}${artwork.picture_path}`}
                alt={`${artwork.description || "art piece"}`}
              />

              <p className="streetart" key={artwork.name}>
                {artwork.name}
              </p>
              <p className="streetart" key={artwork.adress}>
                {artwork.adress}, {artwork.city}
              </p>

              {user?.isAdmin && (
                <div className="p-4">
                  <button
                    type="button"
                    onClick={() => addCard(artwork.id)}
                    className="button-change"
                  >
                    Ajouter une carte
                  </button>

                  <div className="card-change">
                    {cardsByArtwork[artwork.id]?.map((card) => (
                      <div key={card} className="div-card">
                        {card}
                        <form className="form-change-card">
                          <label
                            htmlFor="textInput"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer le titre de l'oeuvre
                          </label>
                          <input
                            id="textInput"
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Tapez ici..."
                            className="input-change-card"
                          />

                          <label
                            htmlFor="textInput"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer l'adresse de l'oeuvre
                          </label>
                          <input
                            id="textInput"
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Tapez ici..."
                            className="input-change-card"
                          />
                          <label
                            htmlFor="textInput"
                            className="input-change-card"
                          >
                            Changer la description
                          </label>
                          <input
                            id="textInput"
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Tapez ici..."
                            className="input-change-card"
                          />

                          <label
                            htmlFor="textInput"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer les points
                          </label>
                          <input
                            id="textInput"
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Tapez ici..."
                            className="input-change-card"
                          />
                          <button type="submit" className="button-submit">
                            Soumettre
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Gallery;
