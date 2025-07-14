import { apps } from "./apps";
import { files } from "./files";
import { icons as storedIcons } from "./icons";
import { settings } from "./settings";

export const appOrFile = (icon) => {
  let representsApp = apps.find((entry) => entry.id === icon.represents);
  let representsFile = files.find((entry) => entry.id === icon.represents);

  if (representsApp) {
    return { app: icon.represents };
  }

  if (representsFile) {
    let defaultApp =
      settings.fileTypes.find((entry) => entry.type === representsFile.type)
        ?.defaultApp || null;

    return { app: defaultApp, data: icon.represents };
  }

  return undefined;
};

export const arrangeIcons = (w = 0, h = 0) => {
  if (!w || !h) return;
  setTimeout(() => {}, 1);
  const iconWxH = 96;
  const qcols = Math.floor(w / iconWxH);
  const qrows = Math.floor(h / iconWxH);
  const kwidth = (iconWxH * qcols) / 100;
  const kheight = (iconWxH * qrows) / 100;
  const range_x = [];
  const range_y = [];
  for (let i = 0; i < qcols; i++) {
    range_x.push([i * iconWxH, (i + 1) * iconWxH]);
  }
  for (let i = 0; i < qrows; i++) {
    range_y.push([i * iconWxH, (i + 1) * iconWxH]);
  }
  const icons = Array.from({ length: qcols * qrows }).map(() => {
    return {};
  });
  storedIcons.forEach((icon) => {
    const calibrated_x = icon.x * kwidth;
    const calibrated_y = icon.y * kheight;
    let target_column = null;
    let target_row = null;
    for (let i = 0; i < range_x.length; i++) {
      if (calibrated_x >= range_x[i][0] && calibrated_x < range_x[i][1]) {
        target_column = i;
        break;
      }
    }
    for (let j = 0; j < range_y.length; j++) {
      if (calibrated_y >= range_y[j][0] && calibrated_y < range_y[j][1]) {
        target_row = j;
        break;
      }
    }
    if (target_row !== null && target_column !== null) {
      const index = target_row * qcols + target_column;
      icons[index] = icon;
    }
  });
  return icons;
};
