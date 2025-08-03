import { Window } from "../components/Window";
import { useEffect, useMemo, useState } from "react";
import { getEntityById, sysEntities } from "../sysEntities";
import { Icon } from "../components/Icon";
import { useFocus } from "../context/useFocus";
import { useClick } from "../hooks/useClick";
import { appOrFile } from "../service";
import { useRunningApps } from "../context/useRunningApps";
import { MenuBar } from "../components/MenuBar";
import NavArrows from "../components/NavArrows";

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
  Folder: "/folder-icon.svg",
};

function Origin({ children, src, name }) {
  return (
    <section className="fe-origin">
      <header className="fe-origin__header">
        <div className="fe-origin__header-icon-wrapper">
          <img
            alt=""
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
          alt=""
          src={src}
          className="fe-origin__list-item-icon"
          aria-hidden={true}
        />
      </div>
      <span className="fe-origin__list-item-title">{name}</span>
    </li>
  );
}

function NavPath({ icons, rootLocation, location }) {
  return (
    <div className="fe-navigation__path">
      <div className="fe-navigation__path-icon-wrapper">
        <img
          alt=""
          className="fe-navigation__path-icon fe-navigation__path-item"
          src={icons[rootLocation]}
          aria-hidden={true}
        />
      </div>
      {Array.from(location.split("/").filter(Boolean)).map((location, key) => {
        return (
          <span key={key} className="fe-navigation__path-item">
            {location}
          </span>
        );
      })}
    </div>
  );
}

export function FileExplorer({ runningApp }) {
  const namespace = `file-explorer/${runningApp.id}`;
  const { focused, setFocused } = useFocus();
  const [location, setLocation] = useState("Computer/Desktop/Folderr");
  const rootLocation = location.split("/").filter(Boolean)[0];
  const targetLocation = location.split("/").filter(Boolean).pop();
  const [menuBarItems] = useState([
    "Organize",
    "Open",
    "Share with",
    "Print",
    "E-mail",
    "Burn",
  ]);

  useEffect(() => {
    if (!runningApp.data) return;

    setLocation(`${runningApp.data.location}/${runningApp.data.name}`);
  }, [runningApp.data]);

  function LocationInfo({ location }) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const count = sysEntities.filter(
        (entity) => entity.location === location
      ).length;
      setCounter(count);
    }, [location]);

    return (
      <div className="fe-footer__location-info">
        <label className="fe-footer__label">
          {counter} Item{counter !== 1 ? "s" : null}
        </label>
      </div>
    );
  }

  function EntityInfo({ entity }) {
    return (
      <div className="fe-footer__entity-info">
        <span>{entity.name}</span>
        <label className="fe-footer__label">{entity.type}</label>
        <span>
          <label className="fe-footer__label">Date modified:</label>{" "}
          {entity.dateModified}
        </span>
        <span>
          <label className="fe-footer__label">Size:</label> {entity.size}
        </span>
        <span>
          <label className="fe-footer__label">Date created:</label>{" "}
          {entity.dateCreated}
        </span>
      </div>
    );
  }

  const locationInfo = useMemo(
    () => <LocationInfo location={location} />,
    [location]
  );

  const [focusedInfo, setFocusedInfo] = useState({
    icon: icons[targetLocation] ?? icons["Folder"],
    info: locationInfo,
  });

  useEffect(() => {
    if (focused.namespace !== namespace || focused.id === "file-explorer") {
      setFocusedInfo({
        icon: icons[targetLocation] ?? icons["Folder"],
        info: locationInfo,
      });
      return;
    }

    const entity = getEntityById(focused.id);
    if (entity) {
      setFocusedInfo({
        icon: entity.content,
        info: <EntityInfo entity={entity} />,
      });
    } else {
      let counter = 0;
      sysEntities.forEach((entity) => {
        if (entity.location === location) counter++;
      });

      setFocusedInfo({ items: counter });
    }
  }, [focused, location, locationInfo, namespace, targetLocation]);

  return (
    <Window
      allowTitle={false}
      appData={runningApp}
      header={
        <nav className="fe-navigation">
          <NavArrows />
          <NavPath
            icons={icons}
            rootLocation={rootLocation}
            location={location}
          />
          <input
            className="fe-navigation__search"
            type="search"
            placeholder={`Search ${targetLocation}`}
          />
        </nav>
      }
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
        <FileExplorerLocation
          location={location}
          setLocation={setLocation}
          namespace={namespace}
        />
        <footer className="fe-footer">
          <div className="fe-footer__icon-wrapper">
            <img
              alt=""
              aria-hidden={true}
              className="fe-footer__icon"
              src={focusedInfo.icon || icons[location] || icons["Folder"]}
            />
          </div>
          <div className="fe-footer__entity-info">{focusedInfo.info}</div>
        </footer>
      </div>
    </Window>
  );
}

function FileExplorerLocation({ location, setLocation, namespace }) {
  const [gridCellScale] = useState({ w: 96, h: 96 });
  const [entitiesHere, setEntitiesHere] = useState([]);
  const { focused, setFocused } = useFocus({
    namespace: namespace,
    id: null,
  });
  const handleClick = useClick();
  const { runApp } = useRunningApps();

  function doubleClick(entity) {
    switch (entity.type) {
      case "folder":
        setLocation(`${entity.location}/${entity.name}`);
        setFocused((prev) => ({ ...prev, id: null }));
        break;
      default:
        const { app, data } = appOrFile(entity.id);
        runApp(app, data);
        break;
    }
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
              onClick={() =>
                handleClick({
                  id: entity.id,
                  namespace: namespace,
                  doubleClick: () => doubleClick(entity),
                })
              }
            />
          );
        })}
      </section>
    </div>
  );
}
