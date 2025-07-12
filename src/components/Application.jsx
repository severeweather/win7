import { PhotoViewer } from "./PhotoViewer";

export function Application(props) {
  switch (props.runningApp.app) {
    case "photo-viewer":
      return <PhotoViewer data={props.runningApp.data} />;
    default:
      return null;
  }
}
