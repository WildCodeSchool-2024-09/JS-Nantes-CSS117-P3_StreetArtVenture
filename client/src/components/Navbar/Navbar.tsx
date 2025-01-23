import { useState } from "react";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <section className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} size={50} />
        {isOpen && (
          <div>
            <ul className="section_ul">
              <Link className="link_nav" to="/test">
                Jouer
              </Link>
              <Link className="link_nav" to="/connexion">
                Connexion
              </Link>
              <Link className="link_nav" to="/leaderboard">
                Classement
              </Link>
              <Link className="link_nav" to="/test">
                Les Oeuvres
              </Link>
              <Link className="link_nav" to="/test">
                Admin
              </Link>
              <Link className="link_nav" to="/test">
                Paramètres
              </Link>
            </ul>
          </div>
        )}
      </section>
    </>
  );
}

export default Navbar;
