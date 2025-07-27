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
    size: "2 Mb",
    dateModified: "25/07/2025 01:07:34",
    dateCreated: "25/07/2025 00:07:34",
    posX: 90,
    posY: 50,
  },
  {
    id: "file-2",
    type: "picture",
    name: "smart man in glasses wallpaper download",
    content: "/smigwd.jpg",
    location: "Computer/Desktop",
    size: "2 Mb",
    dateModified: "25/07/2025 21:07:34",
    dateCreated: "25/07/2025 22:07:34",
    posX: 70,
    posY: 50,
  },
  {
    id: "file-3",
    type: "plaintext",
    name: "README",
    content: "test",
    iconSrc: "/notepadicon.png",
    location: "Computer/Desktop",
    size: "289 Kb",
    dateModified: "25/07/2025 10:07:34",
    dateCreated: "25/07/2025 11:07:34",
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
    location: "Computer/Desktop/New Folder",
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
  {
    id: "folder-1",
    type: "folder",
    name: "New Folder",
    iconSrc: "/folder-icon.svg",
    location: "Computer/Desktop",
    dateCreated: "26/07/2025 04:10:00",
    dateModified: "26/07/2025 04:11:00",
    size: "10Mb",
  },
];
