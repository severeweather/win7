import { useEffect, useState } from "react";
import { Window } from "./Window";
import { getAppById, getFileById } from "../getters";

function PhotoViewerRaw() {
  return;
}

function PhotoViewerFile({ appData }) {
  return (
    <Window
      appData={appData}
      footer={
        <footer className="photo-viewer control-panel">
          <button className="wpv-secondary-btn" type="button">
            <img draggable={false} src="./wpv-zoom.png" alt="zoom" />
          </button>
          <button className="wpv-secondary-btn" type="button">
            <img draggable={false} src="/wpv-revert.png" alt="revert" />
          </button>
          <div className="main-three">
            <button className="wpv-prev-next" type="button">
              <img draggable={false} src="/wpv-prev.png" alt="previous" />
            </button>
            <button className="wpv-ss" type="button">
              <img
                draggable={false}
                src="/wpv-slideshow.png"
                alt="slide show"
              />
            </button>
            <button className="wpv-prev-next" type="button">
              <img draggable={false} src="/wpv-next.png" alt="next" />
            </button>
          </div>
          <button className="wpv-secondary-btn" type="button">
            <img
              draggable={false}
              src="/wpv-ccw.png"
              alt="rotate counter clockwise "
            />
          </button>
          <button className="wpv-secondary-btn" type="button">
            <img draggable={false} src="/wpv-cw.png" alt="rotate clockwise " />
          </button>
          <button className="wpv-secondary-btn" type="button">
            <img draggable={false} src="/wpv-trash.png" alt="move to trash" />
          </button>
        </footer>
      }
      minW={1000}
      minH={500}
    >
      <div className="photo-viewer">
        <header className="menu-bar">
          <section className="menu-buttons">
            <button className="photo-viewer menu-button" type="button">
              File
            </button>
            <button className="photo-viewer menu-button" type="button">
              Print
            </button>
            <button className="photo-viewer menu-button" type="button">
              E-mail
            </button>
            <button className="photo-viewer menu-button" type="button">
              Burn
            </button>
            <button className="photo-viewer menu-button" type="button">
              Open
            </button>
          </section>
          <button type="button" className="help-button">
            <img draggable={false} src="help-button.svg" />
          </button>
        </header>
        <section className="photo-viewer content">
          <img
            draggable={false}
            src={appData.data.src}
            alt={appData.data.name}
          />
        </section>
      </div>
    </Window>
  );
}

export function PhotoViewer({ runningApp }) {
  const [appData, setAppData] = useState({ app: {}, data: {} });

  useEffect(() => {
    setAppData({
      app: getAppById(runningApp.app),
      data: getFileById(runningApp.data),
    });
  }, [runningApp]);

  return appData.data ? (
    <PhotoViewerFile appData={appData} />
  ) : (
    <PhotoViewerRaw />
  );
}
