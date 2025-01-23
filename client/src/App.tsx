import "./global.css";
import Header from "./components/Header/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserProvider>
  );
}

export default App;
