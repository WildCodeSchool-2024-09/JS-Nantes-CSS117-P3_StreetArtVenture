import { Connexion } from "../components/Connexion/Connexion";
import Gallery from "../components/gallery/gallery";
import { AdminValidationBoard } from "../components/adminValidationCard/adminValidationCard";
import { Home } from "../components/Home/Home";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
import LeaderboardPage from "../pages/leaderboard/leaderboardPage";
import MapPage from "../pages/map/mapPage";
import ProfilePage from "../pages/profile/profilePage";

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
];

export default routes;
