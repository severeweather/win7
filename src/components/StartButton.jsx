import { useEffect, useState } from "react";
import { useClippy } from "./Clippy";
import { sysEntities } from "../sysEntities";
import { useDesktop } from "../pages/Desktop";

export function StartMenu() {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState(
    sysEntities.filter((entity) => entity.location === "Computer/Desktop")
  );
  const [menuItems] = useState([
    "John Doe",
    "Documents",
    "Pictures",
    "Music",
    "Recent Places",
    "Computer",
    "Network",
    "Control Panel",
    "Devices and Printers",
    "Default Programs",
  ]);
  const { callClippy } = useClippy();

  useEffect(() => {
    setFiles(
      sysEntities.filter((entity) =>
        entity.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="start-menu">
      <section className="start-menu__files">
        <ul className="start-menu__files__list">
          {files.map((item) => {
            return (
              <li
                className="start-menu__files__list-item"
                onClick={() => callClippy("WIP")}
              >
                <div className="start-menu__files__list-item__icon-wrapper">
                  <img
                    className="start-menu__files__list-item__icon"
                    src={item.iconSrc || item.content}
                    draggable={false}
                    alt=""
                  />
                </div>
                <span className="start-menu__files__list-item__name">
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
        <footer className="start-menu__files__footer">
          <input
            className="start-menu__search"
            type="text"
            placeholder="Search programs and files"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </footer>
      </section>
      <section className="start-menu__menu">
        <div className="start-menu__profile-picture">
          <div className="start-menu__profile-picture__picture-wrapper">
            <img
              className="start-menu__profile-picture__picture"
              src="flowerpfp.png"
              draggable={false}
              alt=""
            />
          </div>
        </div>
        <ul className="start-menu__menu-list">
          {menuItems.map((menuItem) => {
            return (
              <li
                className="start-menu__menu-item"
                onClick={() => callClippy("WIP")}
              >
                {menuItem}
              </li>
            );
          })}
        </ul>
        <footer className="start-menu__footer">
          <button
            type="button"
            className="start-menu__shutdown-button"
            onClick={() => callClippy("WIP")}
          >
            Shut down
          </button>
        </footer>
      </section>
    </div>
  );
}

export function StartButton() {
  const { toggleStartMenu } = useDesktop();
  function handleClick() {
    toggleStartMenu();
  }

  return (
    <div className="startbutton" onClick={handleClick}>
      <img className="startbutton__normal" src="/start-button.png" alt="" />
      <img
        className="startbutton__glowing"
        src="/glowing-start-button.png"
        alt=""
      />
    </div>
  );
}
