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

  const handleDeconnection = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
  };
  return (
    <>
      <section className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} size={50} />
        {isOpen && (
          <div>
            <ul className="section_ul">
              <Link className="link_nav" to="/map">
                Jouer
              </Link>
              {alternator[0] && (
                <Link className="link_nav" to="/connexion">
                  Connexion
                </Link>
              )}
              <Link className="link_nav" to="/leaderboard">
                Classement
              </Link>
              <Link className="link_nav" to="/gallery">
                Les Oeuvres
              </Link>
              <Link className="link_nav" to="/test">
                Admin
              </Link>
              <Link className="link_nav" to="/test">
                Paramètres
              </Link>
              {alternator[1] && (
                <button
                  type="button"
                  className="link_nav nav-button"
                  onClick={handleDeconnection}
                >
                  Se déconnecter
                </button>
              )}
              <img src="/forme_blanche.png" alt="forme graphique" />
            </ul>
          </div>
        )}
      </section>
    </>
  );
}

export default Navbar;
