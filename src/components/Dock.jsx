import { useEffect, useState } from "react";
import { StartButton } from "../components/StartButton";
import { userPreferences } from "../userPreferences";
import { DockIcon } from "../components/DockIcon";
import { useRunningApps } from "../context/useRunningApps";
import { appOrFile } from "../service";

function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  });

  const pad = (n) => String(n).padStart(2, "0");
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  const days = pad(now.getDate());
  const months = pad(now.getMonth() + 1);
  const years = now.getFullYear();

  return (
    <div className="datetime">
      <div className="datetime__time">{`${hours}:${minutes}:${seconds}`}</div>
      <div className="datetime__date">{`${days}/${months}/${years}`}</div>
    </div>
  );
}

function NotificationArea() {
  function NotificationIcon({ src }) {
    return (
      <div className="notification-area__icon-wrapper">
        <img className="notification-area__icon" src={src} alt="" />
      </div>
    );
  }

  return (
    <div className="notification-area">
      <NotificationIcon src="/notificationarea-report.svg" />
      <NotificationIcon src="/notificationarea-volume.svg" />
      <NotificationIcon src="/notificationarea-internet.svg" />
    </div>
  );
}

function MinimizeAll() {
  return <div className="minimize-all"></div>;
}

export function Dock() {
  const { runningApps, runApp } = useRunningApps();
  const [dockIcons, setDockIcons] = useState();

  function handleClick(icon) {
    const { app, data } = appOrFile(icon);
    runApp(app, data);
  }

  useEffect(() => {
    setDockIcons(userPreferences.dockIcons);
  }, []);

  return (
    <footer id="dock">
      <StartButton />
      <section id="dock-icons">
        {dockIcons?.map((dockIcon, key) => {
          return (
            <DockIcon
              key={key}
              running={
                runningApps.find(
                  (runningApp) => runningApp.app.id === dockIcon.shortcutFor
                )
                  ? true
                  : false
              }
              icon={dockIcon}
              onClick={() => handleClick(dockIcon.shortcutFor)}
            />
          );
        })}
      </section>
      <NotificationArea />
      <DateTime />
      <MinimizeAll />
    </footer>
  );
}
