import { PhotoViewer } from "./PhotoViewer";
import { Notepad } from "./Notepad";
import { InternetExplorer } from "./InternetExplorer";
import { FileExplorer } from "./FileExplorer";

export function Application({ runningApp }) {
  switch (runningApp.app) {
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
