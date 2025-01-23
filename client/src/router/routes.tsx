import { Connexion } from "../components/Connexion/Connexion";

import { Home } from "../components/Home/Home";
import { AdminValidationBoard } from "../components/adminValidationCard/adminValidationCard";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";

import Gallery from "../components/gallery/Gallery";
import Lost from "../components/lost/Lost";
import ProfilePage from "../pages/profile/ProfilePage";
import MapPage from "../pages/map/MapPage";
import LeaderboardPage from "../pages/leaderboard/LeaderboardPage";

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
    path: "/lost",
    element: <Lost />,
  },
];

export default routes;
