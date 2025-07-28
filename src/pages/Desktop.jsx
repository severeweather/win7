import { useEffect, useRef, useState } from "react";
import { Dock } from "../components/Dock";
import { Application } from "../components/Application";
import { useFocus } from "../context/useFocus";
import { useRunningApps } from "../context/useRunningApps";
import { arrangeDesktopIcons, appOrFile, isEmpty } from "../service";
import { useSize } from "../hooks/useSize";
import { Icon } from "../components/Icon";
import { useClick } from "../hooks/useClick";

import { createContext, useContext } from "react";

const DesktopContext = createContext();

export const useDesktop = () => useContext(DesktopContext);

export function DesktopProvider({ children, value }) {
  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}

export function Desktop() {
  const namespace = "desktop";
  const desktopRef = useRef(null);
  const desktopGridRef = useRef(null);
  const { width: desktopGridWidth, height: desktopGridHeight } = useSize(desktopGridRef); //prettier-ignore
  const { width: desktopWidth, height: desktopHeight } = useSize(desktopRef);
  const { focused } = useFocus({ namespace: namespace, id: null });
  const [desktopEntities, setDesktopEntities] = useState();
  const { runningApps, runApp } = useRunningApps();
  const handleClick = useClick();

  function doubleClick(id) {
    const { app, data } = appOrFile(id);
    runApp(app, data);
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
                  onClick={() =>
                    handleClick({
                      id: null,
                      namespace: namespace,
                      doubleClick: null,
                    })
                  }
                ></div>
              ) : (
                <Icon
                  key={`icon${key}`}
                  entityId={entity.id}
                  focused={
                    namespace === focused.namespace && focused.id === entity.id
                  }
                  xClass={`white-text`}
                  onClick={() =>
                    handleClick({
                      id: entity.id,
                      namespace: namespace,
                      doubleClick: () => doubleClick(entity.id),
                    })
                  }
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
