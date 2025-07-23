export function getEntityById(id) {
  return sysEntities.find((entity) => entity.id === id);
}

export const sysEntities = [
  {
    id: "file-1",
    type: "picture",
    name: "kiz",
    content: "/kiz.png",
    location: "Computer/Desktop",
    posX: 90,
    posY: 50,
  },
  {
    id: "file-2",
    type: "picture",
    name: "smart man in glasses wallpaper download",
    content: "/smigwd.jpg",
    location: "Computer/Desktop",
    posX: 70,
    posY: 50,
  },
  {
    id: "file-3",
    type: "plaintext",
    name: "README",
    content: "силя какашка силя какашка",
    location: "Computer/Desktop",
    posX: 50,
    posY: 50,
  },
  {
    id: "photo-viewer",
    type: "app",
    name: "Windows Photo Viewer",
    iconSrc: "/picthumbnail.png",
  },
  {
    id: "notepad",
    type: "app",
    name: "Notepad",
    iconSrc: "/notepadicon.png",
  },
  {
    id: "internet-explorer",
    type: "app",
    name: "Internet Explorer",
    iconSrc: "/iexplorer.png",
  },
  {
    id: "file-explorer",
    type: "app",
    name: "File Explorer",
    iconSrc: "/fileexplorer.png",
  },
];
