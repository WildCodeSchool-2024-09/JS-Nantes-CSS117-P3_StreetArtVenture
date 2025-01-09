import { Connexion } from "../components/Connexion/Connexion";
import { Home } from "../components/Home/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/connexion",
    element: <Connexion />,

    /***** EXEMPLE DE ROUTE *****/
    /*path: "/",
    element: <HomePage />,*/
  },
];

export default routes;
