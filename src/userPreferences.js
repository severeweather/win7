export let userPreferences = {
  desktopIcons: [],
  dockIcons: [
    { id: "dock-001", shortcutFor: "internet-explorer" },
    { id: "dock-002", shortcutFor: "file-explorer" },
    { id: "dock-003", shortcutFor: "notepad" },
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
