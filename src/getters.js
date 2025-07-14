import { apps } from "./apps";
import { files } from "./files";

export function getAppById(id) {
  return apps.find((app) => app.id === id);
}

export function getFileById(id) {
  return files.find((file) => file.id === id);
}
