import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { setContextFromToken } from "../../utils/setContextFromToken";
import Navbar from "../Navbar/Navbar";

function Header() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setContextFromToken(token, setUser);
  }, [setUser]);
  return (
    <>
      <section className="headerClass">
        <Navbar />
        <img
          alt="logo Street Art Venture"
          className="Logo_street"
          src="images/STREET_LOGO.png"
        />
        {user ? (
          user.is_admin === 1 ? (
            <Link to="/test">
              <img
                className="user-picture"
                src="/images/admin_profil.png"
                alt="picture-user"
              />
            </Link>
          ) : user.is_admin === 0 ? (
            <Link to="/test">
              <img
                className="user-picture"
                src="/images/user_profil.png"
                alt="picture-user"
              />
            </Link>
          ) : (
            <Link className="link_connecter" to="/connexion">
              Connexion
            </Link>
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
