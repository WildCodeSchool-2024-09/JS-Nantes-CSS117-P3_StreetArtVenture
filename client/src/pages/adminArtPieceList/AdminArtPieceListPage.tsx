import { useEffect, useState } from "react";
import type { ArtPiece } from "../../types/art_piece";
import { fetchWithAuth } from "../../utils/api";
import "./AdminArtPieceListPage.css";
import ArtPieceCard from "../../components/AdminArtPieceList/ArtPieceCard.component";

function AdminArtPieceListPage() {
  const [data, setData] = useState<null | ArtPiece[]>(null);
  // On mount, fetch art pieces
  useEffect(() => {
    fetchArtPieces();
  }, []);

  async function fetchArtPieces() {
    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/artPiece`,
    );
    const result = await response.json();
    setData(result);
  }

  function refreshData() {
    fetchArtPieces();
  }

  return (
    <main className="art-piece-list-admin-main-container">
      <h1>Liste de toutes les oeuvres</h1>
      <img src="/separator.png" alt="graphic element" />
      {data ? (
        <ul>
          {data.map((art_piece: ArtPiece) => (
            <ArtPieceCard
              refreshData={refreshData}
              key={art_piece.id}
              art_piece={art_piece}
            />
          ))}
        </ul>
      ) : (
        <p>chargement..</p>
      )}
    </main>
  );
}

export default AdminArtPieceListPage;
