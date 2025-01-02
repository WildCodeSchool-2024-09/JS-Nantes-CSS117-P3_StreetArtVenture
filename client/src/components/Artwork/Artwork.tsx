import "./Artwork.css";
import backgroundimage from "../../assets/image/background-grey.jpg";
import transparentcard from "../../assets/image/Rectangle-transparent.png";
function Artwork() {
  return (
    <>
      <section className="artwork-page">
        <img
          src={backgroundimage}
          alt="background gray if from lighter to darker"
        />
        <section className="white-card">
          <img src={transparentcard} alt="card of transparant color" />
        </section>
      </section>
    </>
  );
}

export default Artwork;
