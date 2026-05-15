import { useState } from "react";
import "./styles/globals.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GlobalLoader from "./components/GlobalLoader";
import Stars from "./components/Stars";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [loaderText, setLoaderText] = useState("Loading...");
  // const [showStars, setShowStars] = useState(false);

  return (
    <>{loggedIn ? <HomePage /> : <LoginPage onLogin={setLoggedIn(true)} />}</>
  );
}

export default App;
