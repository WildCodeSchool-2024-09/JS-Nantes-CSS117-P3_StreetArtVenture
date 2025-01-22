import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import Navbar from "../Navbar/Navbar";

function Header() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No token found");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/verifyToken`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ token }),
          },
        );

        if (!response.ok) {
          console.error("Echec de la validation du token.");
          return;
        }

        const data = await response.json();
        setUser(data.decodedToken);
      } catch (error) {
        console.error("Erreur lors de la vérification de connexion:", error);
      }
    };

    verifyToken();
  }, [setUser]);
  return (
    <>
      <section className="headerClass">
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
