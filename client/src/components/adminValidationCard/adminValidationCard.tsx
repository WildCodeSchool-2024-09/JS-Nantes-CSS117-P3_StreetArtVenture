import type { ArtPiece } from "../../types/art_piece";
import { fetchWithAuth } from "../../utils/api";
import "../adminValidationCard/adminValidationCard.css";
import { useEffect, useState } from "react";
import useToast from "../../utils/useToast";

export function AdminValidationBoard() {
  const [validation, setValidation] = useState<ArtPiece | null>(null);
  const [comparaisonValidation, setComparaisonValidation] = useState<
    ArtPiece[]
  >([]);
  const [indexBouton, setIndexBouton] = useState(0);
  const { success, failed, information } = useToast();

  useEffect(() => {
    fetchArtPiece();
  }, []);
  useEffect(() => {
    if (validation) {
      fetchArtPieceByProximity();
    }
  }, [validation]);
  const [formData, setFormData] = useState({
    titre: "Aucun titre",
    points: 30,
    commentaire: "",
  });

  const fetchArtPiece = async () => {
    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/art/latestArtPieceUnvelidated`,
    );
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      fetchArtPieceByProximity();
      setValidation(data[0]);
      setFormData((prev) => ({ ...prev, titre: data[0].name }));
    }
  };

  const fetchArtPieceByProximity = async () => {
    if (validation) {
      setComparaisonValidation([]);
      setIndexBouton(0);
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/similarAdress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adress: validation.adress,
            id: validation.id,
          }),
        },
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setComparaisonValidation(data);
      }
    }
  };
  async function handleValidation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validation || !validation.id) {
      information("Aucune œuvre à valider.");
      return;
    }
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/artPieceValidation/${validation.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ArtTitle: formData.titre,
            comment: formData.commentaire,
            userId: validation.user_id,
            pointsValue: formData.points,
          }),
        },
      );
      if (response.ok) {
        setValidation(null);
        setFormData({
          titre: "Aucun titre",
          points: 30,
          commentaire: "",
        });
        fetchArtPiece();
        success("L'œuvre a été validée avec succès !");
      } else {
        failed("Échec de la validation. Veuillez réessayer.");
      }
    } catch (error) {
      failed("Une erreur est survenue.");
    }
  }

  async function handleDeny() {
    if (!validation || !validation.id) {
      alert("Aucune œuvre à valider.");
      return;
    }
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/art/artPieceDenied/${validation.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: validation.user_id }),
        },
      );
      if (response.ok) {
        setValidation(null);
        setFormData({
          titre: "Aucun titre",
          points: 30,
          commentaire: "",
        });
        fetchArtPiece();

        success("L'œuvre a été refusée avec succès !");
      } else {
        failed("Échec du refus. Veuillez réessayer.");
      }
    } catch (error) {
      failed("Une erreur est survenue.");
    }
  }

  const [banUser, setBanUser] = useState<string | boolean>(false);

  const handleBan = async () => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/user/verifyUser`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        setBanUser(true);
        alert("L'utilisateur a été banni avec succès.");
      } else {
        throw new Error("Erreur lors de la tentative de bannir l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de bannir l'utilisateur.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextComparaison = (number: number) => {
    const newIndex = indexBouton + number;
    if (newIndex < 0) {
      setIndexBouton(comparaisonValidation.length - 1);
    } else if (newIndex >= comparaisonValidation.length) {
      setIndexBouton(0);
    } else setIndexBouton(indexBouton + number);
  };

  return (
    <main className="body-admin-validation">
      <section className="main-validation-card">
        {validation && (
          <>
            <img
              src={`${import.meta.env.VITE_API_URL}${validation.picture_path}`}
              alt="Street Art representation sent by user"
              className="new-street-art-photo"
            />
            <form
              className="form-validation-container"
              action="submit"
              onSubmit={handleValidation}
            >
              <section className="street-art-info">
                <label>
                  titre : <br />
                  <input
                    className="input-validation "
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                  />
                </label>{" "}
                <label>
                  Description : <br />
                  <textarea
                    className="input-validation description"
                    name="commentaire"
                    value={formData.commentaire}
                    onChange={handleChange}
                    rows={4}
                    cols={50}
                  />
                </label>
                <label>
                  Points : <br />
                  <input
                    className="points"
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                  />
                </label>
              </section>
              <section className="accepted-or-refused-buttons">
                <button type="submit" className="brown-button-admin">
                  Valider
                </button>
                <button
                  onClick={handleDeny}
                  type="button"
                  className="brown-button-admin"
                >
                  Refuser
                </button>
              </section>
            </form>
            <button
              type="button"
              className="brown-button-admin"
              onClick={handleBan}
            >
              {banUser ? "Utilisateur banni" : "Bannir l'utilisateur"}
            </button>
          </>
        )}
        {!validation && (
          <section className="no-art-piece">
            Il n'y a aucune œuvre à valider.
          </section>
        )}
      </section>
      {comparaisonValidation.length > 0 && (
        <>
          <div className="arrow"> </div>
          <section className="comparaison-container main-validation-card">
            <p className="index-validation">
              {indexBouton + 1}/{comparaisonValidation.length}
            </p>
            <img
              src={`${import.meta.env.VITE_API_URL}${comparaisonValidation[indexBouton].picture_path}`}
              alt="Street Art representation sent by user"
              className="new-street-art-photo"
            />
            <h1> {comparaisonValidation[indexBouton].name}</h1>
            <p>
              {comparaisonValidation[indexBouton].adress} <br />{" "}
              {comparaisonValidation[indexBouton].city}
            </p>
            <p>
              position X : {comparaisonValidation[indexBouton].coordinates.x}{" "}
              <br />
              position y : {comparaisonValidation[indexBouton].coordinates.y}
            </p>
            <p>{comparaisonValidation[indexBouton].description}</p>
            <div className="arrow-container">
              <button
                className="validation-arrow-button rotation"
                type="button"
                onClick={() => handleNextComparaison(-1)}
              >
                <img
                  className="validation-arrow-image"
                  src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
                  alt="Flèche blanche avec bordure noire"
                />
              </button>

              <button
                className="validation-arrow-button"
                type="button"
                onClick={() => handleNextComparaison(1)}
              >
                <img
                  className="validation-arrow-image"
                  src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-2.png"
                  alt="arrow white with border black"
                />
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
