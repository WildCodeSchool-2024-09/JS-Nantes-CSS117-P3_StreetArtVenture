import "./lost.css";
import { useEffect, useState } from "react";
import traith1lost from "/trait-h1-artwork.png"; // Correction de l'extension
import type { LostI } from "./LostType";

function Lost() {
  const [reported, setReported] = useState<LostI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/reporting`)
      .then((res) => res.json())
      .then((data) => {
        setReported(data);
      });
  }, []);

  return (
    <section className="lost-page-background">
      <div className="h1-circle-lost">
        <h1 className="report-text">Signalement</h1>
        <span className="circle-lost">
          <p>{reported.length}</p>
        </span>
      </div>

      <h2 className="works-consulting">
        Consultez les signalements d'œuvres disparues
      </h2>
      <img
        className="brushstroke-h1-lost"
        src={traith1lost}
        alt="a black brushstroke under the text"
      />

      <section className="block-green">
        <p className="compared-work">Oeuvre signalée</p>

        {reported.length > 0 ? (
          <>
            <img
              src={`${import.meta.env.VITE_API_URL}${reported[reported.length - 1].reported_img_path}`}
              alt={`Reported art street, ${reported[reported.length - 1].art_piece_name}`}
            />

            {reported.map((report) => {
              const coordinates = report.coordinates
                ? `Lat: ${report.coordinates.x}, Long: ${report.coordinates.y}`
                : "Coordonnées non disponibles";

              return (
                <div key={report.art_piece_id}>
                  <p className="title-street-art">{report.art_piece_name}</p>
                  <p>
                    Signalé par {report.user_name} le {report.timestamp}
                  </p>
                  <p className="coordinates-gps">{coordinates}</p>
                </div>
              );
            })}
          </>
        ) : (
          <p>Aucune œuvre d'art signalée.</p>
        )}

        <button className="btn-validation-lost" type="button">
          Validation
        </button>
        <button className="btn-refusal-lost" type="button">
          Refus
        </button>

        <section className="block-compared-artwork-lost">
          <p className="reported-work">Comparaison</p>
          {reported.length > 0 && (
            <div>
              <img
                src={`${import.meta.env.VITE_API_URL}${reported[0].report_img_path}`}
                alt="Reported art street"
              />
            </div>
          )}
        </section>
      </section>

      <nav className="button-lost">
        <button className="my-left-button-lost" type="button">
          <img
            className="arrow-left-lost"
            src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
            alt="arrow white with border black"
          />
        </button>
        <button className="my-right-button-lost" type="button">
          <img
            className="arrow-right-lost"
            src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
            alt="arrow white with border black"
          />
        </button>
      </nav>
    </section>
  );
}

export default Lost;
