import "./Home.css";

export const Home: React.FC = () => {
  return (
    <main>
      <h1 className="montserrat background-image">
        Chasses les œuvres de Street-Art de ta ville !
      </h1>
      <article className="flex">
        <div className="content-wrapper">
          <h2 className="bangers-regular center">LE JEU</h2>
          <p className="montserrat ">
            Explore ta ville et découvre ses trésors cachés de street art !
            Accède à une carte interactive, trouve des œuvres près de toi et
            explore la ville pour les photographier et les valider grâce à la
            géolocalisation. Gagne des points en découvrant de nouvelles œuvres,
            en redécouvrant celles déjà signalées ou en déclarant leur
            disparition. Grimpe dans le classement et deviens un expert du
            street art !
          </p>
          <button type="button" className="green-button montserrat">
            JOUER
          </button>
        </div>
        <img
          className="home-img"
          src="/homePageMap.jpg"
          alt="la carte de nantes avec des points d'intérêts"
        />
      </article>
      <article className="black-background flex">
        <img
          className="home-img"
          src="homePageDiscovery.jpg"
          alt="street art représentant un enfant ouvrant un rideau sur le mur pour découvrir de nouveaux tags"
        />
        <div className="content-wrapper">
          <h2 className="bangers-regular center white">LES OEUVRES</h2>
          <p className="montserrat white">
            Explore toutes les œuvres de street art référencées, qu’elles soient
            encore visibles ou disparues. Plonge dans une galerie interactive
            qui répertorie chaque création avec ses détails, son emplacement et
            son historique. Découvre les trésors artistiques de ta région,
            passés et présents, et enrichis ta connaissance du street art local
            en un seul clic.
          </p>
          <button type="button" className="green-button montserrat">
            DECOUVRIR
          </button>
        </div>
      </article>
      <article>
        <h2 className="bangers-regular center">le classement</h2>
        <p className="montserrat ">
          Consulte le classement des explorateurs et mesure-toi aux autres
          joueurs ! Suis ta progression, compare ton score avec celui des autres
          joueurs, et repousse tes limites pour entrer dans le top. Qui sera le
          grand champion de la découverte urbaine ?
        </p>
        <button type="button" className="green-button montserrat">
          Voir le classement !
        </button>
      </article>
    </main>
  );
};
