import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  useEffect(() => {
    async function checkIsAuth() {
      const localStorageToken = localStorage.getItem("authToken");
      if (!localStorageToken) return setIsAuth(false);
      const req = await fetch(
        `${import.meta.env.VITE_API_URL}/user/verifyToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorageToken }),
        },
      );
      const result = await req.json();
      if (!result || !result.decodedToken) return setIsAuth(false);
      setIsAuth(true);
    }
    checkIsAuth();
  }, []);

  if (isAuth === true) return <Outlet />;
  if (isAuth === false) return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
