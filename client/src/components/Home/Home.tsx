import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handlePlay = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/Connexion");
    } else {
      try {
        fetch(`${import.meta.env.VITE_API_URL}/user/verifyToken`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ token }),
        }).then((response) => {
          if (!response.ok) {
            navigate("/Connexion");
          }
          navigate("/map");
        });
      } catch (error) {
        navigate("/Connexion");
        console.error("Erreur lors de la vérification de connexion:", error);
      }
    }
  };

  return (
    <main>
      <figure className="head-img">
        <img className="head-img " src="./images/IMAGE_HOMEPAGE.jpg" alt="" />
      </figure>
      <article className="flex-article-white">
        <div className="content-wrapper">
          <h2 className="bangers-regular  center title-size">LE JEU</h2>
          <img
            className="separator-noir"
            src="/separator.png"
            alt="visual separator"
          />
          <p className="home-p --primary-font  ">
            Explore ta ville et découvre ses trésors cachés de street art !
            Accède à une carte interactive, trouve des œuvres près de toi et
            explore la ville pour les photographier et les valider grâce à la
            géolocalisation. Gagne des points en découvrant de nouvelles œuvres,
            en redécouvrant celles déjà signalées ou en déclarant leur
            disparition. Grimpe dans le classement et deviens un expert du
            street art !
          </p>
          <button
            type="button"
            onClick={handlePlay}
            className="home-button home-green-button home-p montserrat "
          >
            JOUER
          </button>
        </div>
        <img
          className="home-img vanish"
          src="/homePageMap.jpg"
          alt="la carte de nantes avec des points d'intérêts"
        />
      </article>
      <article className="dark-background flex-article">
        <img
          className="home-img vanish"
          src="homePageDiscovery.jpg"
          alt="street art représentant un enfant ouvrant un rideau sur le mur pour découvrir de nouveaux tags"
        />
        <div className="content-wrapper">
          <h2 className="bangers-regular center white title-size">
            LES OEUVRES
          </h2>
          <img
            className="separator-noir"
            src="/forme_blanche.png"
            alt="visual separator"
          />
          <p className="--primary-font white  home-p">
            Explore toutes les œuvres de street art référencées, qu’elles soient
            encore visibles ou disparues. Plonge dans une galerie interactive
            qui répertorie chaque création avec ses détails, son emplacement et
            son historique. Découvre les trésors artistiques de ta région,
            passés et présents, et enrichis ta connaissance du street art local
            en un seul clic.
          </p>
          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="home-button home-green-button montserrat home-p"
          >
            DECOUVRIR
          </button>
        </div>
      </article>
      <article className="green-background flex-article">
        <div className="content-wrapper">
          <h2 className="bangers-regular center title-size white">
            le classement
          </h2>
          <img
            className="separator-noir"
            src="/forme_blanche.png"
            alt="visual separator"
          />
          <p className="--primary-font white home-p">
            Consulte le classement des explorateurs et mesure-toi aux autres
            joueurs ! Suis ta progression, compare ton score avec celui des
            autres joueurs, et repousse tes limites pour entrer dans le top. Qui
            sera le grand champion de la découverte urbaine ?
          </p>
          <button
            type="button"
            onClick={() => navigate("/leaderboard")}
            className="home-button  white-button montserrat green-button-but-white-instead home-p"
          >
            Voir le classement !
          </button>
        </div>
        <img
          className="home-img vanish"
          src="images/leaderboardHome2.png"
          alt="street art représentant un enfant ouvrant un rideau sur le mur pour découvrir de nouveaux tags"
        />
      </article>
    </main>
  );
};
