import { useEffect, useState } from "react";
import { Window } from "../components/Window";
import { getEntityById } from "../sysEntities";
import NavArrows from "../components/NavArrows";

export function InternetExplorer({ runningApp }) {
  const [refresher, setRefresher] = useState(0);
  const [appData, setAppData] = useState({ app: {}, data: {} });
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

  useEffect(() => {
    let app = getEntityById(runningApp.app.id);

    if (app.type === "app")
      setAppData({
        app: app,
        data: {
          name: tabs.find((tab) => tab.id === activeTab).name,
          icon: tabs.find((tab) => tab.id === activeTab).tabicon,
        },
      });
    else return;
  }, [runningApp, activeTab, tabs]);

  return (
    <Window
      appData={appData}
      header={
        <nav className="ie-nav">
          <section className="ie-arrows">
            <NavArrows />
          </section>
          <section className="ie-searchbar">
            <input
              type="text"
              value={tabs.find((tab) => tab.id === activeTab).url}
              placeholder="Search"
            />
            <button
              type="button"
              className="ie-refresh"
              onClick={() => setRefresher((prev) => prev + 1)}
            />
          </section>
          <section className="ie-search-engines">
            <img src="/iconbing.png" alt="bing" />
            <span>Bing</span>
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

function IETab({ tabData, active, onClick }) {
  return (
    <div className={`ie-tab ${active ? "active" : ""}`} onClick={onClick}>
      <img src={tabData.tabicon} alt={tabData.name} />
      <span>{tabData.name}</span>
    </div>
  );
}
