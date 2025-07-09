import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { Dock } from "../components/Dock";
import { ContextMenu } from "../components/ContextMenu";
import { emulate_icons } from "../temp";
import { Application } from "../components/Application";
import { useFocus } from "../context/useFocus";
import { useRunningApps } from "../context/useRunningApps";

function useResize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    // console.log(ref.current);

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);
  return size;
}

function arrangeIcons(w = 0, h = 0) {
  if (!w || !h) return;

  setTimeout(() => {}, 1);
  const iconWxH = 96;
  const qcols = Math.floor(w / iconWxH);
  const qrows = Math.floor(h / iconWxH);
  const kwidth = (iconWxH * qcols) / 100;
  const kheight = (iconWxH * qrows) / 100;
  const range_x = [];
  const range_y = [];

  for (let i = 0; i < qcols; i++) {
    range_x.push([i * iconWxH, (i + 1) * iconWxH]);
  }
  for (let i = 0; i < qrows; i++) {
    range_y.push([i * iconWxH, (i + 1) * iconWxH]);
  }

  // console.log("range_x:", range_x);
  // console.log("range_y:", range_y);

  const icons = Array.from({ length: qcols * qrows }).map(() => {
    return {};
  });

  console.log("icons:", icons);

  emulate_icons.forEach((icon) => {
    const calibrated_x = icon.x * kwidth;
    const calibrated_y = icon.y * kheight;

    let target_column = null;
    let target_row = null;

    for (let i = 0; i < range_x.length; i++) {
      if (calibrated_x >= range_x[i][0] && calibrated_x < range_x[i][1]) {
        target_column = i;
        break;
      }
    }

    for (let j = 0; j < range_y.length; j++) {
      if (calibrated_y >= range_y[j][0] && calibrated_y < range_y[j][1]) {
        target_row = j;
        break;
      }
    }

    if (target_row !== null && target_column !== null) {
      const index = target_row * qcols + target_column;
      icons[index] = icon;
    }
  });

  return icons;
}

export function Desktop() {
  const iconGridRef = useRef(null);
  const { width, height } = useResize(iconGridRef);
  const { focusedId, setFocusedId } = useFocus();
  const { runningApps, setRunningApps } = useRunningApps();

  const [icons, setIcons] = useState();
  const [contextMenu, setContextMenu] = useState();
  // const [runningApps, setRunningApps] = useState([])
  // const [runningApps, setRunningApps] = useState([
  //   {
  //     id: "app-session-43c56079-b157-4950-9005-cb4dd874f176",
  //     x: 268,
  //     y: 181,
  //     data: {
  //       extention: ".png",
  //       id: "file-1",
  //       name: "kiz",
  //       open_with: "photo_viewer",
  //       src: "/kiz.png",
  //     },
  //   },
  // ]);

  function handleLaunchApp(icon) {
    const appSessionId = `app-session-${crypto.randomUUID()}`;

    setRunningApps((prev) => {
      return [
        ...prev,
        {
          id: appSessionId,
          data: icon.data,
          x: 500,
          y: 500,
        },
      ];
    });

    console.log(runningApps);
    setFocusedId(appSessionId);
  }

  function handleSingleClick(item) {
    return item ? setFocusedId(item.id) : setFocusedId("");
  }

  function handleDoubleClick(item) {
    setFocusedId("");
    handleLaunchApp(item);
  }

  let clickCount = 0;
  let clickTimeout = null;

  function handleClick(item) {
    let timeout = 150;
    clickCount++;

    setContextMenu();

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    clickTimeout = setTimeout(() => {
      if (clickCount === 1) {
        handleSingleClick(item);
      } else if (clickCount === 2) {
        handleDoubleClick(item);
      }
      clickCount = 0;
      clickTimeout = null;
    }, timeout);
  }

  function handleContext(item, e) {
    if (item && Object.keys(item).length === 0) return;

    e.preventDefault();
    e.stopPropagation();

    setFocusedId(item);

    let x = e.clientX;
    let y = e.clientY;

    setContextMenu({ actions: item.actions, x: x, y: y });

    console.log(x, y);
    console.log(width, height);

    console.log("context menu!");
  }

  function handleContextDesktop(e) {
    e.preventDefault();
    console.log("context desktop!");
  }

  function handleDrag(e, window) {
    setFocusedId(window);

    const initX = e.clientX;
    const initY = e.clientY;
    const windowX = window.x;
    const windowY = window.y;

    function handleMouseMove(e) {
      setRunningApps((prev) =>
        prev.map((p) =>
          p.id === window.id
            ? {
                ...p,
                x: windowX + e.clientX - initX,
                y: windowY + e.clientY - initY,
              }
            : p
        )
      );
    }

    function handleMouseUp(e) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleDrag);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  useEffect(() => {
    setTimeout(() => {
      setIcons(() => arrangeIcons(width, height));
    }, 100);
  }, [width, height]);

  return (
    <>
      <div id="desktop" onContextMenu={(e) => handleContextDesktop(e)}>
        {/* {contextMenu ? <ContextMenu context={contextMenu} /> : <></>} */}
        <div id="apps">
          {Array.from(runningApps).map((runningApp, key) => {
            return (
              <Application
                key={key}
                caller={runningApp}
                onMouseDown={(e) => handleDrag(e, runningApp)}
              />
            );
          })}
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
                onContextMenu={(e) => handleContext(icon, e)}
              >
                {icon.src ? (
                  <Icon
                    name={`${icon.name}${icon.data.extention}`}
                    src={icon.src}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <Dock />
    </>
  );
}
