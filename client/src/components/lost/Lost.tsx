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

  const updateReportedData = (updatedData: LostI[]) => {
    setReported((prevReported) =>
      prevReported.filter(
        (item) =>
          !updatedData.some(
            (updatedItem) => updatedItem.art_piece_id === item.art_piece_id,
          ),
      ),
    );
  };

  const validateReport = async (art_piece_id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reports/validate/${art_piece_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "validated" }),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la validation du signalement.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      refuseReport(art_piece_id);
      setIsLoading(false);
    }
  };

  const refuseReport = async (art_piece_id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reports/refuse/${art_piece_id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors du refus du signalement.");
      }
      const itemToUpdate = reported.find(
        (item) => item.art_piece_id === art_piece_id,
      );
      if (itemToUpdate) {
        updateReportedData([itemToUpdate]);
      } else {
        console.error("Signalement introuvable.");
      }
    } catch (error) {
      console.error(error);
    } finally {
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
                {(() => {
                  const coordinates: string = reported[changeCard].coordinates
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
              alt="arrow white with border black"
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
