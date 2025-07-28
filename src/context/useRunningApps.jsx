import { createContext, useContext, useEffect, useState } from "react";
import { useFocus } from "./useFocus";

const RunningApps = createContext();

export function RunningAppsProvider({ children }) {
  const [runningApps, setRunningApps] = useState([
    // {
    //   app: {
    //     id: "photo-viewer",
    //     type: "app",
    //     name: "Windows Photo Viewer",
    //     iconSrc: "/pictures-icon.svg",
    //   },
    //   data: {},
    //   id: "window-750",
    // },
  ]);
  const { setFocused } = useFocus();

  function runApp(app, data) {
    const windowId = `window-${Math.floor(Math.random() * 900) + 100}`;
    setRunningApps((prev) =>
      prev.find((entry) => entry.app === app)
        ? prev.map((entry) =>
            entry.app === app ? { ...entry, app: entry.app, data: data } : entry
          )
        : [
            ...prev,
            {
              id: windowId,
              app: app,
              data: data,
            },
          ]
    );

    setFocused({ namespace: "openWindows", id: app.id });
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
