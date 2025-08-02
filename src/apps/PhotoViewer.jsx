import { Window } from "../components/Window";
import { MenuBar } from "../components/MenuBar";
import { useState } from "react";
import { sysEntities } from "../sysEntities";
import { isEmpty } from "../service";
import { useClippy } from "../components/Clippy";

function ControlPanel({ counter, stopCount }) {
  const { callClippy } = useClippy();

  function Button({ type = "", alt = "", src = "", onClick }) {
    return (
      <div
        className={`pv-control-panel__button-wrapper ${
          type ? `pv-control-panel__${type}-button-wrapper` : ""
        }`}
        onClick={onClick}
      >
        <img
          className="pv-control-panel__button"
          src={src}
          alt={alt}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <section className="pv-control-panel">
      <section className="pv-control-panel__wing">
        <Button src="wpv-zoom.png" onClick={() => callClippy("WIP")} />
        <Button src="wpv-revert.png" onClick={() => callClippy("WIP")} />
      </section>
      <section className="pv-control-panel__head">
        <Button
          type="arrow"
          src="wpv-prev.png"
          onClick={() => counter((prev) => (prev > 0 ? prev - 1 : prev))}
        />
        <Button
          type="slideshow"
          src="wpv-slideshow.png"
          onClick={() => callClippy("WIP")}
        />
        <Button
          type="arrow"
          src="wpv-next.png"
          onClick={() =>
            counter((prev) => (prev < stopCount - 1 ? prev + 1 : prev))
          }
        />
      </section>
      <section className="pv-control-panel__wing">
        <Button src="wpv-ccw.png" onClick={() => callClippy("WIP")} />
        <Button src="wpv-cw.png" onClick={() => callClippy("WIP")} />
        <Button src="wpv-trash.png" onClick={() => callClippy("WIP")} />
      </section>
    </section>
  );
}

export function PhotoViewer({ runningApp }) {
  const [menuBarItems] = useState([
    "File",
    "Open",
    "Share with",
    "Print",
    "E-mail",
    "Burn",
  ]);
  const [pictures] = useState(
    isEmpty(runningApp.data)
      ? sysEntities.filter((entity) => entity.type === "picture")
      : sysEntities.filter(
          (entity) =>
            entity.type === "picture" &&
            entity.location === runningApp.data.location
        )
  );
  const [pictureCounter, setPictureCounter] = useState(() => {
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i]["id"] === runningApp.data.id) {
        return i;
      }
    }
  });

  return (
    <Window
      appData={{ app: runningApp.app, data: pictures[pictureCounter] }}
      footer={
        <ControlPanel counter={setPictureCounter} stopCount={pictures.length} />
      }
      minW={550}
      minH={350}
    >
      <div className="photo-viewer">
        <MenuBar menuItems={menuBarItems} />
        <section className="photo-viewer__content">
          <img
            className="photo-viewer__displayed-image"
            draggable={false}
            src={pictures[pictureCounter].content}
            alt={pictures[pictureCounter].name}
          />
        </section>
      </div>
    </Window>
  );
}
