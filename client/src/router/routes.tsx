import { Connexion } from "../components/Connexion/Connexion";
import { AdminValidation } from "../components/adminValidationCard/adminValidationCard";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
import LeaderboardPage from "../pages/leaderboard/leaderboardPage";
import MapPage from "../pages/map/mapPage";
import ProfilePage from "../pages/profile/profilePage";
import Gallery from "../components/gallery/gallery";

const routes = [
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
    element: <AdminValidation />,
},
  {
    path: "/gallery",
    element: <Gallery />,
  },
];

export default routes;
