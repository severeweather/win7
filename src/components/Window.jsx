import { useEffect, useRef, useState } from "react";

export function Window(props) {
  const windowRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [scale, setScale] = useState({ w: 900, h: 700 });
  const [position, setPosition] = useState({ x: 400, y: 400 });
  const [title, setTitle] = useState("Untitled");

  function handleDrag(e) {
    setMaximized(false);
    const initX = e.clientX;
    const initY = e.clientY;
    const windowX = windowRef.current.offsetLeft;
    const windowY = windowRef.current.offsetTop;

    function mouseMove(e) {
      const dx = e.clientX - initX;
      const dy = e.clientY - initY;

      setPosition({
        x: windowX + dx,
        y: windowY + dy,
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
    setMaximized(false);
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
              y: windowY + dy,
            };
          });
          setScale((prev) => {
            return { w: prev.w, h: windowH - dy };
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
            return { h: prev.h, w: windowW - dx };
          });
          break;
        case "topright":
          setPosition((prev) => {
            return {
              x: prev.x,
              y: windowY + dy,
            };
          });
          setScale({ w: windowW + dx, h: windowH - dy });
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
          setScale({ w: windowW - dx, h: windowH - dy });
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

  useEffect(() => {
    console.log(position);
    console.log(scale);
  }, [position]);

  return (
    <div
      ref={windowRef}
      className={`window ${minimized ? "minimized" : ""} ${
        maximized ? "maximized" : ""
      }`}
      style={{
        top: position?.y,
        left: position?.x,
        width: scale?.w,
        height: scale?.h,
      }}
    >
      <div></div>
      <nav className="drag-zone" onMouseDown={(e) => handleDrag(e)}>
        <span className="window-title">{`Photo Viewer — ${title}`}</span>
        <section className="min-max-close">
          <button
            type="button"
            className="minimize"
            onClick={() => setMinimized(true)}
          ></button>
          <button
            type="button"
            className="maximize"
            onClick={() => setMaximized(maximized ? false : true)}
          ></button>
          <button type="button" className="close"></button>
        </section>
      </nav>
      <section className="window-content">{props.children}</section>
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
  );
}
