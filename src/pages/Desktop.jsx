import { useEffect, useRef, useState } from "react";
import { Dock } from "../components/Dock";
import { Application } from "../components/Application";
import { useFocus } from "../context/useFocus";
import { useRunningApps } from "../context/useRunningApps";
import { arrangeDesktopIcons, appOrFile, isEmpty } from "../service";
import { useSize } from "../hooks/useSize";
import { DesktopProvider } from "../context/DesktopContext";
import { Icon } from "../components/Icon";

export function Desktop() {
  const namespace = "desktop";
  const desktopRef = useRef(null);
  const desktopGridRef = useRef(null);
  const { width: desktopGridWidth, height: desktopGridHeight } = useSize(desktopGridRef); //prettier-ignore
  const { width: desktopWidth, height: desktopHeight } = useSize(desktopRef);
  const { focused, setFocused } = useFocus({ namespace: namespace, id: null });
  const [desktopEntities, setDesktopEntities] = useState();
  const { runningApps, runApp } = useRunningApps();

  let clickCount = 0;
  let clickTimeout = null;

  function handleClick(id = null) {
    if (!id) setFocused({ namespace: namespace, id: null });

    let timeout = 150;
    clickCount++;

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    clickTimeout = setTimeout(() => {
      if (clickCount === 1) {
        handleSingleClick(id);
      } else if (clickCount === 2) {
        handleDoubleClick(id);
      }
      clickCount = 0;
      clickTimeout = null;
    }, timeout);

    function handleSingleClick(id) {
      setFocused({ namespace: namespace, id: id });
    }

    function handleDoubleClick(id) {
      const { app, data } = appOrFile(id);
      runApp(app, data);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setDesktopEntities(() =>
        arrangeDesktopIcons(desktopGridWidth, desktopGridHeight)
      );
    }, 250);
  }, [desktopGridWidth, desktopGridHeight]);

  return (
    <>
      <div ref={desktopRef} id="desktop">
        <DesktopProvider value={{ desktopWidth, desktopHeight }}>
          <div id="apps">
            {Array.from(runningApps).length > 0 ? (
              runningApps.map((runningApp, key) => {
                return <Application key={key} runningApp={runningApp} />;
              })
            ) : (
              <></>
            )}
          </div>
          <div ref={desktopGridRef} id="icons-grid">
            {desktopEntities?.map((entity, key) => {
              return isEmpty(entity) ? (
                <div
                  className="icon-cell"
                  key={key}
                  onClick={() => handleClick()}
                ></div>
              ) : (
                <Icon
                  key={`icon${key}`}
                  entityId={entity.id}
                  focused={
                    namespace === focused.namespace && focused.id === entity.id
                  }
                  xClass={`full`}
                  onClick={() => handleClick(entity.id)}
                />
              );
            })}
          </div>
        </DesktopProvider>
      </div>
      <Dock />
    </>
  );
}
