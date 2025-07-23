import { createContext, useContext, useEffect, useState } from "react";

const FocusContext = createContext();

export function FocusProvider({ children }) {
  const [focused, setFocused] = useState({
    namespace: null,
    id: null,
  });

  useEffect(() => {
    console.log("focused:", focused);
  }, [focused]);

  return (
    <FocusContext.Provider value={{ focused, setFocused }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  return useContext(FocusContext);
}
