import { useRef, useState } from "react";
import { useDesktop } from "../../pages/Desktop";
import { useFocus } from "../../context/useFocus";
import { useRunningApps } from "../../context/useRunningApps";
import { WindowControls } from "./WindowControls";
import { ResizeHandles } from "./ResizeHandles";
import { useClippy } from "../Clippy";

export function Window({
  children,
  header,
  footer,
  data,
  title,
  minW = 0,
  minH = 0,
}) {
  const namespace = "openWindows";
  const windowRef = useRef(null);
  const { callClippy } = useClippy();
  const { setRunningApps } = useRunningApps();
  const { desktopWidth, desktopHeight } = useDesktop();
  const { focused, setFocused } = useFocus({ namespace: namespace, id: data.id }); // prettier-ignore
  const [scale, setScale] = useState({ w: 900, h: 700 });
  const [position, setPosition] = useState({ x: 200, y: 200 }); // prettier-ignore
  const [minScale] = useState({ w: minW, h: minH });
  let dimensions = {
    top: position?.y,
    left: position?.x,
    width: scale?.w,
    height: scale?.h,
    minWidth: minScale?.w,
    minHeight: minScale?.h,
  };

  //
  // function terminateWindow() {
  //   setRunningApps((prev) =>
  //     prev.filter((runningApp) => runningApp.app.id !== appData?.app.id)
  //   );
  //   setFocused({ namespace: "desktop", id: null });
  // }
  //
  // function handleMaximize() {
  //   setScale({ w: desktopWidth - 16, h: desktopHeight - 67 });
  //   setPosition({ x: 8, y: 8 });
  // }
  //

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

  return (
    <div
      ref={windowRef}
      style={dimensions}
      // onClick={() => setFocused({ namespace: namespace, id: appData.app.id })}
      // className={`window ${ focused.namespace === namespace && focused.id === appData.app.id ? "focused" : "" }`} /* prettier-ignore */
      className={`window idle`}
    >
      <nav
        className="window__navigation"
        onMouseDown={(e) => handleDrag(e)}
        // onDoubleClick={handleMaximize}
      >
        <div className="window__icon-and-title">
          <div className="window__icon-wrapper">
            {data.icon && (
              <img src={data.icon} className="window__icon" alt="" />
            )}
          </div>
          <span className="window__title">{title}</span>
        </div>

        <WindowControls />
      </nav>

      <header className="window__header">{header}</header>
      <section className="window__content">{children}</section>
      <footer className="window__footer">{footer}</footer>

      <ResizeHandles handler={handleResize} component={windowRef.current} />
    </div>
  );
}
