import { useEffect, useState } from "react";
import { StartButton } from "../components/StartButton";
import { userPreferences } from "../userPreferences";
import { DockIcon } from "../components/DockIcon";
import { useRunningApps } from "../context/useRunningApps";
import { appOrFile } from "../service";

export function Dock(props) {
  const { runningApps, runApp } = useRunningApps();
  const [dockIcons, setDockIcons] = useState();

  function handleClick(icon) {
    const { app, data } = appOrFile(icon);
    runApp(app, data);
  }

  useEffect(() => {
    setDockIcons(userPreferences.dockIcons);
  }, [userPreferences.dockIcons]);

  return (
    <footer id="dock">
      <StartButton />
      <section id="dock-icons">
        {dockIcons ? (
          Array.from(dockIcons).map((dockIcon, key) => {
            return (
              <DockIcon
                running={
                  Array.from(runningApps).find(
                    (runningApp) => runningApp.app === dockIcon.represents
                  )
                    ? true
                    : false
                }
                key={key}
                icon={dockIcon}
                onClick={handleClick}
              />
            );
          })
        ) : (
          <></>
        )}
      </section>
    </footer>
  );
}
