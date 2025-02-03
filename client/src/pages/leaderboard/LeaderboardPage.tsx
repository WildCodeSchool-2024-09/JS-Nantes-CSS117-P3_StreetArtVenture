import { useEffect, useState } from "react";
import LeaderboardFilters from "../../components/leaderboard/leaderboardFIlters/LeaderboardFilters.component";
import LeaderboardList from "../../components/leaderboard/leaderboardList/LeaderboardList.component";
import "./leaderboardPage.css";
import LeaderboardUserData from "../../components/leaderboard/leaderboardUserData/LeaderboardUserData.component";
import { useUser } from "../../context/UserContext";
import type { User } from "../../types/user";
import { fetchWithAuth } from "../../utils/api";

function LeaderboardPage() {
  const [data, setData] = useState<null | User[]>(null);
  const [userData, setUserData] = useState<null | User>(null);
  const [filters, setFilters] = useState({ city: "", name: "" });
  const [page, setPage] = useState(0);

  const { user } = useUser();
  const isAdmin = user?.is_admin;
  // On mount, fetch without filters the top 10 + user data
  useEffect(() => {
    async function fetchUserData() {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/leaderboard/getUserData/${user?.id}`,
      );
      const leaderboardUserData = await res.json();
      setUserData(leaderboardUserData[0]);
    }
    fetchUserData();
    fetchDefaultLeaderboard();
  }, [user]);

  // Filter management function
  useEffect(() => {
    // Every change in a filter waits 800ms to fetch to not send useless requests on every letter written
    const handler = setTimeout(() => {
      async function fetchLeaderboard() {
        setPage(0);
        const query = isAdmin
          ? `${import.meta.env.VITE_API_URL}/leaderboard/admin/getLeaderboard?city=${filters.city}&name=${filters.name}&offset=${0 * 10}`
          : `${import.meta.env.VITE_API_URL}/leaderboard/getLeaderboard?city=${filters.city}&name=${filters.name}&offset=${0 * 10}`;
        const res = await fetchWithAuth(query);
        const users = await res.json();
        setData(users);
      }
      fetchLeaderboard();
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [filters, isAdmin]);

  // Scroll management function
  async function fetchMore() {
    const newPage = page + 1;
    const query = isAdmin
      ? `${import.meta.env.VITE_API_URL}/leaderboard/admin/getLeaderboard?city=${filters.city}&name=${filters.name}&offset=${newPage * 10}`
      : `${import.meta.env.VITE_API_URL}/leaderboard/getLeaderboard?city=${filters.city}&name=${filters.name}&offset=${newPage * 10}`;
    const res = await fetchWithAuth(query);
    const users = await res.json();
    if (users) {
      let newData = data as User[];
      newData = newData.concat(users);
      setData(newData);
      setPage(newPage);
    }
  }

  // Fetch first informations of scoreboard when new filter applied/on mount
  async function fetchDefaultLeaderboard() {
    if (data) setData(null);
    const endpoint = isAdmin
      ? `${import.meta.env.VITE_API_URL}/leaderboard/admin/getLeaderboard`
      : `${import.meta.env.VITE_API_URL}/leaderboard/getLeaderboard`;
    const res = await fetchWithAuth(endpoint);
    const users = await res.json();
    setData(users);
  }

  function refreshData() {
    setPage(0);
    fetchDefaultLeaderboard();
  }

  return (
    <main className="leaderboard-page-main-container">
      <div className="leaderboard-page-container">
        <h1 className="bangers">Classement des meilleurs chasseurs</h1>
        <LeaderboardFilters formData={filters} handleFormChange={setFilters} />
        {data && (
          <LeaderboardList
            refreshData={refreshData}
            fetchMore={fetchMore}
            data={data}
          />
        )}
        {userData && <LeaderboardUserData data={userData} />}
      </div>
    </main>
  );
}

export default LeaderboardPage;
