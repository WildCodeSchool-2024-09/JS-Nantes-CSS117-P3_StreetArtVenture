import App from "../App";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";
import { Connexion } from "../components/Connexion/Connexion";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <InscriptionForm />,

    path: "/connexion",
    element: <Connexion />,

    /***** EXEMPLE DE ROUTE *****/
    /*path: "/",
    element: <HomePage />,*/
  },
];

export default routes;
