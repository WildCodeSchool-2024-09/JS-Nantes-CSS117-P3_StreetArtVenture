import "./UsersStats.component.css";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../utils/api";
import type { PlayerDataType, UserDataType } from "../Statistics";

function UsersStats() {
  const [data, setData] = useState<null | UserDataType>(null);
  const [player, setPlayer] = useState<null | PlayerDataType>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, playerRes] = await Promise.all([
          fetchWithAuth(`${import.meta.env.VITE_API_URL}/statistics/user`),
          fetchWithAuth(`${import.meta.env.VITE_API_URL}/statistics/player`),
        ]);

        const userStats = await userRes.json();
        const playerStats = await playerRes.json();

        setData(userStats[0]);
        setPlayer(playerStats[0]);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, []);

  if (!data || !player) {
    return <p>Chargement des statistiques...</p>;
  }

  return (
    <div className="bloc-user">
      <section className="user-stats">
        <p>Nombre d'utilisateurs :</p>
        <p className="green-stats">{data.nb_users}</p>
      </section>

      <section className="user-stats">
        <p>Meilleur joueur :</p>
        <p className="green-stats-2">{player.username}</p>
      </section>
    </div>
  );
}

export default UsersStats;
