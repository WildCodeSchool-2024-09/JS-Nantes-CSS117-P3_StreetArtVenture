import { Connexion } from "../components/Connexion/Connexion";
import { Home } from "../components/Home/Home";

import Gallery from "../components/gallery/gallery";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
import LeaderboardPage from "../pages/leaderboard/leaderboardPage";
import MapPage from "../pages/map/mapPage";
import ProfilePage from "../pages/profile/profilePage";
import StatisticsPage from "../pages/statistics/StatisticsPage";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
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
  {
    path: "/statistics",
    element: <StatisticsPage />,
  },
];

export default routes;
