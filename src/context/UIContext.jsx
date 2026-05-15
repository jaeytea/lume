import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const showLoader = (text = "Loading...") => {
    setLoadingText(text);
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return (
    <UIContext.Provider
      value={{ loading, loadingText, showLoader, hideLoader }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
