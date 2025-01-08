import App from "../App";

import InscriptionForm from "../components/inscriptionForm/InscriptionForm";

import { Connexion } from "../components/Connexion/Connexion";


const routes = [

  {
    path: "/register",
    element: <InscriptionForm />,

    path: "/connexion",
    element: <Connexion />,

   

  },
];

export default routes;
