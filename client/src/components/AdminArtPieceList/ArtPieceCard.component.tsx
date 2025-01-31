import type { ArtPiece } from "../../types/art_piece";
import "./ArtPieceCard.component.css";

function ArtPieceCard({ art_piece }: { art_piece: ArtPiece }) {
  return (
    <li>
      <img
        alt="Art piece"
        src={`${import.meta.env.VITE_API_URL}${art_piece.picture_path}`}
      />
      <ul>
        <li>
          <p>{`Nom : ${art_piece.name}`}</p>
        </li>
        <li>
          <p>{`Adresse : ${art_piece.adress}`}</p>
        </li>
        <li>
          <p>{`Coordonnées : ${art_piece.coordinates.x} ${art_piece.coordinates.y}`}</p>
        </li>
        <li>
          <p>{`Ville : ${art_piece.city}`}</p>
        </li>
        <li>
          {art_piece.is_validated === 1 ? <p>Validée</p> : <p>Non validée</p>}
        </li>
        <li>
          {art_piece.is_covered === 1 ? <p>Couverte</p> : <p>Non couverte</p>}
        </li>
        <li>
          <p>{`Vaut ${art_piece.points_value} points`}</p>
        </li>
        <li>
          <p>{`Description :  ${art_piece.description}`}</p>
        </li>
      </ul>
    </li>
  );
}

export default ArtPieceCard;
