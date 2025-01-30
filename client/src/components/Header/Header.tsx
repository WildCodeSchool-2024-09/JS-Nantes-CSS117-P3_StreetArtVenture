import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { setContextFromToken } from "../../utils/setContextFromToken";
import Navbar from "../Navbar/Navbar";
import NotificationsCenter from "../Notifications/NotificationsCenter.component";

function Header() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setContextFromToken(token, setUser);
  }, [setUser]);
  return (
    <>
      <section className="header-class">
        <Navbar />
        <Link to="/">
          <img
            alt="logo Street Art Venture"
            className="Logo_street"
            src="images/STREET_LOGO.png"
          />
        </Link>
        {user ? (
          user.is_admin === 1 ? (
            <div>
              <NotificationsCenter />
              <Link to="/profile">
                <img
                  className="user-picture"
                  src="/images/admin_profil.png"
                  alt="picture-user"
                />
              </Link>
            </div>
          ) : (
            <div>
              <NotificationsCenter />
              <Link to="/profile">
                <img
                  className="user-picture"
                  src="/images/user_profil.png"
                  alt="picture-user"
                />
              </Link>
            </div>
          )
        ) : (
          <Link className="link_connecter" to="/connexion">
            Connexion
          </Link>
        )}
      </section>
    </>
  );
}

export default Header;
