import "./lost.css";
import { useEffect, useState } from "react";
import traith1lost from "/trait-h1-artwork.tsx.png";
import type { LostI } from "./LostType";

function Lost() {
  const [reported, setReported] = useState<LostI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeCard, setChangeCard] = useState(0);

  useEffect(() => {
    const fetchReportedData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/reporting`,
        );
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setReported(data);
        } else {
          console.error("Données invalides reçues", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des signalements", error);
      }
    };

    fetchReportedData();
  }, []);

  const validateReport = async (artPieceId: number) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/reporting`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const updatedReports = reported.map((report) =>
          report.art_piece_id === artPieceId
            ? { ...report, is_covered: true }
            : report,
        );
        setReported(updatedReports);
        alert("Signalement validé !");
      } else {
        throw new Error("Erreur lors de la validation du signalement");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue lors de la validation.");
    } finally {
      setIsLoading(false);
    }
  };

  const refuseReport = async (artPieceId: number) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/reporting`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const updatedReports = reported.filter(
          (report) => report.art_piece_id !== artPieceId,
        );
        setReported(updatedReports);
        alert("Signalement refusé et ticket supprimé !");
      } else {
        throw new Error("Erreur lors du refus du signalement");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue lors du refus.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClickInc = () => {
    if (changeCard < reported.length - 1) {
      setChangeCard(changeCard + 1);
    }
  };

  const handleClickDec = () => {
    if (changeCard > 0) {
      setChangeCard(changeCard - 1);
    }
  };

  return (
    <section className="lost-page-background">
      <div className="h1-circle-lost">
        <h1 className="report-text">Signalement</h1>
        <span className="circle-lost">
          <p>{reported.length}</p>
        </span>
      </div>

      <figcaption className="center-page">
        <h2 className="works-consulting">
          Consultez les signalements d'œuvres disparues
        </h2>
        <img
          className="brushstroke-h1-lost"
          src={traith1lost}
          alt="a black brushstroke under the text"
        />

        <section className="block-green">
          <div className="container">
            {reported.length > 0 ? (
              <>
                <figcaption className="reported-content">
                  <p className="text-work">Oeuvre signalée</p>
                  <img
                    className="street-art"
                    src={`${import.meta.env.VITE_API_URL}${reported[changeCard].reported_img_path}`}
                    alt={`Reported art street, ${reported[changeCard].art_piece_name}`}
                  />
                </figcaption>
                ;{(() => {
                  const coordinates = reported[changeCard].coordinates
                    ? `Lat: ${reported[changeCard].coordinates.x}, Long: ${reported[changeCard].coordinates.y}`
                    : "Coordonnées non disponibles";

                  return (
                    <div
                      className="content-info"
                      key={reported[changeCard].art_piece_id}
                    >
                      <p className="title-street-art">
                        {reported[changeCard].art_piece_name}
                      </p>
                      <p className="coordinates-gps">{coordinates}</p>
                    </div>
                  );
                })()}
                <figcaption className="compared-art">
                  <p className="text-work">Comparaison</p>
                  <img
                    className="street-art"
                    src={`${import.meta.env.VITE_API_URL}${reported[changeCard].report_img_path}`}
                    alt={`Reported art street, ${reported[changeCard].art_piece_name}`}
                  />
                </figcaption>
              </>
            ) : (
              <p>Aucune œuvre d'art signalée.</p>
            )}

            {reported.length > 0 && (
              <div className="next-refusal-button">
                <button
                  className="btn-validation-lost"
                  type="button"
                  onClick={() =>
                    validateReport(reported[reported.length - 1].art_piece_id)
                  }
                  disabled={isLoading}
                >
                  {isLoading ? "Validation en cours..." : "Validation"}
                </button>
                <button
                  className="btn-refusal-lost"
                  type="button"
                  onClick={() =>
                    refuseReport(reported[reported.length - 1].picture_path)
                  }
                  disabled={isLoading}
                >
                  {isLoading ? "Suppression en cours..." : "Refus"}
                </button>
              </div>
            )}
          </div>
        </section>

        <nav className="button-lost">
          <button
            className="my-left-button-lost"
            type="button"
            onClick={handleClickDec}
          >
            <img
              className="arrow-left-lost arrow"
              src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
              alt="arrow white with border black"
            />
          </button>

          <button
            className="my-right-button-lost"
            type="button"
            onClick={handleClickInc}
          >
            <img
              className="arrow-right-lost arrow"
              src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
              alt="arrow white with border black"
            />
          </button>
        </nav>
      </figcaption>
    </section>
  );
}

export default Lost;
