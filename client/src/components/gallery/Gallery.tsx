import { useEffect, useState } from "react";
import "./Gallery.css";
import { useUser } from "../../context/UserContext";
import type { CardI } from "./GalleryType";

function Gallery() {
  const [cities, setCities] = useState<{ city: string }[]>([]);
  const [card, setCard] = useState<CardI[]>([]);
  const [selectedValue, setSelectedValue] = useState("Votre ville");

  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState<{
    adress?: string;
    city?: string;
    latitude?: string;
    longitude?: string;
  }>({});

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/art/:id`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities);
        setCard(data.artCard);
      })
      .catch((err) => console.error(err));
  }, []);

  const fetchLocationData = async (address: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address,
        )}&format=json&addressdetails=1`,
      );
      const data = await response.json();

      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const addressObj = data[0].address || {};

        const cityName =
          addressObj.city ||
          addressObj.town ||
          addressObj.village ||
          "Ville inconnue";

        setInputValues((prev) => ({
          ...prev,
          city: cityName,
          latitude: lat,
          longitude: lon,
        }));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des coordonnées :", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setInputValues((prev) => ({ ...prev, [field]: event.target.value }));

    if (field === "adress") {
      fetchLocationData(event.target.value);
    }
  };

  const handleChangeSingle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addCard = (artworkId: number) => {
    setCardsByArtwork((prev) => {
      if (prev[artworkId] && prev[artworkId].length > 0) {
        return prev;
      }
      return { ...prev, [artworkId]: [""] };
    });
  };

  const removeCard = (artworkId: number) => {
    setCardsByArtwork((prev) => {
      const updated = { ...prev };
      delete updated[artworkId];
      return updated;
    });
  };

  const filteredArray =
    selectedValue !== "Votre ville"
      ? card.filter((el) => el.city.includes(selectedValue))
      : card;

  return (
    <main className="artwork-page">
      <div className="galery-main-container">
        <h1>GALERIE D’œuvres</h1>

        <select
          className="city"
          name="city"
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option>Ville</option>
          {cities.map((cityObj) => (
            <option key={cityObj.city}>{cityObj.city}</option>
          ))}
        </select>

        <ul className="gallery-card-container">
          {filteredArray.map((artwork) => (
            <li className="gallery-card" key={artwork.id}>
              <img
                className="galerie-oeuvre"
                src={`${import.meta.env.VITE_API_URL}${artwork.picture_path}`}
                alt={artwork.description || "art piece"}
              />

              <p className="streetart">{artwork.name}</p>
              <p className="streetart">
                {artwork.adress}, {artwork.city}
              </p>

              {user?.isAdmin && (
                <div className="p-4">
                  <button
                    type="button"
                    onClick={() => addCard(artwork.id)}
                    className="button-change"
                  >
                    Modifier une carte
                  </button>

                  <div className="card-change">
                    {cardsByArtwork[artwork.id]?.map((cardItem, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <div key={index} className="div-card">
                        {cardItem}

                        <button
                          type="button"
                          onClick={() => removeCard(artwork.id)}
                          className="remove-card"
                        >
                          ✖
                        </button>

                        {/* Formulaire de modification de l'œuvre */}
                        <form className="form-change-card">
                          <label
                            htmlFor="textInputTitle"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer le titre de l'œuvre
                          </label>
                          <input
                            id="textInputTitle"
                            type="text"
                            value={inputValue}
                            onChange={handleChangeSingle}
                            placeholder="Tapez ici..."
                            className="input-change-card"
                          />

                          <label
                            htmlFor="textInputDesc"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer la description
                          </label>
                          <input
                            id="textInputDesc"
                            type="text"
                            value={inputValue}
                            onChange={handleChangeSingle}
                            placeholder="Tapez ici..."
                            className="input-change-card"
                          />

                          <label
                            htmlFor="textInputPoints"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer les points
                          </label>
                          <input
                            id="textInputPoints"
                            type="text"
                            value={inputValue}
                            onChange={handleChangeSingle}
                            placeholder="Tapez ici..."
                            className="input-change-card"
                          />

                          <button type="submit" className="button-submit">
                            Soumettre
                          </button>

                          {/* Champs pour l'adresse → Coordonnées */}
                          {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                          <label className="block text-gray-700 font-bold mt-4">
                            Adresse
                          </label>
                          <input
                            type="text"
                            value={inputValues.adress || ""}
                            onChange={(e) => handleChange(e, "adress")}
                            placeholder="Adresse"
                            className="input-change-card"
                          />

                          <input
                            type="text"
                            value={inputValues.city || ""}
                            readOnly
                            placeholder="Ville détectée"
                            className="input-change-card"
                          />
                          <input
                            type="text"
                            value={inputValues.latitude || ""}
                            readOnly
                            placeholder="Latitude"
                            className="input-change-card"
                          />
                          <input
                            type="text"
                            value={inputValues.longitude || ""}
                            readOnly
                            placeholder="Longitude"
                            className="input-change-card"
                          />
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
