import { createContext, useContext, useEffect, useState } from "react";

const RunningApps = createContext();

export function RunningAppsProvider({ children }) {
  const [runningApps, setRunningApps] = useState([]);

  useEffect(() => {
    console.log("running apps:", runningApps);
  }, [runningApps]);

  return (
    <RunningApps.Provider value={{ runningApps, setRunningApps }}>
      {children}
    </RunningApps.Provider>
  );
}

export function useRunningApps() {
  return useContext(RunningApps);
}
