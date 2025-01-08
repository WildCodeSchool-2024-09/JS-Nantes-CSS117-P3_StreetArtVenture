import { type ChangeEvent, useEffect, useState } from "react";
import "./leaderboardFilters.component.css";

interface LeaderboardFiltersProps {
  handleFormChange: (params: { city: string; name: string }) => void;
  formData: { city: string; name: string };
}

function LeaderboardFilters({
  handleFormChange,
  formData,
}: LeaderboardFiltersProps) {
  const [selectData, setSelectData] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      const res = await fetch("http://localhost:3310/leaderboard/getCities");
      const cities = await res.json();
      setSelectData(cities);
    }
    fetchCities();
  }, []);

  function handleChange(
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) {
    e.target.localName === "select"
      ? handleFormChange({ ...formData, city: e.target.value })
      : handleFormChange({ ...formData, name: e.target.value });
  }

  return (
    <form className="leaderboard-filters-container">
      <img
        className="leaderboard-no-des"
        src="/public/separator.png"
        alt="visual separator"
      />
      <select className="montserrat" onChange={handleChange}>
        <option className="montserrat" value="">
          Ville
        </option>
        {selectData.map((city) => {
          return (
            <option className="montserrat" key={city} value={city}>
              {city}
            </option>
          );
        })}
      </select>
      <img
        className="leaderboard-no-mob"
        src="/public/separator.png"
        alt="visual separator"
      />
      <input
        className="montserrat"
        onChange={handleChange}
        value={formData.name}
        type="text"
        placeholder="Pseudo"
      />
    </form>
  );
}

export default LeaderboardFilters;
