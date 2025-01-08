import App from "../App";

import { Connexion } from "../components/Connexion/Connexion";

import InscriptionForm from "../components/inscriptionForm/InscriptionForm";

const routes = [
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    /***** EXEMPLE DE ROUTE *****/
    /*path: "/",
    element: <HomePage />,*/
    path: "/register",
    element: <InscriptionForm />,
  },
];

export default routes;
