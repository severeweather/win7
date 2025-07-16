import { useEffect, useReducer, useRef, useState } from "react";
import { useRunningApps } from "../context/useRunningApps";
import { useDesktop } from "../context/DesktopContext";
import { useFocus } from "../context/useFocus";

const getRandomCoord = () => Math.floor(Math.random() * 301) + 300;

export function Window({ children, footer, header, appData, minW, minH }) {
  const { desktopWidth, desktopHeight } = useDesktop();
  const { setRunningApps } = useRunningApps();
  const { focusedId, setFocusedId } = useFocus(appData.app.app);
  const windowRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [scale, setScale] = useState({ w: 900, h: 700 });
  const [minScale, setMinScale] = useState({ w: minW, h: minH });
  const [position, setPosition] = useState({
    x: getRandomCoord(),
    y: getRandomCoord(),
  });

  function terminateWindow() {
    setRunningApps((prev) =>
      prev.filter((runningApp) => runningApp.app !== appData.app.id)
    );
  }

  function handleDrag(e) {
    const initX = e.clientX;
    const initY = e.clientY;
    const windowX = windowRef.current.offsetLeft;
    const windowY = windowRef.current.offsetTop;

    function mouseMove(e) {
      const dx = e.clientX - initX;
      const dy = e.clientY - initY;

      setPosition({
        x:
          windowX + dx < scale.w / -2
            ? scale.w / -2
            : windowX + dx > desktopWidth - scale.w / 2
            ? desktopWidth - scale.w / 2
            : windowX + dx,
        y:
          windowY + dy < 0
            ? 0
            : windowY + dy > desktopHeight - scale.h / 2
            ? desktopHeight - scale.h / 2
            : windowY + dy,
      });
    }

    function mouseUp() {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function handleResize(e, direction) {
    const initX = e.clientX;
    const initY = e.clientY;
    const windowW = windowRef.current.offsetWidth;
    const windowH = windowRef.current.offsetHeight;
    const windowY = windowRef.current.offsetTop;
    const windowX = windowRef.current.offsetLeft;

    function mouseMove(e) {
      const dx = e.clientX - initX;
      const dy = e.clientY - initY;

      switch (direction) {
        case "right":
          setScale((prev) => {
            return { h: prev.h, w: windowW + dx };
          });
          break;
        case "bottom":
          setScale((prev) => {
            return { w: prev.w, h: windowH + dy };
          });
          break;
        case "top":
          setPosition((prev) => {
            return {
              x: prev.x,
              y: scale.h <= minScale.h ? windowY : windowY + dy,
            };
          });
          setScale((prev) => {
            return {
              w: prev.w,
              h: windowH - dy < minScale.h ? minScale.h : windowH - dy,
            };
          });
          break;
        case "left":
          setPosition((prev) => {
            return {
              y: prev.y,
              x: windowX + dx,
            };
          });
          setScale((prev) => {
            return {
              h: prev.h,
              w: windowW - dx < minScale.w ? minScale.w : windowW - dx,
            };
          });
          break;
        case "topright":
          setPosition((prev) => {
            return {
              x: prev.x,
              y: windowH === minScale.h ? windowY : windowY + dy,
            };
          });
          setScale({
            w: windowW + dx,
            h: windowH - dy < minScale.h ? minScale.h : windowH - dy,
          });
          break;
        case "bottomright":
          setScale({ w: windowW + dx, h: windowH + dy });
          break;
        case "bottomleft":
          setPosition((prev) => {
            return {
              y: prev.y,
              x: windowX + dx,
            };
          });
          setScale({ h: windowH + dy, w: windowW - dx });
          break;
        case "topleft":
          setPosition({
            x: windowX + dx,
            y: windowY + dy,
          });
          setScale({
            w: windowW - dx,
            h: windowH - dy < minScale.h ? minScale.h : windowH - dy,
          });
          break;
      }
    }

    function mouseUp() {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function handleMaximize() {
    setScale({ w: desktopWidth, h: desktopHeight });
    setPosition({ x: 0, y: 0 });
  }

  useEffect(() => {
    console.log(position);
    console.log(scale);
  }, [position]);

  let sizepos = {
    top: position?.y,
    left: position?.x,
    width: scale?.w,
    height: scale?.h,
    minWidth: minScale?.w,
    minHeight: minScale?.h,
  };

  return (
    <div
      ref={windowRef}
      className={`window ${minimized ? "minimized" : ""}`}
      style={sizepos}
      onClick={() => setFocusedId(appData.app.id)}
    >
      <nav
        className="window-nav drag-zone"
        onMouseDown={(e) => handleDrag(e)}
        onDoubleClick={handleMaximize}
      >
        <span className="window-title">
          {appData.data
            ? appData.data.name
              ? `${appData.data.name} - ${appData.app.name}`
              : `Untitled - ${appData.app.name}`
            : appData.app.name}
        </span>
        <section className="min-max-close">
          <button
            type="button"
            className="minimize"
            onClick={() => setMinimized(true)}
          ></button>
          <button
            type="button"
            className="maximize"
            onClick={handleMaximize}
          ></button>
          <button
            type="button"
            className="close"
            onClick={terminateWindow}
          ></button>
        </section>
      </nav>

      <>{header}</>
      <section className="window-content">{children}</section>
      <>{footer}</>

      <div /* resize window */>
        <div
          className="resizer top"
          onMouseDown={(e) => handleResize(e, "top")}
        ></div>
        <div
          className="resizer right"
          onMouseDown={(e) => handleResize(e, "right")}
        ></div>
        <div
          className="resizer bottom"
          onMouseDown={(e) => handleResize(e, "bottom")}
        ></div>
        <div
          className="resizer left"
          onMouseDown={(e) => handleResize(e, "left")}
        ></div>
        <div
          className="resizer topright"
          onMouseDown={(e) => handleResize(e, "topright")}
        ></div>
        <div
          className="resizer bottomright"
          onMouseDown={(e) => handleResize(e, "bottomright")}
        ></div>
        <div
          className="resizer bottomleft"
          onMouseDown={(e) => handleResize(e, "bottomleft")}
        ></div>
        <div
          className="resizer topleft"
          onMouseDown={(e) => handleResize(e, "topleft")}
        ></div>
      </div>
    </div>
  );
}
