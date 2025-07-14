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
            <img src="./wpv-zoom.png" alt="zoom" />
          </button>
          <button className="wpv-secondary-btn" type="button">
            <img src="/wpv-revert.png" alt="revert" />
          </button>
          <div className="main-three">
            <button className="wpv-prev-next" type="button">
              <img src="/wpv-prev.png" alt="previous" />
            </button>
            <button className="wpv-ss" type="button">
              <img src="/wpv-slideshow.png" alt="slide show" />
            </button>
            <button className="wpv-prev-next" type="button">
              <img src="/wpv-next.png" alt="next" />
            </button>
          </div>
          <button className="wpv-secondary-btn" type="button">
            <img src="/wpv-ccw.png" alt="rotate counter clockwise " />
          </button>
          <button className="wpv-secondary-btn" type="button">
            <img src="/wpv-cw.png" alt="rotate clockwise " />
          </button>
          <button className="wpv-secondary-btn" type="button">
            <img src="/wpv-trash.png" alt="move to trash " />
          </button>
        </footer>
      }
    >
      <div className="photo-viewer">
        <nav className="menu-bar">
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
            <img src="help-button.svg" />
          </button>
        </nav>
        <section>
          <img src={appData.data.src} alt={appData.data.name} />
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
