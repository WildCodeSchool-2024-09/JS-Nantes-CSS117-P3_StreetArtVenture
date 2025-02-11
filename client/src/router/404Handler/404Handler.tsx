import { useNavigate } from "react-router-dom";
import useToast from "../../utils/useToast";
import "./404Handler.css";
import { useEffect } from "react";

const NoRouteHandler = () => {
  const { failed } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    failed("Page non trouvée");
    setTimeout(() => navigate("/"), 3000);
  }, [navigate, failed]);

  return (
    <main className="no-route-main-container montserrat">
      <h1>404 - Page non trouvée</h1>
      <p>Vous allez être redirigé...</p>
    </main>
  );
};

export default NoRouteHandler;
