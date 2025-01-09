import { useRef } from "react";
import type { User } from "../../../types/user";
import "./leaderboardList.component.css";

interface LeaderboardListProps {
  data: User[];
  fetchMore: () => void;
}

function LeaderboardList({ data, fetchMore }: LeaderboardListProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = async () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      if (maxScroll - scrollPosition <= 20) {
        fetchMore();
      }
    }
  };

  return !data.length ? (
    <p className="no-result-leaderboard montserrat">
      Aucun utilisateur ne correspond à vos filtres
    </p>
  ) : (
    <div
      onScroll={handleScroll}
      ref={scrollContainerRef}
      className="leaderboard-user-container custom-scrollbar"
    >
      {data.map((el, index) => (
        <ul key={el.id} className="leaderboard-informations-container">
          <li className="montserrat">{index + 1}</li>
          <li className="montserrat">{el.name}</li>
          <li className="montserrat">{el.points}</li>
        </ul>
      ))}
      <div className="leaderboard-loader" />
    </div>
  );
}

export default LeaderboardList;
