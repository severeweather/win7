import { Window } from "./Window";
import { use, useEffect, useState } from "react";
import { getEntityById, sysEntities } from "../sysEntities";
import { Icon } from "./Icon";
import { useFocus } from "../context/useFocus";

export function FileExplorer({ runningApp }) {
  const [appData, setAppData] = useState({ app: {}, data: {} });
  const [location, setLocation] = useState("desktop");

  useEffect(() => {
    let app = getEntityById(runningApp.app);

    if (app.type === "app")
      setAppData({
        app: app,
        data: {},
      });
  }, [runningApp]);

  return (
    <Window
      appData={appData}
      header={
        <nav className="fe-nav">
          <section className="fe-back-forward"></section>
          <section className="fe-file-path"></section>
          <input
            className="fe-file-search"
            type="search"
            placeholder="Search.."
          />
        </nav>
      }
    >
      <div className="file-explorer">
        <section className="fe-side-panel">
          <ul className="fe-side-panel-favorites">
            <header>
              <img />
              Favorites
            </header>
            <li onClick={() => setLocation("desktop")}>Desktop</li>
            <li onClick={() => setLocation("downloads")}>Downloads</li>
            <li onClick={() => setLocation("recentfiles")}>Recent Files</li>
          </ul>
          <ul className="fe-side-panel-libraries">
            <header>
              <img />
              Libraries
            </header>
            <li onClick={() => setLocation("documents")}>Documents</li>
            <li onClick={() => setLocation("music")}>Music</li>
            <li onClick={() => setLocation("pictures")}>Pictures</li>
            <li onClick={() => setLocation("videos")}>Videos</li>
          </ul>
          <ul className="fe-side-panel-disks">
            <header>
              <img />
              Computer
            </header>
            <li onClick={() => setLocation("diskc")}>Local Disk (C:)</li>
            <li onClick={() => setLocation("diskd")}>Local Disk (D:)</li>
          </ul>
          <ul className="fe-side-panel-network">
            <header>
              <img />
              Network
            </header>
          </ul>
        </section>
        <section className="fe-main">
          <FileExplorerLocation location={location} />
        </section>
      </div>
    </Window>
  );
}

function FileExplorerLocation({ location = "desktop" }) {
  const namespace = `file-explorer/${location}`;
  const [gridCellScale, setGridCellScale] = useState({ w: 96, h: 96 });
  const [entitiesHere, setEntitiesHere] = useState([]);
  const { focused, setFocused } = useFocus({
    namespace: namespace,
    id: null,
  });

  function handleClick(id) {
    setFocused({ namespace: namespace, id: id });
  }

  useEffect(() => {
    const filteredEntities = sysEntities.filter(
      (entity) => entity.location === location
    );

    setEntitiesHere(filteredEntities);
  }, [location]);

  return (
    <div
      className="fe-location"
      style={{
        gridTemplateColumns: `repeat(auto-fill, ${gridCellScale.w}px)`,
        gridTemplateRows: `repeat(auto-fill, ${gridCellScale.h}px)`,
      }}
    >
      {entitiesHere.map((entity, key) => {
        return (
          <Icon
            key={`icon${key}`}
            entityId={entity.id}
            focused={
              namespace === focused.namespace && focused.id === entity.id
            }
            xClass={`full contrast-text`}
            onClick={() => handleClick(entity.id)}
          />
        );
      })}
    </div>
  );
}
