export let userPreferences = {
  desktopIcons: [],
  dockIcons: [
    { id: "dock-001", represents: "internet-explorer" },
    { id: "dock-002", represents: "file-explorer" },
    { id: "dock-003", represents: "notepad" },
  ],
  apps: [
    {
      app: "internet-explorer",
      userData: {
        bookmarks: [{ name: "YouTube", url: "https://youtube.com" }],
      },
    },
  ],
};
