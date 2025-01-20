import "./UsersStats.component.css";
import { useEffect, useState } from "react";
import type { UserDataType } from "../Statistics";

function UsersStats() {
  const [data, setData] = useState<null | UserDataType>(null);

  useEffect(() => {
    fetchUsersData();
  }, []);

  async function fetchUsersData() {
    const req = await fetch(`${import.meta.env.VITE_API_URL}/statistics/user`);
    const stats = await req.json();
    setData(stats);
  }

  return (
    data && (
      <span>
        <h2>Utilisateurs</h2>
        <ul>
          <li>
            <p>Nombre d'utilisateurs : {data.nb_users}</p>
          </li>
          <li>
            <p>Nombre d'utilisateurs bannis : {data.nb_users_banned}</p>
          </li>
        </ul>
      </span>
    )
  );
}

export default UsersStats;
