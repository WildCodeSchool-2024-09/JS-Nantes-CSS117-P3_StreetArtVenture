
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";

import { Connexion } from "../components/Connexion/Connexion";
import LeaderboardPage from "../pages/leaderboard/leaderboardPage";


const routes = [

  {
    path: "/register",
    element: <InscriptionForm />,
  },
  {
    path: "/connexion",
    element: <Connexion />,


   

  },



];

export default routes;
