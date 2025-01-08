import { Connexion } from "../components/Connexion/Connexion";
import LeaderboardPage from "../pages/leaderboard/leaderboardPage";

const routes = [
  {
    path: "/login",
    element: <Connexion />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
];

export default routes;
