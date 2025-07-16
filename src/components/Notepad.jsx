import { useEffect, useState } from "react";
import { Window } from "./Window";
import { getAppById, getFileById } from "../getters";

function NotepadRaw({ appData }) {
  return (
    <Window appData={appData}>
      <div className="notepad">
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
      </div>
    </Window>
  );
}

function NotepadFile({ appData }) {
  return (
    <Window appData={appData}>
      <div className="notepad">
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
        <section className="notepad content">
          <textarea value={appData.data.content} />
        </section>
      </div>
    </Window>
  );
}

export function Notepad({ runningApp }) {
  const [appData, setAppData] = useState({ app: {}, data: {} });

  useEffect(() => {
    setAppData({
      app: getAppById(runningApp.app),
      data: getFileById(runningApp.data),
    });
  }, [runningApp]);

  return appData.data ? <NotepadFile appData={appData} /> : <NotepadRaw />;
}
