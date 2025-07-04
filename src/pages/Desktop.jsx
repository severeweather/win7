import { useEffect, useRef, useState } from "react";
import { Dock } from "../components/Dock";

function useResize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    console.log(ref.current);

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
  { icon: "я здесь", x: 95, y: 5 },
  { icon: "я здесь", x: 95, y: 95 },
  { icon: "я здесь", x: 55, y: 55 },
];

function arrangeIcons(w = 0, h = 0) {
  if (!w || !h) return;

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

  console.log("range_x:", range_x);
  console.log("range_y:", range_y);

  const icons = Array.from({ length: qcols * qrows }).map(() => {
    return {};
  });

  console.log("icons:", icons);

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
  const { width, height } = useResize(desktopRef);
  const [icons, setIcons] = useState();

  useEffect(() => {
    setIcons(() => arrangeIcons(width, height));
  }, [width, height]);

  return (
    <>
      <div id="desktop" ref={desktopRef}>
        {icons ? (
          Array.from(icons).map((item, key) => (
            <div className="icon-cell" key={key}>
              {item.icon ? <span>{item.icon}</span> : <></>}
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
