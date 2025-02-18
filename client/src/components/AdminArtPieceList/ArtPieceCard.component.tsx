import { useState } from "react";
import type { ArtPiece } from "../../types/art_piece";
import "./ArtPieceCard.component.css";
import EditAdminArtPiece from "./EditAdminArtPiece/EditAdminArtPiece";

function ArtPieceCard({
  art_piece,
  refreshData,
}: { art_piece: ArtPiece; refreshData: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);

  function refreshComponent() {
    setModalOpen(false);
    refreshData();
  }

  function handleOnClick() {
    setModalOpen(true);
  }

  return (
    <section className="art-piece-card">
      <div>
        <img
          alt="Art piece"
          src={`${import.meta.env.VITE_API_URL}${art_piece.picture_path}`}
        />
        <ul>
          <li>
            <p className="title">{`${art_piece.name}`}</p>
          </li>
          <li>
            <p>
              <b>Adresse :</b> {art_piece.adress}
            </p>
          </li>
          <li>
            <p>
              <b>Coordonnées :</b>
              {` ${art_piece.coordinates.x} ${art_piece.coordinates.y}`}
            </p>
          </li>
          <li>
            <p>
              <b>Ville :</b> {`${art_piece.city}`}
            </p>
          </li>
          <li>
            {art_piece.is_validated === 1 ? <p>Validée</p> : <p>Non validée</p>}
          </li>
          <li>
            {art_piece.is_covered === 1 ? <p>Couverte</p> : <p>Non couverte</p>}
          </li>
          <li>
            <p>
              <b>Valeur :</b> {`${art_piece.points_value} points`}
            </p>
          </li>
          <li>
            <p>
              <b>Description :</b> {` ${art_piece.description}`}
            </p>
          </li>
          <img
            className="trait-description"
            src="/forme_blanche.png"
            alt="graphic element"
          />
          <button
            onClick={handleOnClick}
            className="admin-art-piece-list-edit-button"
            type="button"
          >
            Modifier
          </button>
          <EditAdminArtPiece
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            artPiece={art_piece}
            onEdit={refreshComponent}
          />
        </ul>
      </div>
    </section>
  );
}

export default ArtPieceCard;
