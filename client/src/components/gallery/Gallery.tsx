import { useCallback, useEffect, useRef, useState } from "react";
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
  const lastRequestTimeRef = useRef<number>(0);
  const MIN_REQUEST_INTERVAL = 2000;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/art/getCities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities);
        setCard(data.artCard);
      })
      .catch((err) => console.error(err));
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const fetchLocationData = useCallback(
    async (adress: string) => {
      const now = Date.now();
      if (now - lastRequestTimeRef.current < MIN_REQUEST_INTERVAL) return;
      lastRequestTimeRef.current = now;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            adress,
          )}&format=json&addressdetails=1`,
        );
        const data = await res.json();
        if (data.length > 0) {
          const { lat, lon, address = {} } = data[0];
          const cityName =
            address.city || address.town || address.village || "Ville inconnue";
          setInputValues((prev) => ({
            ...prev,
            city: cityName,
            latitude: lat,
            longitude: lon,
          }));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des coordonnées :",
          error,
        );
      }
    },
    [MIN_REQUEST_INTERVAL],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!inputValues.adress) return;
    const timer = setTimeout(() => {
      if (inputValues.adress) fetchLocationData(inputValues.adress);
    }, MIN_REQUEST_INTERVAL);
    return () => clearTimeout(timer);
  }, [inputValues.adress, fetchLocationData, MIN_REQUEST_INTERVAL]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setInputValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    artworkId: number,
  ) => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/${artworkId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputValues),
        },
      );
      if (res.ok) alert("Mise à jour réussie !");
      else alert(`Erreur lors de la mise à jour: ${await res.text()}`);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const addCard = (artworkId: number) => {
    setCardsByArtwork((prev) =>
      prev[artworkId]?.length ? prev : { ...prev, [artworkId]: [""] },
    );
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
                    Modifier la l'œuvre d'art
                  </button>

                  <div className="card-change">
                    {cardsByArtwork[artwork.id]?.map((cardItem, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <div key={index} className="div-card">
                        {cardItem}

                        <form
                          onSubmit={(ev) => handleSubmit(ev, artwork.id)}
                          className="form-change-card"
                        >
                          {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                          <label className="block text-gray-700 font-bold mb-2">
                            Changer le titre de l'œuvre
                          </label>
                          <input
                            type="text"
                            value={inputValues.title || ""}
                            onChange={(ev) => handleChange(ev, "title")}
                            placeholder="Titre de l'œuvre"
                            className="input-change-card"
                          />

                          {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                          <label className="block text-gray-700 font-bold mb-2">
                            Changer la description
                          </label>
                          <input
                            type="text"
                            value={inputValues.description || ""}
                            onChange={(ev) => handleChange(ev, "description")}
                            placeholder="Description"
                            className="input-change-card"
                          />

                          {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                          <label className="block text-gray-700 font-bold mb-2">
                            Changer les points
                          </label>
                          <input
                            type="text"
                            value={inputValues.points || ""}
                            onChange={(ev) => handleChange(ev, "points")}
                            placeholder="Points"
                            className="input-change-card"
                          />

                          {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                          <label className="block text-gray-700 font-bold mt-4">
                            Adresse
                          </label>
                          <input
                            type="text"
                            value={inputValues.adress || ""}
                            onChange={(ev) => handleChange(ev, "adress")}
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
                          <button type="submit" className="button-submit">
                            Soumettre
                          </button>

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
