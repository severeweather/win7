import { useEffect, useState } from "react";
import { StartButton } from "../components/StartButton";
import { userPreferences } from "../userPreferences";
import { DockIcon } from "../components/DockIcon";
import { useRunningApps } from "../context/useRunningApps";
import { apps } from "../apps";
import { files } from "../files";
import { settings } from "../settings";

export function Dock(props) {
  const { runningApps, runApp } = useRunningApps();
  const [dockIcons, setDockIcons] = useState();

  function appOrFile(icon) {
    let represents = [apps, files]
      .flat()
      .find((entry) => entry.id === icon.represents);

    if (represents.type === "app") {
      return { app: represents.id, data: null };
    }

    let defaultApp =
      settings.fileTypes.find((entry) => entry.type === represents.type)
        ?.defaultApp || null;

    return { app: defaultApp, data: represents };
  }

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
            return <DockIcon key={key} icon={dockIcon} onClick={handleClick} />;
          })
        ) : (
          <></>
        )}
      </section>
    </footer>
  );
}
