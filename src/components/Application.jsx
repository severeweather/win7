import { PhotoViewer } from "./PhotoViewer";

export function Application(props) {
  switch (props.runningApp.app) {
    case "photo-viewer":
      return <PhotoViewer runningApp={props.runningApp} />;
    default:
      return null;
  }
}
