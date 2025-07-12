import { Window } from "./Window";

export function PhotoViewer(props) {
  return (
    <Window>
      <div className="photo-viewer">
        <img src={props.data?.src} draggable={false} />
        <nav className="control-panel">
          <button>back</button>
          <button>next</button>
        </nav>
      </div>
    </Window>
  );
}
