import { useEffect, useState } from "react";
import LeaderboardFilters from "../../components/leaderboard/leaderboardFIlters/leaderboardFilters.component";
import LeaderboardList from "../../components/leaderboard/leaderboardList/leaderboardList.component";
import "./leaderboardPage.css";
import LeaderboardUserData from "../../components/leaderboard/leaderboardUserData/leaderboardUserData.component";
import type { User } from "../../types/user";

// TODO UNE FOIS LE SYSTÈME DE CONNEXION MIS EN PLACE
// Utiliser l'id du user connecté, pour l'instant écrit en brut
const USER_ID = 5;

function LeaderboardPage() {
  const [data, setData] = useState<null | User[]>(null);
  const [userData, setUserData] = useState<null | User>(null);
  const [filters, setFilters] = useState({ city: "", name: "" });
  const [page, setPage] = useState(0);

  // On mount, on fetch sans filtres le top 10 + les données de l'utilisateur
  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch(
        "http://localhost:3310/leaderboard/getLeaderboard",
      );
      const users = await res.json();
      setData(users);
    }
    async function fetchUserData() {
      const res = await fetch(
        `http://localhost:3310/leaderboard/getUserData/${USER_ID}`,
      );
      const user = await res.json();
      setUserData(user[0]);
    }
    fetchUserData();
    fetchLeaderboard();
  }, []);

  // Fonction de gestion des filtres
  useEffect(() => {
    const handler = setTimeout(() => {
      async function fetchLeaderboard() {
        setPage(0);
        const res = await fetch(
          `http://localhost:3310/leaderboard/getLeaderboard?city=${filters.city}&name=${filters.name}&offset=${0 * 10}`,
        );
        const users = await res.json();
        setData(users);
      }
      fetchLeaderboard();
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  // Fonction de gestion du scroll
  async function fetchMore() {
    const newPage = page + 1;
    const res = await fetch(
      `http://localhost:3310/leaderboard/getLeaderboard?city=${filters.city}&name=${filters.name}&offset=${newPage * 10}`,
    );
    const users = await res.json();
    if (users) {
      let newData = data as User[];
      newData = newData.concat(users);
      setData(newData);
      setPage(newPage);
    }
  }

  return (
    <main className="leaderboard-page-main-container">
      <div className="leaderboard-page-container">
        <h1 className="bangers">Classement des meilleurs chasseurs</h1>
        <LeaderboardFilters formData={filters} handleFormChange={setFilters} />
        {data && <LeaderboardList fetchMore={fetchMore} data={data} />}
        {userData && <LeaderboardUserData data={userData} />}
      </div>
    </main>
  );
}

export default LeaderboardPage;
