import "./StatisticsPage.css";
import ArtPieceStats from "../../components/Statistics/ArtPieceStats/ArtPieceStats.component";
import UsersStats from "../../components/Statistics/UsersStats/UsersStats.component";

function StatisticsPage() {
  return (
    <main className="stats-main-container">
      <section className="stats-container">
        <h1>Statistiques du site</h1>
        <img src="forme_blanche.png" alt="element graphique" />
        <UsersStats />
        <ArtPieceStats />
        <img src="stats_graf.png" alt="graphic stats" />
      </section>
    </main>
  );
}

export default StatisticsPage;
