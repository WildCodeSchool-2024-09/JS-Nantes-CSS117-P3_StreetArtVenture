import { useState } from "react";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const { user } = useUser();

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      <section className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} size={50} />
        {isOpen && (
          <div>
            <ul className="section_ul">
              <Link className="link_nav" to="/map" onClick={handleLinkClick}>
                Jouer
              </Link>
              <Link
                className="link_nav"
                to="/connexion"
                onClick={handleLinkClick}
              >
                Connexion
              </Link>
              <Link
                className="link_nav"
                to="/register"
                onClick={handleLinkClick}
              >
                S'inscrire
              </Link>
              <Link
                className="link_nav"
                to="/leaderboard"
                onClick={handleLinkClick}
              >
                Classement
              </Link>
              <Link
                className="link_nav"
                to="/gallery"
                onClick={handleLinkClick}
              >
                Galerie
              </Link>
              <img src="/forme_blanche.png" alt="forme graphique" />
              {!!user?.is_admin && (
                <>
                  <Link
                    className="link_nav"
                    to="/art-piece-list"
                    onClick={handleLinkClick}
                  >
                    Liste des oeuvres
                  </Link>
                  <Link
                    className="link_nav"
                    to="/lost"
                    onClick={handleLinkClick}
                  >
                    Signalements
                  </Link>
                  <Link
                    className="link_nav"
                    to="/adminvalidation"
                    onClick={handleLinkClick}
                  >
                    Validation
                  </Link>
                  <Link
                    className="link_nav"
                    to="/statistics"
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
    </>
  );
}

export default Navbar;
