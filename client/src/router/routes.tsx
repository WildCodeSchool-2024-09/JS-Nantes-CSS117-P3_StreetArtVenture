import { Connexion } from "../components/Connexion/Connexion";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
import LeaderboardPage from "../pages/leaderboard/leaderboardPage";
import MapPage from "../pages/map/mapPage";

import Gallery from "../components/gallery/gallery";

const routes = [
  {
    path: "/map",
    element: <MapPage />,
  },
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
    path: "/gallery",
    element: <Gallery />,
  },
];

export default routes;
