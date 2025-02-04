import { useEffect, useState } from "react";
import "./NotificationsCenter.component.css";
import { useUser } from "../../context/UserContext";
import type { User } from "../../context/UserContextType";
import { fetchWithAuth } from "../../utils/api";
import type { Notifications } from "./NotificationsCenter";

function NotificationsCenter() {
  const [notifications, setnotifications] = useState<null | Notifications[]>(
    null,
  );
  const [isVisible, setIsVisible] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (user) getNotifications(user);
  }, [user]);

  // Retreive user notifications and put it in the state
  async function getNotifications(user: User) {
    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/notifications/${user.id}`,
    );
    const result = await response.json();
    if (result.length) setnotifications(result);
  }

  // Sends API request to mark all notification of the user to read
  async function handleOnClick() {
    if (user) {
      setIsVisible(!isVisible);
      await getNotifications(user);
      fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/notifications/${user.id}`,
        { method: "PATCH" },
      );
    }
  }

  return (
    <div className="notification-center">
      <button type="button" onClick={handleOnClick}>
        <img
          className="pointer"
          alt="notification-center"
          src={
            // we check if we have any notifications not seen
            notifications?.find(
              (notification) => notification.viewed_at === null,
            )
              ? "https://www.svgrepo.com/show/528343/letter-unread.svg"
              : "https://www.svgrepo.com/show/528344/letter.svg"
          }
        />
      </button>
      {isVisible && (
        <ul>
          {notifications ? (
            notifications?.map((notification) => {
              return (
                <li
                  className={
                    notification.viewed_at
                      ? "notification-seen"
                      : "notification-new"
                  }
                  key={notification.id}
                >
                  <p>
                    {`Votre tentative d'ajout d'oeuvre créé le : ${new Date(notification.created_at).toLocaleDateString("fr-FR")} à 
              ${new Date(notification.created_at).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              a été ${notification.status ? "validé" : "refusé"}`}
                  </p>
                </li>
              );
            })
          ) : (
            <p>Vous n'avez aucune notifications</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default NotificationsCenter;
