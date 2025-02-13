import { useState } from "react";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [alternator, setAlternator] = useState([true, false]);

  useEffect(() => {
    setAlternator(() => (!user ? [true, false] : [false, true]));
  }, [user]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleDeconnection = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
    setOpen(false);
  };
  return (
    <section className="hamburger">
      <Hamburger toggled={isOpen} toggle={setOpen} size={50} />
      {isOpen && (
        <div>
          <ul className="section-ul">
            <Link className="link-nav" to="/carte" onClick={handleLinkClick}>
              Jouer
            </Link>
            {alternator[0] && (
              <Link
                className="link-nav"
                to="/connexion"
                onClick={handleLinkClick}
              >
                Connexion
              </Link>
            )}
            {alternator[0] && (
              <Link
                className="link-nav"
                to="/inscription"
                onClick={handleLinkClick}
              >
                S'inscrire
              </Link>
            )}

            <Link
              className="link-nav"
              to="/classement"
              onClick={handleLinkClick}
            >
              Classement
            </Link>
            <Link className="link-nav" to="/galerie" onClick={handleLinkClick}>
              Les Oeuvres
            </Link>
            {alternator[1] && (
              <button
                type="button"
                className="link-nav nav-button"
                onClick={handleDeconnection}
              >
                Se déconnecter
              </button>
            )}
            <img src="/forme_blanche.png" alt="forme graphique" />
            {!!user?.isAdmin && (
              <>
                <Link
                  className="link-nav"
                  to="/admin/galerie"
                  onClick={handleLinkClick}
                >
                  Liste des oeuvres
                </Link>
                <Link
                  className="link-nav"
                  to="/signalements"
                  onClick={handleLinkClick}
                >
                  Signalements
                </Link>
                <Link
                  className="link-nav"
                  to="/validation"
                  onClick={handleLinkClick}
                >
                  Validation
                </Link>
                <Link
                  className="link-nav"
                  to="/statistiques"
                  onClick={handleLinkClick}
                >
                  Statistiques
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
export default Navbar;
