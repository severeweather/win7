  import { act, useEffect, useState } from "react";
import { Window } from "../components/window/Window";
import { getEntityById } from "../sysEntities";
import NavArrows from "../components/NavArrows";
import { useClippy } from "../components/Clippy";

function IETab({ tabData, active, onClick }) {
  return (
    <div className={`ie-tab ${active ? "active" : ""}`} onClick={onClick}>
      <img src={tabData.tabicon} alt={tabData.name} />
      <span>{tabData.name}</span>
    </div>
  );
}

export function InternetExplorer({ runningApp }) {
  const { callClippy } = useClippy();
  const [refresher, setRefresher] = useState(0);
  const [tabs] = useState([
    {
      id: "tab-1",
      name: "Google Chrome Fast & Secure Browser Built to Be Yours",
      url: "https://google.com/chrome",
      tabicon: "/iconchrome.png" || "/iexplorer.png",
    },
    {
      id: "tab-2",
      name: "Cat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Cat",
      tabicon: "/iconwikipedia.png" || "/iexplorer.png",
    },
  ]);
  const [activeTab, setActiveTab] = useState("tab-1");

  return (
    <Window
      data={{ id: runningApp.app.id, icon: runningApp.app.iconSrc }}
      title={`${ tabs.find((tab) => tab.id === activeTab).name } — Internet Explorer`} // prettier-ignore
      header={
        <nav className="ie-navigation">
          <NavArrows />
          <section className="ie-navigation__searchbar">
            <input
              type="text"
              placeholder="Search"
              className="ie-navigation__searchbar__input"
              value={tabs.find((tab) => tab.id === activeTab).url}
            />
            <div
              className="ie-navigation__searchbar__button-wrapper"
              onClick={() => setRefresher((prev) => prev + 1)}
            >
              <img
                className="ie-navigation__searchbar__button"
                src="/ie-refresh.svg"
                alt=""
              />
            </div>
          </section>
          <section
            className="ie-navigation__search-engines"
            onClick={() => callClippy("We only use Bing here.")}
          >
            <div className="ie-navigation__search-engines__icon-wrapper">
              <img
                className="ie-navigation__search-engines__icon"
                src="/iconbing.png"
                alt=""
              />
            </div>
            <span className="ie-navigation__search-engines__engine-name">
              Bing
            </span>
          </section>
        </nav>
      }
    >
      <div className="internet-explorer">
        <header className="ie-bkmrks-tabs">
          <section className="ie-bookmarks">
            <div className="ie-bookmarks-favourites">
              <img src="/ie-bkm-favorites.svg" alt="Favorites" />
              <span>Favorites</span>
            </div>
          </section>
          <section className="ie-tabs">
            {Array.from(tabs).map((tab, key) => {
              return (
                <IETab
                  active={activeTab === tab.id}
                  tabData={tab}
                  key={key}
                  onClick={() => setActiveTab(tab.id)}
                />
              );
            })}
          </section>
        </header>
        <section className="ie-tab-content" key={refresher}>
          <iframe
            title="active-tab"
            src={tabs.find((tab) => tab.id === activeTab).url}
          />
        </section>
      </div>
    </Window>
  );
}
