import "./StatisticsPage.css";
import ArtPieceStats from "../../components/Statistics/ArtPieceStats/ArtPieceStats.component";
import UsersStats from "../../components/Statistics/UsersStats/UsersStats.component";

function StatisticsPage() {
  return (
    <main className="stats-main-container">
      <section className="stats-container">
        <h1>Statistiques du site</h1>
        <ArtPieceStats />
        <UsersStats />
      </section>
    </main>
  );
}

export default StatisticsPage;
