import "./ArtPieceStats.component.css";
import { useEffect, useState } from "react";
import type { ArtPieceDataType } from "../Statistics";

function ArtPieceStats() {
  const [data, setData] = useState<null | ArtPieceDataType>(null);

  useEffect(() => {
    fetchArtPiecesData();
  }, []);

  async function fetchArtPiecesData() {
    const req = await fetch(
      `${import.meta.env.VITE_API_URL}/statistics/art_piece`,
    );
    const stats = await req.json();
    setData(stats[0]);
  }

  return (
    data && (
      <span>
        <h2>Oeuvres</h2>
        <ul>
          <li>
            <p>Nombre d'oeuvres : {data.nb_art_pieces}</p>
          </li>
        </ul>
      </span>
    )
  );
}

export default ArtPieceStats;
