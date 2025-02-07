import "./ArtPieceStats.component.css";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../utils/api";
import type { ArtPieceDataType } from "../Statistics";

function ArtPieceStats() {
  const [data, setData] = useState<null | ArtPieceDataType>(null);

  useEffect(() => {
    fetchArtPiecesData();
  }, []);

  async function fetchArtPiecesData() {
    const req = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/statistics/art_piece`,
    );
    const stats = await req.json();
    setData(stats[0]);
  }

  return (
    data && (
      <section className="pieces_data">
        <p>Nombre d'oeuvres :</p>
        <p className="red_stats"> {data.nb_art_pieces}</p>
      </section>
    )
  );
}

export default ArtPieceStats;
