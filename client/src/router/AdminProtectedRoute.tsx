import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const [isAdmin, setAuth] = useState<boolean | null>(null);
  useEffect(() => {
    async function checkIsAdmin() {
      const localStorageToken = localStorage.getItem("authToken");
      if (!localStorageToken) return setAuth(false);
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
      if (!result || !result.decodedToken || !result.decodedToken.isAdmin)
        return setAuth(false);
      setAuth(true);
    }
    checkIsAdmin();
  }, []);

  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }
  if (isAdmin === true) return <Outlet />;
};

export default AdminProtectedRoute;
