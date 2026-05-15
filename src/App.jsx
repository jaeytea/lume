import { useState } from "react";
import "./styles/globals.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GlobalLoader from "./components/GlobalLoader";
import Stars from "./components/Stars";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData, guestMode = false) => {
    setUser(userData);
    setIsGuest(guestMode);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setIsGuest(false);
    setUser(null);
  };

  return (
    <>
      {loggedIn ? (
        <HomePage onLogout={handleLogout} isGuest={isGuest} user={user} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
