import App from "../App";
import { Connexion } from "../components/Connexion/Connexion";

const routes = [
  {
    path: "/",
    element: <App />,
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
