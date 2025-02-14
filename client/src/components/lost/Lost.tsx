import "./lost.css";
import { useEffect, useState } from "react";
import traith1lost from "/trait-h1-artwork.tsx.png";
import { fetchWithAuth } from "../../utils/api";
import useToast from "../../utils/useToast";
import type { LostI } from "./LostType";

function Lost() {
  const { success, failed } = useToast();
  const [reported, setReported] = useState<LostI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeCard, setChangeCard] = useState(0);

  const updateReportedData = (art_piece_id: number) => {
    setReported((prev) =>
      prev.filter((item) => item.art_piece_id !== art_piece_id),
    );
    setChangeCard((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    const fetchReportedData = async () => {
      try {
        const response = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/report/reporting`,
        );
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setReported(data);
        } else {
          failed("Données invalides reçues");
        }
      } catch {
        failed("Erreur lors de la récupération des signalements");
      }
    };

    fetchReportedData();
  }, [failed]);

  const validateReport = async (art_piece_id: number) => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/reports/validate/${art_piece_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "validated" }),
        },
      );

      if (!response.ok) {
        failed("Erreur lors de la validation du signalement.");
        return;
      }
      success("la validation est approuvé");
      const itemExists = reported.some(
        (item) => item.art_piece_id === art_piece_id,
      );
      if (itemExists) {
        updateReportedData(art_piece_id);
      } else {
        failed("Le signalement est introuvable.");
      }
    } catch {
      failed("Erreur lors de la validation du signalement.");
    } finally {
      // actualiser la liste des signalements
      setIsLoading(false);
    }
  };

  const refuseReport = async (art_piece_id: number) => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/reports/refuse/${art_piece_id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        failed("Erreur lors du refus du signalement.");
        return;
      }
      success("Le refus est approuvé");
      const itemExists = reported.some(
        (item) => item.art_piece_id === art_piece_id,
      );
      if (itemExists) {
        updateReportedData(art_piece_id);
      } else {
        failed("Le signalement est introuvable.");
      }
    } catch {
      failed("Erreur lors du refus du signalement.");
    } finally {
      // actualiser la liste des signalements
      setIsLoading(false);
    }
  };

  const handleClick = (direction: "increment" | "decrement") => {
    setChangeCard((prev) => {
      if (direction === "increment" && prev < reported.length - 1) {
        return prev + 1;
      }
      if (direction === "decrement" && prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  let contentInfo = null;
  if (reported.length > 0) {
    const currentReport = reported[changeCard];
    const coordinates = currentReport.coordinates
      ? `Lat: ${currentReport.coordinates.x}, Long: ${currentReport.coordinates.y}`
      : "Coordonnées non disponibles";
    // Fonction qui renvoie les coordonnées et le titre du street art disponible, et un message "Coordonnées non disponibles" si aucune coordonnée n'est disponible à l'affichage.
    contentInfo = (
      <div className="content-info" key={currentReport.art_piece_id}>
        <p className="title-street-art">{currentReport.art_piece_name}</p>
        <p className="coordinates-gps">{coordinates}</p>
      </div>
    );
  }

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
          alt="Un trait de pinceau noir sous le texte"
        />

        <section className="block-green">
          <div className="container">
            <div className="container-data-base">
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

                  {contentInfo}

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
            </div>
            {reported.length > 0 && (
              <div className="next-refusal-button">
                <button
                  className="btn-validation-lost"
                  type="button"
                  onClick={() =>
                    validateReport(reported[changeCard].art_piece_id)
                  }
                  disabled={isLoading}
                >
                  {isLoading ? "Validation en cours..." : "Validation"}
                </button>
                <button
                  className="btn-refusal-lost"
                  type="button"
                  onClick={() =>
                    refuseReport(reported[changeCard].art_piece_id)
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
            onClick={() => handleClick("decrement")}
          >
            <img
              className="arrow-left-lost arrow"
              src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
              alt="Flèche blanche avec bordure noire"
            />
          </button>

          <button
            className="my-right-button-lost"
            type="button"
            onClick={() => handleClick("increment")}
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
