import { useEffect, useState } from "react";
import "./Gallery.css";
import { useUser } from "../../context/UserContext";
import { fetchWithAuth } from "../../utils/api";
import type { CardI } from "./GalleryType";

function Gallery() {
  const [cities, setCities] = useState<{ city: string }[]>([]);
  const [card, setCard] = useState<CardI[]>([]);
  const [selectedValue, setSelectedValue] = useState("Votre ville");

  const [inputValues, setInputValues] = useState<{
    title?: string;
    description?: string;
    points?: string;
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

  // let lastRequestTime = 0;
  // const MIN_REQUEST_INTERVAL = 2000;

  // const fetchLocationData = async (adress: string) => {
  //   const now = Date.now();
  //   if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
  //     console.warn("Trop de requêtes à Nominatim, attendez un peu.");
  //     return;
  //   }
  //   lastRequestTime = now;

  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adress)}&format=json&addressdetails=1`,
  //     );
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       const lat = data[0].lat;
  //       const lon = data[0].lon;
  //       const addressObj = data[0].address || {};
  //       const cityName =
  //         addressObj.city ||
  //         addressObj.town ||
  //         addressObj.village ||
  //         "Ville inconnue";

  //       setInputValues((prev) => ({
  //         ...prev,
  //         city: cityName,
  //         latitude: lat,
  //         longitude: lon,
  //       }));
  //     } else {
  //       console.warn("Aucune donnée trouvée pour cette adresse.");
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des coordonnées :", error);
  //   }
  // };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    artworkId: number,
  ) => {
    event.preventDefault();
    // console.log("inputValues",inputValues);
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/${artworkId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputValues),
        },
      );

      if (response.ok) {
        alert("Mise à jour réussie !");
      } else {
        const errorMessage = await response.text();
        alert(`Erreur lors de la mise à jour: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const newValue = event.target.value;
    setInputValues((prev) => ({ ...prev, [field]: newValue }));
  };

  const addCard = (artworkId: number) => {
    setCardsByArtwork((prev) => {
      if (prev[artworkId]?.length > 0) return prev;
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
                    Modifier la l'oeuvre d'art
                  </button>

                  <div className="card-change">
                    {cardsByArtwork[artwork.id]?.map((cardItem, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <div key={index} className="div-card">
                        {cardItem}

                        <form
                          action="submit"
                          onSubmit={(e) => handleSubmit(e, artwork.id)}
                          className="form-change-card"
                        >
                          {/* Titre */}
                          <label
                            htmlFor="titleInput"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer le titre de l'œuvre
                          </label>
                          <input
                            type="text"
                            value={inputValues.title || ""}
                            onChange={(e) => handleChange(e, "title")}
                            placeholder="Titre de l'œuvre"
                            className="input-change-card"
                          />

                          <label
                            htmlFor="descInput"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer la description
                          </label>
                          <input
                            type="text"
                            value={inputValues.description || ""}
                            onChange={(e) => handleChange(e, "description")}
                            placeholder="Description"
                            className="input-change-card"
                          />

                          <label
                            htmlFor="pointsInput"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Changer les points
                          </label>
                          <input
                            type="text"
                            value={inputValues.points || ""}
                            onChange={(e) => handleChange(e, "points")}
                            placeholder="Points"
                            className="input-change-card"
                          />

                          <button type="submit" className="button-submit">
                            Soumettre
                          </button>

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

                          <button
                            type="button"
                            onClick={() => removeCard(artwork.id)}
                            className="button-x"
                          >
                            ✖
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
