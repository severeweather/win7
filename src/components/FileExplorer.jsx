import { Window } from "./Window";
import { files } from "../files";
import { useEffect, useState } from "react";
import { File } from "./File";

export function FileExplorer({ runningApp }) {
  const [location, setLocation] = useState("recentfiles");
  return (
    <Window
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

function FileExplorerLocation({ location }) {
  const [filesHere, setFilesHere] = useState([]);

  useEffect(() => {
    const filteredFiles = Array.from(files).filter(
      (file) => file.location === location
    );
    setFilesHere(filteredFiles);
  }, [location]);

  return (
    <div className="fe-location">
      {filesHere.map((file) => {
        return <File file={file} onClick={() => console.log("open")} />;
      })}
    </div>
  );
}
