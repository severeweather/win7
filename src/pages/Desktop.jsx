import { useEffect, useRef, useState } from "react";
import { Dock } from "../components/Dock";
import { Icon } from "../components/Icon";
import { ContextMenu } from "../components/ContextMenu";

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

const emulate_icons = [
  {
    id: "1",
    src: "/kiz.png",
    name: "kiz.pngмт ощусцлздчйцбовгытьщфьджбыдвлаьтвлаьды",
    x: 95,
    y: 5,
    actions: ["Open", "Rename", "Move to trash"],
  },
  {
    id: "2",
    src: "/kiz.png",
    name: "kiz.png",
    x: 9,
    y: 76,
    actions: ["Open", "Rename", "Move to trash"],
  },
  {
    id: "3",
    src: "/kiz.png",
    name: "kiz.png",
    x: 35,
    y: 66,
    actions: ["Open", "Rename", "Move to trash"],
  },
  {
    id: "4",
    src: "/kiz.png",
    name: "kiz.png",
    x: 95,
    y: 88,
    actions: ["Open", "Rename", "Move to trash"],
  },
  {
    id: "5",
    src: "/kiz.png",
    name: "kiz.png",
    x: 0,
    y: 66,
    actions: ["Open", "Rename", "Move to trash"],
  },
  {
    id: "6",
    src: "/kiz.png",
    name: "kiz.png",
    x: 50,
    y: 75,
    actions: ["Open", "Rename", "Move to trash"],
  },
  {
    id: "7",
    src: "/kiz.png",
    name: "kiz.png",
    x: 30,
    y: 10,
    actions: ["Open", "Rename", "Move to trash"],
  },
];

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

  // console.log("icons:", icons);

  emulate_icons.forEach((item) => {
    const calibrated_x = item.x * kwidth;
    const calibrated_y = item.y * kheight;

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
      icons[index] = item;
    }
  });

  return icons;
}

export function Desktop() {
  const desktopRef = useRef(null);
  const [focused, setFocused] = useState("");
  const { width, height } = useResize(desktopRef);
  const [icons, setIcons] = useState();
  const [contextMenu, setContextMenu] = useState();

  function handleSingleClick(item) {
    console.log("click");
    return item.id ? setFocused(item) : setFocused("");
  }
  function handleDoubleClick(item) {
    console.log("double click");
    setFocused("");
  }

  let clickCount = 0;
  let clickTimeout = null;

  function handleClick(item, e) {
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

    setFocused(item);

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

  useEffect(() => {
    setTimeout(() => {
      setIcons(() => arrangeIcons(width, height));
    }, 100);
  }, [width, height]);

  return (
    <>
      <div
        id="desktop"
        ref={desktopRef}
        onContextMenu={(e) => handleContextDesktop(e)}
      >
        {contextMenu ? <ContextMenu context={contextMenu} /> : <></>}
        {icons ? (
          Array.from(icons).map((item, key) => (
            <div
              className={`icon-cell ${focused === item ? "focused" : ""}`}
              key={key}
              onClick={(e) => handleClick(item, e)}
              onContextMenu={(e) => handleContext(item, e)}
            >
              {item.src ? <Icon name={item.name} src={item.src} /> : <></>}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <Dock />
    </>
  );
}
