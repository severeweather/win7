import { Window } from "./Window";
import { useRunningApps } from "../context/useRunningApps";
import { useEffect } from "react";

export function PhotoViewer(props) {
  const dims = {
    x: props.data.x,
    y: props.data.y,
    w: props.data.w,
    h: props.data.h,
  };
  const { runningApps, setRunningApps } = useRunningApps();
  useEffect(() => {
    console.log("logged from PhotoViewer:", runningApps);
  }, []);
  return (
    <Window dims={dims} onMouseDown={props.onMouseDown}>
      <div className="photo-viewer">
        <img src={props.data.data.src} alt="" draggable={false} />
        <nav className="control-panel">
          <button>back</button>
          <button>next</button>
        </nav>
      </div>
    </Window>
  );
}
