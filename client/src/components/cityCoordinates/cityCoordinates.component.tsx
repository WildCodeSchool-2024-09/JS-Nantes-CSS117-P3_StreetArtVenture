import type { FormEvent } from "react";
import "./cityCoordinates.component.css";

interface CityCoordinatesProps {
  setManualCity: (lat: number, lng: number) => void;
}

function CityCoordinates({ setManualCity }: CityCoordinatesProps) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cityInput = e.currentTarget.elements.namedItem(
      "city-name",
    ) as HTMLInputElement;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${cityInput.value}&format=json&limit=1`,
    );
    const data = await res.json();
    if (data[0]?.lat && data[0].lon) setManualCity(data[0].lat, data[0].lon);
  }
  return (
    <form className="city-coordinates-form" onSubmit={handleSubmit}>
      <label htmlFor="city-name">
        Entrez le nom de la ville que vous explorez
      </label>
      <input
        className="montserrat"
        id="city-name"
        name="city-name"
        type="text"
        placeholder="Nantes"
      />
      <input className="montserrat" type="submit" value="Go !" />
    </form>
  );
}

export default CityCoordinates;
