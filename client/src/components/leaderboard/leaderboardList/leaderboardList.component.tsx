import { type FormEvent, useRef, useState } from "react";
import type { User } from "../../../types/user";
import "./leaderboardList.component.css";
import { format } from "date-fns";
import AdminModal from "../admin/AdminModal.component";
import type { LeaderboardListProps } from "../leaderboard";

function LeaderboardList({
  refreshData,
  data,
  fetchMore,
}: LeaderboardListProps) {
  const [isPopupOpen, setIsPopupOpen] = useState<false | "rename" | "ban">(
    false,
  );
  const [poppedUser, setPoppedUser] = useState<null | User>(null);
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

  const handleAdminAction = async (id: number, type: "rename" | "ban") => {
    setIsPopupOpen(type);
    const usrdata = data.filter((el) => el.id === id);
    setPoppedUser(usrdata[0]);
  };

  async function handleAdminConfirmation(
    method: "DELETE" | "PATCH",
    e?: FormEvent,
  ) {
    if (!poppedUser || (method === "PATCH" && !e)) return;
    if (method === "PATCH") {
      const form = e?.target as HTMLFormElement;
      const input = form.elements[0] as HTMLInputElement;
      if (method === "PATCH" && !input.value) return;
      await fetch(`${import.meta.env.VITE_API_URL}/user/${poppedUser?.id}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input.value }),
      });
    } else
      await fetch(`${import.meta.env.VITE_API_URL}/user/${poppedUser?.id}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
    setIsPopupOpen(false);
    setPoppedUser(null);
    refreshData();
  }

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
          <li className="montserrat">
            <p>{index + 1}</p>
          </li>
          {el.last_connection && (
            <p>{format(new Date(el.last_connection), "HH:mm dd/MM/yyyy")}</p>
          )}
          <li className="montserrat">
            <p>{el.name}</p>
          </li>
          {el.last_connection && (
            <button
              className="leaderboard-rename-button pointer"
              type="button"
              onClick={() => handleAdminAction(el.id, "rename")}
            >
              ...
            </button>
          )}
          <li className="montserrat">
            <p>{el.points}</p>
          </li>
          {el.last_connection && (
            <button
              className="leaderboard-rename-button pointer"
              type="button"
              onClick={() => handleAdminAction(el.id, "ban")}
            >
              X
            </button>
          )}
        </ul>
      ))}
      <div className="leaderboard-loader" />
      <AdminModal
        isPopupOpen={isPopupOpen}
        poppedUser={poppedUser}
        setIsPopupOpen={setIsPopupOpen}
        handleAdminConfirmation={handleAdminConfirmation}
      />
    </div>
  );
}

export default LeaderboardList;
