import { sysEntities, getEntityById } from "./sysEntities";
import { settings } from "./settings";

export const appOrFile = (id) => {
  const entity = getEntityById(id);

  console.log(entity);

  if (entity.type === "app") {
    return { app: entity };
  } else {
    const defaultApp =
      settings.fileTypes.find((entry) => entry.type === entity.type)
        ?.defaultApp || null;

    if (!defaultApp === null) return;

    const app = getEntityById(defaultApp);
    return { app: app, data: entity };
  }
};

export const arrangeDesktopIcons = (w = 0, h = 0) => {
  if (!w || !h) return;

  const desktopEntities = sysEntities.filter(
    (entity) => entity.location === "desktop"
  );

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
  desktopEntities.forEach((icon) => {
    const calibrated_x = icon.posX * kwidth;
    const calibrated_y = icon.posY * kheight;
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

export const isEmpty = (obj) => Object.keys(obj).length === 0;
