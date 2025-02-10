import { Connexion } from "../components/Connexion/Connexion";
import { Home } from "../components/Home/Home";
import { AdminValidationBoard } from "../components/adminValidationCard/adminValidationCard";
import Gallery from "../components/gallery/Gallery";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
import Lost from "../components/lost/Lost";
import AdminArtPieceListPage from "../pages/adminArtPieceList/AdminArtPieceListPage";
import LeaderboardPage from "../pages/leaderboard/LeaderboardPage";
import MapPage from "../pages/map/MapPage";
import ProfilePage from "../pages/profile/ProfilePage";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    path: "/register",
    element: <InscriptionForm />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
    ],
  },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/adminvalidation",
        element: <AdminValidationBoard />,
      },
      {
        path: "/statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/lost",
        element: <Lost />,
      },
      {
        path: "/art-piece-list",
        element: <AdminArtPieceListPage />,
      },
    ],
  },
];

export default routes;
