import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
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
  {
    path: "/register",
    element: <InscriptionForm />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  }
];

export default routes;
