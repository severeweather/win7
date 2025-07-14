import { useEffect, useRef, useState } from "react";
import { Dock } from "../components/Dock";
import { Application } from "../components/Application";
import { useFocus } from "../context/useFocus";
import { useRunningApps } from "../context/useRunningApps";
import { DesktopIcon } from "../components/DesktopIcon";
import { arrangeIcons, appOrFile } from "../service";
import { useSize } from "../hooks/useSize";
import { DesktopProvider } from "../context/DesktopContext";

export function Desktop() {
  const desktopRef = useRef(null);
  const iconGridRef = useRef(null);
  const { width: iconGridW, height: iconGridH } = useSize(iconGridRef);
  const { width: desktopWidth, height: desktopHeight } = useSize(desktopRef);
  const { focusedId, setFocusedId } = useFocus();
  const [icons, setIcons] = useState();
  const { runningApps, runApp } = useRunningApps();

  let clickCount = 0;
  let clickTimeout = null;

  function handleClick(icon) {
    function handleSingleClick(icon) {
      return icon ? setFocusedId(icon.id) : setFocusedId("");
    }

    function handleDoubleClick(icon) {
      const { app, data } = appOrFile(icon);
      runApp(app, data);
    }

    let timeout = 150;
    clickCount++;

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    clickTimeout = setTimeout(() => {
      if (clickCount === 1) {
        handleSingleClick(icon);
      } else if (clickCount === 2) {
        handleDoubleClick(icon);
      }
      clickCount = 0;
      clickTimeout = null;
    }, timeout);
  }

  useEffect(() => {
    setTimeout(() => {
      setIcons(() => arrangeIcons(iconGridW, iconGridH));
    }, 250);
  }, [iconGridW, iconGridH]);

  return (
    <>
      <div ref={desktopRef} id="desktop">
        <DesktopProvider value={{ desktopWidth, desktopHeight }}>
          <div id="apps">
            {Array.from(runningApps).length > 0 ? (
              Array.from(runningApps).map((runningApp, key) => {
                return <Application key={key} runningApp={runningApp} />;
              })
            ) : (
              <></>
            )}
          </div>
          <div ref={iconGridRef} id="icons-grid">
            {icons ? (
              Array.from(icons).map((icon, key) => (
                <div
                  className={`icon-cell ${
                    focusedId && focusedId === icon.id ? "focused" : ""
                  }`}
                  key={key}
                  onClick={() => handleClick(icon)}
                >
                  {Object.keys(icon).length > 0 ? (
                    <DesktopIcon icon={icon} />
                  ) : null}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </DesktopProvider>
      </div>
      <Dock />
    </>
  );
}
