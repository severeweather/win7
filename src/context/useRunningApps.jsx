import { createContext, useContext, useEffect, useState } from "react";

const RunningApps = createContext();

export function RunningAppsProvider({ children }) {
  const [runningApps, setRunningApps] = useState([
    { id: "", app: "photo-viewer", data: "file-002" },
  ]);

  function runApp(app, data) {
    setRunningApps((prev) =>
      prev.find((entry) => entry.app === app)
        ? prev.map((entry) =>
            entry.app === app ? { ...entry, app: entry.app, data: data } : entry
          )
        : [
            ...prev,
            {
              id: `window-${Math.floor(Math.random() * 900) + 100}`,
              app: app,
              data: data,
            },
          ]
    );
  }

  useEffect(() => {
    console.log("runningApps", runningApps);
  }, [runningApps]);

  return (
    <RunningApps.Provider value={{ runningApps, setRunningApps, runApp }}>
      {children}
    </RunningApps.Provider>
  );
}

export function useRunningApps() {
  return useContext(RunningApps);
}
