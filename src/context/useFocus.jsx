import { createContext, useContext, useEffect, useState } from "react";

const FocusContext = createContext();

export function FocusProvider({ children }) {
  const [focusedId, setFocusedId] = useState(null);

  useEffect(() => {
    console.log("focused:", focusedId);
  }, [focusedId]);
  return (
    <FocusContext.Provider value={{ focusedId, setFocusedId }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  return useContext(FocusContext);
}
