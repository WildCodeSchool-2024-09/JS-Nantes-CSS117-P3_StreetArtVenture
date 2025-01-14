import { Link } from "react-router-dom";
import "./Header.css";
import Navbar from "../Navbar/Navbar";

function Header() {
  return (
    <>
      <section className="headerClass">
        <Navbar />
        <img
          alt="logo Street Art Venture"
          className="Logo_street"
          src="images/STREET_LOGO.png"
        />
        <Link className="link_connecter" to="/test">
          Connexion
        </Link>
      </section>
    </>
  );
}

export default Header;
