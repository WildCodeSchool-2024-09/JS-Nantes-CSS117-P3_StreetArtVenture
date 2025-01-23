import { Connexion } from "../components/Connexion/Connexion";
import { Home } from "../components/Home/Home";
import { AdminValidationBoard } from "../components/adminValidationCard/adminValidationCard";
import Gallery from "../components/gallery/Gallery";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
import Lost from "../components/lost/Lost";
import LeaderboardPage from "../pages/leaderboard/LeaderboardPage";
import MapPage from "../pages/map/MapPage";
import ProfilePage from "../pages/profile/ProfilePage";
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
    path: "/adminvalidation",
    element: <AdminValidationBoard />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/statistics",
    element: <StatisticsPage />,
  },
  {
    path: "/lost",
    element: <Lost />,
  },
];

export default routes;
