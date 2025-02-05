import type { User } from "../../../types/user";
import "./leaderboardUserData.component.css";

function LeaderboardUserData({ data }: { data: User }) {
  return (
    <>
      <hr className="leaderboard-page-separator" />
      <ul className="leaderboard-informations-container leaderboard-page-user-ranking">
        <li className="montserrat">{data.rank}</li>
        <li className="montserrat">{data.username}</li>
        <li className="montserrat">{data.points}</li>
      </ul>
    </>
  );
}

export default LeaderboardUserData;
