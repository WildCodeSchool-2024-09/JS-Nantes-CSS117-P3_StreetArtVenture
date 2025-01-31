import { useState } from "react";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setOpen] = useState(false);

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
                Les Oeuvres
              </Link>
              <Link className="link_nav" to="/test" onClick={handleLinkClick}>
                Admin
              </Link>
              <Link className="link_nav" to="/test" onClick={handleLinkClick}>
                Paramètres
              </Link>
              <img src="/forme_blanche.png" alt="forme graphique" />
            </ul>
          </div>
        )}
      </section>
    </>
  );
}

export default Navbar;
