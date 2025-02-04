import "./global.css";
import Header from "./components/Header/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer position="bottom-right" />
      </UserProvider>
    </>
  );
}

export default App;
