import App from "../App";
import InscriptionForm from "../components/inscriptionForm/InscriptionForm";

const routes = [
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/register",
		element: <InscriptionForm />,
	},
];

export default routes;
