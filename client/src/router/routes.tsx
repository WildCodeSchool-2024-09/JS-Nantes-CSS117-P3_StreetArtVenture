import { Connexion } from "../components/Connexion/Connexion";
import { AdminValidation } from "../components/adminValidationCard/adminValidationCard";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
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
  },
  {
    path: "/adminvalidation",
    element: <AdminValidation />,
  },
];

export default routes;
