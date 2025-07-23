import { Window } from "../components/Window";
import { useEffect, useState } from "react";
import { sysEntities } from "../sysEntities";
import { Icon } from "../components/Icon";
import { useFocus } from "../context/useFocus";

const icons = {
  Computer: "/mypc-icon.svg",
  Desktop: "/desktop-icon.svg",
  Downloads: "/downloads-icon.svg",
  "Recent Places": "/recentplaces-icon.svg",
  Libraries: "/library-icon.svg",
  Documents: "/documents-icon.svg",
  Music: "/music-icon.svg",
  Pictures: "/pictures-icon.svg",
  "Local Disk": "/diskc-icon.svg",
};

function Origin({ children, src, name }) {
  return (
    <section className="fe-origin">
      <header className="fe-origin__header">
        <div className="fe-origin__header-icon-wrapper">
          <img
            src={src}
            className="fe-origin__header-icon"
            aria-hidden={true}
          />
        </div>
        <span className="fe-origin__header-title">{name}</span>
      </header>
      <ul className="fe-origin__list">{children}</ul>
    </section>
  );
}

function OriginItem({ onClick, src, name, active = false }) {
  return (
    <li
      className={`fe-origin__list-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="fe-origin__list-item-icon-wrapper">
        <img
          src={src}
          className="fe-origin__list-item-icon"
          aria-hidden={true}
        />
      </div>
      <span className="fe-origin__list-item-title">{name}</span>
    </li>
  );
}

function MenuBar({ menuItems, modifier }) {
  return (
    <section className={`menubar ${modifier}`}>
      <section className="menubar__dropdowns">
        {menuItems.map((menuItem, key) => {
          return (
            <span key={key} className="menubar__dropdown-item">
              {menuItem}
            </span>
          );
        })}
      </section>
      <section className="menubar__single-buttons">
        <button type="button" className="menubar__single-button">
          <img
            src="/help-button.svg"
            aria-hidden={true}
            className="menubar__single-button-image"
          />
        </button>
      </section>
    </section>
  );
}

export function FileExplorer({ runningApp }) {
  const [location, setLocation] = useState("Computer/Desktop");
  const rootLocation = location.split("/").filter(Boolean)[0];
  const targetLocation = location.split("/").filter(Boolean).pop();
  const [menuBarItems, setMenuBarItems] = useState([
    "Organize",
    "Open",
    "Share with",
    "Print",
    "E-mail",
    "Burn",
  ]);

  return (
    <Window
      allowTitle={false}
      appData={runningApp}
      header={
        <nav className="fe-navigation">
          <section className="fe-navigation__arrows">
            <div className="fe-navigation__arrow-wrapper">
              <img
                src="/arrow-back-icon.svg"
                className="fe-navigation__arrow"
                aria-hidden={true}
              />
            </div>
            <div className="fe-navigation__arrow-wrapper">
              <img
                src="/arrow-forward-icon.svg"
                className="fe-navigation__arrow"
                aria-hidden={true}
              />
            </div>
          </section>
          <section className="fe-navigation__path">
            <div className="fe-navigation__path-icon-wrapper">
              <img
                className="fe-navigation__path-icon fe-navigation__path-item"
                src={icons[rootLocation]}
                aria-hidden={true}
              />
            </div>
            {Array.from(location.split("/").filter(Boolean)).map(
              (location, key) => {
                return (
                  <span key={key} className="fe-navigation__path-item">
                    {location}
                  </span>
                );
              }
            )}
          </section>
          <input
            className="fe-navigation__search"
            type="search"
            placeholder={`Search ${targetLocation}`}
          />
        </nav>
      }
      footer={<></>}
    >
      <div className="file-explorer">
        <MenuBar modifier="fe-menubar" menuItems={menuBarItems} />
        <section className="fe-side-panel">
          {/* FAVORITES */}
          <Origin name="Favorites" src="/favorites-icon.svg">
            <OriginItem
              onClick={() => setLocation("Computer/Desktop")}
              src="/desktop-icon.svg"
              name="Desktop"
              active={location === "Computer/Desktop"}
            />
            <OriginItem
              onClick={() => setLocation("Computer/Downloads")}
              src="/downloads-icon.svg"
              name="Downloads"
              active={location === "Computer/Downloads"}
            />
            <OriginItem
              onClick={() => setLocation("Computer/Recent Places")}
              src="/recentplaces-icon.svg"
              name="Recent Places"
              active={location === "Computer/Recent Places"}
            />
          </Origin>
          {/* LIBRARIES */}
          <Origin name="Libraries" src="/library-icon.svg">
            <OriginItem
              onClick={() => setLocation("Libraries/Documents")}
              name="Documents"
              src="/documents-icon.svg"
              active={location === "Libraries/Documents"}
            />
            <OriginItem
              onClick={() => setLocation("Libraries/Music")}
              name="Music"
              src="/music-icon.svg"
              active={location === "Libraries/Music"}
            />
            <OriginItem
              onClick={() => setLocation("Libraries/Pictures")}
              name="Pictures"
              src="/pictures-icon.svg"
              active={location === "Libraries/Pictures"}
            />
          </Origin>
          {/* COMPUTER */}
          <Origin name="Computer" src="/mypc-icon.svg">
            <OriginItem
              onClick={() => setLocation("Computer")}
              name="Local Disk (C:)"
              src="/maindisk-icon.svg"
              active={location === "Computer"}
            />
          </Origin>
        </section>
        <FileExplorerLocation location={location} />
      </div>
    </Window>
  );
}

function FileExplorerLocation({ location = "Desktop" }) {
  const namespace = `file-explorer/${location}`;
  const [gridCellScale, setGridCellScale] = useState({ w: 96, h: 96 });
  const [entitiesHere, setEntitiesHere] = useState([]);
  const { focused, setFocused } = useFocus({
    namespace: namespace,
    id: null,
  });

  function handleClick(id) {
    setFocused({ namespace: namespace, id: id });
  }

  useEffect(() => {
    const filteredEntities = sysEntities.filter(
      (entity) => entity.location === location
    );

    setEntitiesHere(filteredEntities);
  }, [location]);

  return (
    <div className="fe-location">
      <header className="fe-location__header">
        <h2 className="fe-location__title">
          {location.split("/").filter(Boolean).pop()}
        </h2>
        <div className="fe-location__arrange">
          <span className="fe-location__arrange-label">Arrange by:</span>
          <span className="fe-location__arrange-option">Folder</span>
        </div>
      </header>
      <section
        className="fe-location__grid"
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${gridCellScale.w}px)`,
          gridTemplateRows: `repeat(auto-fill, ${gridCellScale.h}px)`,
        }}
      >
        {entitiesHere.map((entity, key) => {
          return (
            <Icon
              key={`icon${key}`}
              entityId={entity.id}
              focused={
                namespace === focused.namespace && focused.id === entity.id
              }
              xClass={`full contrast-text`}
              onClick={() => handleClick(entity.id)}
            />
          );
        })}
      </section>
    </div>
  );
}
