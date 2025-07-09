import { useState } from "react";
import { useApplicationContext } from "./Application";

export function Window(props) {
  // const { applicationContext, setApplicationContext } = useApplicationContext();
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  return (
    <div
      className={`window ${minimized ? "minimized" : ""} ${
        maximized ? "maximized" : ""
      }`}
      style={{
        top: props.dims.y,
        left: props.dims.x,
        width: props.dims.w,
        height: props.dims.h,
      }}
      onMouseDown={props.onMouseDown}
    >
      <nav>
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
          <button type="button" className="close">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="2"
                y1="2"
                x2="10"
                y2="10"
                stroke="#C00"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="2"
                x2="2"
                y2="10"
                stroke="#C00"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </section>
      </nav>
      <section className="window-content">{props.children}</section>
    </div>
  );
}
