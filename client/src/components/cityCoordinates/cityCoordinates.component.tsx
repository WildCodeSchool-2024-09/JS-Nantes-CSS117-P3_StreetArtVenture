import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import "./cityCoordinates.component.css";

interface CityCoordinatesProps {
  setManualCity: (lat: number, lng: number) => void;
}

interface FormValues {
  cityName: string;
}

function CityCoordinates({ setManualCity }: CityCoordinatesProps) {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${data.cityName}&format=json&limit=1`,
    );
    const result = await res.json();
    if (result[0]?.lat && result[0]?.lon) {
      setManualCity(result[0].lat, result[0].lon);
    } else {
      // TODO c'est ici que se jouera la gestion de la ville non trouvée
    }
  };

  return (
    <form className="city-coordinates-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="city-name">
        Entrez le nom de la ville que vous explorez
      </label>
      <input
        className="montserrat"
        id="city-name"
        {...register("cityName", { required: "Ce champ est requis" })}
        type="text"
        placeholder="Nantes"
      />
      <input className="montserrat" type="submit" value="Go !" />
    </form>
  );
}

export default CityCoordinates;
