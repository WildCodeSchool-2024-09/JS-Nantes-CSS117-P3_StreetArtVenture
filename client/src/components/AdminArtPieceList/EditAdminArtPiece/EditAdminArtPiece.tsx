import { useState } from "react";
import type { ArtPiece } from "../../../types/art_piece";
import "./EditAdminArtPiece.css";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../utils/api";

export default function EditAdminArtPiece({
  isOpen,
  onClose,
  artPiece,
  onEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  artPiece: ArtPiece;
  onEdit: () => void;
}) {
  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // fonction pour trouver les coordonnées à partir d'adresse et ville
    async function findCoordinates(adress: string, city: string) {
      const parsedAdress = adress.replace(/ /g, "%20");
      const url = `https://nominatim.openstreetmap.org/search?city=${city}&street=${parsedAdress}&format=json&limit=1`;
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        if (result[0]?.lat && result[0].lon)
          return { lat: result[0].lat, lon: result[0].lon };
      }
      return null;
    }

    const coordinates = await findCoordinates(
      data.adress as string,
      data.city as string,
    );
    if (!coordinates) return toast.error("Adresse invalide");
    // On formatte la donnée avant de l'envoyer au serveur
    const newData = {
      name: data.name,
      adress: data.adress,
      coordinates: `${coordinates.lat} ${coordinates.lon}`,
      city: data.city,
      is_covered: isCovered ? 1 : 0,
      description: data.description,
      points_value: data.pointsValue,
    };
    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/art/${artPiece.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      },
    );
    if (response.ok) {
      toast.success("Oeuvre modifiée");
      onEdit();
      onClose();
      return;
    }
    toast.error("Erreur lors de la modification");
  }

  const [isCovered, setIsCovered] = useState(!!artPiece.is_covered);

  return isOpen ? (
    <form className="admin-art-piece-edit-modal" onSubmit={handleOnSubmit}>
      <h3>Modifie l'oeuvre {artPiece.name}</h3>
      <label>
        Nom :
        <input
          maxLength={255}
          name="name"
          type="text"
          defaultValue={artPiece.name}
        />
      </label>
      <label>
        Adresse :
        <input
          maxLength={255}
          name="adress"
          type="text"
          defaultValue={artPiece.adress}
        />
      </label>
      <label>
        Ville :
        <input
          maxLength={100}
          name="city"
          type="text"
          defaultValue={artPiece.city}
        />
      </label>
      <input
        value={isCovered ? "Couverte" : "Non couverte"}
        type="button"
        onClick={() => {
          setIsCovered(!isCovered);
        }}
      />
      <label>
        Description :
        <textarea
          maxLength={255}
          name="description"
          defaultValue={artPiece.description}
        />
      </label>
      <label>
        Points :
        <input
          max={2147483647}
          min={0}
          pattern="\d*"
          name="pointsValue"
          type="text"
          defaultValue={artPiece.points_value || 0}
        />
      </label>
      <input type="submit" value="Modifier" />
      <button type="button" onClick={onClose}>
        Fermer
      </button>
    </form>
  ) : null;
}
