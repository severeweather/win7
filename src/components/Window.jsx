import { useEffect, useRef, useState } from "react";
import { useRunningApps } from "../context/useRunningApps";
import { useDesktop } from "../pages/Desktop";
import { useFocus } from "../context/useFocus";

export function Window({
  allowTitle = true,
  children,
  footer,
  header,
  appData,
  minW,
  minH,
}) {
  const namespace = "openWindows";
  const { desktopWidth, desktopHeight } = useDesktop();
  const { setRunningApps } = useRunningApps();
  const { focused, setFocused } = useFocus({
    namespace: namespace,
    id: appData.app.id,
  });
  const windowRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [scale, setScale] = useState({ w: 900, h: 700 });
  const [minScale] = useState({ w: minW || 800, h: minH || 500 });
  const [position, setPosition] = useState({
    x: 200,
    y: 200,
  });

  function terminateWindow() {
    setRunningApps((prev) =>
      prev.filter((runningApp) => runningApp.app.id !== appData?.app.id)
    );
    setFocused({ namespace: "desktop", id: null });
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
        case "top": {
          const newHeightTop = windowH - dy;
          if (newHeightTop >= minScale.h) {
            setPosition((prev) => ({
              x: prev.x,
              y: windowY + dy,
            }));
            setScale((prev) => ({
              w: prev.w,
              h: newHeightTop,
            }));
          } else {
            setScale((prev) => ({
              w: prev.w,
              h: minScale.h,
            }));
          }
          break;
        }
        case "left": {
          const newWidthLeft = windowW - dx;
          if (newWidthLeft >= minScale.w) {
            setPosition((prev) => ({
              y: prev.y,
              x: windowX + dx,
            }));
            setScale((prev) => ({
              h: prev.h,
              w: newWidthLeft,
            }));
          } else {
            setScale((prev) => ({
              h: prev.h,
              w: minScale.w,
            }));
          }
          break;
        }
        case "topright": {
          const newHeightTR = windowH - dy;
          setPosition((prev) => ({
            x: prev.x,
            y: newHeightTR >= minScale.h ? windowY + dy : prev.y,
          }));
          setScale({
            w: windowW + dx,
            h: newHeightTR >= minScale.h ? newHeightTR : minScale.h,
          });
          break;
        }
        case "bottomright":
          setScale({ w: windowW + dx, h: windowH + dy });
          break;
        case "bottomleft": {
          const newWidthBL = windowW - dx;
          setPosition((prev) => ({
            y: prev.y,
            x: newWidthBL >= minScale.w ? windowX + dx : prev.x,
          }));
          setScale({
            h: windowH + dy,
            w: newWidthBL >= minScale.w ? newWidthBL : minScale.w,
          });
          break;
        }
        case "topleft": {
          const newWidthTL = windowW - dx;
          const newHeightTL = windowH - dy;
          setPosition((prev) => ({
            x: newWidthTL >= minScale.w ? windowX + dx : prev.x,
            y: newHeightTL >= minScale.h ? windowY + dy : prev.y,
          }));
          setScale({
            w: newWidthTL >= minScale.w ? newWidthTL : minScale.w,
            h: newHeightTL >= minScale.h ? newHeightTL : minScale.h,
          });
          break;
        }
        default:
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
    setScale({ w: desktopWidth - 16, h: desktopHeight - 67 });
    setPosition({ x: 8, y: 8 });
  }

  useEffect(() => {
    console.log(position);
    console.log(scale);
  }, [position, scale]);

  let sizepos = {
    top: position?.y,
    left: position?.x,
    width: scale?.w,
    height: scale?.h,
    minWidth: minScale?.w,
    minHeight: minScale?.h,
  };

  const windowTitle = `${
    appData.data
      ? appData.data.name
        ? `${appData.data.name} - ${appData.app.name}`
        : `Untitled - ${appData.app.name}`
      : appData.app.name
  }`;

  return (
    <div
      ref={windowRef}
      className={`window ${minimized ? "minimized" : ""} ${
        focused.namespace === namespace && focused.id === appData.app.id
          ? "focused"
          : ""
      }`}
      style={sizepos}
      onClick={() => setFocused({ namespace: namespace, id: appData.app.id })}
    >
      <nav
        className="window-nav drag-zone"
        onMouseDown={(e) => handleDrag(e)}
        onDoubleClick={handleMaximize}
      >
        {allowTitle ? (
          <span className="window-title">
            <img
              src={appData.app.iconSrc}
              alt={`${appData.data?.name} title icon`}
            />
            {windowTitle}
          </span>
        ) : (
          <></>
        )}
        <section className="min-max-close">
          <button
            type="button"
            className="minimize"
            onClick={() => setMinimized(true)}
          >
            <img src="/minimize.svg" alt="minimize" />
          </button>
          <button type="button" className="maximize" onClick={handleMaximize}>
            <img src="/maximize.svg" alt="maximize" />
          </button>
          <button type="button" className="close" onClick={terminateWindow}>
            <img src="/close.svg" alt="close" />
          </button>
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
