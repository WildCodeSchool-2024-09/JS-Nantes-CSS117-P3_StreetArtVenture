import type { FormEvent } from "react";
import "./cityCoordinates.component.css";

interface CityCoordinatesProps {
  setManualCity: (lat: number, lng: number) => void;
}

function CityCoordinates({ setManualCity }: CityCoordinatesProps) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cityInput = e.currentTarget.elements.namedItem(
      "city-input",
    ) as HTMLInputElement;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${cityInput.value}&format=json&limit=1`,
    );
    const data = await res.json();
    if (data[0]?.lat && data[0].lon) setManualCity(data[0].lat, data[0].lon);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city-input">
        Entrez le nom de la ville que vous explorez
      </label>
      <input
        name="city-name"
        id="city-input"
        type="text"
        placeholder="Nantes"
      />
      <input type="submit" value="Go !" />
    </form>
  );
}

export default CityCoordinates;
