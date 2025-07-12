import { useEffect, useRef, useState } from "react";
import { Dock } from "../components/Dock";
import { ContextMenu } from "../components/ContextMenu";
import { Application } from "../components/Application";
import { useFocus } from "../context/useFocus";
import { useRunningApps } from "../context/useRunningApps";
import { icons as storedIcons } from "../icons";
import { apps } from "../apps";
import { files } from "../files";
import { DesktopIcon } from "../components/DesktopIcon";
import { settings } from "../settings";

function useResize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
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
  const icons = Array.from({ length: qcols * qrows }).map(() => {
    return {};
  });
  storedIcons.forEach((icon) => {
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

export function Desktop() {
  const iconGridRef = useRef(null);
  const { width, height } = useResize(iconGridRef);
  const { focusedId, setFocusedId } = useFocus();
  const [icons, setIcons] = useState();
  const { runningApps, runApp } = useRunningApps();
  const [contextMenu, setContextMenu] = useState();

  function handleSingleClick(icon) {
    return icon ? setFocusedId(icon.id) : setFocusedId("");
  }

  function handleDoubleClick(icon) {
    const { app, data } = appOrFile(icon);
    runApp(app, data);
  }

  let clickCount = 0;
  let clickTimeout = null;

  function handleClick(icon) {
    let timeout = 150;
    clickCount++;

    setContextMenu();

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

  function handleContext(icon, e) {
    // if (icon && Object.keys(icon).length === 0) return;
    // e.preventDefault();
    // e.stopPropagation();
    // setFocusedId(icon);
    // let x = e.clientX;
    // let y = e.clientY;
    // setContextMenu({ actions: icon.actions, x: x, y: y });
  }

  function handleContextDesktop(e) {
    e.preventDefault();
  }

  useEffect(() => {
    setTimeout(() => {
      setIcons(() => arrangeIcons(width, height));
    }, 0);
  }, [width, height]);

  return (
    <>
      <div id="desktop" onContextMenu={(e) => handleContextDesktop(e)}>
        {/* {contextMenu ? <ContextMenu context={contextMenu} /> : <></>} */}
        <div id="apps">
          {Array.from(runningApps).map((runningApp, key) => {
            return <Application key={key} runningApp={runningApp} />;
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
                {Object.keys(icon).length > 0 ? (
                  <DesktopIcon icon={icon} />
                ) : null}
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
