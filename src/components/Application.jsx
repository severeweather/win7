import { PhotoViewer } from "../apps/PhotoViewer";
import { Notepad } from "../apps/Notepad";
import { InternetExplorer } from "../apps/InternetExplorer";
import { FileExplorer } from "../apps/FileExplorer";

export function Application({ runningApp }) {
  switch (runningApp.app.id) {
    case "photo-viewer":
      return <PhotoViewer runningApp={runningApp} />;
    case "notepad":
      return <Notepad runningApp={runningApp} />;
    case "internet-explorer":
      return <InternetExplorer runningApp={runningApp} />;
    case "file-explorer":
      return <FileExplorer runningApp={runningApp} />;
    default:
      return null;
  }
}
