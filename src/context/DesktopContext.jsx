import { createContext, useContext } from "react";

const DesktopContext = createContext();

export const useDesktop = () => useContext(DesktopContext);

export function DesktopProvider({ children, value }) {
  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}
