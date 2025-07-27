import { Window } from "../components/Window";
import { MenuBar } from "../components/MenuBar";
import { isEmpty } from "../service";
import { useState } from "react";
import { sysEntities } from "../sysEntities";

function ControlPanel({ counter, stopCount }) {
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
        <Button src="wpv-zoom.png" />
        <Button src="wpv-revert.png" />
      </section>
      <section className="pv-control-panel__head">
        <Button
          type="arrow"
          src="wpv-prev.png"
          onClick={() => counter((prev) => (prev > 0 ? prev - 1 : prev))}
        />
        <Button type="slideshow" src="wpv-slideshow.png" />
        <Button
          type="arrow"
          src="wpv-next.png"
          onClick={() =>
            counter((prev) => (prev < stopCount - 1 ? prev + 1 : prev))
          }
        />
      </section>
      <section className="pv-control-panel__wing">
        <Button src="wpv-ccw.png" />
        <Button src="wpv-cw.png" />
        <Button src="wpv-trash.png" />
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
  const [pictures, setPictures] = useState(
    sysEntities.filter((entity) => entity.type === "picture")
  );
  const [pictureCounter, setPictureCounter] = useState(0);

  const empty = isEmpty(runningApp.data);

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
          {empty ? (
            <img
              className="photo-viewer__displayed-image"
              draggable={false}
              src={pictures[pictureCounter].content}
              alt={pictures[pictureCounter].name}
            />
          ) : (
            <img
              className="photo-viewer__displayed-image"
              draggable={false}
              src={runningApp.data.content}
              alt={runningApp.data.name}
            />
          )}
        </section>
      </div>
    </Window>
  );
}
